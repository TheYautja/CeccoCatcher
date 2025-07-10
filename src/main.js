import './style.css'
import Phaser, { CANVAS, Physics, Scene } from 'phaser'

const tamanho = {
  width:1200,
  height:700,
}

const hitboxPorco = {
  width: 100,
  height: 75,
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
const speedDown = 600



class gameScene extends Phaser.Scene{
  constructor(){
    super("scene-game")
    this.player
    this.cursor
    this.playerSpeed = speedDown + 50
    this.target
    this.points=0
    this.textPods
    this.textParceria
    this.podQueimado
    this.magrao
  }



  preload(){
    this.load.image("fundo","/assets/Guarita.jpg")
    this.load.image("player","/assets/bustoDoCecco.png");
    this.load.image("pod","/assets/podpequeno.png");
    this.load.image("podQueimado","/assets/pngegg,png");
  }





  create(){

//fundo
  this.add.image(0,0,"fundo").setOrigin(0,0);

//player
  this.player = this.physics.add.image(0,tamanho.height-100,"player").setOrigin(0,0);
  /* this.player.setSize(hitboxCecco.width, hitboxCecco.height);
  this.player.setOffset(); */
  this.player.setImmovable(true);
  this.player.body.allowGravity = false
  this.player.setCollideWorldBounds(true);
  this.player.setSize(this.player.width - this.player.width / 4, this.player.height / 6).setOffset(
  this.player.width / 10, this.player.height - this.player.height / 10);

//pod 
  this.target = this.physics.add.image(100, 100, "pod").setOrigin(0, 0);
  this.target.setSize(hitboxPod.width, hitboxPod.height);
  this.target.setOffset(0, 0);
  this.target.setMaxVelocity(speedDown);
  this.physics.add.overlap(this.target, this.player,this.targetHit, null, this)



//pod queimado
  this.podQueimado = this.physics.add.image(100, 100, "podQueimado").setOrigin(0, 0);
  this.podQueimado.setSize(hitboxPod.width, hitboxPod.height);
  this.podQueimado.setOffset(0, 0);
  this.podQueimado.setMaxVelocity(speedDown);
  this.physics.add.overlap(this.podQueimado, this.player, this.perder, null, this)



  //texto magrão
  this.magrao=this.add.text(100,100, "teste",{
    font: "25px Arial",
    fill: "#000000",
  })


  this.cursor = this.input.keyboard.createCursorKeys();


  this.textParceria = this.add.text(tamanho.width - 1000, 10, "Ajude o Cecconelo a Pegar 30 Pods!!",{
    font: "25px Arial",
    fill: "#000000",
  })

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

if (this.podQueimado.y >= tamanho.height){
  this.podQueimado.setY(0);
  this.podQueimado.setX(this.getRandomX())
}
  
if(this.targetHit=true){
  this.magrao.setText(`peguei o pod`)
}


    const {left,right} = this.cursor

    if (left.isDown){
      this.player.setVelocityX(-this.playerSpeed); 
    }else if (right.isDown){
      this.player.setVelocityX(this.playerSpeed);
    }else {
      this.player.setVelocityX(0)
    }


    if (this.points > 29){
      this.textParceria.setText(`isso aí magrão, parceria`)
      this.points = 0;
    };

  }

getRandomX(){
  return Math.floor(Math.random()* tamanho.width);
};




targetHit (){
  this.target.setY(0);
  this.target.setX(this.getRandomX());
  this.points++;
  this.textPods.setText(`Pods: ${this.points}`)
}

perder (){
  this.podQueimado.setY(0);
  this.target.setX(this.getRandomX());
  this.points=0;
  this.textParceria.setText(`perdeu bixo`)
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
