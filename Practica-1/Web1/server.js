var http = require('http');
var fs = require('fs');
console.log("Arrancando servidor...")


http.createServer(function (req, res) {
  fs.readFile('index.html', function(err, data){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(data);
  console.log("Peticion Atendida")
});
}).listen(8080);
