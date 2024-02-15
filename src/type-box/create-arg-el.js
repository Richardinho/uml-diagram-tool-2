import { create, createElement } from "../dom-utils.js";
import {
  TYPE_BOX_ARG,
  TYPE_BOX_ARG_NAME,
  TYPE_BOX_ARG_TYPE,
} from "../constants.js";

export function createArgEl(arg) {
  const argEl = create("span");
  argEl.id = arg.id;
  argEl.className = TYPE_BOX_ARG;

  const nameEl = createElement("span", TYPE_BOX_ARG_NAME, arg.name);
  const typeEl = createElement("span", TYPE_BOX_ARG_TYPE, arg.type);

  argEl.appendChild(nameEl);
  argEl.appendChild(typeEl);

  return argEl;
}
