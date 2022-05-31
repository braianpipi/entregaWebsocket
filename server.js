// >>Consigna 1: Modificar el ultimo entregable para que disponga de un canal de websocket
// que permita representar, por debajo del formulario de ingreso, una tabla con la lista
// de productos en tiempo real.
//     - Puede haber varios clientes conectados simultaneamente y en cada uno de ellos
//     se reflejaran los cambios que se realicen en los productos sin necesidad de
//     recargar la vista.
//     -Cuando un cliente se conecte , recibira la lista de productos a representar
//     en la vista.

//     >> Aspectos a incluir en el entregable:
//     Para construir la tabla dinamica con los datos recibidos por el websocket utilizar
//     Handlebars en el frontend. Considera usar archivos publicos para alojar la plantilla
//     vacia, y obtenerla usando la funcion fetch(). Recordar que fetch devuelve una promesa .

//     >>Consigna 2: Añadiremos al proyecto un canal de chat entre los clientes y
//     el servidor.

//     >>Aspectos a incluir en el entregable :
//         -En la parte inferior del formulario de ingrese se presentara el centro de
//         mesajes almacenados en el servidor, donde figuren los mensajes de todos los
//         usuarios identificados por su email .
//         -El formato a representar será: email (texto negrita azul)[fecha y hora (DD/MM/YYYY
//         HH:MM:SS)](texto normal en marron ) : mensaje(texto italic en verde )
//         - Ademas incorporar dos elementos de entrada: uno para que el usuario ingrese
//         su email (obligatorio para poder utilizar el chat ) y otro para ingresar mensajes y
//         enviarlos de mediante un boton.
//         -Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable)
const express = require("express");
const { Server: ioServer } = require("socket.io");
const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const io = new ioServer(httpServer);
const morgan = require("morgan");
const routes = require("./routes/routes");
const Messages = require("./dataBaseMessages/message");
let content = new Messages('./dataBaseMessages/message.txt')
const PORT = 8080;
// middleware
app.use(express.static(__dirname + "/views"));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.set("views", "./public/views");
app.set("view engine", "ejs");

let messages = [];
async function chat(){
  let messages = await content.getAll()
  io.sockets.emit('mensajesEnviados', messages)
}
io.on('connection', socket => {
  console.log("New user connected. Soquet ID : ", socket.id);

  chat()
  socket.on('newMessage', async data =>{
    await content.save(data)
    let messages = await content.getAll()
    io.sockets.emit('mensajesEnviados', messages)
  })
});


httpServer.listen(PORT, () => {
  console.log(`server on port ${PORT}`);
});







































// const getChat = async ()=>{
//   try{
//     const res = await fetch('./dataBaseMessages/message.txt')
//     const mess = await res.json() 
//   }catch{
//     console.error()
//   }
// }