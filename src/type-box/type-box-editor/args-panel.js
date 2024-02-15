import { create } from "../../dom-utils.js";
import { createArgRow } from "./arg-row.js";
import { createDefaultArg } from "../default-type-box.js";
import { createArgEl } from "../create-arg-el.js";
import { TYPE_BOX_EDITOR_ARGS_SECTION } from "../../constants.js";

export function createArgsPanel(typeBox, argsData, methodId) {
  const el = create("div");
  el.className = "args-panel";

  const argsHeaderSectionEl = create("div");
  argsHeaderSectionEl.className = TYPE_BOX_EDITOR_ARGS_SECTION;
  const argsHeaderEl = create("h3");
  argsHeaderEl.textContent = "args";
  argsHeaderSectionEl.appendChild(argsHeaderEl);

  const addArgButton = create("button");
  addArgButton.textContent = "add arg";
  argsHeaderSectionEl.appendChild(addArgButton);

  el.appendChild(argsHeaderSectionEl);

  const argsTableEl = create("div");
  argsTableEl.className = "table";
  el.appendChild(argsTableEl);

  const argsTableHeader = create("div");
  argsTableHeader.className = "thead";
  argsTableEl.appendChild(argsTableHeader);

  const argsTableHeaderRow = create("div");
  argsTableHeaderRow.className = "tr";
  argsTableHeader.appendChild(argsTableHeaderRow);

  const headers = ["name", "type", ""];

  for (let i = 0; i < headers.length; i++) {
    const cellEl = create("div");
    cellEl.className = "th";
    cellEl.textContent = headers[i];
    argsTableHeaderRow.appendChild(cellEl);
  }

  const argsTableBodyEl = create("div");
  argsTableBodyEl.className = "tbody";

  for (let i = 0; i < argsData.length; i++) {
    const arg = argsData[i];
    const argsRowEl = createArgRow(typeBox, arg, methodId);
    argsTableBodyEl.appendChild(argsRowEl);
  }

  argsTableEl.appendChild(argsTableBodyEl);

  addArgButton.addEventListener("click", (event) => {
    const tBodyEl = argsTableEl.querySelector(".tbody");

    const arg = createDefaultArg();

    /*
     *  add arg to model
     */

    argsData.push(arg);

    /*
     *  add row to editor
     */

    const argRowEl = createArgRow(typeBox, arg, methodId);
    tBodyEl.appendChild(argRowEl);

    /*
     *  add row to type box
     */

    const argEl = createArgEl(arg);
    document.querySelector(`#${methodId} .type-box__args`).appendChild(argEl);
  });

  return el;
}
