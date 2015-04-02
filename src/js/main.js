var Mustache = require('./libs/mustache.js');

console.log(Mustache);
var data = require('./docs.json');

function init(){

  var doctpl = document.getElementById("docstpl");
  var template = doctpl.innerHTML;
  var rendered = Mustache.render(template , data);
  var docsContainer = document.getElementById("docsContainer");
  docsContainer.innerHTML = rendered;
}

init();
