
const socket = io();
const div = document.getElementById("messagesContainer");
const btn = document.getElementById("send");
const inputText = document.getElementById("message");
const inputUser = document.getElementById("email");

getNow = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};
btn.addEventListener("click", () => {
  e.preventDefault();
  const personMessage = {
    email: inputUser.value,
    date: getNow(),
    message: inputText.value,
  };
  io.sockets.emit("newMessage", personMessage);
  inputUser.value = "";
  inputText.value = "";
});

socket.on("mensajesEnviados", (messages) => {
  if (messages.length > 0) {
    div.innerHTML = messages
      .map((message) => {
        return `<p><span class="mail">${message.email} </span>
                <span class="fecha">[${message.date}]: </span>
                <span class="msj">${message.message}</span></p>`;
      })
      .join(" ");
  } else {
    div.innerHTML = "";
  }
});
