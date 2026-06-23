// connection logic
function initEdgeEvents() {
  const btnConnect = document.getElementById("btnConnect");
  const popupEdge = document.getElementById("popupEdge");
  const inputDistance = document.getElementById("inputEdgeDistance");
  const btnCreateEdge = document.getElementById("btnCreateEdge");
  let targetNodeIdTemp = null;

  btnConnect.addEventListener("click", () => {
    state.mode = "CONNECTING";
    render();
  });

  document.getElementById("canvas").addEventListener("click", (e) => {
    const g = e.target.closest("g.node");
    if (state.mode === "CONNECTING" && g) {
      const targetId = g.getAttribute("data-id");
      if (targetId !== state.selectedNode) {
        targetNodeIdTemp = targetId;
        popupEdge.style.left = e.clientX + 10 + "px";
        popupEdge.style.top = e.clientY + 10 + "px";
        popupEdge.classList.remove("hidden");
        inputDistance.value = "";
        inputDistance.focus();
      }
    }
  });

  const finalizeEdge = () => {
    const dist = parseFloat(inputDistance.value);
    if (!isNaN(dist) && targetNodeIdTemp) {
      state.edges.push({
        id: "e_" + Date.now(),
        from: state.selectedNode,
        to: targetNodeIdTemp,
        distance: dist,
      });
      saveData();
    }
    popupEdge.classList.add("hidden");
    state.mode = "NORMAL";
    targetNodeIdTemp = null;
    render();
  };

  btnCreateEdge.addEventListener("click", finalizeEdge);
  inputDistance.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finalizeEdge();
  });
}
