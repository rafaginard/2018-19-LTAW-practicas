var http = require('http');
var url = require('url');
var fs = require('fs');
console.log("Arrancando servidor...")
//var fs=require('fs');
//var data=fs.readFileSync('products.json', 'utf8');
//var words=JSON.parse(data);
//MIRAR SI FUNCIONA POR QUE ESTO ES UNA MIERDA....
http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;

  //-- Leer las cookies
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)
  console.log(q.pathname)

  if (q.pathname == ('/')){
    if (!cookie) {
      filename += "index.html";

    //-- Hay definida una Cookie.
    } else {
       filename += "index2.html";
    }

    res.statusCode = 200;
  }
  else if (q.pathname == ('/login')){
    res.setHeader('Set-Cookie', 'user=Rafa')
    q.pathname = "/index2.html"
    filename = "." + q.pathname
  }
  fs.readFile(filename, function(err, data){
    console.log(filename);
    //Control por si el server no funciona.
    if (err){
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Fount");
    }

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
  console.log("Peticion Atendida")
  });
}).listen(8080);
