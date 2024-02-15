export function calculateXCoords(nodeIndex, xMovement, nodes) {
  // nodes
  const oldX = nodes[nodeIndex].x;
  const newX = oldX + xMovement;

  switch (nodeIndex) {
    case 0:
      if (!nodes[0].typeBox) {
        nodes[0].x = newX;
      }

      break;

    case 1:
      nodes[1].x = newX;
      nodes[2].x = newX;

      if (nodes[0].typeBox) {
        const typeBox = window.svg.typeBoxes[nodes[0].typeBox];

        if (nodes[1].x > typeBox.x + typeBox.width) {
          nodes[0].x = typeBox.x + typeBox.width;
        } else {
          nodes[0].x = typeBox.x;
        }
      }

      if (nodes[3].typeBox) {
        const typeBox = window.svg.typeBoxes[nodes[3].typeBox];

        if (nodes[2].x > typeBox.x + typeBox.width) {
          nodes[3].x = typeBox.x + typeBox.width;
        } else {
          nodes[3].x = typeBox.x;
        }
      }

      break;

    case 2:
      nodes[2].x = newX;
      nodes[1].x = newX;

      if (nodes[0].typeBox) {
        const typeBox = window.svg.typeBoxes[nodes[0].typeBox];

        if (nodes[1].x > typeBox.x + typeBox.width) {
          nodes[0].x = typeBox.x + typeBox.width;
        } else {
          nodes[0].x = typeBox.x;
        }
      }

      if (nodes[3].typeBox) {
        const typeBox = window.svg.typeBoxes[nodes[3].typeBox];

        if (nodes[2].x > typeBox.x + typeBox.width) {
          nodes[3].x = typeBox.x + typeBox.width;
        } else {
          nodes[3].x = typeBox.x;
        }
      }

      break;

    case 3:
      if (!nodes[3].typeBox) {
        nodes[3].x = newX;
      }

      break;
  }
}
