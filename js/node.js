// node logic
let draggedNodeId = null;

function initNodeEvents(svgElement) {
  const popupNode = document.getElementById("popupNode");
  const inputNodeName = document.getElementById("inputNodeName");
  const btnCreateNode = document.getElementById("btnCreateNode");
  let pendingCoords = null;

  svgElement.addEventListener("dblclick", (e) => {
    if (e.target.tagName !== "svg" && e.target.tagName !== "rect") return;

    const pt = svgElement.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = document.getElementById("workspace").getScreenCTM();
    const cursorPt = pt.matrixTransform(ctm.inverse());

    pendingCoords = { x: cursorPt.x, y: cursorPt.y };

    popupNode.style.left = e.clientX + 10 + "px";
    popupNode.style.top = e.clientY + 10 + "px";
    popupNode.classList.remove("hidden");
    inputNodeName.value = "";
    inputNodeName.focus();
  });

  const finalizeCreate = () => {
    const val = inputNodeName.value.trim();
    if (val && pendingCoords) {
      state.nodes.push({
        id: "n_" + Date.now(),
        label: val,
        x: pendingCoords.x,
        y: pendingCoords.y,
      });
      saveData();
      render();
    }
    popupNode.classList.add("hidden");
  };

  btnCreateNode.addEventListener("click", finalizeCreate);
  inputNodeName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finalizeCreate();
  });

  // drag logic
  svgElement.addEventListener("mousedown", (e) => {
    const g = e.target.closest("g.node");
    if (g) {
      draggedNodeId = g.getAttribute("data-id");
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (draggedNodeId) {
      const node = state.nodes.find((n) => n.id === draggedNodeId);
      if (node) {
        // adjust movement
        node.x += e.movementX / state.zoom;
        node.y += e.movementY / state.zoom;
        render();
      }
    }
  });

  window.addEventListener("mouseup", () => {
    if (draggedNodeId) {
      draggedNodeId = null;
      saveData();
    }
  });
}

function deleteSelectedNode() {
  if (!state.selectedNode) return;
  state.nodes = state.nodes.filter((n) => n.id !== state.selectedNode);
  state.edges = state.edges.filter(
    (e) => e.from !== state.selectedNode && e.to !== state.selectedNode,
  );
  state.selectedNode = null;
  state.path = [];
  saveData();
  render();
}
