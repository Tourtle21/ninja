setTimeout(function() {
  window.scrollTo(0, 0);
}, 100);
let treeAmount = 500;
let bullSpawn = 14;
let goblinSpawn = 14;
let goblinDistance = 250;
let goblinReloadSpeed = 300;
let goblinThrowDistance = 100;
let goblinSpearSpeed = 6;
let bullSpeed = 6;
let gameStarted = false;
let speed = 6;
let ninjaStarSpeed = 10;
let ninjaStarLife = 40;
let reloadTime = 100;
let reloaded = reloadTime;
let player1 = document.getElementById("player1");
let game = document.getElementById("game");
let safeZone = document.getElementById("safeZone");
let gameWidth = parseInt(getComputedStyle(game).width.slice(0, -2));
let gameHeight = parseInt(getComputedStyle(game).height.slice(0, -2));
let ninjaStars = [];
let bulls = [];
let goblins = [];
let spears = [];
let playerDX;
let playerDY;
// player2 = document.getElementById("player2");
let width1 = parseInt(getComputedStyle(player1).width.slice(0, -2));
// let width2 = parseInt(getComputedStyle(player2).width.slice(0, -2));
let height1 = parseInt(getComputedStyle(player1).height.slice(0, -2));
// let height2 = parseInt(getComputedStyle(player2).height.slice(0, -2));
let centerX = window.innerWidth / 2 - width1;
let centerY = window.innerHeight / 2 - height1;
let gameX1 = gameWidth / 2;
let gameY1 = gameHeight / 2;
let x1 = centerX + gameWidth / 2;
let y1 = centerY + gameHeight / 2;
let rotDeg = 0;
safeZone.style.left = centerX + gameWidth / 2 - 250 + "px";
safeZone.style.top = centerY + gameHeight / 2 - 250 + "px";
// let x2 = parseInt(getComputedStyle(player2).left.slice(0, -2));
// let y2 = parseInt(getComputedStyle(player2).top.slice(0, -2));
let allKeys = {};
document.addEventListener("keydown", function(e) {
  allKeys[e.key] = true;
});
document.addEventListener("keyup", function(e) {
  allKeys[e.key] = false;
});
spawnMap();
document.addEventListener("mousedown", function(e) {
  if (reloaded >= reloadTime && !isSafe()) {
    reloaded = 0;
    mouseX = e.clientX - centerX - width1;
    mouseY = e.clientY - centerY - height1;
    if (mouseX > 0) {
      mouseDX = Math.cos(Math.atan(mouseY / mouseX));
      mouseDY = Math.sin(Math.atan(mouseY / mouseX));
    } else {
      mouseDX = -Math.cos(Math.atan(mouseY / mouseX));
      mouseDY = -Math.sin(Math.atan(mouseY / mouseX));
    }
    x = x1 + width1 / 2;
    y = y1 + width1 / 2;
    shootBullet(x, y, mouseDX, mouseDY, playerDX, playerDY);
  }
});
setInterval(function() {
  playerDX = 0;
  playerDY = 0;
  reloaded += 1;
  centerX = window.innerWidth / 2 - width1;
  centerY = window.innerHeight / 2 - height1;
  moveMiniMe();
  if (ninjaStars.length > 0) {
    moveNinjaStars();
  }
  if (allKeys["d"] && x1 < gameWidth - width1) {
    gameX1 += speed;
    playerDX = speed;
    x1 += speed;
    rotDeg = 90;
  }
  if (allKeys["a"] && x1 > 0) {
    gameX1 -= speed;
    playerDX = -speed;
    x1 -= speed;
    rotDeg = -90;
  }
  if (allKeys["w"] && y1 > 0) {
    if (allKeys["d"] && x1 < gameWidth - width1) {
      x1 -= speed - Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      gameX1 -= speed - Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      playerDX = Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      y1 -= Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      gameY1 -= Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      playerDY = -Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      rotDeg = 45;
    } else if (allKeys["a"] && x1 > 0) {
      x1 += speed - Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      gameX1 += speed - Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      playerDX = -Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      y1 -= Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      gameY1 -= Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      playerDY = -Math.sin(Math.atan(Math.sqrt(2) / 2)) * speed;
      rotDeg = -45;
    } else {
      y1 -= speed;
      gameY1 -= speed;
      playerDY = -speed;
      rotDeg = 0;
    }
  }
  if (allKeys["s"] && y1 < gameHeight - height1) {
    if (allKeys["d"] && x1 < gameWidth - width1) {
      x1 -= speed - Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      gameX1 -= speed - Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      playerDX = Math.cos(Math.atan(Math.sqrt(2) / 2)) * speed;
      y1 += -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      gameY1 += -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      playerDY = -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      rotDeg = 135;
    } else if (allKeys["a"] && x1 > 0) {
      x1 += speed - Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      gameX1 += speed - Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      playerDX = -Math.cos(Math.atan(-Math.sqrt(2) / 2)) * speed;
      y1 += -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      gameY1 += -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      playerDY = -Math.sin(Math.atan(-Math.sqrt(2) / 2)) * speed;
      rotDeg = -135;
    } else {
      gameY1 += speed;
      y1 += speed;
      playerDY = speed;
      rotDeg = 180;
    }
  }
  if (isSafe()) {
    safeZone.style.border = "5px dashed green";
  } else {
    safeZone.style.border = "5px dashed red";
  }
  game.style.left = -gameX1 + "px";
  game.style.top = -gameY1 + "px";

  player1.style.left = x1 + "px";
  player1.style.top = y1 + "px";
  player1.style.transform = "rotate(" + rotDeg + "deg)";
}, 10);

function isSafe() {
  outSideX = centerX + gameWidth / 2;
  outSideY = centerY + gameHeight / 2;
  if (
    x1 < outSideX - 250 ||
    x1 > outSideX + 200 ||
    y1 < outSideY - 250 ||
    y1 > outSideY + 200
  ) {
    if (bulls.length > 0) {
      moveBulls();
    }
    if (goblins.length > 0) {
      moveGoblins();
    }
    if (spears.length > 0) {
      moveSpears();
    }
    return false;
  } else {
    return true;
  }
}
function circleCollision(cx1, cx2, cy1, cy2, cr1, cr2) {
  distanceBetweenCirclesSquared =
    (cx2 - cx1) * (cx2 - cx1) + (cy2 - cy1) * (cy2 - cy1);
  if (distanceBetweenCirclesSquared < (cr1 + cr2) ** 2) {
    return true;
  } else {
    return false;
  }
}
function moveNinjaStars() {
  for (i = 0; i < ninjaStars.length; i++) {
    ninjaStars[i].life += 1;
    ninjaStars[i].x += ninjaStars[i].addedX + ninjaStars[i].dx * ninjaStarSpeed;
    ninjaStars[i].y += ninjaStars[i].addedY + ninjaStars[i].dy * ninjaStarSpeed;
    ninjaStars[i].star.style.left = ninjaStars[i].x + "px";
    ninjaStars[i].star.style.top = ninjaStars[i].y + "px";
    for (let j = 0; j < bulls.length; j++) {
      if (
        circleCollision(
          ninjaStars[i].x,
          bulls[j].x + 30,
          ninjaStars[i].y,
          bulls[j].y + 30,
          12.5,
          40
        )
      ) {
        game.removeChild(bulls[j].bull);
        bulls.splice(j, 1);
      }
    }
    for (let j = 0; j < goblins.length; j++) {
      if (
        circleCollision(
          ninjaStars[i].x,
          goblins[j].x + 30,
          ninjaStars[i].y,
          goblins[j].y + 30,
          12.5,
          30
        )
      ) {
        game.removeChild(goblins[j].goblin);
        goblins.splice(j, 1);
      }
    }
    if (ninjaStars[i].life > ninjaStarLife) {
      game.removeChild(ninjaStars[i].star);
      ninjaStars.shift();
    }
  }
}
function moveBulls() {
  for (i = 0; i < bulls.length; i++) {
    bull = bulls[i];
    if (circleCollision(bull.x, x1, bull.y, y1, 40, 25)) {
      game.removeChild(player1);
    }
    bullD = moveTowardsPlayer(bull.x, bull.y);
    bull.x -= bullD.dx * bullSpeed;
    bull.y -= bullD.dy * bullSpeed;
    bull.bull.style.left = bull.x + "px";
    bull.bull.style.top = bull.y + "px";
    bull.bull.style.transform = "rotate(" + bullD.degrees + "deg)";
  }
}
function moveGoblins() {
  for (i = 0; i < goblins.length; i++) {
    goblin = goblins[i];
    goblin.reloaded += 1;
    goblinD = moveTowardsPlayer(goblin.x, goblin.y);
    goblin.goblin.style.transform = "rotate(" + goblinD.degrees + "deg)";
    if (!circleCollision(goblin.x, x1, goblin.y, y1, goblinDistance, 25)) {
      goblin.x -= goblinD.dx * bullSpeed;
      goblin.y -= goblinD.dy * bullSpeed;
      goblin.goblin.style.left = goblin.x + "px";
      goblin.goblin.style.top = goblin.y + "px";
      goblin.goblin.style.transform = "rotate(" + goblinD.degrees + "deg)";
    } else if (goblin.reloaded >= goblinReloadSpeed) {
      goblin.reloaded = 0;
      spawnSpear(
        goblin.x + 33,
        goblin.y - 1,
        goblinD.dx,
        goblinD.dy,
        goblinD.degrees
      );
    }
  }
}
function moveSpears() {
  for (i = 0; i < spears.length; i++) {
    spear = spears[i];
    if (spear.distance < goblinThrowDistance) {
      if (circleCollision(spear.x, x1 + 30, spear.y, y1 + 30, 12.5, 25)) {
        game.removeChild(player1);
      }
      spear.distance += 1;
      spear.x -= spear.dx * goblinSpearSpeed;
      spear.y -= spear.dy * goblinSpearSpeed;
      spear.spear.style.left = spear.x + "px";
      spear.spear.style.top = spear.y + "px";
    } else {
      game.removeChild(spear.spear);
      spears.splice(i, 1);
    }
  }
}
function moveTowardsPlayer(x, y) {
  distanceX = x - x1;
  distanceY = y - y1;
  degrees = 0;
  if (distanceX >= 0) {
    dx = Math.cos(Math.atan(distanceY / distanceX));
    dy = Math.sin(Math.atan(distanceY / distanceX));
    degrees = Math.atan(distanceY / distanceX) * (180 / Math.PI) - 90;
  } else {
    dx = -Math.cos(Math.atan(distanceY / distanceX));
    dy = -Math.sin(Math.atan(distanceY / distanceX));
    degrees = -Math.atan(distanceY / -distanceX) * (180 / Math.PI) + 90;
  }
  return { dx: dx, dy: dy, degrees: Math.round(degrees) };
}
function shootBullet(x, y, dx, dy, addedX, addedY) {
  ninjaStar = document.createElement("div");
  ninjaStar.className = "ninjaStar";
  ninjaStar.style.left = x + "px";
  ninjaStar.style.top = y + "px";
  ninjaStar.style.position = "absolute";
  ninjaStars.push({
    star: ninjaStar,
    x: x,
    y: y,
    dx: dx,
    dy: dy,
    addedX: addedX,
    addedY: addedY,
    life: 0
  });
  game.appendChild(ninjaStar);
}
function spawnSpear(x, y, dx, dy, degrees) {
  spear = document.createElement("div");
  spear.className = "spear";
  spear.style.left = x + "px";
  spear.style.top = y + "px";
  spear.style.transform = "rotate(" + degrees + "deg)";
  spears.push({
    spear: spear,
    x: x,
    y: y,
    dx: dx,
    dy: dy,
    distance: 0
  });
  game.appendChild(spear);
}
function moveMiniMe() {
  percentX = x1 / gameWidth;
  percentY = y1 / gameWidth;
  document.getElementById("miniMe").style.left = percentX * 100 + "px";
  document.getElementById("miniMe").style.top = percentY * 100 + "px";
}
function spawnMap() {
  //TREES
  for (i = 0; i <= treeAmount; i++) {
    tree = document.createElement("div");
    tree.className = "tree";
    let x = Math.floor(Math.random() * Math.floor(gameWidth - 30));
    let y = Math.floor(Math.random() * Math.floor(gameHeight - 30));
    tree.style.left = x + "px";
    tree.style.top = y + "px";
    game.appendChild(tree);
  }
  //BULLS
  for (i = 0; i <= bullSpawn; i++) {
    bull = document.createElement("div");
    bull.className = "bull";
    let x = Math.floor(Math.random() * Math.floor(gameWidth - 40));
    let y = Math.floor(Math.random() * Math.floor(gameHeight - 40));
    bull.style.left = x + "px";
    bull.style.top = y + "px";
    bulls.push({
      bull: bull,
      x: x,
      y: y
    });
    game.appendChild(bull);
  }
  //GOBLINS
  for (i = 0; i <= goblinSpawn; i++) {
    goblin = document.createElement("div");
    goblin.className = "goblin";
    let x = Math.floor(Math.random() * Math.floor(gameWidth - 40));
    let y = Math.floor(Math.random() * Math.floor(gameHeight - 40));
    goblin.style.left = x + "px";
    goblin.style.top = y + "px";
    goblins.push({
      goblin: goblin,
      x: x - 10,
      y: y,
      reloaded: 100
    });
    game.appendChild(goblin);
  }
}
