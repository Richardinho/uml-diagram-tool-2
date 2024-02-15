import { create, createInputCell } from "../../dom-utils.js";
import { TYPE_BOX_EDITOR_ARG_ROW } from "../../constants.js";

export function createArgRow(typeBox, arg, methodId) {
  const argRowEl = create("div");
  argRowEl.className = `tr ${TYPE_BOX_EDITOR_ARG_ROW}`;

  /*
   *  NAME INPUT
   */

  const nameCellEl = createInputCell(arg.name);
  nameCellEl.addEventListener("input", nameChangeHandler(arg));
  argRowEl.appendChild(nameCellEl);

  /*
   *  TYPE INPUT
   */

  const typeCellEl = createInputCell(arg.type);
  typeCellEl.addEventListener("input", typeChangeHandler(arg));
  argRowEl.appendChild(typeCellEl);

  /*
   *  DELETE BUTTON
   */

  const deleteCellEl = create("div");
  deleteCellEl.className = "td";

  const button = create("button");
  button.textContent = "delete";
  button.className = "delete-arg-button";
  deleteCellEl.appendChild(button);

  button.addEventListener(
    "click",
    deleteButtonHandler(typeBox, arg, argRowEl, methodId),
  );

  argRowEl.appendChild(deleteCellEl);

  return argRowEl;
}

function nameChangeHandler(arg) {
  return (event) => {
    const newValue = event.target.value;

    const argNameEl = document.querySelector(`#${arg.id} .type-box__arg-name`);

    arg.name = newValue;

    argNameEl.textContent = newValue;
  };
}

function typeChangeHandler(arg) {
  return (event) => {
    const newValue = event.target.value;

    const argTypeEl = document.querySelector(`#${arg.id} .type-box__arg-type`);

    arg.type = newValue;

    argTypeEl.textContent = newValue;
  };
}

function deleteButtonHandler(typeBox, arg, argRowEl, methodId) {
  return () => {
    const method = typeBox.methods.find((m) => m.id === methodId);

    const argIndex = method.args.findIndex((arg) => arg.id === arg.id);

    method.args.splice(argIndex, 1);
    argRowEl.remove();
    document.getElementById(arg.id).remove();
  };
}
