import { createId } from "../utils.js";

export function createDefaultProperty() {
  return {
    id: createId(),
    visibility: "private",
    name: "defaultProp",
    type: "String",
  };
}

export function createDefaultArg() {
  return {
    id: createId(),
    name: "arg1",
    type: "string",
  };
}

export function createDefaultMethod() {
  return {
    id: createId(),
    visibility: "public",
    name: "foo",
    returnType: "number",
    args: [createDefaultArg(), createDefaultArg()],
  };
}

export function createDefaultTypeBox(id) {
  return {
    id,
    type: "class",
    name: "foobar",
    properties: [createDefaultProperty(), createDefaultProperty()],
    methods: [createDefaultMethod()],
    x: 300,
    y: 300,
    width: 100,
    height: 100,
    connectors: {
      horizontal: [],
      vertical: [],
    },
  };
}
