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
  encodeAndSend(JSON.parse(settingsStorage.getItem("codeString")).name);
}

if (me.launchReasons.settingChanged) {
  encodeAndSend(JSON.parse(settingsStorage.getItem("codeString")).name);
}
  

function sendMessage(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}
  
// Send a message to the peer
function encodeAndSend(codeString) {
    console.log("encoding data:"+codeString);
    let codeGenerator = new QRCode(codeString);
    console.log("sending data to watch");
    sendMessage({
      data : codeGenerator.getCodeData()
    });
}
