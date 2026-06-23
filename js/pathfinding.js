// dijkstra
function initPathfindingEvents() {
  const btnPath = document.getElementById("btnPath");

  btnPath.addEventListener("click", () => {
    state.mode = "PATHFINDING";
    render();
  });

  document.getElementById("canvas").addEventListener("click", (e) => {
    const g = e.target.closest("g.node");
    if (state.mode === "PATHFINDING" && g) {
      const targetId = g.getAttribute("data-id");
      if (targetId !== state.selectedNode) {
        findShortestPath(state.selectedNode, targetId);
        state.mode = "NORMAL";
        render();
      }
    }
  });
}

function findShortestPath(startId, endId) {
  const start = String(startId);
  const end = String(endId);

  const distances = {};
  const prev = {};
  const unvisited = new Set();
  const adj = {};

  state.highlightedNodes = [];
  state.highlightedEdges = [];

  // build adjacency list
  state.nodes.forEach((n) => {
    const nodeIdStr = String(n.id);
    distances[n.id] = Infinity;
    adj[n.id] = [];
    unvisited.add(nodeIdStr);
  });
  distances[startId] = 0;

  state.edges.forEach((e) => {
    const fromStr = String(e.from);
    const toStr = String(e.to);
    if (adj[fromStr] && adj[toStr]) {
      adj[fromStr].push({
        node: toStr,
        weight: e.distance,
        edgeId: String(e.id),
      });
      adj[toStr].push({
        node: fromStr,
        weight: e.distance,
        edgeId: String(e.id),
      });
    }
  });

  while (unvisited.size > 0) {
    let currNode = null;
    let minDest = Infinity;

    unvisited.forEach((id) => {
      if (distances[id] < minDest) {
        minDest = distances[id];
        currNode = id;
      }
    });

    if (!currNode || distances[currNode] === Infinity) break;
    if (currNode === endId) break;

    unvisited.delete(currNode);

    adj[currNode].forEach((neighbor) => {
      const alt = distances[currNode] + neighbor.weight;
      if (alt < distances[neighbor.node]) {
        distances[neighbor.node] = alt;
        prev[neighbor.node] = { id: currNode, edgeId: neighbor.edgeId };
      }
    });
  }

  let curr = endId;
  if (prev[curr] || curr === startId) {
    while (curr) {
      state.highlightedNodes.push(curr);
      if (prev[curr]) {
        state.highlightedEdges.push(prev[curr].edgeId); // save edge id
        curr = prev[curr].id;
      } else {
        curr = null;
      }
    }
  }
}
