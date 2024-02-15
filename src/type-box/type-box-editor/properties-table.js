import { create } from "../../dom-utils.js";
import { createPropertyRow } from "./property-row.js";
import { TYPE_BOX_EDITOR_PROPERTY_ROW } from "../../constants.js";

export function createPropertiesTable(typeBox, propertiesData) {
  const propertiesTableEl = create("div");
  propertiesTableEl.className = "table";

  const propertiesTableHeader = create("div");
  propertiesTableHeader.className = "thead";

  const propertiesTableHeaderRow = create("div");
  propertiesTableHeaderRow.className = `tr ${TYPE_BOX_EDITOR_PROPERTY_ROW}`;

  propertiesTableHeader.appendChild(propertiesTableHeaderRow);
  propertiesTableEl.appendChild(propertiesTableHeader);

  const headers = ["visibility", "name", "type", ""];

  for (let i = 0; i < headers.length; i++) {
    const cellEl = create("div");
    cellEl.className = "th";
    cellEl.textContent = headers[i];
    propertiesTableHeaderRow.appendChild(cellEl);
  }

  const propertiesTableBodyEl = create("div");
  propertiesTableBodyEl.className = "tbody";

  for (let i = 0; i < propertiesData.length; i++) {
    const property = propertiesData[i];

    const propertyRowEl = createPropertyRow(typeBox, property);
    propertiesTableBodyEl.appendChild(propertyRowEl);
  }

  propertiesTableEl.appendChild(propertiesTableBodyEl);

  return propertiesTableEl;
}
