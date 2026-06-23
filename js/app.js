// entry point, main event listener
document.addEventListener("DOMContentLoaded", () => {
  const svgElement = document.getElementById("canvas");

  loadData();
  initNodeEvents(svgElement);
  initEdgeEvents();
  initPathfindingEvents();
  initPanZoomEvents(svgElement);
  initExportEvent();

  svgElement.addEventListener("click", (e) => {
    // blank space clicked
    if (e.target.tagName === "svg" || e.target.tagName === "rect") {
      state.selectedNode = null;
      state.path = [];
      state.mode = "NORMAL";
      render();
    } else {
      const g = e.target.closest("g.node");
      if (g && state.mode === "NORMAL") {
        state.selectedNode = g.getAttribute("data-id");
        state.path = [];
        render();
      }
    }
  });

  // delete
  document
    .getElementById("btnDelete")
    .addEventListener("click", deleteSelectedNode);

  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT") return;

    if (e.key === "Backspace" || e.key === "Delete") {
      deleteSelectedNode();
    }
  });

  // clear all
  document.getElementById("btnClear").addEventListener("click", () => {
    if (confirm("Clear all nodes?")) {
      state.nodes = [];
      state.edges = [];
      state.selectedNode = null;
      state.path = [];
      state.mode = "NORMAL";
      saveData();
      render();
    }
  });

  render();
});
