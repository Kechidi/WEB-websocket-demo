import "./index.css";
import nameGenerator from "./name-generator";
import isDef from "./is-def";
import {draw,createCanvasElement} from "./draw";
import { mousedownEvent,mousemoveEvent,mouseupEvent } from "./mouse-event";
import { messages,aside ,listeCanvas,canvas,sendInput,sendForm,newDrawingButton} from "./Variable";



export let color = getCookie("color");
export const ws = new WebSocket("ws://" + window.location.host + "/socket");
let line;
let idCanvas;
const cookies = document.cookie.split(";");
let wsname = cookies.find(function(c) {
  if (c.match(/wsname/) !== null) return true;
  return false;
});



if (isDef(wsname)) {
  wsname = wsname.split("=")[1];
} else {
  wsname = nameGenerator();
  document.cookie = "wsname=" + encodeURIComponent(wsname);
}
if (color) {
  color = "#" + color;
  // Vérification supplémentaire pour s'assurer que la couleur est au format correct.
  if (!/^#[0-9A-F]{6}$/i.test(color)) {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.cookie = "color=" + color.substring(1);
  }
} else {
  color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  document.cookie = "color=" + color.substring(1);
}




document.querySelector("header>p").textContent = decodeURIComponent(wsname);
ws.onopen = event => {
  console.log("We are connected.");
};



ws.onmessage = event => {
  if (event.data.includes("RLfPPLof;NQo$S4@D[N")) {
    var parsedDrawing = JSON.parse(
      event.data.substring(event.data.indexOf("{"))
    );
    draw(parsedDrawing);
  } else if (event.data.includes("F-HDR};R`oTayx=8Hs4")) {
    let id = JSON.parse(event.data.substring(event.data.indexOf("{")));

    createCanvasElement(id.idCanvas);
    idCanvas = id.idCanvas++;

  } else {
    line = document.createElement("li");
    line.textContent = event.data;
    messages.appendChild(line);
    aside.scrollTop = aside.scrollHeight;
  }
};



listeCanvas.push(canvas);
canvas.addEventListener("mousedown", e => mousedownEvent(e));
canvas.addEventListener("mousemove", e => mousemoveEvent(e));
window.addEventListener("mouseup", e => mouseupEvent(e));
newDrawingButton.addEventListener("click", () => {
  const newDrawing = { key: "F-HDR};R`oTayx=8Hs4", idCanvas: idCanvas + 1 };
  ws.send(JSON.stringify(newDrawing));
});
sendForm.addEventListener("submit", sendMessage, true);
sendForm.addEventListener("blur", sendMessage, true);



function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}


function sendMessage(event) {
  event.preventDefault();
  event.stopPropagation();
  if (sendInput.value !== "") {
    // Send data through the WebSocket
    ws.send(sendInput.value);
    sendInput.value = "";
  }
}