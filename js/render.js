// DOM svg
function render() {
  const layerNodes = document.getElementById("layerNodes");
  const layerEdges = document.getElementById("layerEdges");
  const workspace = document.getElementById("workspace");

  // update transform
  workspace.setAttribute(
    "transform",
    `translate(${state.pan.x}, ${state.pan.y}) scale(${state.zoom})`,
  );

  // clear canvas
  layerNodes.innerHTML = "";
  layerEdges.innerHTML = "";

  // render edges
  state.edges.forEach((edge) => {
    const nodeA = state.nodes.find((n) => n.id === edge.from);
    const nodeB = state.nodes.find((n) => n.id === edge.to);
    if (!nodeA || !nodeB) return;

    const isEdgeHighlighted = state.highlightedEdges.includes(String(edge.id));
    const lineClass = isEdgeHighlighted
      ? "edge-line highlighted-edge"
      : "edge-line";

    const midX = (nodeA.x + nodeB.x) / 2;
    const midY = (nodeA.y + nodeB.y) / 2;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", nodeA.x);
    line.setAttribute("y1", nodeA.y);
    line.setAttribute("x2", nodeB.x);
    line.setAttribute("y2", nodeB.y);
    line.setAttribute("class", lineClass);

    if (isEdgeHighlighted) {
      line.style.stroke = "#007bff";
      line.style.strokeWidth = "4px";
    } else {
      line.style.stroke = "#111";
      line.style.strokeWidth = "2px";
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", midX);
    text.setAttribute("y", midY - 5);
    text.setAttribute("class", "edge-text");
    text.textContent = edge.distance;

    layerEdges.appendChild(line);
    layerEdges.appendChild(text);
  });

  // render nodes
  state.nodes.forEach((node) => {
    const nodeIdStr = String(node.id);
    const isSelected = String(state.selectedNode) === nodeIdStr;
    const isNodeHighlighted = state.highlightedNodes.includes(nodeIdStr);

    let gClass = "node";
    if (isSelected) gClass += " selected";
    if (isNodeHighlighted) gClass += " highlighted";

    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", gClass);
    g.setAttribute("transform", `translate(${node.x}, ${node.y})`);
    g.setAttribute("data-id", node.id);

    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    circle.setAttribute("r", 35);
    circle.setAttribute("class", "node-circle");

    if (isNodeHighlighted) {
      circle.style.fill = "#fff";
      circle.style.stroke = "#0056b3";
    } else if (isSelected) {
      circle.style.fill = "#fff";
      circle.style.stroke = "#007bff";
    } else {
      circle.style.fill = "#ffffff";
      circle.style.stroke = "#333333";
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("class", "node-text");
    text.textContent = node.label;

    g.appendChild(circle);
    g.appendChild(text);
    layerNodes.appendChild(g);
  });
  updateUI();
}

function updateUI() {
  const btnConnect = document.getElementById("btnConnect");
  const btnDelete = document.getElementById("btnDelete");
  const btnPath = document.getElementById("btnPath");
  const statusLabel = document.getElementById("statusLabel");

  btnConnect.disabled = !state.selectedNode;
  btnDelete.disabled = !state.selectedNode;
  btnPath.disabled = !state.selectedNode;
  statusLabel.disabled = !state.selectedNode || state.nodes.length < 2;

  if (state.mode === "CONNECTING" || state.mode === "PATHFINDING") {
    statusLabel.classList.remove("status-hidden");
  } else {
    statusLabel.classList.add("status-hidden");
  }
}
