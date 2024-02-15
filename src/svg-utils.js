import { SVG_NAME_SPACE } from "./constants.js";

export function drawLine(node1, node2) {
  const line = document.createElementNS(SVG_NAME_SPACE, "line");
  line.setAttribute("x1", node1.x);
  line.setAttribute("y1", node1.y);
  line.setAttribute("x2", node2.x);
  line.setAttribute("y2", node2.y);
  line.setAttribute("stroke", "#333");
  line.setAttribute("stroke-width", 1);
  return line;
}

export function updateLinePosition(line, node1, node2) {
  line.setAttribute("x1", node1.x);
  line.setAttribute("y1", node1.y);
  line.setAttribute("x2", node2.x);
  line.setAttribute("y2", node2.y);
}

export function createPolygon(coords) {
  const el = createSVG("polygon");
  const points = coords.join(",");
  el.setAttribute("points", points);

  return el;
}

export function createLine(coords) {
  const el = createSVG("polyline");
  const points = coords.join(",");
  el.setAttribute("points", points);
  el.setAttribute("fill", "none");

  return el;
}

export function createSVG(name) {
  return document.createElementNS(SVG_NAME_SPACE, name);
}
