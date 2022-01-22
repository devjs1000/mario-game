import './style.css'
import platform from './imgs/platform.png'
import background from './imgs/bg-11.jpg'
import cloud from './imgs/cloud.png'
import pillar from './imgs/pillar.png'
import jumpSprite from './sprite/Punk_jump.png'
import standingSprite from './sprite/Punk_idle.png'
import runSprite from './sprite/Punk_run.png'

const canvas=document.querySelector('#canvas')

canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext('2d')
const gravity=2;
function createImg(src){
  let img=new Image()
  img.src=src
  return img
}
class Player{
  constructor(){
    this.position={
      x:100,
      y:0
    }
    this.image=new Image()
    this.image.src=standingSprite
    this.width=66
    this.height=150
    this.frames=1
    this.speed=5
    this.jump=20
    this.finish=false
    this.sprites={
      stand:{
        img:standingSprite
      },
      run:{
        img:runSprite
      },
      jump:{
        img:jumpSprite
      }
    }
    this.activeSprite=this.sprites.stand.img
    this.velocity={
      x:0,
      y:.1
    }
  }

  draw(){
if (!this.finish) {
  c.drawImage(createImg(this.activeSprite),48*this.frames, 0,48, 48, this.position.x, this.position.y, this.width, this.height)
}else{
  c.font = "60px Arial";
c.fillText("You Won", canvas.width/2-30, canvas.height/2-30)
}
  }
  update(){
    this.frames++
    this.draw()
if(this.frames>3){
  this.frames=1
}
      this.position.x+=this.velocity.x
          this.position.y+=this.velocity.y

    if(this.position.y+this.height+this.velocity.y<=canvas.height){
      this.velocity.y+=gravity
    }else if(this.position.y>canvas.height){
      this.position.x=100
      this.velocity.y=0
      this.position.y=0
    }
  }
}

class Platform{
  constructor({x,y, img}){
    this.position={
      x,y
    }

    this.image=new Image()
    this.image.src=img
    this.width=this.image.width
    this.height=this.image.height
  }

  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class Decor{
  constructor({x,y, img}){
    this.position={
      x,y
    }

    this.image=new Image()
    this.image.src=img
    this.width=this.image.width
    this.height=this.image.height
  }

  draw(){
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const player=new Player()
const decors=[
  new Decor({x:0, y:0, img:background})
]
const clouds=[
  new Decor({x:0, y:0, img:cloud})
]
const platforms=[new Platform({x:0,y:innerHeight-20, img:platform})]

//adding land
  for (let i=1;i<5;i++){
    platforms.push(new Platform({x:i*250, y:Math.random()*(500-400)+400, img:platform}), new Platform({x:i*250+500,y:Math.random()*(550), img:platform}))
  }

  for (let i=6;i<12;i++){
    platforms.push(new Platform({x:i*250, y:Math.random()*(550-450)+450, img:pillar}))

  }
const keys={
  right:{
    pressed:false
  },
  left:{
    pressed:false
  }
}
let scrollOffset=0
function animate(){

  requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width, canvas.height)
   decors.forEach(decor=>{
        decor.draw()
      })

      platforms.forEach(platform=>{
        platform.draw()
      })
    player.update()

       clouds.forEach(cloud=>{
        cloud.draw()
      })

   if(keys.right.pressed && player.position.x<=400){
    player.velocity.x=player.speed
    scrollOffset+=player.speed
   }else if(keys.left.pressed && player.position.x>=100){
    player.velocity.x=-player.speed
    scrollOffset-=player.speed
   }else{
    player.velocity.x=0
    if (keys.right.pressed) {
      platforms.forEach(platform=>{
         platform.position.x-=player.speed
         scrollOffset+=player.speed
      })
     clouds.forEach(cloud=>{
        cloud.position.x-=player.speed
      })
    }else if (keys.left.pressed) {
     platforms.forEach(platform=>{
       platform.position.x+=player.speed
       scrollOffset-=player.speed
      })
     clouds.forEach(cloud=>{
        cloud.position.x+=player.speed
      })
    }
   }

  //platform collision detection
  platforms.forEach(platform=>{
    if (player.position.y+player.height<=platform.position.y && player.position.y+player.height+player.velocity.y>=platform.position.y && player.position.x>=platform.position.x && player.position.x<platform.position.x+platform.width) {
      player.velocity.y=0
    }
  })

  //win scenario
  if (scrollOffset>10000) {
    player.finish=true
  }else{
    player.finish=false
  }
}

animate()

addEventListener('keydown',({keyCode})=>{
  switch(keyCode){
    case 65:
      keys.left.pressed=true
      player.activeSprite=player.sprites.run.img
    break;
    case 83:
    break;
     case 68:
      keys.right.pressed=true
      player.activeSprite=player.sprites.run.img

    break;
     case 87:
      player.velocity.y-=player.jump
      player.activeSprite=player.sprites.jump.img

    break;
  }
})

addEventListener('keyup',({keyCode})=>{
  switch(keyCode){
    case 65:
      keys.left.pressed=false
      player.activeSprite=player.sprites.stand.img

    break;
    case 83:
    break;
     case 68:
      keys.right.pressed=false
      player.activeSprite=player.sprites.stand.img

    break;
     case 87:
     player.activeSprite=player.sprites.stand.img

    break;
  }
})
