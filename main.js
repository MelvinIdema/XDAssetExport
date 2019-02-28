const { alert, error } = require("./lib/dialogs.js");
const shell = require("uxp").shell;

// Convert 'android.graphics.Color' to other Formats
function convertTo(format, color) {
  if(format == 'hex'){
    return "#" + (color & 0x00FFFFFF).toString(16).padStart(6, '0');
  } else {
    alert('Other color formats not supported yet');
  }
}

// Copies Colors to Clipboard
function saveColors(colors){
  let clipboard = require("clipboard");
  clipboard.copyText(colors);
}

//Get all colors from Assets
function getColors(preprocessor) {

  var assets = require("assets"),
    allColors = assets.colors.get();

  let colors = "";

  // Loop over all colors in Assets and concetenate to string
  for (var i = 0; i < allColors.length; i++) {
    let newColor = convertTo('hex', allColors[i]['color']['value']);
    let colorName = (allColors[i]['name'] == undefined) ? newColor : allColors[i]['name'];

    colors += (preprocessor == 'SASS') ? "$" + colorName + ": " + newColor + ";\n" : "--" + colorName + ": " + newColor + ";\n";
  }

  // Returns String as
  // $colorname : $colorcode
  return colors;
}

function exportSass(){
  const colors = getColors('SASS');
  saveColors(colors);
  alert('Successfully Copied to Clipboard', 'All colors are copied to your clipboard in SCSS Format.');
}

function exportCss(){
  const colors = getColors('CSS');
  saveColors(colors);
  alert('Successfully Copied to Clipboard', 'All colors are copied to your clipboard in CSS Format.');
}

function goToSupport(){
  shell.openExternal("https://www.melvinidema.nl")
}

module.exports = {
    commands: {
        exportSass: exportSass,
        exportCss: exportCss,
        goToSupport: goToSupport
    }
};
