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
  encodeAndSend();
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  console.log("Connection error: " + err.code + " - " + err.message);
}


// Event fires when a setting is changed
settingsStorage.onchange = function(evt) {
  encodeAndSend();
}

// If companion launched because of a settings change
if (me.launchReasons.settingChanged) {
  encodeAndSend();
}
  

function sendMessage(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
      messaging.peerSocket.send(data);
    }
}

function getSettings() {
  let settings = {};
  try {
    settings.codeString = JSON.parse(settingsStorage.getItem("codeString")).name;
  } catch (err) {
    settings.codeString = "QR on Fitbit";
  }
  
  try {
    settings.errorCorrectionLevel = JSON.parse(settingsStorage.getItem("errorCorrectionLevel")).values[0].value;
  } catch (err) {
    settings.errorCorrectionLevel = "M";
  }
  return settings;
}
  
// Send a message to the peer
function encodeAndSend() {
    let settings = getSettings();
    
    console.log("encoding data: "+settings.codeString);
    console.log("at error correction level: "+settings.errorCorrectionLevel);
  
    let codeGenerator = new QRCode({
      text : settings.codeString,
      correctLevel : settings.errorCorrectionLevel,
    });
  
    console.log("sending data to watch");
    sendMessage({
      data : codeGenerator.getCodeData()
    });
}
