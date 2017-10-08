/*
 * Entry point for the watch app
 */

import document from "document";
import * as messaging from "messaging";
import { display } from "display";
import * as fs from "fs";

const colorLight = "#ffffff";
const colorDark = "#000000";

display.autoOff = false;
display.on = true;

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
  resetQRCode()
  drawQRCode(data)

}

function resetQRCode() {
  console.log("resetting code");
    let modules = document.getElementsByClassName("qr-module");
    modules.forEach(function(module){
      module.style.fill = colorLight;
    });
}

function drawQRCode(data) {
  console.log("Rendering code");
  let codeElement = document.getElementById("code");
  let modules = document.getElementsByClassName("qr-module");
  let nCount = data.length;
  let quietSpace = 1;
  let moduleWidth = codeElement.width/(nCount+2*quietSpace);
  let moduleHeight = codeElement.height/(nCount+2*quietSpace);

  
  try {
    let module_idx = 0;
    for (var row = 0; row < nCount; row++) {
      for (var col = 0; col < nCount; col++) {
        if (data[row][col]) {
          let module = modules[module_idx];
          module.x = codeElement.x + (quietSpace + col)*moduleWidth;
          module.y = codeElement.y + (quietSpace + row)*moduleHeight;
          module.width = moduleWidth+1;
          module.height = moduleHeight+1;
          module.style.fill = colorDark;
          module_idx++;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  console.log("Connection error: " + err.code + " - " + err.message);
}