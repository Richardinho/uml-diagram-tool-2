export function makeMovable(el, positionStrategy, disable = () => false) {
  let clientX;
  let clientY;
  console.log('MAKE MOVABLE', el);

  function onPointerMove(event) {
    if (!disable()) {
      event.stopPropagation();
      if (el.hasPointerCapture(event.pointerId)) {
        const xMovement = (event.clientX - clientX) / window.svg.zoom;
        const yMovement = (event.clientY - clientY) / window.svg.zoom;

        clientX = event.clientX;
        clientY = event.clientY;

        positionStrategy(xMovement, yMovement);
      }
    }
  }

  el.addEventListener("pointerdown", (event) => {
    event.stopPropagation();
    if (!disable()) {
      el.addEventListener("pointermove", onPointerMove);
      console.log('DOES THIS RUN?', el);
      el.setPointerCapture(event.pointerId);
      clientX = event.clientX;
      clientY = event.clientY;
    }
  });

  el.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    if (!disable()) {
      el.releasePointerCapture(event.pointerId);
      el.removeEventListener("pointermove", onPointerMove);
      clientX = null;
      clientY = null;
    }
  });
}
