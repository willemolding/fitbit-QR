/*
 * Entry point for the companion app
 */
import { QRCode } from "./qrcode.js";
import * as messaging from "messaging";
import { settingsStorage } from "settings";
import { me } from "companion";


console.log("Companion Started");

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  console.log("Companion ready to message");
  encodeAndSend("QR on fitbit");
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}


// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
  let codeString = JSON.parse(settingsStorage.getItem("codeString")).name;
  let errorCorrectionLevel = JSON.parse(settingsStorage.getItem("errorCorrectionLevel")).values[0].value;
  encodeAndSend(codeString, errorCorrectionLevel);
}

// if (me.launchReasons.settingChanged) {
//   encodeAndSend(JSON.parse(settingsStorage.getItem("codeString")).name);
// }
  

function sendMessage(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}
  
// Send a message to the peer
function encodeAndSend(codeString, errorCorrectionLevel="L") {
    console.log("encoding data: "+codeString);
    console.log("at error correction level: "+errorCorrectionLevel);
  
    let codeGenerator = new QRCode({
      text : codeString,
      correctLevel : errorCorrectionLevel,
    });
  
    console.log("sending data to watch");
    sendMessage({
      data : codeGenerator.getCodeData()
    });
}
