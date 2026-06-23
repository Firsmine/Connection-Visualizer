// data management
const state = {
  nodes: [],
  edges: [],
  selectedNode: null,
  node: "NORMAL", // NORMAL, CONNECTING, PATHFINDING
  path: [],
  pan: { x: 0, y: 0 },
  zoom: 1,
  highlightedNodes: [],
  highlightedEdges: [],
};

// local storage
function saveData() {
  const data = {
    nodes: state.nodes,
    edges: state.edges,
  };
  localStorage.setItem("connectionVisualizer", JSON.stringify(data));
}
function loadData() {
  const data = localStorage.getItem("connectionVisualizer");
  if (data) {
    const parsed = JSON.parse(data);
    state.nodes = parsed.nodes || [];
    state.edges = parsed.edges || [];
  }
}
