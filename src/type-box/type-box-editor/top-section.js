import { create, createSelect } from "../../dom-utils.js";
import {
  TYPE_BOX_EDITOR_TOP_SECTION,
  TYPE_BOX_EDITOR_INPUT_CONTAINER,
} from "../../constants.js";

export function createTopSection(name, typeBoxEl, typeBox) {
  const topSectionEl = create("div");
  topSectionEl.className = TYPE_BOX_EDITOR_TOP_SECTION;

  /*
   *  NAME INPUT
   */

  const nameInputContainer = create("div");

  nameInputContainer.className = TYPE_BOX_EDITOR_INPUT_CONTAINER;

  const nameLabelEl = create("label");
  nameLabelEl.textContent = "name";
  nameLabelEl.setAttribute("for", "type-box-name-input");

  const nameInputEl = create("input");
  nameInputEl.value = name;
  nameInputEl.id = "type-box-name-input";

  nameInputEl.addEventListener("input", (event) => {
    const newName = event.target.value;
    typeBoxEl.querySelector(".type-box__title-container").textContent = newName;
    typeBox.name = newName;
  });

  nameInputContainer.appendChild(nameLabelEl);
  nameInputContainer.appendChild(nameInputEl);
  topSectionEl.appendChild(nameInputContainer);

  /*
   *  FLAVOR INPUT
   */

  const flavorInputContainer = create("div");
  flavorInputContainer.className = TYPE_BOX_EDITOR_INPUT_CONTAINER;

  const flavorLabelEl = create("label");
  flavorLabelEl.textContent = "flavor";
  flavorLabelEl.setAttribute("for", "type-box-flavor-input");
  const flavorInputEl = createSelect("", ["class", "interface", "abstract"]);

  flavorInputEl.addEventListener("change", (event) => {
    console.log(event.target.value);
  });

  flavorInputContainer.appendChild(flavorLabelEl);
  flavorInputContainer.appendChild(flavorInputEl);
  topSectionEl.appendChild(flavorInputContainer);

  return topSectionEl;
}
