if (!("BarcodeDetector" in globalThis)) {
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  const barcodeDetector = new BarcodeDetector();
  const video = document.getElementById("barcodevideo");
  const canvas = document.getElementById("barcodecanvas");
  const result = document.getElementById("result");

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }})
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((e) => {
      console.error("Boo, getUserMedia failed: " + e);
    });

  video.addEventListener("canplay", () => {
    console.log("Video is playing...");

    // Run snapshot every 1000 milliseconds (1 second)
    setInterval(function() {
      snapshot(canvas, video, barcodeDetector, result);
    }, 1000);
  }, false);
}
let timer;
function snapshot(canvas, video, barcodeDetector, result) {
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  barcodeDetector.detect(canvas)
  .then((barcodes) => {
    console.log(barcodes);
    if (barcodes.length) {
      result.innerHTML = barcodes[0].rawValue;
    }
  })
  .catch((e) => {
    console.error("Boo, BarcodeDetection failed: " + e);
  });
}
