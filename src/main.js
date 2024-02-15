import { createMenu } from "./menu.js";
import { createConnector } from "./connector/index.js";
import { createVerticalConnector } from './vertical-connector/index.js';
import { createTypeBox } from "./type-box/index.js";
import { createPalette } from "./palette.js";
import { exportDiagram } from "./export.js";
import { makeMovable } from "./movable.js";
import { toCanvas } from "./to-canvas.js";

const svg = {
  x: 0,
  y: 0,
  width: 1500,
  height: 1500,
  zoom: 1,
  activeNode: null,
  connectors: {},
  typeBoxes: {},
  editorSections: {},
};

window.svg = svg;

const maxZoom = 1.5;
const minZoom = 0.5;

const svgEl = setUpSVG();

createZoomControl();
createMenu(handleCommand);
createPalette();

function handleCommand(command) {
  switch (command) {
    case "create-type-box":
      createTypeBox(svgEl);
      break;
    case "create-horizontal-connector":
      createConnector(svgEl);
      break;
    case "export":
      exportDiagram();
      break;
    case "create-vertical-connector":
      createVerticalConnector(svgEl);
      break;
    case "delete-diagram":

    default:
      throw new Error("command not supported");
  }
}

function setUpSVG() {
  const el = document.getElementById("svg");
  el.setAttribute("width", svg.width);
  el.setAttribute("height", svg.height);
  el.setAttribute("viewBox", `0 0 ${svg.width} ${svg.height}`);

  makeMovable(el, (xMovement, yMovement) => {
    svg.x = svg.x + xMovement;
    svg.y = svg.y + yMovement;
    el.setAttribute("transform", calculateSVGElTransform(svg));
  });

  return el;
}

function createZoomControl() {
  const zoomContainer = document.getElementById("zoom-container");
  const zoomEl = document.createElement("input");
  zoomEl.setAttribute("type", "range");
  zoomEl.setAttribute("min", minZoom);
  zoomEl.setAttribute("max", maxZoom);
  zoomEl.setAttribute("step", "any");
  zoomEl.value = svg.zoom;

  const labelEl = document.createElement("label");
  labelEl.textContent = "zoom";
  labelEl.className = "zoom-label";

  zoomContainer.appendChild(labelEl);
  zoomContainer.appendChild(zoomEl);

  zoomEl.addEventListener("input", (event) => {
    svg.zoom = parseFloat(event.target.value);
    svgEl.setAttribute("transform", calculateSVGElTransform(svg));
  });
}

function calculateSVGElTransform(svg) {
  return [`translate(${svg.x}, ${svg.y})`, `scale(${svg.zoom})`].join(" ");
}
