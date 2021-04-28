class Wheel {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;
    this.done = false;
    this.continue = true;
    this.words = ["SMASHING", "FANTASTIC", "TERRIFIC", "BRILLIANT", "SPLENDID", "MARVELOUS"];
  }

  update(){
    if(this.continue){
      wctx.fillStyle = "rgb(0, 255, 255)";
      wctx.clearRect(0, 0, 500, 100);
      this.timer+=10;
      for(let j = 0; j < this.words.length; j++){
        for(let i = 0; i < this.words[j].length; i++){
          let current = this.words[j].charAt(i);
          wctx.save();
          wctx.translate(i*50+25 + (250-this.words[j].length*25), (this.timer+j*50)%300) - 100;
          wctx.fillStyle = "rgb(0, 0, 0, 0.6)";
          wctx.fillRect(-25, -25, 50, 50);
          wctx.fillStyle = "rgb(255, 255, 255)";
          wctx.fillText(current, -22, 22);
          wctx.restore();
        }
      }
      ctx.drawImage(wc, 0, 50, 500, 50, 0, this.y, 500, 50);
      if(this.done && this.timer%50 == 20){
        this.continue = false;
        let current = this.words[5-(((this.timer%300+180)/50)%6)];
        for(let i = 0; i < current.length; i++){
          letters.push(new Letter(275-current.length*25+50*i, this.y+25, current.charAt(i)));
        }
      }
    }
  }
}
