import { create, createSelectCell, createInputCell } from "../../dom-utils.js";
import { DELETE_PROPERTY_BUTTON } from "../../constants.js";
import { visibilityMap } from "../utils.js";

export function createPropertyRow(typeBox, property) {
  const propertyRowEl = create("div");
  propertyRowEl.className = "tr";

  const options = ["public", "private", "protected"];

  /*
   *  VISIBILITY CELL
   */

  const visibilityCellEl = createSelectCell(property.visibility, options);

  visibilityCellEl.addEventListener("change", (event) => {
    const newValue = event.target.value;

    const propertyVisibilityEl = document.querySelector(
      `#${property.id} .type-box__vis`,
    );

    property.visibility = newValue;

    propertyVisibilityEl.textContent = visibilityMap[newValue];
  });

  propertyRowEl.appendChild(visibilityCellEl);

  /*
   *  NAME CELL
   */

  const nameCellEl = createInputCell(property.name);
  propertyRowEl.appendChild(nameCellEl);

  nameCellEl.addEventListener("input", (event) => {
    const newValue = event.target.value;

    const propertyNameEl = document.querySelector(
      `#${property.id} .type-box__prop-name`,
    );

    property.name = newValue;

    propertyNameEl.textContent = newValue;
  });

  /*
   *  TYPE CELL
   */

  const typeCellEl = createInputCell(property.type);
  propertyRowEl.appendChild(typeCellEl);

  typeCellEl.addEventListener("input", () => {
    const newValue = event.target.value;

    const propertyTypeEl = document.querySelector(
      `#${property.id} .type-box__prop-type`,
    );

    property.type = newValue;

    propertyTypeEl.textContent = newValue;
  });

  /*
   *  DELETE BUTTON
   */

  const deleteCellEl = create("div");
  deleteCellEl.className = "td";
  const deleteButton = create("button");
  deleteButton.className = DELETE_PROPERTY_BUTTON;
  deleteButton.textContent = "delete";
  deleteCellEl.appendChild(deleteButton);

  deleteCellEl.addEventListener("click", () => {
    const deleteIndex = typeBox.properties.findIndex(
      (prop) => prop.id === property.id,
    );
    typeBox.properties.splice(deleteIndex, 1);
    propertyRowEl.remove();
    document.getElementById(property.id).remove();
  });

  propertyRowEl.appendChild(deleteCellEl);

  return propertyRowEl;
}
