// check compatibility
if (!("BarcodeDetector" in globalThis)) {
  console.log("Barcode Detector is not supported by this browser.");
} else {
  console.log("Barcode Detector supported!");

  // create new detector
  const barcodeDetector = new BarcodeDetector();

  // get video element
  const video = document.getElementById("barcodevideo");

  // get canvas element
  const canvas = document.getElementById("barcodecanvas");

  // get result element
  const result = document.getElementById("result");

  // start video
  navigator.mediaDevices
  .getUserMedia({ video: {
    facingMode: 'environment'
  }})
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((e) => {
    console.error("Boo, getUserMedia failed: " + e);
  });

  video.addEventListener("canplay", () => {
    console.log("Video is playing...");

    setInterval(function() {
      snapshot(canvas, video, barcodeDetector, result);
    }, 250);
  }, false);
}
let timer;
function snapshot(canvas, video, barcodeDetector, result) {
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  barcodeDetector
  .detect(video)
  .then((barcodes) => {
    console.log(barcodes);
    if (barcodes.length) {
      result.innerHTML = barcodes[0].rawValue;
    }
  })
  .catch((e) => {
    console.error("Boo, BarcodeDetection failed: " + e);
  })
}