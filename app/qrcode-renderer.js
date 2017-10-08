
const colorLight = "#ffffff";
const colorDark = "#000000";
const quietSpace = 1;

export function QRCodeRenderer(document) {
  this.document = document;
}

QRCodeRenderer.prototype.resetCode = function() {
  console.log("resetting code");
  let modules = this.document.getElementsByClassName("qr-module");
  modules.forEach(function(module){
    module.style.display = "none";
  });
}; 

QRCodeRenderer.prototype.drawCode = function(data) {
  console.log("Rendering code");
  let codeElement = this.document.getElementById("code");
  let modules = this.document.getElementsByClassName("qr-module");
  let nCount = data.length;
  
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
          module.style.display = "inline";
          module.style.fill = colorDark;
          module_idx++;
        }
      }
    }
    console.log("rendering complete");
  } catch (err) {
    console.log(err);
  }
};
