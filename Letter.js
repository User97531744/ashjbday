class Letter {
  constructor(x, y, letter) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.options = {
      isStatic: false,
      restitution: 0.8
    };

    this.object = Bodies.rectangle(this.x, this.y, 50, 50, this.options);

    World.add(engine.world, this.object);
  }
}
