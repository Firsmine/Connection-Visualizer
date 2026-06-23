// pan zoom logic
function initPanZoomEvents(svgElement) {
  let isPanning = false;

  svgElement.addEventListener("mousedown", (e) => {
    if (e.target.tagName === "svg" || e.target.tagName === "rect") {
      isPanning = true;
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (isPanning) {
      state.pan.x += e.movementX;
      state.pan.y += e.movementY;
      render();
    }
  });

  window.addEventListener("mouseup", () => {
    isPanning = false;
  });

  // zoom
  svgElement.addEventListener(
    "wheel",
    (e) => {
      const rect = svgElement.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // calculating cursor coords
      const svgX = (mouseX - state.pan.x) / state.zoom;
      const svgY = (mouseY - state.pan.y) / state.zoom;

      // change zoom amount
      const zoomAmount = 0.1;
      if (e.deltaY < 0) {
        state.zoom += zoomAmount;
      } else {
        state.zoom = Math.max(0.1, state.zoom - zoomAmount);
      }

      // zoom on cursor
      state.pan.x = mouseX - svgX * state.zoom;
      state.pan.y = mouseY - svgY * state.zoom;

      render();
    },
    { passive: false },
  );
}
