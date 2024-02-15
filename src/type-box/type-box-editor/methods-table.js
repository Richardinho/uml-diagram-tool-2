import { create } from "../../dom-utils.js";
import { createMethodRow } from "./method-row.js";
import { TYPE_BOX_EDITOR_METHOD_ROW } from "../../constants.js";

export function createMethodsTable(typeBox, methodsData) {
  const methodsTableEl = create("div");
  methodsTableEl.className = "table";

  const methodsTableHeader = create("div");
  methodsTableHeader.className = "thead";

  const methodsTableHeaderRow = create("div");
  methodsTableHeaderRow.className = `tr ${TYPE_BOX_EDITOR_METHOD_ROW}`

  methodsTableHeader.appendChild(methodsTableHeaderRow);
  methodsTableEl.appendChild(methodsTableHeader);

  const headers = ["visibility", "name", "return type", "", ""];

  for (let i = 0; i < headers.length; i++) {
    const cellEl = create("div");
    cellEl.className = "th";
    cellEl.textContent = headers[i];
    methodsTableHeaderRow.appendChild(cellEl);
  }

  const methodsTableBodyEl = create("div");
  methodsTableBodyEl.className = "tbody";

  for (let i = 0; i < methodsData.length; i++) {
    const method = methodsData[i];

    const methodRowEl = createMethodRow(typeBox, method);
    methodsTableBodyEl.appendChild(methodRowEl);
  }

  methodsTableEl.appendChild(methodsTableBodyEl);

  return methodsTableEl;
}
