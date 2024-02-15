import { createElement } from "../dom-utils.js";
import { visibilityMap } from "./utils.js";
import {
  TYPE_BOX_PROP,
  TYPE_BOX_PROP_NAME,
  TYPE_BOX_PROP_TYPE,
  TYPE_BOX_PROP_VIS,
} from "../constants.js";

export function createPropertyEl(property) {
  const el = document.createElement("div");
  el.className = TYPE_BOX_PROP;
  el.id = property.id;

  const visEl = createElement(
    "span",
    TYPE_BOX_PROP_VIS,
    visibilityMap[property.visibility],
  );
  const nameEl = createElement("span", TYPE_BOX_PROP_NAME, property.name);
  const typeEl = createElement("span", TYPE_BOX_PROP_TYPE, property.type);

  el.appendChild(visEl);
  el.appendChild(nameEl);
  el.appendChild(typeEl);

  return el;
}
