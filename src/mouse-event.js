import { ws, color } from "./index";
let isDrawing = false;
let x = 0;
let y = 0;
export const mousedownEvent = (e) => {
  x =
    e.offsetX *
    (1000 / document.getElementById(e.target.id).getBoundingClientRect().width);
  y =
    e.offsetY *
    (1000 /
      document.getElementById(e.target.id).getBoundingClientRect().height);
  isDrawing = true;
};

export const mousemoveEvent = (e) => {
  if (isDrawing === true) {
    var drawing = {
      oldX: x,
      oldY: y,
      x:
        e.offsetX *
        (1000 /
          document.getElementById(e.target.id).getBoundingClientRect().width),
      y:
        e.offsetY *
        (1000 /
          document.getElementById(e.target.id).getBoundingClientRect().height),
      color: color,
      id: document.getElementById(e.target.id).id,
      key: "RLfPPLof;NQo$S4@D[N",
    };

    x =
      e.offsetX *
      (1000 /
        document.getElementById(e.target.id).getBoundingClientRect().width);
    y =
      e.offsetY *
      (1000 /
        document.getElementById(e.target.id).getBoundingClientRect().height);

    ws.send(JSON.stringify(drawing));
  }
};

export const mouseupEvent = (e) => {
  if (isDrawing === true) {
    x = 0;
    y = 0;
    isDrawing = false;
  }
};
