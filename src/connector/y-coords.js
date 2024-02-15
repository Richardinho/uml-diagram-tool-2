export function calculateYCoords(nodeIndex, yMovement, nodes) {
  const oldY = nodes[nodeIndex].y;
  let newY = oldY + yMovement;

  const typeBoxId = checkForTypeBox(nodeIndex, nodes);

  if (typeBoxId) {
    const typeBox = window.svg.typeBoxes[typeBoxId];

    const minY = typeBox.y;
    const maxY = typeBox.y + typeBox.height;

    if (newY < minY) {
      newY = minY;
    }

    if (newY > maxY) {
      newY = maxY;
    }
  }

  switch (nodeIndex) {
    case 0:
      nodes[0].y = newY;
      nodes[1].y = newY;
      break;
    case 1:
      nodes[1].y = newY;
      nodes[0].y = newY;
      break;
    case 2:
      nodes[2].y = newY;
      nodes[3].y = newY;
      break;
    case 3:
      nodes[3].y = newY;
      nodes[2].y = newY;
      break;
  }
}

function checkForTypeBox(nodeIndex, nodes) {
  switch (nodeIndex) {
    case 0:
      return nodes[0].typeBox;
    case 1:
      return nodes[0].typeBox;
    case 2:
      return nodes[3].typeBox;
    case 3:
      return nodes[3].typeBox;
  }
}
