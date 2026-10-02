// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";
import { initEvents } from "./events.js";
import { setState } from "./state.js";

// ---------- helpers ----------
function renderApp() {
  document.body.innerHTML = `
    <input id="bill" name="bill" />
    <p id="bill-error"></p>

    <div class="group-buttons">
      <input type="radio" name="tip" value="5"  id="tip-5" />
      <input type="radio" name="tip" value="10" id="tip-10" />
      <input type="radio" name="tip" value="15" id="tip-15" />
    </div>
    <input id="tip-custom" name="customTip" />

    <input id="people" name="people" />
    <p id="people-error"></p>

    <p id="tip-amount">$0.00</p>
    <p id="total">$0.00</p>
    <div id="results-announcer"></div>
    <button class="reset-btn">Reset</button>
  `;
}

// Simulates a user typing a value
function type(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
}

const $ = (selector) => document.querySelector(selector);

beforeEach(() => {
  setState({
    bill: 0,
    tip: 0,
    customTip: 0,
    people: 0,
    errors: { bill: "", people: "" },
  });
  renderApp();
  initEvents();
});

// ---------- tests ----------
describe("tip calculator (integration)", () => {
  it("starts with the reset button disabled", () => {
    expect($(".reset-btn").disabled).toBe(true);
  });

  it("enables the reset button after the user types", () => {
    type($("#bill"), "100");

    expect($(".reset-btn").disabled).toBe(false);
  });

  it("calculates the results with a tip button", () => {
    type($("#bill"), "100");
    $("#tip-10").click();
    type($("#people"), "2");

    expect($("#tip-amount").textContent).toBe("$5.00");
    expect($("#total").textContent).toBe("$55.00");
  });

  it("splits the bill without a tip when the custom tip is 0", () => {
    type($("#bill"), "100");
    type($("#tip-custom"), "0");
    type($("#people"), "4");

    expect($("#tip-amount").textContent).toBe("$0.00");
    expect($("#total").textContent).toBe("$25.00");
  });

  it("shows $0.00 again when the custom tip is cleared", () => {
    type($("#bill"), "100");
    type($("#tip-custom"), "20");
    type($("#people"), "4");

    type($("#tip-custom"), "");

    expect($("#total").textContent).toBe("$0.00");
  });

  it("calculates the results with a custom tip", () => {
    type($("#bill"), "100");
    type($("#tip-custom"), "20");
    type($("#people"), "4");

    expect($("#tip-amount").textContent).toBe("$5.00");
    expect($("#total").textContent).toBe("$30.00");
  });

  it("typing a custom tip unchecks the tip buttons", () => {
    $("#tip-10").click();
    type($("#tip-custom"), "20");

    expect($("#tip-10").checked).toBe(false);
  });

  it("clicking a tip button clears the custom tip", () => {
    type($("#tip-custom"), "20");
    $("#tip-10").click();

    expect($("#tip-custom").value).toBe("");
  });

  it("shows an error when people is 0 and keeps results at $0.00", () => {
    type($("#bill"), "100");
    $("#tip-10").click();
    type($("#people"), "0");

    expect($("#people-error").textContent).not.toBe("");
    expect($("#people").getAttribute("aria-invalid")).toBe("true");
    expect($("#tip-amount").textContent).toBe("$0.00");
    expect($("#total").textContent).toBe("$0.00");
  });

  it("announces the results for screen readers", () => {
    type($("#bill"), "100");
    $("#tip-10").click();
    type($("#people"), "2");

    expect($("#results-announcer").textContent).toBe(
      "Tip amount per person: $5.00, Total per person: $55.00",
    );
  });

  it("reset clears everything", () => {
    type($("#bill"), "100");
    $("#tip-10").click();
    type($("#people"), "2");

    $(".reset-btn").click();

    expect($("#bill").value).toBe("");
    expect($("#people").value).toBe("");
    expect($("#tip-10").checked).toBe(false);
    expect($("#tip-amount").textContent).toBe("$0.00");
    expect($("#total").textContent).toBe("$0.00");
    expect($(".reset-btn").disabled).toBe(true);
  });
});
