import './index.css';
import nameGenerator from './name-generator';
import isDef from './is-def';
import{mousedownEvent,mousemoveEvent,mouseupEvent}  from "./mouse-event";
import {draw,afficheCanvas,canvas,context} from "./draw"
import {messages,aside,room,zoneDessin } from "./Variable";

// Store/retrieve the name in/from a cookie.
const cookies = document.cookie.split(';');
console.log(cookies)
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});
if (isDef(wsname)) {
  wsname = wsname.split('=')[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}

export let color = cookies.find(function(c) {
  if (c.match(/color/) !== null) return true;
  return false;
});
if (isDef(color)) {
  color = "#" + color.split("%")[1];
} else {
  color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.cookie = "color=" + encodeURIComponent(color);
}

// Set the name in the header
document.querySelector('header>p').textContent = decodeURIComponent(wsname);

// Create a WebSocket connection to the server
export const ws = new WebSocket("ws://" + window.location.host + "/socket");

// We get notified once connected to the server
ws.onopen = (event) => {
  console.log("We are connected.");
};
let line;
let idCanvas;
// Listen to messages coming from the server. When it happens, create a new <li> and append it to the DOM.
ws.onmessage = event => {
  if (event.data.includes("RLfPPLof;NQo$S4@D[N")) {
    var parsedDrawing = JSON.parse(
      event.data.substring(event.data.indexOf("{"))
    );
    draw(parsedDrawing);
  } else if (event.data.includes("F-HDR};R`oTayx=8Hs4")) {
    let id = JSON.parse(event.data.substring(event.data.indexOf("{")));
    room.setAttribute("type", "button");
    room.setAttribute("id", "dessin" + id.idCanvas);
    room.setAttribute("value", "Dessin " + id.idCanvas);
    zoneDessin.setAttribute("id", "canvas" + id.idCanvas);
    zoneDessin.setAttribute("width", 1000);
    zoneDessin.setAttribute("height", 1000);
    zoneDessin.className = "classcanvas";
    zoneDessin.addEventListener("mousedown", e => mousedownEvent(e));
    zoneDessin.addEventListener("mousemove", e => mousemoveEvent(e));
    document.getElementById("section").appendChild(zoneDessin);
    listeCanvas.push(zoneDessin);
    room.addEventListener("click", e => afficheCanvas(e));
    idCanvas = id.idCanvas++;
  } else {
    line = document.createElement("li");
    line.textContent = event.data;
    messages.appendChild(line);
    aside.scrollTop = aside.scrollHeight;
  }
};



// Retrieve the input element. Add listeners in order to send the content of the input when the "return" key is pressed.
function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();
  if (sendInput.value !== '') {
    // Send data through the WebSocket
    ws.send(sendInput.value);
    sendInput.value = '';
  }
}
// Gestionnaires d'évènements
canvas.addEventListener("mousedown", e => mousedownEvent(e));
canvas.addEventListener("mousemove", e => mousemoveEvent(e));
window.addEventListener("mouseup", e => mouseupEvent(e));

const sendForm = document.querySelector('form');
const sendInput = document.querySelector('form input');
sendForm.addEventListener('submit', sendMessage, true);
sendForm.addEventListener('blur', sendMessage, true);

