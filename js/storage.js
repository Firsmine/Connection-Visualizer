// local storage
import { state } from "./state.js";

export function saveData() {
  const data = {
    nodes: state.nodes,
    edges: state.edges,
  };
  localStorage.setItem("connectionVisualizer", JSON.stringify(data));
}

export function loadData() {
  const data = localStorage.getItem("connectionVisualizer");
  if (data) {
    const parsed = JSON.parse(data);
    state.nodes = parsed.nodes || [];
    state.edges = parsed.edges || [];
  }
}
