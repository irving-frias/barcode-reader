var sound = new Audio("./assets/barcode.wav");
let stream = null;

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
      stream = stream; // Store reference to stream
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

  result.addEventListener("DOMSubtreeModified", () => {
    console.log("DOMSubtreeModified");
    sound.play();
  })
}

function snapshot(canvas, video, barcodeDetector, result) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height); // Clear previous frame

  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  barcodeDetector.detect(video)
    .then((barcodes) => {
      let data;
      if (barcodes.length) {
        data = barcodes[0].format == 'qr_code' ? `<a href="${barcodes[0].rawValue}">${barcodes[0].rawValue}</a>` : barcodes[0].rawValue;
        result.innerHTML = data;
      }
    })
    .catch((e) => {
      console.error("Boo, BarcodeDetection failed: " + e);
    })
    .finally(() => {
      // Stop video track to release resources
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    });
}
