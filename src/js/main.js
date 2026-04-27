import "@styles/main.css";

import { initEvents } from './events.js';
import { initDOM } from "./utils/dom.js";

document.addEventListener('DOMContentLoaded', () => {
  initDOM();
  initEvents();
});