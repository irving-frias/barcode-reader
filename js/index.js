function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  document.querySelector('#result').innerText = decodedText;
}

var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);