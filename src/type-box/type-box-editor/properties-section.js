import { create } from "../../dom-utils.js";
import { createDefaultProperty } from "../default-type-box.js";
import { createPropertiesTable } from "./properties-table.js";
import { createPropertyEl } from "../create-property-el.js";
import { createPropertyRow } from "./property-row.js";

export function createPropertiesSection(typeBox, properties, typeBoxEl) {
  const propertiesEl = create("div");

  const propertiesHeaderSectionEl = create("div");
  propertiesHeaderSectionEl.className = "type-box-editor__properties-section";

  /*
   *  HEADER
   */

  const propertiesHeaderEl = create("h2");
  propertiesHeaderEl.textContent = "properties";
  propertiesHeaderSectionEl.appendChild(propertiesHeaderEl);

  /*
   *  ADD PROPERTY BUTTON
   */

  const addPropertyButton = create("button");
  addPropertyButton.textContent = "add property";
  propertiesHeaderSectionEl.appendChild(addPropertyButton);

  propertiesEl.appendChild(propertiesHeaderSectionEl);

  /*
   *  PROPERTIES TABLE
   */

  const propertiesTableEl = createPropertiesTable(typeBox, properties);
  propertiesEl.appendChild(propertiesTableEl);

  /*
   *  ADD PROPERTY HANDLER
   */

  addPropertyButton.addEventListener("click", () => {
    const tBodyEl = propertiesTableEl.querySelector(".tbody");

    const property = createDefaultProperty();

    /*
     *  MODEL
     */

    typeBox.properties.push(property);

    /*
     *  EDITOR
     */

    const propertyRowEl = createPropertyRow(typeBox, property);
    tBodyEl.appendChild(propertyRowEl);

    /*
     *  TYPEBOX
     */

    const propContainerEl = typeBoxEl.querySelector(
      ".type-box__prop-container",
    );

    propContainerEl.appendChild(createPropertyEl(property));
  });

  return propertiesEl;
}
