let nextLevel = "index.html";

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
    myScene.removeChild(oldAmong);
    newAmong.setAttribute("visible", true);
  }
  if (document.querySelectorAll(".target").length === 0) {
    console.log("You win!");
  }
};

document.onkeydown = (event) => {
  if (event.which == 32) {
    shoot();
  }
};
