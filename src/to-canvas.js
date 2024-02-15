import {
  calculateOrientation,
  calculateWhiteArrow,
  calculateBlackArrow,
  calculateDiamond,
} from "./connector/endpoint.js";
import {
  BLACK_ARROW,
  BLACK_DIAMOND,
  NO_ARROW,
  WHITE_ARROW,
  WHITE_DIAMOND,
  LEFT,
  RIGHT,
} from "./constants.js";

const visibilityMap = {
  protected: "#",
  private: "-",
  public: "+",
};

export function toCanvas(diagram) {
  // TODO: put these variables in a shared place so svg renderer can use them too
  const typeBoxBg = "#ffffce";
  const borderColor = "lightgrey";
  const typeBoxTextColor = "#555";
  const typeBoxFontFamily = "courier";
  const bgColor = "#ffffff";

  const canvas = document.createElement("canvas");
  canvas.width = diagram.width;
  canvas.height = diagram.height;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = bgColor;
  ctx.strokeStyle = "grey";
  ctx.fillRect(1, 1, diagram.width, diagram.height);

  for (const typeBoxId in diagram.typeBoxes) {
    const typeBox = diagram.typeBoxes[typeBoxId];
    const borderWidth = 1;
    const padding = 10;
    const headerLineHeight = 16;
    const propertyLineHeight = 20;
    const propertyFontSize = 14;

    const { x, y, width, height } = typeBox;

    drawBoxWithBorder(
      ctx,
      x,
      y,
      width,
      height,
      borderWidth,
      typeBoxBg,
      borderColor,
    );

    let currentY = y + borderWidth + padding;

    const headerTextY = currentY + headerLineHeight / 2;

    drawText(
      x + padding,
      headerTextY,
      typeBox.name,
      typeBoxTextColor,
      16,
      typeBoxFontFamily,
    );

    currentY = currentY + headerLineHeight + padding;

    ctx.fillStyle = borderColor;
    ctx.fillRect(x, currentY, width, borderWidth);
    currentY = currentY + borderWidth + padding;

    typeBox.properties.forEach((property) => {
      drawProperty(
        property,
        x + padding,
        currentY + propertyLineHeight / 2,
        typeBoxTextColor,
        propertyFontSize,
        typeBoxFontFamily,
      );
      currentY = currentY + propertyLineHeight;
    });

    currentY = currentY + padding;

    ctx.fillStyle = borderColor;
    ctx.fillRect(x, currentY, width, borderWidth);

    currentY = currentY + borderWidth + padding;

    typeBox.methods.forEach((method) => {
      drawMethod(
        method,
        x + padding,
        currentY + propertyLineHeight / 2,
        typeBoxTextColor,
        propertyFontSize,
        typeBoxFontFamily,
      );
      currentY = currentY + propertyLineHeight;
    });
  }

  for (const connectorId in diagram.connectors) {
    const connector = diagram.connectors[connectorId];
    drawConnector(ctx, connector);
  }

  function drawProperty(property, x, y, textColor, fontSize, fontFamily) {
    let currentX = x;
    const gap = 2;

    //  visibility
    currentX =
      drawTextSegment(
        currentX,
        y,
        visibilityMap[property.visibility],
        textColor,
        fontSize,
        fontFamily,
      ) + gap;

    currentX =
      drawTextSegment(
        currentX,
        y,
        property.name + ":",
        textColor,
        fontSize,
        fontFamily,
      ) + gap;

    currentX = drawTextSegment(
      currentX,
      y,
      property.type,
      textColor,
      fontSize,
      fontFamily,
    );
  }

  function drawMethod(method, x, y, textColor, fontSize, fontFamily) {
    let currentX = x;
    let gap = 2;

    currentX =
      drawTextSegment(
        currentX,
        y,
        visibilityMap[method.visibility],
        textColor,
        fontSize,
        fontFamily,
      ) + gap;

    currentX = drawTextSegment(
      currentX,
      y,
      method.name,
      textColor,
      fontSize,
      fontFamily,
    );

    currentX = drawTextSegment(
      currentX,
      y,
      "(",
      textColor,
      fontSize,
      fontFamily,
    );

    method.args.forEach((arg, index) => {
      const argName = arg.name + ":";

      currentX = drawTextSegment(
        currentX,
        y,
        argName,
        textColor,
        fontSize,
        fontFamily,
      );

      let argType = arg.type;

      if (index < method.args.length - 1) {
        argType += ";";
      }

      currentX = drawTextSegment(
        currentX,
        y,
        argType,
        textColor,
        fontSize,
        fontFamily,
      );
    });

    currentX = drawTextSegment(
      currentX,
      y,
      ")",
      textColor,
      fontSize,
      fontFamily,
    );

    drawTextSegment(
      currentX,
      y,
      ":" + method.returnType,
      textColor,
      fontSize,
      fontFamily,
    );
  }

  function drawTextSegment(currentX, y, text, textColor, fontSize, fontFamily) {
    drawText(currentX, y, text, textColor, fontSize, fontFamily);
    const textWidth = ctx.measureText(text).width;

    return currentX + textWidth;
  }

  function drawText(x, y, text, color, fontSize, fontFamily) {
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  return canvas;
}

function drawBoxWithBorder(
  ctx,
  x,
  y,
  width,
  height,
  borderWidth,
  bgColor,
  borderColor,
) {
  ctx.fillStyle = borderColor;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(
    x + borderWidth,
    y + borderWidth,
    width - borderWidth * 2,
    height - borderWidth * 2,
  );
}

function drawConnector(ctx, connector) {
  const [node0, node1, node2, node3] = connector.nodes;

  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(node0.x, node0.y);
  ctx.lineTo(node1.x, node1.y);
  ctx.lineTo(node2.x, node2.y);
  ctx.lineTo(node3.x, node3.y);
  ctx.stroke();

  drawArrow(ctx, connector.nodes, 0);
  drawArrow(ctx, connector.nodes, 3);
}

function drawArrow(ctx, nodes, nodeIndex) {
  const node = nodes[nodeIndex];
  const orientation = calculateOrientation(nodes, nodeIndex);
  let points;

  switch (node.arrowType) {
    case NO_ARROW:
      break;

    case WHITE_ARROW:
      points = calculateWhiteArrow(node, orientation);
      drawWhiteArrow(ctx, points);

      break;

    case BLACK_ARROW:
      points = calculateBlackArrow(node, orientation);
      drawBlackArrow(ctx, points);

      break;

    case WHITE_DIAMOND:
      points = calculateDiamond(node, orientation);
      drawDiamond(ctx, points, "white");

      break;

    case BLACK_DIAMOND:
      points = calculateDiamond(node, orientation);
      drawDiamond(ctx, points, "black");

      break;
  }
}

function drawWhiteArrow(ctx, points) {
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  ctx.lineTo(points[2], points[3]);
  ctx.lineTo(points[4], points[5]);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}

function drawBlackArrow(ctx, points) {
  ctx.fillStyle = "black"; // use shared color
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  ctx.lineTo(points[2], points[3]);
  ctx.lineTo(points[4], points[5]);
  ctx.stroke();
}

function drawDiamond(ctx, points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0], points[1]);
  ctx.lineTo(points[2], points[3]);
  ctx.lineTo(points[4], points[5]);
  ctx.lineTo(points[6], points[7]);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
