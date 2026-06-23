// save image
export function initExportEvent() {
  document.getElementById("btnSave").addEventListener("click", () => {
    const svg = document.getElementById("canvas");
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    // add namespace if missing
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"',
      );
    }

    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "result.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
