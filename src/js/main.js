var Handlebars = require('handlebars');
var data = require('./docs.json');

console.log("")

function init(){
  var template = document.getElementById("docstpl").innerHTML;
  var render = Handlebars.compile(template);
  var container = document.getElementById("docsContainer");

  container.innerHTML = render(data);

}

init();
