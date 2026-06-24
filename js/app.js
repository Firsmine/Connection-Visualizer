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
    const g = e.target.closest("g.node");
    if (g) {
      if (g && state.mode === "NORMAL") {
        state.selectedNode = g.getAttribute("data-id");
        state.highlightedNodes = [];
        state.highlightedEdges = [];
        render();
      }
    } else {
      state.selectedNode = null;
      state.mode = "NORMAL";
      state.highlightedNodes = [];
      state.highlightedEdges = [];
      render();
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
