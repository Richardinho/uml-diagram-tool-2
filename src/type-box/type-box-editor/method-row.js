import { TYPE_BOX_EDITOR_METHOD_ROW } from "../../constants.js";
import { create, createSelectCell, createInputCell } from "../../dom-utils.js";
import { createArgsPanel } from "./args-panel.js";
import { visibilityMap } from "../utils.js";

export function createMethodRow(typeBox, method) {
  const methodRowEl = create("div");
  let showArgs = false;
  methodRowEl.className = `tr ${TYPE_BOX_EDITOR_METHOD_ROW}`;

  const options = ["public", "private", "protected"];

  /*
   *  VISIBILITY CELL
   */

  const visibilityCellEl = createSelectCell(method.visibility, options);

  visibilityCellEl.addEventListener("change", (event) => {
    const newValue = event.target.value;

    const methodVisibilityEl = document.querySelector(
      `#${method.id} .type-box__vis`,
    );

    method.visibility = newValue;

    methodVisibilityEl.textContent = visibilityMap[newValue];
  });

  methodRowEl.appendChild(visibilityCellEl);

  /*
   *  NAME CELL
   */

  const nameCellEl = createInputCell(method.name);
  methodRowEl.appendChild(nameCellEl);

  nameCellEl.addEventListener("input", (event) => {
    const newValue = event.target.value;

    const methodNameEl = document.querySelector(
      `#${method.id} .type-box__method-name`,
    );

    method.name = newValue;

    methodNameEl.textContent = newValue;
  });

  /*
   *  RETURN TYPE CELL
   */

  const returnTypeCellEl = createInputCell(method.returnType);
  methodRowEl.appendChild(returnTypeCellEl);

  returnTypeCellEl.addEventListener("input", (event) => {
    const newValue = event.target.value;

    const methodReturnTypeEl = document.querySelector(
      `#${method.id} .type-box__method-return-type`,
    );

    method.returnType = newValue;

    methodReturnTypeEl.textContent = newValue;
  });

  /*
   *  ARGS PANEL
   */

  const createArgsCellEl = create("div");
  createArgsCellEl.className = "td";

  const createArgsButton = create("button");
  createArgsButton.textContent = "args";
  createArgsButton.className = "create-args-button";
  createArgsCellEl.appendChild(createArgsButton);

  let argsPanelEl;
  createArgsButton.addEventListener("click", () => {
    if (!showArgs) {
      argsPanelEl = createArgsPanel(typeBox, method.args, method.id);

      methodRowEl.after(argsPanelEl);
      showArgs = true;
    } else {
      methodRowEl.nextElementSibling.remove();
      showArgs = false;
    }
  });

  methodRowEl.appendChild(createArgsCellEl);

  /*
   *  DELETE BUTTON
   */

  const deleteCellEl = create("div");
  deleteCellEl.className = "td";
  const deleteButton = create("button");
  deleteButton.textContent = "delete";
  deleteButton.className = "delete-method-button";
  deleteCellEl.appendChild(deleteButton);

  deleteCellEl.addEventListener("click", () => {
    const deleteIndex = typeBox.methods.findIndex(
      (meth) => meth.id === method.id,
    );

    typeBox.methods.splice(deleteIndex, 1);
    methodRowEl.remove();

    if (argsPanelEl) {
      argsPanelEl.remove();
    }

    document.getElementById(method.id).remove();
  });

  methodRowEl.appendChild(deleteCellEl);

  return methodRowEl;
}
