export class CanvasEngine{
  constructor(canvas){
    this.canvas=canvas;
    this.ctx=canvas.getContext('2d');
    this.w=0;this.h=0;this.cx=0;this.cy=0;this.radius=0;
    this.view={rot:0,tilt:.58,zoom:1};
    this.pointer={down:false,lastX:0,lastY:0,dragTarget:null};
    this.resize=this.resize.bind(this);
    addEventListener('resize',this.resize);
    this.resize();
  }
  resize(){
    const d=devicePixelRatio||1;
    this.canvas.width=innerWidth*d;
    this.canvas.height=innerHeight*d;
    this.ctx.setTransform(d,0,0,d,0,0);
    this.w=innerWidth;this.h=innerHeight;
    this.cx=this.w/2;
    this.cy=this.h*.32;
    this.radius=Math.min(this.w,this.h)*.32*this.view.zoom;
  }
  clear(){
    const x=this.ctx;
    x.clearRect(0,0,this.w,this.h);
    const bg=x.createRadialGradient(this.cx,this.cy,10,this.cx,this.cy,this.radius*2.9);
    bg.addColorStop(0,'#06244a');
    bg.addColorStop(1,'#010711');
    x.fillStyle=bg;
    x.fillRect(0,0,this.w,this.h);
  }
  project(px,py){
    const dx=px-this.cx, dy=py-this.cy;
    const r=this.view.rot;
    const rx=dx*Math.cos(r)-dy*Math.sin(r);
    const ry=dx*Math.sin(r)+dy*Math.cos(r);
    const depth=.72+.28*Math.cos(rx/300);
    return [this.cx+rx, this.cy+ry*this.view.tilt*depth];
  }
  drawDome(){
    const x=this.ctx,R=this.radius;
    x.save();
    x.translate(this.cx,this.cy);
    x.rotate(this.view.rot*.25);
    x.strokeStyle='#00e5ff55';
    x.lineWidth=2;
    for(let i=0;i<11;i++){
      x.beginPath();
      x.ellipse(0,0,R*(1-i*.052),R*.45*(1-i*.052),0,Math.PI,Math.PI*2);
      x.stroke();
    }
    for(let i=-6;i<=6;i++){
      x.beginPath();
      x.ellipse(0,0,R*.18,R*.45,i*.16,Math.PI,Math.PI*2);
      x.stroke();
    }
    x.restore();
  }
  drawTrail(points,color='0,229,255'){
    const x=this.ctx;
    for(let i=1;i<points.length;i++){
      const a=i/points.length*.62;
      x.strokeStyle=`rgba(${color},${a})`;
      x.lineWidth=2;
      x.beginPath();x.moveTo(points[i-1][0],points[i-1][1]);x.lineTo(points[i][0],points[i][1]);x.stroke();
    }
  }
  line(points,color='#00ffff',width=5){
    const x=this.ctx;
    x.save();x.strokeStyle=color;x.lineWidth=width;x.shadowBlur=20;x.shadowColor=color;
    x.beginPath();x.moveTo(points[0][0],points[0][1]);
    for(let i=1;i<points.length;i++)x.lineTo(points[i][0],points[i][1]);
    x.stroke();x.restore();
  }
  orb(px,py,r,color){
    const x=this.ctx;
    x.save();x.shadowBlur=30;x.shadowColor=color;x.fillStyle='#fff';
    x.beginPath();x.arc(px,py,r,0,Math.PI*2);x.fill();
    x.fillStyle=color;x.beginPath();x.arc(px,py,r*.48,0,Math.PI*2);x.fill();
    x.restore();
  }
}
