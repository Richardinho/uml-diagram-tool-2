export function create(el) {
  return document.createElement(el);
}

export function createElement(element, className, text) {
  const el = create(element);
  el.className = className;
  el.textContent = text;
  return el;
}

export function createSelect(value, options) {
  const selectEl = create("select");

  for (let i = 0; i < options.length; i++) {
    const option = create("option");
    option.textContent = options[i];

    if (options[i] === value) {
      option.selected = true;
    }

    selectEl.appendChild(option);
  }

  return selectEl;
}

export function createSelectCell(value, options) {
  const el = create("div");
  el.className = "td";

  const selectEl = createSelect(value, options);
  el.appendChild(selectEl);

  return el;
}

export function createInputCell(value) {
  const el = create("div");
  el.className = "td";
  const input = create("input");
  input.value = value;
  el.appendChild(input);
  return el;
}
