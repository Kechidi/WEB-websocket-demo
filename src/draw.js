let listeCanvas = [];
export const canvas = document.getElementById("canvas");
listeCanvas.push(canvas);
export const context = canvas.getContext("2d");

const rect = canvas.getBoundingClientRect();

export function drawLine(context, x1, y1, x2, y2, color) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

export function draw(drawing) {
    drawLine(
      document.getElementById(drawing.id).getContext("2d"),
      drawing.oldX,
      drawing.oldY,
      drawing.x,
      drawing.y,
      drawing.color
    );
  }

export const afficheCanvas = e => {
    listeCanvas.forEach(canvas => {
      canvas.style.visibility = "hidden";
      canvas.style.opacity = "0";
      canvas.style.display = "none";
    });

    document.getElementById("canvas" + id).style.visibility = "hidden";
    document.getElementById("canvas" + id).style.opacity = "0";
    document.getElementById("canvas" + id).style.display = "none";
    document.getElementById("canvas" + id).getBoundingClientRect();
  };