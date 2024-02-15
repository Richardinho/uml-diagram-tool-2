import { createPolygon, createLine, createSVG } from "../svg-utils.js";
import {
  NO_ARROW,
  WHITE_ARROW,
  BLACK_ARROW,
  BLACK_DIAMOND,
  WHITE_DIAMOND,
  LEFT,
  RIGHT,
} from "../constants.js";

export function createArrow(node, orientation) {
  const arrowGroupEl = createSVG("g");
  arrowGroupEl.setAttribute("class", "arrow-group");
  let points, polygonEl;

  switch (node.arrowType) {
    case NO_ARROW:
      break;

    case WHITE_ARROW:
      points = calculateWhiteArrow(node, orientation);

      polygonEl = createPolygon(points);
      polygonEl.setAttribute("class", "white-arrow");
      arrowGroupEl.appendChild(polygonEl);

      break;

    case BLACK_ARROW:
      break;

    default:
  }

  return arrowGroupEl;
}

export function changeArrow(node, groupEl, orientation) {
  let points;
  let polygonEl;
  let className;

  if (groupEl.firstChild) {
    groupEl.firstChild.remove();
  }

  switch (node.arrowType) {
    case NO_ARROW:
      break;

    case WHITE_ARROW:
      points = calculateWhiteArrow(node, orientation);
      className = "white-arrow";
      polygonEl = createPolygon(points);
      polygonEl.setAttribute("class", className);
      groupEl.appendChild(polygonEl);

      break;

    case WHITE_DIAMOND:
      points = calculateDiamond(node, orientation);
      className = "white-diamond";
      polygonEl = createPolygon(points);
      polygonEl.setAttribute("class", className);
      groupEl.appendChild(polygonEl);

      break;

    case BLACK_DIAMOND:
      points = calculateDiamond(node, orientation);
      className = "black-diamond";
      polygonEl = createPolygon(points);
      polygonEl.setAttribute("class", className);
      groupEl.appendChild(polygonEl);

      break;

    case BLACK_ARROW:
      points = calculateBlackArrow(node, orientation);
      className = "black-arrow";
      const lineEl = createLine(points);
      lineEl.setAttribute("class", className);
      groupEl.appendChild(lineEl);

      break;

    default:
      if (groupEl.firstChild) {
        groupEl.firstChild.remove();
      }
  }
}

export function repositionEndpoint(arrowEls, index, nodes) {
  if (nodes[0].arrowType === WHITE_ARROW) {
    reposition(nodes, 0, arrowEls, calculateWhiteArrow);
  }

  if (nodes[0].arrowType === WHITE_DIAMOND) {
    reposition(nodes, 0, arrowEls, calculateDiamond);
  }

  if (nodes[0].arrowType === BLACK_DIAMOND) {
    reposition(nodes, 0, arrowEls, calculateDiamond);
  }

  if (nodes[0].arrowType === BLACK_ARROW) {
    reposition(nodes, 0, arrowEls, calculateBlackArrow);
  }

  if (nodes[3].arrowType === WHITE_ARROW) {
    reposition(nodes, 3, arrowEls, calculateWhiteArrow);
  }

  if (nodes[3].arrowType === WHITE_DIAMOND) {
    reposition(nodes, 3, arrowEls, calculateDiamond);
  }

  if (nodes[3].arrowType === BLACK_DIAMOND) {
    reposition(nodes, 3, arrowEls, calculateDiamond);
  }

  if (nodes[3].arrowType === BLACK_ARROW) {
    reposition(nodes, 3, arrowEls, calculateBlackArrow);
  }
}

export function calculateOrientation(nodes, index) {
  let orientation;

  if (index < 2) {
    if (nodes[0].x < nodes[1].x) {
      orientation = LEFT;
    } else {
      orientation = RIGHT;
    }
  } else {
    if (nodes[2].x < nodes[3].x) {
      orientation = RIGHT;
    } else {
      orientation = LEFT;
    }
  }

  return orientation;
}

function reposition(nodes, index, arrowEls, callback) {
  let orientation = calculateOrientation(nodes, index);
  let node = nodes[index];
  let arrowEl = arrowEls[index].firstChild;
  let points = callback(node, orientation);
  arrowEl.setAttribute("points", points);
}

export function calculateWhiteArrow(node, orientation) {
  const apex = [node.x, node.y];
  let upperVertex, lowerVertex;

  if (orientation === LEFT) {
    upperVertex = [node.x + 10, node.y - 10];
    lowerVertex = [node.x + 10, node.y + 10];
  }

  if (orientation === RIGHT) {
    upperVertex = [node.x - 10, node.y - 10];
    lowerVertex = [node.x - 10, node.y + 10];
  }

  const points = [apex, upperVertex, lowerVertex].flat();

  return points;
}

export function calculateBlackArrow(node, orientation) {
  const apex = [node.x, node.y];

  let upperVertex, lowerVertex;

  if (orientation === LEFT) {
    upperVertex = [node.x + 15, node.y - 15];
    lowerVertex = [node.x + 15, node.y + 15];
  }

  if (orientation === RIGHT) {
    upperVertex = [node.x - 15, node.y - 15];
    lowerVertex = [node.x - 15, node.y + 15];
  }

  const points = [upperVertex, apex, lowerVertex].flat();

  return points;
}

export function calculateDiamond(node, orientation) {
  let vertex1, vertex2, vertex3, vertex4;
  vertex1 = [node.x, node.y];

  if (orientation === LEFT) {
    vertex2 = [node.x + 10, node.y - 10];
    vertex3 = [node.x + 20, node.y];
    vertex4 = [node.x + 10, node.y + 10];
  }

  if (orientation === RIGHT) {
    vertex2 = [node.x - 10, node.y - 10];
    vertex3 = [node.x - 20, node.y];
    vertex4 = [node.x - 10, node.y + 10];
  }

  const points = [vertex1, vertex2, vertex3, vertex4].flat();

  return points;
}
