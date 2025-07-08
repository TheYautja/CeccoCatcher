import './style.css'
import Phaser, { CANVAS, Physics, Scene } from 'phaser'

const tamanho = {
  width:1200,
  height:700,
}

const hitboxPod = {
  width:50,
  height:90,
}

const hitboxCecco = {
  width:200,
  height:180,
}


//gravidade
const speedDown = 400



class gameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.cursor
    this.playerSpeed = speedDown + 50
    this.target
    this.points=0
    this.textPods
  }



  preload(){
    this.load.image("fundo","/assets/Guarita.jpg")
    this.load.image("player","/assets/bustoDoCecco.png");
    this.load.image("pod","/assets/podpequeno.png");
  }
  create(){
  this.add.image(0,0,"fundo").setOrigin(0,0);


  this.player = this.physics.add.image(0,tamanho.height-100,"player").setOrigin(0,0);
  /* this.player.setSize(hitboxCecco.width, hitboxCecco.height);
  this.player.setOffset(); */

  this.player.setImmovable(true);
  this.player.body.allowGravity = false
  this.player.setCollideWorldBounds(true);
  
  this.player.setSize(this.player.width-this.player.width/4, this.player.height/6).setOffset(
  this.player.width/10, this.player.height - this.player.height/10);


  this.target = this.physics.add.image(100, 100, "pod").setOrigin(0, 0);
  this.target.setSize(hitboxPod.width, hitboxPod.height);
  this.target.setOffset(0, 0);

  this.target.setMaxVelocity(speedDown);

  this.physics.add.overlap(this.target, this.player,this.targetHit, null, this)

  this.cursor = this.input.keyboard.createCursorKeys();

  this.textPods = this.add.text(tamanho.width - 120, 10, "Pontos:0" , {
    font: "25px Arial",
    fill: "#000000",
  });



  }
  update(){

if (this.target.y >= tamanho.height){
  this.target.setY(0);
  this.target.setX(this.getRandomX())
}

    const {left,right} = this.cursor

    if (left.isDown){
      this.player.setVelocityX(-this.playerSpeed); 
    }else if (right.isDown){
      this.player.setVelocityX(this.playerSpeed);
    }else {
      this.player.setVelocityX(0)
    }
  }

getRandomX(){
  return Math.floor(Math.random()* tamanho.width);
};
z

targetHit (){
  this.target.setY();
  this.target.setX(this.getRandomX());
  this.points++;
  this.textPods.setText(`Pods: ${this.points}`)
}

}



const config = {
  type: Phaser.WEBGL,
  width: tamanho.width,
  height: tamanho.height,
  parent: "telaDoJogo",
  physics:{
    default:'arcade',
      arcade:{gravity:{y:speedDown},
    debug:false}
  },
  scene:[gameScene]
}


const game = new Phaser.Game(config)