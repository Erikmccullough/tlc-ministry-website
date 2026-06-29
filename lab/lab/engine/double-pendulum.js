export class DoublePendulum{
  constructor(){this.reset();}
  reset(){
    this.a1=1.35;this.a2=1.9;this.v1=0;this.v2=0;
    this.L1=145;this.L2=125;this.m1=1;this.m2=1;this.g=.7;this.damping=.997;
  }
  kick(){this.v1+=(Math.random()-.5)*.3;this.v2+=(Math.random()-.5)*.4;}
  set(key,value){if(key in this)this[key]=Number(value);}
  step(){
    const {a1,a2,v1,v2,L1,L2,m1,m2,g,damping}=this;
    const n1=-g*(2*m1+m2)*Math.sin(a1);
    const n2=-m2*g*Math.sin(a1-2*a2);
    const n3=-2*Math.sin(a1-a2)*m2*(v2*v2*L2+v1*v1*L1*Math.cos(a1-a2));
    const den=L1*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
    const acc1=(n1+n2+n3)/den;

    const n4=2*Math.sin(a1-a2);
    const n5=v1*v1*L1*(m1+m2);
    const n6=g*(m1+m2)*Math.cos(a1);
    const n7=v2*v2*L2*m2*Math.cos(a1-a2);
    const den2=L2*(2*m1+m2-m2*Math.cos(2*a1-2*a2));
    const acc2=n4*(n5+n6+n7)/den2;

    this.v1=(v1+acc1)*damping;
    this.v2=(v2+acc2)*damping;
    this.a1+=this.v1;
    this.a2+=this.v2;
  }
  points(cx,cy){
    const x1=cx+this.L1*Math.sin(this.a1);
    const y1=cy+this.L1*Math.cos(this.a1);
    const x2=x1+this.L2*Math.sin(this.a2);
    const y2=y1+this.L2*Math.cos(this.a2);
    return [[cx,cy],[x1,y1],[x2,y2]];
  }
}
