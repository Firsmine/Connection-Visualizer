// entry point, main event listener
import { state } from "./state.js";
import { render } from "./render.js";
import { loadData, saveData } from "./storage.js";
import { initNodeEvents, deleteSelectedNode } from "./node.js";
import { initEdgeEvents } from "./edge.js";
import { initPathfindingEvents } from "./pathfinding.js";
import { initPanZoomEvents } from "./panzoom.js";
import { initExportEvent } from "./export.js";

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
  window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && e.target.tagName !== "INPUT") {
      deleteSelectedNode();
    }
  });
  document
    .getElementById("btnDelete")
    .addEventListener("click", deleteSelectedNode);

  // clear all
  document.getElementById("btnClear").addEventListener("click", () => {
    state.nodes = [];
    state.edges = [];
    state.selectedNode = null;
    state.path = [];
    state.mode = "NORMAL";
    saveData();
    render();
  });

  render();
});
