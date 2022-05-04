let currentCounter = 121;
let restarWithKey = false;
const counterTimer = setInterval(() => {
  currentCounter--;
  const counterElement = document.getElementById("counter");
  counterElement.setAttribute(
    "text",
    `width:50;value:Kill them All in ${currentCounter}s;color:#c19f9f;height:100`
  );
  if (currentCounter == 0) {
    lost();
  }
}, 1000);

const shoot = () => {
  const bullet = document.createElement("a-sphere");
  let pos = myCamera.getAttribute("position");
  bullet.setAttribute("position", pos);
  bullet.setAttribute("velocity", getDirection(myCamera, 50));
  bullet.setAttribute("dynamic-body", true);
  bullet.setAttribute("radius", 0.00001);
  bullet.setAttribute("src", "");
  bullet.setAttribute("transparent", true);
  myScene.appendChild(bullet);
  bullet.addEventListener("collide", shootCollided);
};

const shootCollided = (event) => {
  if (event.detail.body.el.id === "floor") {
    console.log("Hit the floor");
    event.detail.target.el.removeEventListener("collide", shootCollided);
    myScene.removeChild(event.detail.target.el);
  } else if (event.detail.body.el.className === "target") {
    console.log("Hit the target!");
    event.detail.target.el.removeEventListener("collide", shootCollided);
    const id = event.detail.body.el.id;
    const oldAmong = document.getElementById("among" + id);
    const newAmong = document.getElementById("amongDead" + id);

    myScene.removeChild(event.detail.target.el);
    myScene.removeChild(event.detail.body.el);
    oldAmong.setAttribute("visible", false);
    newAmong.setAttribute("visible", true);
  }
  if (document.querySelectorAll(".target").length === 0) {
    console.log("You win!");
    won();
  }
};
const lost = () => {
  const AmongDead1 = document.getElementById("amongDead1");
  const AmongDead2 = document.getElementById("amongDead2");
  const AmongDead3 = document.getElementById("amongDead3");
  const AmongDead4 = document.getElementById("amongDead4");
  const AmongDead5 = document.getElementById("amongDead5");
  const Among1 = document.getElementById("among1");
  const Among2 = document.getElementById("among2");
  const Among3 = document.getElementById("among3");
  const Among4 = document.getElementById("among4");
  const Among5 = document.getElementById("among5");
  AmongDead1.setAttribute("visible", false);
  AmongDead2.setAttribute("visible", false);
  AmongDead3.setAttribute("visible", false);
  AmongDead4.setAttribute("visible", false);
  AmongDead5.setAttribute("visible", false);
  Among1.setAttribute("visible", true);
  Among2.setAttribute("visible", true);
  Among3.setAttribute("visible", true);
  Among4.setAttribute("visible", true);
  Among5.setAttribute("visible", true);

  Among1.setAttribute("position", "-2.808 0.110 -5.074");
  Among2.setAttribute("position", "-1.271 0.110 -6.084");
  Among3.setAttribute("position", "0.082 0.120 -7.669");
  Among4.setAttribute("position", "2.121 0.110 -7.971");
  Among5.setAttribute("position", "3.801 0.110 -4.477");

  Among1.setAttribute("rotation", "0 40.000 0");
  Among2.setAttribute("rotation", "0 32.000 0");
  Among3.setAttribute("rotation", "0 15.000 0");
  Among4.setAttribute("rotation", "0 -10.000 0");
  Among5.setAttribute("rotation", "0 -41.000 0");
  const counterElement = document.getElementById("counter");
  counterElement.setAttribute("position", "23.325 9.272 -35.792");
  counterElement.setAttribute(
    "text",
    `width:50;value:You Lost!;color:#c19f9f;height:100`
  );
  clearInterval(counterTimer);
  myCamera.setAttribute("position", "1.180 2.600 -1.359");
  myCamera.setAttribute("rotation", "-8.480 -723.760 0.000");
  restarWithKey = true;
};

const won = () => {
  const AmongDead1 = document.getElementById("amongDead1");
  const AmongDead2 = document.getElementById("amongDead2");
  const AmongDead3 = document.getElementById("amongDead3");
  const AmongDead4 = document.getElementById("amongDead4");
  const AmongDead5 = document.getElementById("amongDead5");
  const Among1 = document.getElementById("among1");
  const Among2 = document.getElementById("among2");
  const Among3 = document.getElementById("among3");
  const Among4 = document.getElementById("among4");
  const Among5 = document.getElementById("among5");
  AmongDead1.setAttribute("visible", false);
  AmongDead2.setAttribute("visible", false);
  AmongDead3.setAttribute("visible", false);
  AmongDead4.setAttribute("visible", false);
  AmongDead5.setAttribute("visible", false);
  Among1.setAttribute("visible", false);
  Among2.setAttribute("visible", false);
  Among3.setAttribute("visible", false);
  Among4.setAttribute("visible", false);
  Among5.setAttribute("visible", false);

  AmongDead1.setAttribute("position", "-2.808 0.110 -5.074");
  AmongDead2.setAttribute("position", "-1.271 0.110 -6.084");
  AmongDead3.setAttribute("position", "0.082 0.120 -7.669");
  AmongDead4.setAttribute("position", "2.121 0.110 -7.971");
  AmongDead5.setAttribute("position", "3.801 0.110 -4.477");

  AmongDead1.setAttribute("rotation", "0 40.000 0");
  AmongDead2.setAttribute("rotation", "0 32.000 0");
  AmongDead3.setAttribute("rotation", "0 15.000 0");
  AmongDead4.setAttribute("rotation", "0 -10.000 0");
  AmongDead5.setAttribute("rotation", "0 -41.000 0");

  const counterElement = document.getElementById("counter");
  counterElement.setAttribute("position", "23.325 9.272 -35.792");
  counterElement.setAttribute(
    "text",
    `width:50;value:You Won!;color:#c19f9f;height:100`
  );
  clearInterval(counterTimer);
  myCamera.setAttribute("position", "1.180 2.600 -1.359");
  myCamera.setAttribute("rotation", "-8.480 -723.760 0.000");
  restarWithKey = true;
};
document.onkeydown = (event) => {
  if (restarWithKey) window.location.reload();
  if (event.which == 32) {
    shoot();
  }
};
