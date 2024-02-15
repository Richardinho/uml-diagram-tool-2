import { createSelect } from "../src/dom-utils.js";

describe("createSelect()", () => {
  it("should construct select dropdown element with options", () => {
    const el = createSelect("banana", ["apple", "banana", "carrot"]);

    expect(el.value).toBe("banana");

    const options = el.querySelectorAll("option");

    expect(options.length).toBe(3);
    expect(options[0].textContent).toBe("apple");
    expect(options[1].textContent).toBe("banana");
    expect(options[2].textContent).toBe("carrot");
  });
});


