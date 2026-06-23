// pan zoom logic
import { state } from "./state.js";
import { render } from "./render.js";

export function initPanZoomEvents(svgElement) {
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
      if (e.ctrlKey) {
        e.preventDefault();
        const zoomAmount = 0.1;
        if (e.deltaY < 0) state.zoom += zoomAmount;
        else state.zoom = Math.max(0.1, state.zoom - zoomAmount);
        render();
      }
    },
    { passive: false },
  );
}
