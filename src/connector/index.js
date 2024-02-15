import { makeMovable } from "../movable.js";
import { createId } from "../utils.js";
import { calculateXCoords } from "./x-coords.js";
import { calculateYCoords } from "./y-coords.js";
import {
  createArrow,
  calculateOrientation,
  repositionEndpoint,
  changeArrow,
} from "./endpoint.js";
import {
  NO_ARROW,
  WHITE_ARROW,
  BLACK_ARROW,
  WHITE_DIAMOND,
  BLACK_DIAMOND,
} from "../constants.js";
import { createSVG, drawLine, updateLinePosition } from "../svg-utils.js";

export function createConnector(svgEl) {
  const nodeEls = [];
  const lineEls = [];
  const arrowEls = [];

  const nodes = createDefaultNodes();

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

    circle.addEventListener("pointerout", () => {
      circle.setAttribute("fill", "transparent");
    });

    circle.addEventListener("click", (event) => {
      console.log('ON VERTICAL CONNECTOR NODE CLICK');
      if (event.shiftKey && event.altKey) {
        if (index === 0 || index === 3) {
          if (node.arrowType === NO_ARROW) {
            node.arrowType = WHITE_ARROW;
          } else if (node.arrowType === WHITE_ARROW) {
            node.arrowType = BLACK_ARROW;
          } else if (node.arrowType === BLACK_ARROW) {
            node.arrowType = WHITE_DIAMOND;
          } else if (node.arrowType === WHITE_DIAMOND) {
            node.arrowType = BLACK_DIAMOND;
          } else if (node.arrowType === BLACK_DIAMOND) {
            node.arrowType = NO_ARROW;
          }

          changeArrow(
            node,
            arrowEls[index],
            calculateOrientation(nodes, index),
          );
        }
      }
    });

    circle.addEventListener("click", (event) => {
      // double click?
      if (event.detail === 2) {
        if (connector.selected) {
          connector.selected = false;
          connectorGroupEl.setAttribute("class", "connector");
        } else {
          connector.selected = true;
          connectorGroupEl.setAttribute("class", "connector selected");
          // register once handler on window for delete button
          document.body.addEventListener(
            "keyup",
            (event) => {
              if (event.key === "Backspace") {
                const typeBoxes = connector.nodes.reduce((memo, node) => {
                  if (node.typeBox) {
                    return [...memo, node.typeBox];
                  }
                  return memo;
                }, []);

                typeBoxes.forEach((typeBoxId) => {
                  const typeBox = window.svg.typeBoxes[typeBoxId];
                  const index = typeBox.connectors.horizontal.findIndex(
                    (c) => c.id === connector.id,
                  );
                  typeBox.connectors.horizontal.splice(index, 1);
                });

                delete window.svg.connectors[connector.id];

                connectorGroupEl.remove();
              }
            },
            {
              once: true,
            },
          );
        }
      }
    });

    if (index === 0 || index == 3) {
      arrowEls[index] = createArrow(node, calculateOrientation(nodes, index));

      circle.addEventListener("click", (event) => {
        if (event.shiftKey) {
          if (!node.typeBox) {
            window.svg.activeNode = [connectorId, index];
          } else {
            const typeBox = window.svg.typeBoxes[node.typeBox];
            const thisConnectorIndex = typeBox.connectors.horizontal.findIndex(
              (connector) =>
              connector.id === connectorId && connector.nodeIndex === index,
            );

            typeBox.connectors.horizontal.splice(thisConnectorIndex, 1);

            node.typeBox = null;
          }
        } else {
        }
      });
    }

    function positionStrategy(xMovement, yMovement) {
      calculateXCoords(index, xMovement, nodes);
      calculateYCoords(index, yMovement, nodes);

      repositionEndpoint(arrowEls, index, nodes);
      repositionNodes(index);
      repositionLines(index);
    }

    function disable() {
      return node.typeBox;
    }

    makeMovable(circle, positionStrategy, disable);
  });

  arrowEls.forEach((arrowEl) => connectorGroupEl.appendChild(arrowEl));
  nodeEls.forEach((nodeEl) => connectorGroupEl.appendChild(nodeEl));

  function repositionLines(nodeIndex) {
    switch (nodeIndex) {
      case 0:
        updateLinePosition(lineEls[0], nodes[0], nodes[1]);
        updateLinePosition(lineEls[1], nodes[1], nodes[2]);
        break;
      case 1:
        updateLinePosition(lineEls[0], nodes[0], nodes[1]);
        updateLinePosition(lineEls[1], nodes[1], nodes[2]);
        updateLinePosition(lineEls[2], nodes[2], nodes[3]);
        break;
      case 2:
        updateLinePosition(lineEls[0], nodes[0], nodes[1]);
        updateLinePosition(lineEls[1], nodes[1], nodes[2]);
        updateLinePosition(lineEls[2], nodes[2], nodes[3]);
        break;
      case 3:
        updateLinePosition(lineEls[1], nodes[1], nodes[2]);
        updateLinePosition(lineEls[2], nodes[2], nodes[3]);
        break;
    }
  }

  function repositionNodes(nodeIndex) {
    switch (nodeIndex) {
      case 0:
        nodeEls[0].setAttribute("cx", nodes[0].x);
        nodeEls[0].setAttribute("cy", nodes[0].y);
        nodeEls[1].setAttribute("cy", nodes[1].y);
        break;
      case 1:
        nodeEls[0].setAttribute("cx", nodes[0].x);
        nodeEls[0].setAttribute("cy", nodes[0].y);
        nodeEls[1].setAttribute("cx", nodes[1].x);
        nodeEls[1].setAttribute("cy", nodes[1].y);
        nodeEls[2].setAttribute("cx", nodes[2].x);
        nodeEls[3].setAttribute("cx", nodes[3].x);
        break;
      case 2:
        nodeEls[0].setAttribute("cx", nodes[0].x);
        nodeEls[1].setAttribute("cx", nodes[1].x);
        nodeEls[2].setAttribute("cx", nodes[2].x);
        nodeEls[2].setAttribute("cy", nodes[2].y);
        nodeEls[3].setAttribute("cx", nodes[3].x);
        nodeEls[3].setAttribute("cy", nodes[3].y);
        break;
      case 3:
        nodeEls[2].setAttribute("cy", nodes[2].y);
        nodeEls[3].setAttribute("cx", nodes[3].x);
        nodeEls[3].setAttribute("cy", nodes[3].y);
        break;
    }
  }
}

function createDefaultNodes() {
  return [
    { x: 100, y: 100, arrowType: NO_ARROW },
    { x: 200, y: 100 },
    { x: 200, y: 200 },
    { x: 300, y: 200, arrowType: WHITE_ARROW },
  ];
}

