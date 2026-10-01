import { describe, it, expect } from "vitest";
import { calculateTip } from "./calculator.js";

describe("calculateTip", () => {
  // 1. The normal case
  it("splits tip and total between people", () => {
    // Arrange
    const bill = 100;
    const tip = 10;
    const people = 2;

    // Act
    const result = calculateTip(bill, tip, people);

    // Assert
    expect(result).toEqual({ tipAmount: 5, total: 55 });
  });

  // 2. The example from the Frontend Mentor design
  it("matches the design example ($142.55, 15%, 5 people)", () => {
    const result = calculateTip(142.55, 15, 5);

    expect(result.tipAmount).toBeCloseTo(4.2765, 4);
    expect(result.total).toBeCloseTo(32.7865, 4);
  });

  // 3. One person pays everything
  it("works with one person", () => {
    expect(calculateTip(50, 20, 1)).toEqual({ tipAmount: 10, total: 60 });
  });

  // 4. A 0% tip
  it("returns only the bill split when tip is 0", () => {
    expect(calculateTip(100, 0, 4)).toEqual({ tipAmount: 0, total: 25 });
  });

  // 5. Edge cases: invalid number of people
  it("returns zeros when people is 0", () => {
    expect(calculateTip(100, 15, 0)).toEqual({ tipAmount: 0, total: 0 });
  });

  it("returns zeros when people is negative", () => {
    expect(calculateTip(100, 15, -3)).toEqual({ tipAmount: 0, total: 0 });
  });
});
