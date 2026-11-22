import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const S=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`;
const B=[(a,b)=>a+b|0,(a,b)=>a-b|0,Math.imul,(a,b)=>a==-2147483648&&b==-1?a:a/b|0,(a,b)=>b==-1?0:a%b|0,(a,b)=>Math.floor((a>>>0)/(b>>>0))|0,(a,b)=>(a>>>0)%(b>>>0)|0,,(a,b)=>a&b,(a,b)=>a|b,(a,b)=>a^b,,(a,b)=>a<<(b&31),(a,b)=>a>>(b&31),(a,b)=>a>>>(b&31)|0,,(a,b)=>+(a==b),(a,b)=>+(a<b),(a,b)=>+((a>>>0)<(b>>>0))];
function r(p,g){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
let s=0,c=0,l=0,j=0,t=0,q=0,y;
const d=e=>[o.subarray(0,l),e];
for(;;){
if(t===1e6)return d(10);
if(q<0||q>=n)return d(9);
const z=p[q],w=S.charCodeAt(z)-32;
if(!w)return d(5);
const v=w-1,u=v>>4;
if(q+u>=n)return d(9);
t++;
const x=q+1+u,a=(v>>2)&3,b=v&3;
if(s<a)return d(2);
if(s-a+b>256)return d(3);
q=x;
switch(z){
case 0:return d(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1],s++;break;
case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 6:D[s]=D[s-2],s++;break;
case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const y=((p[x-2]|p[x-1]<<8)<<16)>>16;
let k=z===48;
if(!k){const h=D[--s];k=z===49?h===0:h!==0;}
if(k)q=x+y;
break;
}
case 51:
if(c===64)return d(7);
C[c++]=x;q=p[x-2]|p[x-1]<<8;
break;
case 52:
if(c===0)return d(8);
q=C[--c];
break;
case 64:case 65:{
const y=D[s-1];
if(y<0||y>=256)return d(6);
if(z===64)D[s-1]=M[y];else{M[y]=D[s-2];s-=2;}
break;
}
case 80:
if(l+(y=Buffer.from(D[s-1]+'')).length>65536)return d(11);
o.set(y,l);l+=y.length;s--;
break;
case 81:
if(l+1>65536)return d(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=j<g.length?g[j++]:-1;break;
case 83:return d(D[--s]&255);
default:
if(z>18&&z<23&&D[s-1]===0)return d(4);
s-=2,D[s]=B[z-16](D[s],D[s+1]),s++;
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
const k=I+'/'+id,y=O+'/'+id,[u,e]=r(readFileSync(k+'/program.bin'),readFileSync(k+'/input.bin'));
mkdirSync(y,{recursive:true});
writeFileSync(y+'/stdout.bin',u);
writeFileSync(y+'/exit.txt',e+'\n');
}
