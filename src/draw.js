import { mousedownEvent,mousemoveEvent,mouseupEvent } from "./mouse-event";
import { listeCanvas } from "./Variable";
 function drawLine(context, x1, y1, x2, y2, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

export function draw(drawing) {
  const targetCanvas = document.getElementById(drawing.id);
  if (targetCanvas) {
    drawLine(
      targetCanvas.getContext("2d"),
      drawing.oldX,
      drawing.oldY,
      drawing.x,
      drawing.y,
      drawing.color
    );
  } else {
    // Ajoutez cette partie pour envoyer une demande de création de canvas
    // si le canvas n'existe pas pour cet utilisateur.
    const newDrawing = { key: "F-HDR};R`oTayx=8Hs4", idCanvas: parseInt(drawing.id.replace("canvas", "")) };
    ws.send(JSON.stringify(newDrawing));
  }
}


export function createCanvasElement(canvasId) {
  let room = document.createElement("input");
  room.addEventListener("click", (e) => afficheCanvas(e));

  document.getElementById("drawing-list").appendChild(room);
  room.setAttribute("type", "button");
  room.setAttribute("id", "dessin" + canvasId);
  room.setAttribute("value", "Dessin " + canvasId);

  let zoneDessin = document.createElement("canvas");
  zoneDessin.setAttribute("id", "canvas" + canvasId);
  zoneDessin.setAttribute("width", 1000);
  zoneDessin.setAttribute("height", 1000);
  zoneDessin.className = "classcanvas";
  zoneDessin.addEventListener("mousedown", e => mousedownEvent(e));
  zoneDessin.addEventListener("mousemove", e => mousemoveEvent(e));

  document.getElementById("section").appendChild(zoneDessin);

  listeCanvas.push(zoneDessin);

  room.addEventListener("click", e => afficheCanvas(e));
}


const afficheCanvas = (e) => {
  console.log(e.id);
  const id = e.target.id.replace("dessin", "");

  listeCanvas.forEach((canvas) => {
    canvas.style.visibility = "hidden";
    canvas.style.opacity = "0";
    canvas.style.display = "none";
  });

  const targetCanvas = document.getElementById("canvas" + id);
  if (targetCanvas) {
    targetCanvas.style.visibility = "visible";
    targetCanvas.style.opacity = "1";
    targetCanvas.style.display = "block";
  }
};
