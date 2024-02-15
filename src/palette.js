import { create } from "./dom-utils.js";
import {
  PALETTE,
  PALETTE_OPEN_BUTTON,
  PALETTE_CLOSE_BUTTON,
  PALETTE_HEADER,
} from "./constants.js";

export function createPalette() {
  const paletteEl = document.getElementById("palette");
  paletteEl.className = PALETTE;

  const containerEl = create("div");
  containerEl.className = "palette__container";

  const paletteHeaderEl = create("div");
  paletteHeaderEl.className = PALETTE_HEADER;

  /*
   *  OPEN BUTTON
   */

  const openButton = create("button");
  openButton.textContent = "open";
  openButton.className = PALETTE_OPEN_BUTTON;
  paletteHeaderEl.appendChild(openButton);
  openButton.addEventListener("click", (event) => {
    paletteEl.classList.add("open");
  });

  /*
   *  CLOSE BUTTON
   */

  const closeButton = create("button");
  closeButton.textContent = "close";
  closeButton.className = PALETTE_CLOSE_BUTTON;
  paletteHeaderEl.appendChild(closeButton);
  closeButton.addEventListener("click", (event) => {
    paletteEl.classList.remove("open");
  });

  paletteEl.appendChild(paletteHeaderEl);

  paletteEl.appendChild(containerEl);
}
