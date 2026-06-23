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
  const distances = {};
  const prev = {};
  const unvisited = new Set();
  const adj = {};

  // build adjacency list
  state.nodes.forEach((n) => {
    distances[n.id] = Infinity;
    adj[n.id] = [];
    unvisited.add(n.id);
  });
  distances[startId] = 0;

  state.edges.forEach((e) => {
    adj[e.from].push({ node: e.to, weight: e.distance, edgeId: e.id });
    adj[e.to].push({ node: e.from, weight: e.distance, edgeId: e.id }); // undirected
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

  // backtrack
  const path = [];
  let curr = endId;
  if (prev[curr] || curr === startId) {
    while (curr) {
      path.push(curr);
      if (prev[curr]) {
        path.push(prev[curr].edgeId); // save edge id
        curr = prev[curr].id;
      } else {
        curr = null;
      }
    }
  }
  state.path = path;
}
