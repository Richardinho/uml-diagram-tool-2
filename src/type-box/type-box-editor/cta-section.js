import { create } from "../../dom-utils.js";

export function createCTASection(typeBox, typeBoxEl, editorEl) {
  const el = create("div");
  el.className = "type-box-editor__cta-section";

  const deleteButton = create("button");
  deleteButton.textContent = "delete";

  deleteButton.addEventListener("click", () => {
    delete window.svg.typeBoxes[typeBox.id];
    typeBox.connectors.horizontal.forEach(({ id, nodeIndex }) => {
      const connector = window.svg.connectors[id];

      delete connector.nodes[nodeIndex].typeBox;
    });
    typeBoxEl.parentElement.remove();
    editorEl.remove();
  });

  const addNoteButton = create("button");
  addNoteButton.textContent = "add note";
  addNoteButton.addEventListener("click", () => {
    console.log("add note");
  });

  el.appendChild(deleteButton);
  el.appendChild(addNoteButton);

  return el;
}
