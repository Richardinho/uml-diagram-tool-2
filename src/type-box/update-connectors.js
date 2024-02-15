import { repositionEndpoint } from "../connector/endpoint.js";

export function updateConnectors(typeBox, yMovement) {
  typeBox.connectors.horizontal.forEach(({ id, nodeIndex }) => {
    const { nodes, nodeEls, lineEls, arrowEls } = window.svg.connectors[id];

    if (nodeIndex === 0) {
      /*
      if (nodes[0].x > nodes[1].x) {
        nodes[0].x = typeBox.x;
      } else {
        nodes[0].x = typeBox.x + typeBox.width;
      }
      */

      //if (nodes[1].x > nodes[0].x + typeBox.width) {
       // nodes[0].x = typeBox.x + typeBox.width;
      //} else {
        nodes[0].x = typeBox.x;
     // }

      const newY = nodes[0].y + yMovement;

      nodes[0].y = newY;
      nodes[1].y = newY;

      nodeEls[0].setAttribute("cx", nodes[0].x);
      nodeEls[0].setAttribute("cy", nodes[0].y);
      nodeEls[1].setAttribute("cy", nodes[1].y);

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
      /*
      if (nodes[3].x > nodes[2].x) {
        nodes[3].x = typeBox.x;
      } else {
        nodes[3].x = typeBox.x + typeBox.width;
      }
      */
      //if (nodes[2].x > nodes[3].x + typeBox.width) {
       // nodes[3].x = typeBox.x + typeBox.width;
      //} else {
        nodes[3].x = typeBox.x;
     // }

      const newY = nodes[3].y + yMovement;

      nodes[3].y = newY;
      nodes[2].y = newY;

      nodeEls[3].setAttribute("cx", nodes[3].x);
      nodeEls[3].setAttribute("cy", nodes[3].y);
      nodeEls[2].setAttribute("cy", nodes[2].y);

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
  });
}
