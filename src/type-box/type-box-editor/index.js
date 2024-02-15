import { create } from "../../dom-utils.js";
import { createCTASection } from "./cta-section.js";
import { createTopSection } from "./top-section.js";
import { createPropertiesSection } from "./properties-section.js";
import { createMethodsSection } from "./methods-section.js";
import { TYPE_BOX_EDITOR } from "../../constants.js";

export function showTypeBoxEditor(typeBox, typeBoxEl) {
  let propertiesTableBodyEl;

  const el = create("div");

  el.className = TYPE_BOX_EDITOR;

  /*
   *  TOP SECTION
   */

  const topSectionEl = createTopSection(typeBox.name, typeBoxEl, typeBox);
  el.appendChild(topSectionEl);

  /*
   *  PROPERTIES SECTION
   */

  const propertiesEl = createPropertiesSection(
    typeBox,
    typeBox.properties,
    typeBoxEl,
  );

  propertiesEl.className = "type-box-editor__properties";
  el.appendChild(propertiesEl);

  /*
   *  METHODS SECTION
   */

  const methodsEl = createMethodsSection(typeBox, typeBox.methods, typeBoxEl);
  methodsEl.className = "type-box-editor__methods";
  el.appendChild(methodsEl);

  /*
   *  CTA SECTION
   */

  const ctaSectionEl = createCTASection(typeBox, typeBoxEl, el);
  el.appendChild(ctaSectionEl);

  /*
   *  attach editor to palette
   */

  const paletteContainerEl = document.querySelector(
    "#palette .palette__container",
  );

  paletteContainerEl.appendChild(el);

  return el;
}
