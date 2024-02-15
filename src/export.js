import { toCanvas } from "./to-canvas.js";

export function exportDiagram() {
  const diagram = window.svg;
  const canvas = toCanvas(diagram);
  let png = canvas.toDataURL("image/png");

  const name = "canvas.png";

  var link = document.createElement("a");
  link.download = name;
  link.style.opacity = "0";
  document.body.append(link);
  link.href = png;
  link.click();
  link.remove();
}
