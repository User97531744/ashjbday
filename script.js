var c = document.getElementById("canv");
var ctx = c.getContext("2d");
var wc = document.getElementById("wheel");
var wctx = wc.getContext("2d");
ctx.font = "60px Arial";
wctx.font = "60px Arial";
var wheel = new Wheel(250, 240);
var timer = 50;
var bg = get_image("Untitled.png");
console.log(bg);

Engine = Matter.Engine;
Body = Matter.Body;
Vertices = Matter.Vertices;
    //Render = Matter.Render,
World = Matter.World;
    //Composites = Matter.Composites,
Composite = Matter.Composite;
Bodies = Matter.Bodies;
engine = Engine.create();


World.add(engine.world, Bodies.rectangle(0, 400, 10, 8000, {isStatic: true}));
World.add(engine.world, Bodies.rectangle(500, 400, 10, 8000, {isStatic: true}));
World.add(engine.world, Bodies.rectangle(250, 800, 500, 10, {isStatic: true}));

//engine.world.gravity.x = 0;
//engine.world.gravity.y = 0;

//var field = new Field(w, h);
//var boxA = Bodies.rectangle(400, 200, 80, 80);
//var ball = new Ball(w/2, h/2, 20);
//var ballB = Bodies.circle(460, 10, 40, 2);
var letters = [];
var fake_letters = [];
var click = 0;

var line1 = "HOPE YOU";
var line2 = "HAVE A";
var line3 = "DAY";
for(let i = 0; i < line1.length; i++){
  letters.push(new Letter(75+i*50, 100, line1.charAt(i)));
}

//new Letter(200, 200, "H"), new Letter(400, 200, "H")];
//engine.world.gravity = 0;
document.addEventListener("DOMContentLoaded", start);

function start(){
  setInterval(function(){
    screen_ratio = window.screen.width/window.screen.height;    //fill screen
    if(screen_ratio < 5/8){
      c.style.width = window.screen.width + "px";
      c.style.height = window.screen.width/(5/8) + "px";
    }
    else {
      c.style.width = window.screen.height*(5/8) + "px";
      c.style.height = window.screen.height + "px";
    }

    Engine.update(engine, 16);
    ctx.drawImage(bg, 0, 0, 500, 800);
    if(timer > 0)
      position_letters();
    if(click > 0)
      timer--;
    console.log(timer)
    //render(letters);
    draw_letters();
    draw_fake_letters();
    wheel.update();
    if(timer == 0){
      for(let i = 0; i < letters.length; i++){
        Matter.Body.setAngularVelocity(letters[i].object, Math.random()*2-1)
        Matter.Body.setVelocity(letters[i].object, {x: Math.random()*4-2, y: -Math.random()*5})
      }
    }
  }, 20);
}
//render(letters);

function position_letters(){
  for(let i = 0; i < letters.length; i++){
    let current = letters[i];
    Matter.Body.setPosition(current.object, {x: current.x, y: current.y})
  }
}

function draw_letters(){
  ctx.fillStyle = "rgb(0, 0, 0, 0.6)";
  for(let i = 0; i < letters.length; i++){
    let current = letters[i].object;
    ctx.save();
    ctx.translate(current.position.x, current.position.y);
    ctx.rotate(current.angle);
    ctx.fillRect(-25, -25, 50, 50);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(letters[i].letter, -22, 22);
    ctx.restore();
  }
}

function draw_fake_letters(){
  for(let i = 0; i < line2.length; i++){
    let current = letters[i].object;
    ctx.save();
    ctx.translate(125+i*50, 175);
    ctx.fillRect(-25, -25, 50, 50);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(line2.charAt(i), -22, 22);
    ctx.restore();
  }
  for(let i = 0; i < line3.length; i++){
    let current = letters[i].object;
    ctx.save();
    ctx.translate(200+i*50, 350);
    ctx.fillRect(-25, -25, 50, 50);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText(line3.charAt(i), -22, 22);
    ctx.restore();
  }
}
// for(let i = 0; i < line3.length; i++){
//   fake_letters.push(new Letter(200+i*50, 400, line3.charAt(i)));
// }

function render(bodies) {     //Draw matter objects to canvas
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#00F';
  ctx.fillStyle = '#0FF';
  ctx.beginPath();
  for (var i = 0; i < bodies.length; i++) {
    var vertices = bodies[i].object.vertices;
    console.log(bodies[i].object);
    ctx.moveTo(vertices[0].x, vertices[0].y);

    for (var j = 1; j < vertices.length; j += 1) {
      ctx.lineTo(vertices[j].x, vertices[j].y);
    }
    ctx.lineTo(vertices[0].x, vertices[0].y);
  }
  ctx.fill();
  ctx.stroke();
}

function get_image(location)
{
  base_image = new Image();
  base_image.src = location;
  return base_image;
}

document.getElementById("body").addEventListener("mouseup", function() {
  console.log(click)
  click++;
  wheel.done = true;
  if(click >= 2){
    for(let i = 0; i < letters.length; i++){
      Matter.Body.setAngularVelocity(letters[i].object, Math.random()*2-1)
      Matter.Body.setVelocity(letters[i].object, {x: Math.random()*4-2, y: -Math.random()*5})
    }
  }
});
