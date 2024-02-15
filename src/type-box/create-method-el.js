import { create, createElement } from "../dom-utils.js";
import { visibilityMap } from "./utils.js";
import { createArgEl } from "./create-arg-el.js";
import {
  TYPE_BOX_METHOD,
  TYPE_BOX_METHOD_VIS,
  TYPE_BOX_METHOD_NAME,
  TYPE_BOX_ARGS,
  TYPE_BOX_METHOD_RETURN_TYPE,
} from "../constants.js";

export function createMethodEl(method) {
  const el = create("div");
  el.className = TYPE_BOX_METHOD;
  el.id = method.id;

  const visEl = createElement(
    "span",
    TYPE_BOX_METHOD_VIS,
    visibilityMap[method.visibility],
  );
  const nameEl = createElement("span", TYPE_BOX_METHOD_NAME, method.name);

  el.appendChild(visEl);
  el.appendChild(nameEl);

  const argsEl = create("span");
  argsEl.className = TYPE_BOX_ARGS;
  el.appendChild(argsEl);

  for (let i = 0; i < method.args.length; i++) {
    const arg = method.args[i];

    argsEl.appendChild(createArgEl(arg));
  }

  const returnTypeEl = createElement(
    "span",
    TYPE_BOX_METHOD_RETURN_TYPE,
    method.returnType,
  );

  el.appendChild(returnTypeEl);

  return el;
}
