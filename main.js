import './style.css'
import platform from './imgs/platform.png'
import background from './imgs/bg-11.jpg'
import cloud from './imgs/cloud.png'
const canvas=document.querySelector('#canvas')

canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext('2d')
const gravity=2;
class Player{
  constructor(){
    this.position={
      x:100,
      y:0
    }
    this.width=30
    this.height=30
    this.velocity={
      x:0,
      y:.1
    }
  }

  draw(){
    c.fillStyle='red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

  }
  update(){
    this.draw()
   
      this.position.x+=this.velocity.x
          this.position.y+=this.velocity.y

    if(this.position.y+this.height+this.velocity.y<=canvas.height){
      this.velocity.y+=gravity
    }else if(this.position.y>canvas.height){
      console.log('you lost')
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
const platforms=[new Platform({x:0,y:innerHeight-20, img:platform}), new Platform({x:250, y:500, img:platform}), new Platform({x:500,y:550, img:platform})]
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
    player.velocity.x=5
    scrollOffset+=5
   }else if(keys.left.pressed && player.position.x>=100){
    player.velocity.x=-5
    scrollOffset-=5
   }else{
    player.velocity.x=0
    if (keys.right.pressed) {
      platforms.forEach(platform=>{
         platform.position.x-=5
         scrollOffset+=5
      })
     clouds.forEach(cloud=>{
        cloud.position.x-=5
      })
    }else if (keys.left.pressed) {
     platforms.forEach(platform=>{
       platform.position.x+=5
       scrollOffset-=5
      })
     clouds.forEach(cloud=>{
        cloud.position.x+=5
      })
    }
   }

  //platform collision detection
  platforms.forEach(platform=>{
    if (player.position.y+player.height<=platform.position.y && player.position.y+player.height+player.velocity.y>=platform.position.y && player.position.x>=platform.position.x && player.position.x<platform.position.x+platform.width) {
      player.velocity.y=0
    }      
  }) 
  if (scrollOffset>2000) {
    console.log('win')
  }
}

animate()

addEventListener('keydown',({keyCode})=>{
  switch(keyCode){
    case 65:
      console.log('left')
      keys.left.pressed=true
    break;
    case 83:
      console.log('down')
    break;
     case 68:
      console.log('right')
      keys.right.pressed=true
    break;
     case 87:
      console.log('up')
      player.velocity.y-=20
    break;
  }
})

addEventListener('keyup',({keyCode})=>{
  switch(keyCode){
    case 65:
      console.log('left')
      keys.left.pressed=false
    break;
    case 83:
      console.log('down')
    break;
     case 68:
      console.log('right')
      keys.right.pressed=false
    break;
     case 87:
      console.log('up')
      player.velocity.y-=0
    break;
  }
})