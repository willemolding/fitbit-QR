/*
 * Entry point for the watch app
 */

import document from "document";
import * as messaging from "messaging";
import { display } from "display";
import * as fs from "fs";
import { QRCodeRenderer } from "./qrcode-renderer.js";

display.autoOff = false;
display.on = true;

let qrRenderer = new QRCodeRenderer(document);

// Listen for the onopen event
messaging.peerSocket.onopen = function() {
  // Ready to send or receive messages
  console.log("device ready to message");
};


// Listen for the onmessage event
messaging.peerSocket.onmessage = function(evt) {
  // Output the message to the console
  console.log("device received message");
  let data = evt.data.data;
  console.log("size of data received "+data.length);

  //reset the modules
  qrRenderer.resetCode()
  qrRenderer.drawCode(data)

}


// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}