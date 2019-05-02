var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var CLIENTS = [];
var id;
var max_clients = 10;

//--Servir la pagina principal
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
  console.log("Página principal: /")
});

//--Servir la pagina con los comandos
app.get('/help', function(req, res){
  res.sendFile(__dirname + '/comandos.html');
  console.log("Página de comandos solicitada")
});

//--Servir lista de conectados
app.get('/list', function(req, res){
  if(CLIENTS.length == 0){
    res.send("Hay 0 usuarios conectados");
  }
    n = String(CLIENTS.length)
    res.send("Hay " + n + " usuarios conectados");
  console.log("Numero de usuarios conectados")
});

//--Servir saludo desde el servidor
app.get('/hello', function(req, res){
  res.send("Hola desde el SERVIDOR!");
  console.log("Saludo desde el servidor")
});

//--Servir fecha actual
app.get('/date', function(req, res){
  var today = new Date();
  var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = "La fecha de hoy es: " + date +' '+ time;
  res.send(dateTime);
  console.log("Pedimos la fecha")
});
//-- Servir el cliente javascript
app.get('/chat-client.js', function(req, res){
  res.sendFile(__dirname + '/chat-client.js');
  console.log("Fichero js solicitado")
});

//-- Lanzar el servidor
http.listen(3000, function(){
  console.log('listening on *:3000');
});


//-- Evento: Nueva conexion recibida
//-- Un nuevo cliente se ha conectado!
io.on('connection', function(socket){
  id = Generate_ID(CLIENTS)

  console.log("--> Usuario " + id + " se ha conectado!");
  new_user = {"Name": "Usuario " + id, clave: id, ws: socket}
  CLIENTS.push(new_user);

  //NUEVO USUARIO CONECTADO
  message = '--> Usuario Conectado!';
  sendAll('new_user', message);
  sendClients(CLIENTS);
  console.log(CLIENTS.length);
  //-- Detectar si el usuario se ha desconectado
  socket.on('disconnect', function(){

    CLIENTS.forEach(function(element){
      if (element.ws.id == socket.id){
        console.log("--> Usuario " + element.Name + " se ha desconectado!");
        CLIENTS.splice( CLIENTS.indexOf(element), 1 );
        message = element.Name + ' --> Usuario Desconectado!';
      }
    });

    sendAll('User_Disconnect', message);
    sendClients(CLIENTS);
    console.log(CLIENTS.length);
  });

  //-- Detectar si se ha recibido un mensaje del cliente
  socket.on('new_message', msg => {

    //-- Notificarlo en la consola del servidor
    console.log("Mensaje recibido: " + msg)
    if (msg == '/help'){
      respuesta = "<p>Lista de Comandos</p>" +
          "<ul>" +
            "<li>comando /help ---->Muestra una lista con todos los comandos soportados</li>" +
            "<li>comando /list ---->Devuleve el numero de usuarios conectados</li>" +
            "<li>comando /hello ---->El servidor nos devuelve un saludo</li> " +
            "<li>comando /date ---->Nos devolvera la fecha</li> " +
          "</ul>"
      socket.emit('new_message', respuesta);
      console.log("Ha pedido la lista de comandos");

    }else if (msg == '/date'){

      var today = new Date();
      var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = "La fecha de hoy es: " + date +' '+ time;
      socket.emit('new_message', dateTime);

    }else if (msg == '/list'){

      if(CLIENTS.length == 0){
        socket.emit('new_message', "Hay 0 usuarios conectados");
      }
        n = String(CLIENTS.length)
        socket.emit('new_message', "Hay " + n + " usuarios conectados");
      console.log("Numero de usuarios conectados")

    }else if (msg == '/hello'){

      socket.emit('new_message', "Hola desde el SERVIDOR!");
      console.log("Saludo desde el servidor")
    }
    //-- Emitir un mensaje a todos los clientes conectados
    else {

      io.emit('new_message', msg);
    }

  })

function sendClients(list){
  list_names = [];
  list.forEach(function(element){
    console.log(element.Name);
    list_names.push(element.Name)
  });
  console.log(list_names);
  io.emit("list", list_names)
}

function sendAll(type, message){
  CLIENTS.forEach(function(element){
    console.log("SE LO ENVIO A: " + element.Name)
    io.emit(type, message, element.Name)
  });
}

function Generate_ID(List){
  id = Math.floor(Math.random() * (max_clients - 1)) + 1;
  for (j=0; j <= CLIENTS.length; j++){
    if (id == CLIENTS.clave){
      Generate_ID(CLIENTS);
    }
  }
  return id;
}

});
