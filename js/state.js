// data management

export const state = {
  nodes: [],
  edges: [],
  selectedNode: null,
  node: "NORMAL", // NORMAL, CONNECTING, PATHFINDING
  path: [],
  pan: { x: 0, y: 0 },
  zoom: 1,
};
