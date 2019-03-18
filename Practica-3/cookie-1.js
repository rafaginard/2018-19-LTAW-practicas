var http = require('http');
var url = require('url');
var fs = require('fs');

const PORT = 8080

console.log("Arrancando servidor en puerto " + PORT)

//-- Configurar y lanzar el servidor. Por cada peticion recibida
//-- se imprime un mensaje en la consola
http.createServer((req, res) => {

  //-- Mostrar en la consola el recurso al que se accede
  var q = url.parse(req.url, true);
  console.log("Petición: " + q.pathname)

  //-- Leer las cookies
  var cookie = req.headers.cookie;
  console.log("Cookie: " + cookie)

  //-- Segun el recurso al que se accede
  switch (q.pathname) {

    //-- Pagina principal
    case "/":
      fs.readFile("./index.html", function(err, data) {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
        return
      });
      break;

    //-- Pagina de acceso
    case "/client-2.js":
      fs.readFile("./client-2.js", function(err, data) {
        //-- Generar el mensaje de respuesta
        res.writeHead(200, {'Content-Type': 'application/javascript'});
        res.write(data);
        res.end();
        return
      });
      break;

    case "/myquery":

      content = `
        {
          "productos": ["FPGA", "RISC-V", "74ls00"]
        }
        `
      res.setHeader('Content-Type', 'application/json')
      res.write(content);
      res.end();

      return
      break
    //-- Se intenta acceder a un recurso que no existe
    default:
      content = "Error";
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain')
      res.write(content);
      res.end();

  }
  //-- Generar el mensaje de respuesta

}).listen(PORT);
