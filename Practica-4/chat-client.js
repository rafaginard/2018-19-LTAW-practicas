function main() {
  console.log("Hola!!!!-------------")

  //-- Crear el websocket
  var socket = io();

  //-- Obtener los elementos de interfaz:

  //-- Boton de envio de mensaje
  var send = document.getElementById('send')

  //-- Parrafo para mostrar mensajes recibidos
  var display = document.getElementById('display')
  var UsersConnected = document.getElementById("Users_Names")
  //-- Caja con el mensaje a enviar
  var msg = document.getElementById("msg")

  //-- Log de usuarios conectados y desconectados
  var logger = document.getElementById("logger")
  //-- Cuando se aprieta el botón de enviar...
  send.onclick = () => {

    //-- Enviar el mensaje, con el evento "new_message"
    socket.emit('new_message', msg.value);

    //-- Lo notificamos en la consola del navegador
    console.log("Mensaje emitido")
  }

  //-- Cuando se reciba un mensaje del servidor se muestra
  //-- en el párrafo
  socket.on('new_message', function(msg, user){
    display.innerHTML = msg;
  });

  socket.on('list', function(list){
    $("#UsersConnected").empty();
    list.forEach(function(element){
      $("#UsersConnected").append($('<li>'+ element + '</li>'));
    });
  });

  socket.on('new_user', function(msg, user){
    console.log(user);
    $("#logger").empty();
    $("#logger").append($('<li>'+ user + " " + msg + '</li>'));

    //User_Name.innerHTML = user;
    console.log("NUEVO USUARIO");
  });

  socket.on('User_Disconnect', function(msg, user){
    $("#logger").empty();
    $("#logger").append($('<li>' + msg + '</li>'));
    console.log("USUARIO SE HA DESCONECTADO");
  });
}
