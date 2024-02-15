import { SVG_NAME_SPACE, XHTML_NAME_SPACE } from "../constants.js";

import { makeMovable } from "../movable.js";
import { createId } from "../utils.js";

import { createMethodEl } from "./create-method-el.js";
import { createPropertyEl } from "./create-property-el.js";

import { showTypeBoxEditor } from "./type-box-editor/index.js";
import { createDefaultTypeBox } from "./default-type-box.js";
import { create, createElement } from "../dom-utils.js";
import { createSVG } from "../svg-utils.js";
import { TYPE_BOX_EDITOR } from "../constants.js";
import { repositionEndpoint } from "../connector/endpoint.js";
import { updateConnectors } from "./update-connectors.js";

export function createTypeBox(svgEl) {
  const typeBoxId = createId();

  const typeBox = createDefaultTypeBox();
  typeBox.id = typeBoxId;

  window.svg.typeBoxes[typeBoxId] = typeBox;

  const typeBoxGroupEl = createSVG("g");

  svgEl.appendChild(typeBoxGroupEl);

  const typeBoxEl = create("div");
  typeBoxEl.setAttribute("xmlns", XHTML_NAME_SPACE);
  typeBoxEl.className = "type-box";

  const styleEl = create("style");
  typeBoxEl.appendChild(styleEl);
  styleEl.innerHTML = `
    .type-box {
      background: #ffffce;
      border: solid 1px black;
      font-family: courier;
      display: inline-block;
      white-space: nowrap;
    }
    
    .type-box.selected {
      background: antiquewhite;
    }

    .type-box__title-container {
      padding: 10px;
    }

    .type-box__prop-container,
    .type-box__method-container {
      padding: 10px;
      border-top: solid 1px black;
      font-size: 14px;
      line-height: 20px;
    }

    .type-box__prop,
    .type-box__method {
      display: flex;
    }

    .type-box__vis {
      margin-right: 2px;
    }

    .type-box__prop-name::after {
      content: ":";
      margin-right: 2px;
    }

    .type-box__prop-type {
    }

    .type-box__method-return-type:before {
      content: ":";
    }

    .type-box__args {
    }

    .type-box__args:before {
      content: "(";
    }

    .type-box__args:after {
      content: ")";
    }

    .type-box__arg-name:after {
      content: ":";
    }

    .type-box__arg-type:after {
      content: ";";
    }

    .type-box__arg:last-child .type-box__arg-type:after {
      content: none;
    }


  `;

  const titleContainerEl = createElement(
    "div",
    "type-box__title-container",
    typeBox.name,
  );
  typeBoxEl.appendChild(titleContainerEl);

  const propertiesContainerEl = create("div");
  propertiesContainerEl.className = "type-box__prop-container";

  typeBox.properties.forEach((property) => {
    const propertyEl = createPropertyEl(property);
    propertiesContainerEl.appendChild(propertyEl);
  });

  typeBoxEl.appendChild(propertiesContainerEl);

  const methodsContainerEl = document.createElement("div");
  methodsContainerEl.className = "type-box__method-container";

  typeBox.methods.forEach((method) => {
    const methodEl = createMethodEl(method);
    methodsContainerEl.appendChild(methodEl);
  });

  typeBoxEl.appendChild(methodsContainerEl);

  const [width, height] = calculateDimensions(typeBoxEl);

  typeBox.width = width;
  typeBox.height = height;

  const foreignObjectEl = createForeignObject(
    typeBox.x,
    typeBox.y,
    width,
    height,
  );

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const height = typeBoxEl.getBoundingClientRect().height;
      const width = typeBoxEl.getBoundingClientRect().width;
      typeBox.height = height;
      typeBox.width = width;

      foreignObjectEl.setAttribute("height", height);
      foreignObjectEl.setAttribute("width", width);

      updateConnectors(typeBox, 0);
    }
  });

  observer.observe(typeBoxEl);

  typeBoxEl.addEventListener("click", () => {
    if (window.svg.activeNode) {
      const [connectorId, nodeIndex] = window.svg.activeNode;

      typeBox.connectors.horizontal.push({
        id: connectorId,
        nodeIndex,
      });

      const { nodes, nodeEls, lineEls, arrowEls } =
        window.svg.connectors[connectorId];

      const activeNode = nodes[nodeIndex];
      let proximalNode;

      activeNode.typeBox = typeBoxId;

      let x = typeBox.x;

      if (activeNode.x > typeBox.x) {
        x = typeBox.x + typeBox.width;
      }

      const y = typeBox.y + typeBox.height / 2;

      activeNode.x = x;
      activeNode.y = y;

      const activeNodeEl = nodeEls[nodeIndex];

      let proximalNodeEl;
      let line1, line2;

      if (nodeIndex === 0) {
        proximalNode = nodes[1];
        proximalNodeEl = nodeEls[1];
        proximalNode.y = y;

        lineEls[0].setAttribute("x1", nodes[0].x);
        lineEls[0].setAttribute("y1", nodes[0].y);
        lineEls[0].setAttribute("x2", nodes[1].x);
        lineEls[0].setAttribute("y2", nodes[1].y);

        lineEls[1].setAttribute("x1", nodes[1].x);
        lineEls[1].setAttribute("y1", nodes[1].y);
        lineEls[1].setAttribute("x2", nodes[2].x);
        lineEls[1].setAttribute("y2", nodes[2].y);
      }

      if (nodeIndex === 3) {
        proximalNode = nodes[2];
        proximalNodeEl = nodeEls[2];
        proximalNode.y = y;

        lineEls[2].setAttribute("x1", nodes[2].x);
        lineEls[2].setAttribute("y1", nodes[2].y);
        lineEls[2].setAttribute("x2", nodes[3].x);
        lineEls[2].setAttribute("y2", nodes[3].y);

        lineEls[1].setAttribute("x1", nodes[1].x);
        lineEls[1].setAttribute("y1", nodes[1].y);
        lineEls[1].setAttribute("x2", nodes[2].x);
        lineEls[1].setAttribute("y2", nodes[2].y);
      }

      repositionEndpoint(arrowEls, nodeIndex, nodes);

      activeNodeEl.setAttribute("cx", activeNode.x);
      activeNodeEl.setAttribute("cy", activeNode.y);
      proximalNodeEl.setAttribute("cy", proximalNode.y);

      window.svg.activeNode = null;
    }
  });

  const editorEl = showTypeBoxEditor(typeBox, typeBoxEl);

  typeBoxEl.addEventListener("pointerdown", () => {
    if (typeBoxEl.classList.contains("selected")) {
      typeBoxEl.classList.remove("selected");
      editorEl.classList.remove("selected");
    } else {
      const editorEls = document.querySelectorAll(`.${TYPE_BOX_EDITOR}`);
      const typeBoxEls = document.querySelectorAll(".type-box");

      for (const editorEl of editorEls) {
        editorEl.classList.remove("selected");
      }

      for (const typeBoxEl of typeBoxEls) {
        typeBoxEl.classList.remove("selected");
      }

      editorEl.classList.add("selected");
      typeBoxEl.classList.add("selected");
    }
  });

  typeBoxGroupEl.appendChild(foreignObjectEl);
  foreignObjectEl.appendChild(typeBoxEl);

  function positionStrategy(xMovement, yMovement) {
    typeBox.x = typeBox.x + xMovement;
    typeBox.y = typeBox.y + yMovement;

    foreignObjectEl.setAttribute("x", typeBox.x);
    foreignObjectEl.setAttribute("y", typeBox.y);

    updateConnectors(typeBox, yMovement);
  }

  makeMovable(typeBoxEl, positionStrategy);
}

function createForeignObject(x, y, width, height) {
  const el = document.createElementNS(SVG_NAME_SPACE, "foreignObject");

  el.setAttribute("x", x);
  el.setAttribute("y", y);
  el.setAttribute("width", width);
  el.setAttribute("height", height);
  el.setAttribute("class", "foreign-object");

  return el;
}

function calculateDimensions(el) {
  const testGround = document.getElementById("test-ground");
  testGround.appendChild(el);

  const rect = el.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;

  return [width, height];
}
