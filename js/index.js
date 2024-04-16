function onScanSuccess(decodedText, decodedResult) {
  // Handle on success condition with the decoded text or result.
  document.querySelector('#result').innerText = decodedText;
  speak(decodedText);
  html5QrcodeScanner.clear();
}

function speak(text) {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(text);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices[0]; // Choose a specific voice

  // Speak the text
  speechSynthesis.speak(utterance);
}


var html5QrcodeScanner = new Html5QrcodeScanner(
"reader", { fps: 10, qrbox: 250 });
html5QrcodeScanner.render(onScanSuccess);