import { createId } from "../utils.js";
import {
  NO_ARROW,
  WHITE_ARROW,
  BLACK_ARROW,
  WHITE_DIAMOND,
  BLACK_DIAMOND,
} from "../constants.js";
import { createSVG, drawLine, updateLinePosition } from "../svg-utils.js";

export function createVerticalConnector(svgEl) {
  const nodeEls = [];
  const lineEls = [];
  const arrowEls = [];

  const nodes = createDefaultVerticalNodes();

  const connectorId = createId();

  const connector = {
    id: connectorId,
    nodes,
    nodeEls,
    lineEls,
    arrowEls,
    selected: false,
  };

  window.svg.connectors[connectorId] = connector;

  const connectorGroupEl = createSVG("g");
  connectorGroupEl.setAttribute("class", "connector");
  svgEl.appendChild(connectorGroupEl);

  // draw lines first so nodes sit on top
  const line1 = drawLine(nodes[0], nodes[1]);
  const line2 = drawLine(nodes[1], nodes[2]);
  const line3 = drawLine(nodes[2], nodes[3]);

  lineEls.push(line1);
  lineEls.push(line2);
  lineEls.push(line3);

  connectorGroupEl.appendChild(line1);
  connectorGroupEl.appendChild(line2);
  connectorGroupEl.appendChild(line3);

  nodes.forEach((node, index) => {
    const circle = createSVG("circle");
    nodeEls[index] = circle;

    circle.setAttribute("cx", node.x);
    circle.setAttribute("cy", node.y);
    circle.setAttribute("r", 15);
    circle.setAttribute("fill", "transparent");

    circle.addEventListener("pointerover", () => {
      if (!node.typeBox) {
        circle.setAttribute("fill", "rgba(200, 200, 200, 0.5)");
      }
    });

    circle.addEventListener('pointerdown', (event) => {
      event.stopPropagation();
    });

    circle.addEventListener("pointerout", () => {
      circle.setAttribute("fill", "transparent");
    });

    circle.addEventListener("click", (event) => {
      console.log('SECULAR TALK');
    });

    nodeEls.forEach((nodeEl) => connectorGroupEl.appendChild(nodeEl));
  });
}

function createDefaultVerticalNodes() {
  return [
    { x: 200, y: 200, arrowType: NO_ARROW },
    { x: 200, y: 400 },
    { x: 300, y: 400 },
    { x: 300, y: 500, arrowType: WHITE_ARROW },
  ];
}
