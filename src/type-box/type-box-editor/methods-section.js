import { create } from "../../dom-utils.js";
import { createDefaultMethod } from "../default-type-box.js";
import { createMethodEl } from "../create-method-el.js";
import { createMethodRow } from "./method-row.js";
import { createMethodsTable } from "./methods-table.js";

export function createMethodsSection(typeBox, methods, typeBoxEl) {
  const methodsEl = create("div");

  const methodsHeaderSectionEl = create("div");
  methodsHeaderSectionEl.className = "type-box-editor__properties-section";

  /*
   *  HEADER
   */

  const methodsHeaderEl = create("h2");
  methodsHeaderEl.textContent = "methods";
  methodsHeaderSectionEl.appendChild(methodsHeaderEl);

  /*
   *  ADD METHOD BUTTON
   */

  const addMethodButton = create("button");
  addMethodButton.textContent = "add method";
  methodsHeaderSectionEl.appendChild(addMethodButton);

  methodsEl.appendChild(methodsHeaderSectionEl);

  /*
   *  METHODS TABLE
   */

  const methodsTableEl = createMethodsTable(typeBox, methods);
  methodsEl.appendChild(methodsTableEl);

  /*
   *  ADD METHOD HANDLER
   */

  addMethodButton.addEventListener("click", () => {
    const tBodyEl = methodsTableEl.querySelector(".tbody");

    const method = createDefaultMethod();

    /*
     *  MODEL
     */

    typeBox.methods.push(method);

    /*
     *  EDITOR
     */

    const methodRowEl = createMethodRow(typeBox, method);
    tBodyEl.appendChild(methodRowEl);

    /*
     *  TYPEBOX
     */

    const methodContainerEl = typeBoxEl.querySelector(
      ".type-box__method-container",
    );

    methodContainerEl.appendChild(createMethodEl(method));
  });

  return methodsEl;
}
