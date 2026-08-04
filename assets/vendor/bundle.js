(()=>{var jS=Object.defineProperty;var oe=(i,t,e)=>()=>{if(e)throw e[0];try{return i&&(t=i(i=0)),t}catch(n){throw e=[n],n}};var tb=(i,t)=>()=>{try{return t||i((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},el=(i,t)=>{for(var e in t)jS(i,e,{get:t[e],enumerable:!0})};function eb(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Io(i,t){return new nb[i](t)}function Zx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Vo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function og(){let i=Vo("canvas");return i.style.display="block",i}function Jx(i){js=i}function Kx(){return js}function ko(...i){let t="THREE."+i.shift();js?js("log",t,...i):console.log(t,...i)}function Qx(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function bt(...i){i=Qx(i);let t="THREE."+i.shift();if(js)js("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function qt(...i){i=Qx(i);let t="THREE."+i.shift();if(js)js("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function xs(...i){let t=i.join(" ");t in Y0||(Y0[t]=!0,bt(...i))}function jx(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function si(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Sn[i&255]+Sn[i>>8&255]+Sn[i>>16&255]+Sn[i>>24&255]+"-"+Sn[t&255]+Sn[t>>8&255]+"-"+Sn[t>>16&15|64]+Sn[t>>24&255]+"-"+Sn[e&63|128]+Sn[e>>8&255]+"-"+Sn[e>>16&255]+Sn[e>>24&255]+Sn[n&255]+Sn[n>>8&255]+Sn[n>>16&255]+Sn[n>>24&255]).toLowerCase()}function ae(i,t,e){return Math.max(t,Math.min(e,i))}function ag(i,t){return(i%t+t)%t}function ib(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function sb(i,t,e){return i!==t?(e-i)/(t-i):0}function _l(i,t,e){return(1-e)*i+e*t}function rb(i,t,e,n){return _l(i,t,1-Math.exp(-e*n))}function ob(i,t=1){return t-Math.abs(ag(i,t*2)-t)}function ab(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function lb(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function cb(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hb(i,t){return i+Math.random()*(t-i)}function ub(i){return i*(.5-Math.random())}function db(i){i!==void 0&&($0=i);let t=$0+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fb(i){return i*Rr}function pb(i){return i*Pr}function mb(i){return(i&i-1)===0&&i!==0}function gb(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function _b(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function xb(i,t,e,n,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(s){case"XYX":i.set(a*h,l*d,l*u,a*c);break;case"YZY":i.set(l*u,a*h,l*d,a*c);break;case"ZXZ":i.set(l*d,l*u,a*h,a*c);break;case"XZX":i.set(a*h,l*p,l*f,a*c);break;case"YXY":i.set(l*f,a*h,l*p,a*c);break;case"ZYZ":i.set(l*p,l*f,a*h,a*c);break;default:bt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function me(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vb(){let i={enabled:!0,workingColorSpace:Oo,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ae&&(s.r=vs(s.r),s.g=vs(s.g),s.b=vs(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ae&&(s.r=Lo(s.r),s.g=Lo(s.g),s.b=Lo(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ji?Bo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Oo]:{primaries:t,whitePoint:n,transfer:Bo,toXYZ:J0,fromXYZ:K0,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:t,whitePoint:n,transfer:Ae,toXYZ:J0,fromXYZ:K0,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),i}function vs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Lo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function Pp(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(bt("Texture: Unable to serialize Texture."),{})}function Dp(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}function kp(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){_r.fromArray(i,r);let a=s.x*Math.abs(_r.x)+s.y*Math.abs(_r.y)+s.z*Math.abs(_r.z),l=t.dot(_r),c=e.dot(_r),h=n.dot(_r);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}function Rb(){let i=new ArrayBuffer(4),t=new Float32Array(i),e=new Uint32Array(i),n=new Uint32Array(512),s=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,s[l]=24,s[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,s[l]=-c-1,s[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,s[l]=13,s[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,s[l]=24,s[l|256]=24):(n[l]=31744,n[l|256]=64512,s[l]=13,s[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:s,mantissaTable:r,exponentTable:o,offsetTable:a}}function Xn(i){Math.abs(i)>65504&&bt("DataUtils.toHalfFloat(): Value out of range."),i=ae(i,-65504,65504),gs.floatView[0]=i;let t=gs.uint32View[0],e=t>>23&511;return gs.baseTable[e]+((t&8388607)>>gs.shiftTable[e])}function pl(i){let t=i>>10;return gs.uint32View[0]=gs.mantissaTable[gs.offsetTable[t]+(i&1023)]+gs.exponentTable[t],gs.floatView[0]}function fu(i,t,e,n,s,r){To.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(al.x=r*To.x-s*To.y,al.y=s*To.x+r*To.y):al.copy(To),i.copy(t),i.x+=al.x,i.y+=al.y,i.applyMatrix4(iv)}function Nb(i,t,e,n,s,r,o,a){let l;if(t.side===En?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Yi,a),l===null)return null;bu.copy(a),bu.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(bu);return c<e.near||c>e.far?null:{distance:c,point:bu.clone(),object:i}}function Mu(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,xu),i.getVertexPosition(l,vu),i.getVertexPosition(c,yu);let h=Nb(i,t,e,n,xu,vu,yu,u_);if(h){let d=new I;Ci.getBarycoord(u_,xu,vu,yu,d),s&&(h.uv=Ci.getInterpolatedAttribute(s,a,l,c,d,new lt)),r&&(h.uv1=Ci.getInterpolatedAttribute(r,a,l,c,d,new lt)),o&&(h.normal=Ci.getInterpolatedAttribute(o,a,l,c,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new I,materialIndex:0};Ci.getNormal(xu,vu,yu,u.normal),h.face=u,h.barycoord=d}return h}function Qp(i,t){return i-t}function kb(i,t){return i.z-t.z}function Gb(i,t){return t.z-i.z}function Yb(i,t,e=0){let n=t.itemSize;if(i.isInterleavedBufferAttribute||i.array.constructor!==t.array.constructor){let s=i.count;for(let r=0;r<s;r++)for(let o=0;o<n;o++)t.setComponent(r+e,o,i.getComponent(r,o))}else t.array.set(i.array,e*n);t.needsUpdate=!0}function Sr(i,t){if(i.constructor!==t.constructor){let e=Math.min(i.length,t.length);for(let n=0;n<e;n++)t[n]=i[n]}else{let e=Math.min(i.length,t.length);t.set(new i.constructor(i.buffer,0,e))}}function Pu(i,t,e,n,s,r,o){let a=i.geometry.attributes.position;if(rd.fromBufferAttribute(a,s),od.fromBufferAttribute(a,r),e.distanceSqToSegment(rd,od,tm,b_)>n)return;tm.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(tm);if(!(c<t.near||c>t.far))return{distance:c,point:b_.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function A_(i,t,e,n,s,r,o){let a=fm.distanceSqToPoint(i);if(a<e){let l=new I;fm.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}function lg(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,s(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}function R_(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function $b(i,t){let e=1-i;return e*e*t}function Zb(i,t){return 2*(1-i)*i*t}function Jb(i,t){return i*i*t}function xl(i,t,e,n){return $b(i,t)+Zb(i,e)+Jb(i,n)}function Kb(i,t){let e=1-i;return e*e*e*t}function Qb(i,t){let e=1-i;return 3*e*e*i*t}function jb(i,t){return 3*(1-i)*i*i*t}function tM(i,t){return i*i*i*t}function vl(i,t,e,n,s){return Kb(i,t)+Qb(i,e)+jb(i,n)+tM(i,s)}function eM(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=sv(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=oM(i,t,r,e)),i.length>80*e){a=i[0],l=i[1];let h=a,d=l;for(let u=e;u<s;u+=e){let f=i[u],p=i[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return tc(r,o,e,a,l,c,0),o}function sv(i,t,e,n,s){let r;if(s===_M(i,t,e,n)>0)for(let o=t;o<e;o+=n)r=P_(o/n|0,i[o],i[o+1],r);else for(let o=e-n;o>=t;o-=n)r=P_(o/n|0,i[o],i[o+1],r);return r&&na(r,r.next)&&(nc(r),r=r.next),r}function Br(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(na(e,e.next)||ze(e.prev,e,e.next)===0)){if(nc(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function tc(i,t,e,n,s,r,o){if(!i)return;!o&&r&&uM(i,n,s,r);let a=i;for(;i.prev!==i.next;){let l=i.prev,c=i.next;if(r?iM(i,n,s,r):nM(i)){t.push(l.i,i.i,c.i),nc(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=sM(Br(i),t),tc(i,t,e,n,s,r,2)):o===2&&rM(i,t,e,n,s,r):tc(Br(i),t,e,n,s,r,1);break}}}function nM(i){let t=i.prev,e=i,n=i.next;if(ze(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(s,r,o),d=Math.min(a,l,c),u=Math.max(s,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&ml(s,a,r,l,o,c,p.x,p.y)&&ze(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function iM(i,t,e,n){let s=i.prev,r=i,o=i.next;if(ze(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),_=Math.max(a,l,c),g=Math.max(h,d,u),m=pm(f,p,t,e,n),v=pm(_,g,t,e,n),b=i.prevZ,x=i.nextZ;for(;b&&b.z>=m&&x&&x.z<=v;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&ml(a,h,l,d,c,u,b.x,b.y)&&ze(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&ml(a,h,l,d,c,u,x.x,x.y)&&ze(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==s&&b!==o&&ml(a,h,l,d,c,u,b.x,b.y)&&ze(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=v;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==s&&x!==o&&ml(a,h,l,d,c,u,x.x,x.y)&&ze(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function sM(i,t){let e=i;do{let n=e.prev,s=e.next.next;!na(n,s)&&ov(n,e,e.next,s)&&ec(n,s)&&ec(s,n)&&(t.push(n.i,e.i,s.i),nc(e),nc(e.next),e=i=s),e=e.next}while(e!==i);return Br(e)}function rM(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&pM(o,a)){let l=av(o,a);o=Br(o,o.next),l=Br(l,l.next),tc(o,t,e,n,s,r,0),tc(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function oM(i,t,e,n){let s=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=sv(i,a,l,n,!1);c===c.next&&(c.steiner=!0),s.push(fM(c))}s.sort(aM);for(let r=0;r<s.length;r++)e=lM(s[r],e);return e}function aM(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){let n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function lM(i,t){let e=cM(i,t);if(!e)return t;let n=av(e,i);return Br(n,n.next),Br(e,e.next)}function cM(i,t){let e=t,n=i.x,s=i.y,r=-1/0,o;if(na(i,e))return e;do{if(na(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){let d=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&rv(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){let d=Math.abs(s-e.y)/(n-e.x);ec(e,i)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&hM(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function hM(i,t){return ze(i.prev,i,t.prev)<0&&ze(t.next,i,i.next)<0}function uM(i,t,e,n){let s=i;do s.z===0&&(s.z=pm(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,dM(s)}function dM(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(s=n,n=n.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=o}r.nextZ=null,e*=2}while(t>1);return i}function pm(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function fM(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function rv(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function ml(i,t,e,n,s,r,o,a){return!(i===o&&t===a)&&rv(i,t,e,n,s,r,o,a)}function pM(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!mM(i,t)&&(ec(i,t)&&ec(t,i)&&gM(i,t)&&(ze(i.prev,i,t.prev)||ze(i,t.prev,t))||na(i,t)&&ze(i.prev,i,i.next)>0&&ze(t.prev,t,t.next)>0)}function ze(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function na(i,t){return i.x===t.x&&i.y===t.y}function ov(i,t,e,n){let s=Ou(ze(i,t,e)),r=Ou(ze(i,t,n)),o=Ou(ze(e,n,i)),a=Ou(ze(e,n,t));return!!(s!==r&&o!==a||s===0&&Fu(i,e,t)||r===0&&Fu(i,n,t)||o===0&&Fu(e,i,n)||a===0&&Fu(e,t,n))}function Fu(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ou(i){return i>0?1:i<0?-1:0}function mM(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&ov(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function ec(i,t){return ze(i.prev,i,i.next)<0?ze(i,t,i.next)>=0&&ze(i,i.prev,t)>=0:ze(i,t,i.prev)<0||ze(i,i.next,t)<0}function gM(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function av(i,t){let e=mm(i.i,i.x,i.y),n=mm(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function P_(i,t,e,n){let s=mm(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function nc(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function mm(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function _M(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}function I_(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function L_(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}function vM(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}function yM(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){let s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}function D_(i,t,e){let n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}function $r(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(U_(s))s.isRenderTargetTexture?(bt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(U_(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function Cn(i){let t={};for(let e=0;e<i.length;e++){let n=$r(i[e]);for(let s in n)t[s]=n[s]}return t}function U_(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function SM(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cg(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ye.workingColorSpace}function Cr(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function lv(i){function t(s,r){return i[s]-i[r]}let e=i.length,n=new Array(e);for(let s=0;s!==e;++s)n[s]=s;return n.sort(t),n}function _m(i,t,e){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=i[a+l]}return s}function cv(i,t,e,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(t.push(r.time),e.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(t.push(r.time),e.push(o)),r=i[s++];while(r!==void 0)}function TM(i,t,e,n,s=30){let r=i.clone();r.name=t;let o=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*s;if(!(p<e||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=Cr(d,c.times.constructor),c.values=Cr(u,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function wM(i,t=0,e=i,n=30){n<=0&&(n=30);let s=e.tracks.length,r=t/n;for(let o=0;o<s;++o){let a=e.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;let c=i.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=a.times.length-1,_;if(r<=a.times[0]){let m=h,v=d-h;_=a.values.slice(m,v)}else if(r>=a.times[p]){let m=p*d+h,v=m+d-h;_=a.values.slice(m,v)}else{let m=a.createInterpolant(),v=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(v,b)}l==="quaternion"&&new pn().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let v=m*f+u;if(l==="quaternion")pn.multiplyQuaternionsFlat(c.values,v,_,0,c.values,v);else{let b=f-u*2;for(let x=0;x<b;++x)c.values[v+x]-=_[x]}}}return i.blendMode=bf,i}function AM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Vr;case"vector":case"vector2":case"vector3":case"vector4":return ua;case"color":return ha;case"quaternion":return kr;case"bool":case"boolean":return Ji;case"string":return Ki}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function EM(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=AM(i.type);if(i.times===void 0){let e=[],n=[];cv(i.keys,e,n,"value"),i.times=e,i.values=n}return t.parse!==void 0?t.parse(i):new t(i.name,i.times,i.values,i.interpolation)}function F_(i){try{let t=i.slice(i.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}function RM(){this._document.hidden===!1&&this.reset()}function $_(i,t){return i.distance-t.distance}function Mm(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)Mm(r[o],t,e,!0)}}function hv(i){let t=[];i.isBone===!0&&t.push(i);for(let e=0;e<i.children.length;e++)t.push(...hv(i.children[e]));return t}function Ke(i,t,e,n,s,r,o){Wu.set(s,r,o).unproject(n);let a=t[i];if(a!==void 0){let l=e.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],Wu.x,Wu.y,Wu.z)}}function XM(i,t){let e=i.image&&i.image.width?i.image.width/i.image.height:1;return e>t?(i.repeat.x=1,i.repeat.y=e/t,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2):(i.repeat.x=t/e,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0),i}function qM(i,t){let e=i.image&&i.image.width?i.image.width/i.image.height:1;return e>t?(i.repeat.x=t/e,i.repeat.y=1,i.offset.x=(1-i.repeat.x)/2,i.offset.y=0):(i.repeat.x=1,i.repeat.y=e/t,i.offset.x=0,i.offset.y=(1-i.repeat.y)/2),i}function YM(i){return i.repeat.x=1,i.repeat.y=1,i.offset.x=0,i.offset.y=0,i}function Tf(i,t,e,n){let s=$M(n);switch(e){case yf:return i*t;case Yc:return i*t/s.components*s.byteLength;case Sa:return i*t/s.components*s.byteLength;case Es:return i*t*2/s.components*s.byteLength;case $c:return i*t*2/s.components*s.byteLength;case Sf:return i*t*3/s.components*s.byteLength;case wn:return i*t*4/s.components*s.byteLength;case Zc:return i*t*4/s.components*s.byteLength;case ba:case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ta:case wa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Kc:case jc:return Math.max(i,16)*Math.max(t,8)/4;case Jc:case Qc:return Math.max(i,8)*Math.max(t,8)/2;case th:case eh:case ih:case sh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case nh:case Aa:case rh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ah:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case lh:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ch:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case hh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case uh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case dh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case fh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ph:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case mh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case gh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _h:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case xh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case vh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yh:case Sh:case bh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Mh:case Th:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ea:case wh:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function $M(i){switch(i){case On:case gf:return{byteLength:1,components:1};case qr:case _f:case zi:return{byteLength:2,components:1};case Xc:case qc:return{byteLength:2,components:4};case oi:case Wc:case Tn:return{byteLength:4,components:1};case xf:case vf:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}var Tm,ix,sx,wm,sf,Am,rx,ox,ga,Em,Hr,Yi,En,Ui,Fi,Js,rf,of,af,Cm,ax,ys,Rm,Pm,Im,Lm,Dm,Nm,Um,Fm,yl,Sl,Om,Bm,zm,Vm,km,Gm,Hm,Wm,Xm,bl,Ml,Tl,Ks,wl,Al,El,Cl,_a,qm,Ym,fi,lf,cf,hf,uf,df,ff,pf,Yu,$m,Hc,Oi,ws,xa,va,Wr,Do,Dn,No,Xe,mf,lx,Xr,cx,Fe,ya,hx,Bi,ux,On,gf,_f,qr,Wc,oi,Tn,zi,Xc,qc,Yr,xf,vf,yf,Sf,wn,Ii,As,Yc,Sa,Es,$c,dx,Zc,ba,Ma,Ta,wa,Jc,Kc,Qc,jc,th,eh,nh,ih,sh,Aa,rh,oh,ah,lh,ch,hh,uh,dh,fh,ph,mh,gh,_h,xh,vh,yh,Sh,bh,Mh,Th,Ea,wh,Zm,Jm,Km,Uo,Rl,gl,$u,$s,Zs,Fo,Ah,bf,fx,px,mx,Qm,gx,_x,xx,Qi,jm,ji,In,Oo,Bo,Ae,vx,yx,Sx,bx,Ys,Mx,Tx,wx,Ax,Ex,Cx,Rx,Px,Ix,Lx,Dx,Nx,Ux,Zu,tg,eg,ng,Eh,ig,sg,Ch,rg,zo,Fx,Ox,Bx,zx,Vx,kx,Gx,Hx,Wx,Mf,qn,Qs,Xx,qx,Yx,$x,nb,Y0,js,tv,Yn,Sn,$0,Rr,Pr,ev,pg,lt,pn,mg,I,Cp,Z0,gg,he,Rp,J0,K0,ye,ho,Pl,yb,Ri,Sb,Ip,qe,_g,Re,Go,An,Ir,Ju,Lr,Ku,nf,le,uo,Ti,bb,Mb,Vs,su,ni,Q0,j0,ui,Dr,Tb,t_,fo,hs,ru,nl,wb,Ab,e_,n_,i_,s_,Eb,po,Lp,Te,_s,Cb,Nr,nv,ks,ou,Ft,bn,Il,Ll,Dl,wi,us,Np,ds,mo,go,r_,Up,Fp,Op,Bp,zp,Vp,Ci,an,fs,Ai,au,_o,xo,vo,Gs,Hs,gr,il,lu,cu,_r,gs,Qu,Qe,hu,Pb,Ee,ju,td,ed,nd,Ho,id,Wo,sd,Bt,Ib,sl,Gp,tn,Lb,ci,Hp,yo,ii,rl,fn,ue,Ur,Pn,tr,Db,en,Xo,So,ol,bo,Mo,To,al,iv,uu,ll,du,o_,Wp,a_,Nl,pu,l_,Ul,ps,Xp,mu,Ws,qp,gu,Yp,Ss,Li,c_,xr,_u,h_,xu,vu,yu,$p,Su,u_,bu,Ve,cl,d_,f_,Ub,p_,Tu,Zp,m_,Jp,Fl,qo,Nn,g_,Fb,Ol,bs,wo,__,wu,x_,Ob,hl,ul,Bl,Kp,Bb,zb,Ei,vr,Vb,Au,$i,v_,zl,dm,Wn,Hb,Wb,Xb,Eu,yr,dl,y_,qb,jp,Mn,Cu,Vl,mn,rd,od,S_,fl,Ru,tm,b_,Di,M_,T_,ri,kl,Yo,w_,fm,Iu,Lu,Gl,Hl,ad,ld,Fr,cd,hd,er,ud,dd,Zi,Wl,$o,nr,Xl,ql,Zo,Jo,Ms,Yl,Du,Nu,em,Uu,$l,$n,Or,Zl,E_,C_,nm,im,sm,Jl,Ko,Kl,Qo,Ql,jo,ta,ea,fd,jl,ir,sr,gm,hi,ic,xM,sc,rc,ia,zr,oc,ac,sa,lc,cc,hc,uc,dc,N_,fc,hg,bM,MM,Un,ra,oa,pc,mc,gc,_c,xc,aa,la,vc,yc,pd,Ts,Sc,ca,bc,Mc,Fn,Ji,ha,Vr,Tc,kr,Ki,ua,rr,Pi,da,ug,xn,ms,xm,di,md,gd,Ao,or,_d,xd,vd,Ni,wc,rm,O_,B_,Ac,Bu,zu,qi,Gr,Xs,z_,V_,je,vm,Ec,ym,Cc,ar,Sm,Rc,Pc,Ic,fa,Lc,k_,Dc,pa,Nc,Uc,om,yd,CM,G_,H_,am,Sd,Vu,ma,bd,W_,X_,br,Md,Eo,Co,Fc,Oc,Bc,Mr,lm,PM,Tr,wr,Td,zc,Ar,q_,IM,Er,wd,Ad,Vc,dg,LM,fg,DM,NM,UM,FM,OM,BM,zM,bm,Ce,Ed,kc,VM,Cd,Rd,Pd,kM,Id,Ld,Dd,Y_,Nd,Ud,Fd,Od,xg,Bd,Z_,Gc,J_,ku,Ro,Po,cm,GM,HM,zd,K_,Vd,qs,Gu,hm,kd,Gd,WM,Q_,j_,Hd,Wd,Xd,tx,Hu,ex,qd,Wu,We,Yd,Xu,$d,Zd,Jd,nx,qu,um,Kd,Qd,jd,tf,ef,vg=oe(()=>{Tm="185",ix={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},sx={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wm=0,sf=1,Am=2,rx=3,ox=0,ga=1,Em=2,Hr=3,Yi=0,En=1,Ui=2,Fi=0,Js=1,rf=2,of=3,af=4,Cm=5,ax=6,ys=100,Rm=101,Pm=102,Im=103,Lm=104,Dm=200,Nm=201,Um=202,Fm=203,yl=204,Sl=205,Om=206,Bm=207,zm=208,Vm=209,km=210,Gm=211,Hm=212,Wm=213,Xm=214,bl=0,Ml=1,Tl=2,Ks=3,wl=4,Al=5,El=6,Cl=7,_a=0,qm=1,Ym=2,fi=0,lf=1,cf=2,hf=3,uf=4,df=5,ff=6,pf=7,Yu="attached",$m="detached",Hc=300,Oi=301,ws=302,xa=303,va=304,Wr=306,Do=1e3,Dn=1001,No=1002,Xe=1003,mf=1004,lx=1004,Xr=1005,cx=1005,Fe=1006,ya=1007,hx=1007,Bi=1008,ux=1008,On=1009,gf=1010,_f=1011,qr=1012,Wc=1013,oi=1014,Tn=1015,zi=1016,Xc=1017,qc=1018,Yr=1020,xf=35902,vf=35899,yf=1021,Sf=1022,wn=1023,Ii=1026,As=1027,Yc=1028,Sa=1029,Es=1030,$c=1031,dx=1032,Zc=1033,ba=33776,Ma=33777,Ta=33778,wa=33779,Jc=35840,Kc=35841,Qc=35842,jc=35843,th=36196,eh=37492,nh=37496,ih=37488,sh=37489,Aa=37490,rh=37491,oh=37808,ah=37809,lh=37810,ch=37811,hh=37812,uh=37813,dh=37814,fh=37815,ph=37816,mh=37817,gh=37818,_h=37819,xh=37820,vh=37821,yh=36492,Sh=36494,bh=36495,Mh=36283,Th=36284,Ea=36285,wh=36286,Zm=2200,Jm=2201,Km=2202,Uo=2300,Rl=2301,gl=2302,$u=2303,$s=2400,Zs=2401,Fo=2402,Ah=2500,bf=2501,fx=0,px=1,mx=2,Qm=3200,gx=3201,_x=3202,xx=3203,Qi=0,jm=1,ji="",In="srgb",Oo="srgb-linear",Bo="linear",Ae="srgb",vx="",yx="rg",Sx="ga",bx=0,Ys=7680,Mx=7681,Tx=7682,wx=7683,Ax=34055,Ex=34056,Cx=5386,Rx=512,Px=513,Ix=514,Lx=515,Dx=516,Nx=517,Ux=518,Zu=519,tg=512,eg=513,ng=514,Eh=515,ig=516,sg=517,Ch=518,rg=519,zo=35044,Fx=35048,Ox=35040,Bx=35045,zx=35049,Vx=35041,kx=35046,Gx=35050,Hx=35042,Wx="100",Mf="300 es",qn=2e3,Qs=2001,Xx={COMPUTE:"compute",RENDER:"render"},qx={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},Yx={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},$x={TEXTURE_COMPARE:"depthTextureCompare"};nb={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};Y0={},js=null;tv={[bl]:Ml,[Tl]:El,[wl]:Cl,[Ks]:Al,[Ml]:bl,[El]:Tl,[Cl]:wl,[Al]:Ks},Yn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$0=1234567,Rr=Math.PI/180,Pr=180/Math.PI;ev={DEG2RAD:Rr,RAD2DEG:Pr,generateUUID:si,clamp:ae,euclideanModulo:ag,mapLinear:ib,inverseLerp:sb,lerp:_l,damp:rb,pingpong:ob,smoothstep:ab,smootherstep:lb,randInt:cb,randFloat:hb,randFloatSpread:ub,seededRandom:db,degToRad:fb,radToDeg:pb,isPowerOfTwo:mb,ceilPowerOfTwo:gb,floorPowerOfTwo:_b,setQuaternionFromProperEuler:xb,normalize:me,denormalize:Ln},pg=class pg{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};pg.prototype.isVector2=!0;lt=pg,pn=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3],u=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){let v=Math.acos(g),b=Math.sin(v);m=Math.sin(m*v)/b,a=Math.sin(a*v)/b,l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a;let v=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=v,c*=v,h*=v,d*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),d=a(r/2),u=l(n/2),f=l(s/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:bt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},mg=class mg{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Z0.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Z0.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Cp.copy(this).projectOnVector(t),this.sub(Cp)}reflect(t){return this.sub(Cp.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ae(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};mg.prototype.isVector3=!0;I=mg,Cp=new I,Z0=new pn,gg=class gg{constructor(t,e,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=s[0],g=s[3],m=s[6],v=s[1],b=s[4],x=s[7],T=s[2],M=s[5],C=s[8];return r[0]=o*_+a*v+l*T,r[3]=o*g+a*b+l*M,r[6]=o*m+a*x+l*C,r[1]=c*_+h*v+d*T,r[4]=c*g+h*b+d*M,r[7]=c*m+h*x+d*C,r[2]=u*_+f*v+p*T,r[5]=u*g+f*b+p*M,r[8]=u*m+f*x+p*C,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=e*d+n*u+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Rp.makeScale(t,e)),this}rotate(t){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Rp.makeRotation(-t)),this}translate(t,e){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Rp.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};gg.prototype.isMatrix3=!0;he=gg,Rp=new he,J0=new he().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),K0=new he().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ye=vb();Pl=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ho===void 0&&(ho=Vo("canvas")),ho.width=t.width,ho.height=t.height;let s=ho.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ho}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Vo("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=vs(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return bt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},yb=0,Ri=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:yb++}),this.uuid=si(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Pp(s[o].image)):r.push(Pp(s[o]))}else r=Pp(s);n.url=r}return e||(t.images[this.uuid]=n),n}};Sb=0,Ip=new I,qe=class i extends Yn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Dn,s=Dn,r=Fe,o=Bi,a=wn,l=On,c=i.DEFAULT_ANISOTROPY,h=ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Sb++}),this.uuid=si(),this.name="",this.source=new Ri(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new he,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ip).x}get height(){return this.source.getSize(Ip).y}get depth(){return this.source.getSize(Ip).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){bt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){bt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Do:t.x=t.x-Math.floor(t.x);break;case Dn:t.x=t.x<0?0:1;break;case No:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Do:t.y=t.y-Math.floor(t.y);break;case Dn:t.y=t.y<0?0:1;break;case No:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Hc;qe.DEFAULT_ANISOTROPY=1;_g=class _g{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,x=(f+1)/2,T=(m+1)/2,M=(h+u)/4,C=(d+_)/4,y=(p+g)/4;return b>x&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=M/n,r=C/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=M/s,r=y/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=y/r),this.set(n,s,r,e),this}let v=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(g-p)/v,this.y=(d-_)/v,this.z=(u-h)/v,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ae(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};_g.prototype.isVector4=!0;Re=_g,Go=class extends Yn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fe,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new qe(s),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Fe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ri(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},An=class extends Go{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ir=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},Ju=class extends An{constructor(t=1,e=1,n=1,s={}){super(t,e,s),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Ir(null,t,e,n),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}},Lr=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Ku=class extends An{constructor(t=1,e=1,n=1,s={}){super(t,e,s),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Lr(null,t,e,n),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}},nf=class nf{constructor(t,e,n,s,r,o,a,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,d,u,f,p,_,g)}set(t,e,n,s,r,o,a,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nf().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/uo.setFromMatrixColumn(t,0).length(),r=1/uo.setFromMatrixColumn(t,1).length(),o=1/uo.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u+_*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bb,t,Mb)}lookAt(t,e,n){let s=this.elements;return ni.subVectors(t,e),ni.lengthSq()===0&&(ni.z=1),ni.normalize(),Vs.crossVectors(n,ni),Vs.lengthSq()===0&&(Math.abs(n.z)===1?ni.x+=1e-4:ni.z+=1e-4,ni.normalize(),Vs.crossVectors(n,ni)),Vs.normalize(),su.crossVectors(ni,Vs),s[0]=Vs.x,s[4]=su.x,s[8]=ni.x,s[1]=Vs.y,s[5]=su.y,s[9]=ni.y,s[2]=Vs.z,s[6]=su.z,s[10]=ni.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],v=n[3],b=n[7],x=n[11],T=n[15],M=s[0],C=s[4],y=s[8],w=s[12],R=s[1],P=s[5],D=s[9],k=s[13],F=s[2],N=s[6],G=s[10],z=s[14],W=s[3],O=s[7],j=s[11],rt=s[15];return r[0]=o*M+a*R+l*F+c*W,r[4]=o*C+a*P+l*N+c*O,r[8]=o*y+a*D+l*G+c*j,r[12]=o*w+a*k+l*z+c*rt,r[1]=h*M+d*R+u*F+f*W,r[5]=h*C+d*P+u*N+f*O,r[9]=h*y+d*D+u*G+f*j,r[13]=h*w+d*k+u*z+f*rt,r[2]=p*M+_*R+g*F+m*W,r[6]=p*C+_*P+g*N+m*O,r[10]=p*y+_*D+g*G+m*j,r[14]=p*w+_*k+g*z+m*rt,r[3]=v*M+b*R+x*F+T*W,r[7]=v*C+b*P+x*N+T*O,r[11]=v*y+b*D+x*G+T*j,r[15]=v*w+b*k+x*z+T*rt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],_=t[7],g=t[11],m=t[15],v=l*f-c*u,b=a*f-c*d,x=a*u-l*d,T=o*f-c*h,M=o*u-l*h,C=o*d-a*h;return e*(_*v-g*b+m*x)-n*(p*v-g*T+m*M)+s*(p*b-_*T+m*C)-r*(p*x-_*M+g*C)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],_=t[13],g=t[14],m=t[15],v=e*a-n*o,b=e*l-s*o,x=e*c-r*o,T=n*l-s*a,M=n*c-r*a,C=s*c-r*l,y=h*_-d*p,w=h*g-u*p,R=h*m-f*p,P=d*g-u*_,D=d*m-f*_,k=u*m-f*g,F=v*k-b*D+x*P+T*R-M*w+C*y;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/F;return t[0]=(a*k-l*D+c*P)*N,t[1]=(s*D-n*k-r*P)*N,t[2]=(_*C-g*M+m*T)*N,t[3]=(u*M-d*C-f*T)*N,t[4]=(l*R-o*k-c*w)*N,t[5]=(e*k-s*R+r*w)*N,t[6]=(g*x-p*C-m*b)*N,t[7]=(h*C-u*x+f*b)*N,t[8]=(o*D-a*R+c*y)*N,t[9]=(n*R-e*D-r*y)*N,t[10]=(p*M-_*x+m*v)*N,t[11]=(d*x-h*M-f*v)*N,t[12]=(a*w-o*P-l*y)*N,t[13]=(e*P-n*w+s*y)*N,t[14]=(_*b-p*T-g*v)*N,t[15]=(h*T-d*b+u*v)*N,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,_=o*h,g=o*d,m=a*d,v=l*c,b=l*h,x=l*d,T=n.x,M=n.y,C=n.z;return s[0]=(1-(_+m))*T,s[1]=(f+x)*T,s[2]=(p-b)*T,s[3]=0,s[4]=(f-x)*M,s[5]=(1-(u+m))*M,s[6]=(g+v)*M,s[7]=0,s[8]=(p+b)*C,s[9]=(g-v)*C,s[10]=(1-(u+_))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=uo.set(s[0],s[1],s[2]).length(),a=uo.set(s[4],s[5],s[6]).length(),l=uo.set(s[8],s[9],s[10]).length();r<0&&(o=-o),Ti.copy(this);let c=1/o,h=1/a,d=1/l;return Ti.elements[0]*=c,Ti.elements[1]*=c,Ti.elements[2]*=c,Ti.elements[4]*=h,Ti.elements[5]*=h,Ti.elements[6]*=h,Ti.elements[8]*=d,Ti.elements[9]*=d,Ti.elements[10]*=d,e.setFromRotationMatrix(Ti),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,s,r,o,a=qn,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-s),u=(e+t)/(e-t),f=(n+s)/(n-s),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===qn)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Qs)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=qn,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-s),u=-(e+t)/(e-t),f=-(n+s)/(n-s),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===qn)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Qs)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};nf.prototype.isMatrix4=!0;le=nf,uo=new I,Ti=new le,bb=new I(0,0,0),Mb=new I(1,1,1),Vs=new I,su=new I,ni=new I,Q0=new le,j0=new pn,ui=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:bt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Q0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Q0,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return j0.setFromEuler(this),this.setFromQuaternion(j0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ui.DEFAULT_ORDER="XYZ";Dr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Tb=0,t_=new I,fo=new pn,hs=new le,ru=new I,nl=new I,wb=new I,Ab=new pn,e_=new I(1,0,0),n_=new I(0,1,0),i_=new I(0,0,1),s_={type:"added"},Eb={type:"removed"},po={type:"childadded",child:null},Lp={type:"childremoved",child:null},Te=class i extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Tb++}),this.uuid=si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new I,e=new ui,n=new pn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new le},normalMatrix:{value:new he}}),this.matrix=new le,this.matrixWorld=new le,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return fo.setFromAxisAngle(t,e),this.quaternion.multiply(fo),this}rotateOnWorldAxis(t,e){return fo.setFromAxisAngle(t,e),this.quaternion.premultiply(fo),this}rotateX(t){return this.rotateOnAxis(e_,t)}rotateY(t){return this.rotateOnAxis(n_,t)}rotateZ(t){return this.rotateOnAxis(i_,t)}translateOnAxis(t,e){return t_.copy(t).applyQuaternion(this.quaternion),this.position.add(t_.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(e_,t)}translateY(t){return this.translateOnAxis(n_,t)}translateZ(t){return this.translateOnAxis(i_,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hs.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ru.copy(t):ru.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),nl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hs.lookAt(nl,ru,this.up):hs.lookAt(ru,nl,this.up),this.quaternion.setFromRotationMatrix(hs),s&&(hs.extractRotation(s.matrixWorld),fo.setFromRotationMatrix(hs),this.quaternion.premultiply(fo.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(s_),po.child=t,this.dispatchEvent(po),po.child=null):qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Eb),Lp.child=t,this.dispatchEvent(Lp),Lp.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hs.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hs.multiply(t.parent.matrixWorld)),t.applyMatrix4(hs),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(s_),po.child=t,this.dispatchEvent(po),po.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,t,wb),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nl,Ab,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Te.DEFAULT_UP=new I(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;_s=class extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}},Cb={type:"move"},Nr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _s,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _s,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _s,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let g=e.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Cb)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new _s;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},nv={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ks={h:0,s:0,l:0},ou={h:0,s:0,l:0};Ft=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=In){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ye.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ye.workingColorSpace){return this.r=t,this.g=e,this.b=n,ye.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ye.workingColorSpace){if(t=ag(t,1),e=ae(e,0,1),n=ae(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Dp(o,r,t+1/3),this.g=Dp(o,r,t),this.b=Dp(o,r,t-1/3)}return ye.colorSpaceToWorking(this,s),this}setStyle(t,e=In){function n(r){r!==void 0&&parseFloat(r)<1&&bt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:bt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);bt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=In){let n=nv[t.toLowerCase()];return n!==void 0?this.setHex(n,e):bt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=Lo(t.r),this.g=Lo(t.g),this.b=Lo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=In){return ye.workingToColorSpace(bn.copy(this),t),Math.round(ae(bn.r*255,0,255))*65536+Math.round(ae(bn.g*255,0,255))*256+Math.round(ae(bn.b*255,0,255))}getHexString(t=In){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ye.workingColorSpace){ye.workingToColorSpace(bn.copy(this),e);let n=bn.r,s=bn.g,r=bn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ye.workingColorSpace){return ye.workingToColorSpace(bn.copy(this),e),t.r=bn.r,t.g=bn.g,t.b=bn.b,t}getStyle(t=In){ye.workingToColorSpace(bn.copy(this),t);let e=bn.r,n=bn.g,s=bn.b;return t!==In?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ks),this.setHSL(ks.h+t,ks.s+e,ks.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ks),t.getHSL(ou);let n=_l(ks.h,ou.h,e),s=_l(ks.s,ou.s,e),r=_l(ks.l,ou.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new Ft;Ft.NAMES=nv;Il=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},Ll=class i{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=n}clone(){return new i(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Dl=class extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},wi=new I,us=new I,Np=new I,ds=new I,mo=new I,go=new I,r_=new I,Up=new I,Fp=new I,Op=new I,Bp=new Re,zp=new Re,Vp=new Re,Ci=class i{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),wi.subVectors(t,e),s.cross(wi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){wi.subVectors(s,e),us.subVectors(n,e),Np.subVectors(t,e);let o=wi.dot(wi),a=wi.dot(us),l=wi.dot(Np),c=us.dot(us),h=us.dot(Np),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,ds)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ds.x),l.addScaledVector(o,ds.y),l.addScaledVector(a,ds.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Bp.setScalar(0),zp.setScalar(0),Vp.setScalar(0),Bp.fromBufferAttribute(t,e),zp.fromBufferAttribute(t,n),Vp.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Bp,r.x),o.addScaledVector(zp,r.y),o.addScaledVector(Vp,r.z),o}static isFrontFacing(t,e,n,s){return wi.subVectors(n,e),us.subVectors(t,e),wi.cross(us).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wi.subVectors(this.c,this.b),us.subVectors(this.a,this.b),wi.cross(us).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;mo.subVectors(s,n),go.subVectors(r,n),Up.subVectors(t,n);let l=mo.dot(Up),c=go.dot(Up);if(l<=0&&c<=0)return e.copy(n);Fp.subVectors(t,s);let h=mo.dot(Fp),d=go.dot(Fp);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(mo,o);Op.subVectors(t,r);let f=mo.dot(Op),p=go.dot(Op);if(p>=0&&f<=p)return e.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(go,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return r_.subVectors(r,s),a=(d-h)/(d-h+(f-p)),e.copy(s).addScaledVector(r_,a);let m=1/(g+_+u);return o=_*m,a=u*m,e.copy(n).addScaledVector(mo,o).addScaledVector(go,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},an=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ai.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ai.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Ai.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Ai):Ai.fromBufferAttribute(r,o),Ai.applyMatrix4(t.matrixWorld),this.expandByPoint(Ai);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),au.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),au.copy(n.boundingBox)),au.applyMatrix4(t.matrixWorld),this.union(au)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ai),Ai.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(il),lu.subVectors(this.max,il),_o.subVectors(t.a,il),xo.subVectors(t.b,il),vo.subVectors(t.c,il),Gs.subVectors(xo,_o),Hs.subVectors(vo,xo),gr.subVectors(_o,vo);let e=[0,-Gs.z,Gs.y,0,-Hs.z,Hs.y,0,-gr.z,gr.y,Gs.z,0,-Gs.x,Hs.z,0,-Hs.x,gr.z,0,-gr.x,-Gs.y,Gs.x,0,-Hs.y,Hs.x,0,-gr.y,gr.x,0];return!kp(e,_o,xo,vo,lu)||(e=[1,0,0,0,1,0,0,0,1],!kp(e,_o,xo,vo,lu))?!1:(cu.crossVectors(Gs,Hs),e=[cu.x,cu.y,cu.z],kp(e,_o,xo,vo,lu))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ai).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ai).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(fs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},fs=[new I,new I,new I,new I,new I,new I,new I,new I],Ai=new I,au=new an,_o=new I,xo=new I,vo=new I,Gs=new I,Hs=new I,gr=new I,il=new I,lu=new I,cu=new I,_r=new I;gs=Rb();Qu=class{static toHalfFloat(t){return Xn(t)}static fromHalfFloat(t){return pl(t)}},Qe=new I,hu=new lt,Pb=0,Ee=class extends Yn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Pb++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=zo,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)hu.fromBufferAttribute(this,e),hu.applyMatrix3(t),this.setXY(e,hu.x,hu.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix3(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyMatrix4(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.applyNormalMatrix(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Qe.fromBufferAttribute(this,e),Qe.transformDirection(t),this.setXYZ(e,Qe.x,Qe.y,Qe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==zo&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}},ju=class extends Ee{constructor(t,e,n){super(new Int8Array(t),e,n)}},td=class extends Ee{constructor(t,e,n){super(new Uint8Array(t),e,n)}},ed=class extends Ee{constructor(t,e,n){super(new Uint8ClampedArray(t),e,n)}},nd=class extends Ee{constructor(t,e,n){super(new Int16Array(t),e,n)}},Ho=class extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}},id=class extends Ee{constructor(t,e,n){super(new Int32Array(t),e,n)}},Wo=class extends Ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}},sd=class extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n),this.isFloat16BufferAttribute=!0}getX(t){let e=pl(this.array[t*this.itemSize]);return this.normalized&&(e=Ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize]=Xn(e),this}getY(t){let e=pl(this.array[t*this.itemSize+1]);return this.normalized&&(e=Ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+1]=Xn(e),this}getZ(t){let e=pl(this.array[t*this.itemSize+2]);return this.normalized&&(e=Ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+2]=Xn(e),this}getW(t){let e=pl(this.array[t*this.itemSize+3]);return this.normalized&&(e=Ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.array[t*this.itemSize+3]=Xn(e),this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.array[t+0]=Xn(e),this.array[t+1]=Xn(n),this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.array[t+0]=Xn(e),this.array[t+1]=Xn(n),this.array[t+2]=Xn(s),this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.array[t+0]=Xn(e),this.array[t+1]=Xn(n),this.array[t+2]=Xn(s),this.array[t+3]=Xn(r),this}},Bt=class extends Ee{constructor(t,e,n){super(new Float32Array(t),e,n)}},Ib=new an,sl=new I,Gp=new I,tn=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Ib.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;sl.subVectors(t,this.center);let e=sl.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(sl,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gp.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(sl.copy(t.center).add(Gp)),this.expandByPoint(sl.copy(t.center).sub(Gp))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Lb=0,ci=new le,Hp=new Te,yo=new I,ii=new an,rl=new an,fn=new I,ue=class i extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lb++}),this.uuid=si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eb(t)?Wo:Ho)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new he().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return ci.makeRotationFromQuaternion(t),this.applyMatrix4(ci),this}rotateX(t){return ci.makeRotationX(t),this.applyMatrix4(ci),this}rotateY(t){return ci.makeRotationY(t),this.applyMatrix4(ci),this}rotateZ(t){return ci.makeRotationZ(t),this.applyMatrix4(ci),this}translate(t,e,n){return ci.makeTranslation(t,e,n),this.applyMatrix4(ci),this}scale(t,e,n){return ci.makeScale(t,e,n),this.applyMatrix4(ci),this}lookAt(t){return Hp.lookAt(t),Hp.updateMatrix(),this.applyMatrix4(Hp.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yo).negate(),this.translate(yo.x,yo.y,yo.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&bt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];ii.setFromBufferAttribute(r),this.morphTargetsRelative?(fn.addVectors(this.boundingBox.min,ii.min),this.boundingBox.expandByPoint(fn),fn.addVectors(this.boundingBox.max,ii.max),this.boundingBox.expandByPoint(fn)):(this.boundingBox.expandByPoint(ii.min),this.boundingBox.expandByPoint(ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){let n=this.boundingSphere.center;if(ii.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];rl.setFromBufferAttribute(a),this.morphTargetsRelative?(fn.addVectors(ii.min,rl.min),ii.expandByPoint(fn),fn.addVectors(ii.max,rl.max),ii.expandByPoint(fn)):(ii.expandByPoint(rl.min),ii.expandByPoint(rl.max))}ii.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)fn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(fn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)fn.fromBufferAttribute(a,c),l&&(yo.fromBufferAttribute(t,c),fn.add(yo)),s=Math.max(s,n.distanceToSquared(fn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ee(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let y=0;y<n.count;y++)a[y]=new I,l[y]=new I;let c=new I,h=new I,d=new I,u=new lt,f=new lt,p=new lt,_=new I,g=new I;function m(y,w,R){c.fromBufferAttribute(n,y),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,R),u.fromBufferAttribute(r,y),f.fromBufferAttribute(r,w),p.fromBufferAttribute(r,R),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let P=1/(f.x*p.y-p.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(P),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(P),a[y].add(_),a[w].add(_),a[R].add(_),l[y].add(g),l[w].add(g),l[R].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let y=0,w=v.length;y<w;++y){let R=v[y],P=R.start,D=R.count;for(let k=P,F=P+D;k<F;k+=3)m(t.getX(k+0),t.getX(k+1),t.getX(k+2))}let b=new I,x=new I,T=new I,M=new I;function C(y){T.fromBufferAttribute(s,y),M.copy(T);let w=a[y];b.copy(w),b.sub(T.multiplyScalar(T.dot(w))).normalize(),x.crossVectors(M,w);let P=x.dot(l[y])<0?-1:1;o.setXYZW(y,b.x,b.y,b.z,P)}for(let y=0,w=v.length;y<w;++y){let R=v[y],P=R.start,D=R.count;for(let k=P,F=P+D;k<F;k+=3)C(t.getX(k+0)),C(t.getX(k+1)),C(t.getX(k+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let s=new I,r=new I,o=new I,a=new I,l=new I,c=new I,h=new I,d=new I;if(t)for(let u=0,f=t.count;u<f;u+=3){let p=t.getX(u+0),_=t.getX(u+1),g=t.getX(u+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)fn.fromBufferAttribute(t,e),fn.normalize(),t.setXYZ(e,fn.x,fn.y,fn.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new Ee(u,h,d)}if(this.index===null)return bt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ur=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=zo,this.updateRanges=[],this.version=0,this.uuid=si()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=si()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Pn=new I,tr=class i{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.applyMatrix4(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.applyNormalMatrix(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Pn.fromBufferAttribute(this,e),Pn.transformDirection(t),this.setXYZ(e,Pn.x,Pn.y,Pn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=me(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=me(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=me(e,this.array),n=me(n,this.array),s=me(s,this.array),r=me(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){ko("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new i(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){ko("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Db=0,en=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Db++}),this.uuid=si(),this.name="",this.type="Material",this.blending=Js,this.side=Yi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yl,this.blendDst=Sl,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=Ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ys,this.stencilZFail=Ys,this.stencilZPass=Ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){bt(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){bt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Js&&(n.blending=this.blending),this.side!==Yi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yl&&(n.blendSrc=this.blendSrc),this.blendDst!==Sl&&(n.blendDst=this.blendDst),this.blendEquation!==ys&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ks&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ft().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new lt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new lt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Xo=class extends en{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},ol=new I,bo=new I,Mo=new I,To=new lt,al=new lt,iv=new le,uu=new I,ll=new I,du=new I,o_=new lt,Wp=new lt,a_=new lt,Nl=class extends Te{constructor(t=new Xo){if(super(),this.isSprite=!0,this.type="Sprite",So===void 0){So=new ue;let e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Ur(e,5);So.setIndex([0,1,2,0,2,3]),So.setAttribute("position",new tr(n,3,0,!1)),So.setAttribute("uv",new tr(n,2,3,!1))}this.geometry=So,this.material=t,this.center=new lt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&qt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bo.setFromMatrixScale(this.matrixWorld),iv.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Mo.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bo.multiplyScalar(-Mo.z);let n=this.material.rotation,s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));let o=this.center;fu(uu.set(-.5,-.5,0),Mo,o,bo,s,r),fu(ll.set(.5,-.5,0),Mo,o,bo,s,r),fu(du.set(.5,.5,0),Mo,o,bo,s,r),o_.set(0,0),Wp.set(1,0),a_.set(1,1);let a=t.ray.intersectTriangle(uu,ll,du,!1,ol);if(a===null&&(fu(ll.set(-.5,.5,0),Mo,o,bo,s,r),Wp.set(0,1),a=t.ray.intersectTriangle(uu,du,ll,!1,ol),a===null))return;let l=t.ray.origin.distanceTo(ol);l<t.near||l>t.far||e.push({distance:l,point:ol.clone(),uv:Ci.getInterpolation(ol,uu,ll,du,o_,Wp,a_,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};pu=new I,l_=new I,Ul=class extends Te{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(t){super.copy(t,!1);let e=t.levels;for(let n=0,s=e.length;n<s;n++){let r=e[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=t.autoUpdate,this}addLevel(t,e=0,n=0){e=Math.abs(e);let s=this.levels,r;for(r=0;r<s.length&&!(e<s[r].distance);r++);return s.splice(r,0,{distance:e,hysteresis:n,object:t}),this.add(t),this}removeLevel(t){let e=this.levels;for(let n=0;n<e.length;n++)if(e[n].distance===t){let s=e.splice(n,1);return this.remove(s[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(t){let e=this.levels;if(e.length>0){let n,s;for(n=1,s=e.length;n<s;n++){let r=e[n].distance;if(e[n].object.visible&&(r-=r*e[n].hysteresis),t<r)break}return e[n-1].object}return null}raycast(t,e){if(this.levels.length>0){pu.setFromMatrixPosition(this.matrixWorld);let s=t.ray.origin.distanceTo(pu);this.getObjectForDistance(s).raycast(t,e)}}update(t){let e=this.levels;if(e.length>1){pu.setFromMatrixPosition(t.matrixWorld),l_.setFromMatrixPosition(this.matrixWorld);let n=pu.distanceTo(l_)/t.zoom;e[0].object.visible=!0;let s,r;for(s=1,r=e.length;s<r;s++){let o=e[s].distance;if(e[s].object.visible&&(o-=o*e[s].hysteresis),n>=o)e[s-1].object.visible=!1,e[s].object.visible=!0;else break}for(this._currentLevel=s-1;s<r;s++)e[s].object.visible=!1}}toJSON(t){let e=super.toJSON(t);this.autoUpdate===!1&&(e.object.autoUpdate=!1),e.object.levels=[];let n=this.levels;for(let s=0,r=n.length;s<r;s++){let o=n[s];e.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return e}},ps=new I,Xp=new I,mu=new I,Ws=new I,qp=new I,gu=new I,Yp=new I,Ss=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ps)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=ps.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ps.copy(this.origin).addScaledVector(this.direction,e),ps.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Xp.copy(t).add(e).multiplyScalar(.5),mu.copy(e).sub(t).normalize(),Ws.copy(this.origin).sub(Xp);let r=t.distanceTo(e)*.5,o=-this.direction.dot(mu),a=Ws.dot(this.direction),l=-Ws.dot(mu),c=Ws.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Xp).addScaledVector(mu,u),f}intersectSphere(t,e){ps.subVectors(t.center,this.origin);let n=ps.dot(this.direction),s=ps.dot(ps)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ps)!==null}intersectTriangle(t,e,n,s,r){qp.subVectors(e,t),gu.subVectors(n,t),Yp.crossVectors(qp,gu);let o=this.direction.dot(Yp),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ws.subVectors(this.origin,t);let l=a*this.direction.dot(gu.crossVectors(Ws,gu));if(l<0)return null;let c=a*this.direction.dot(qp.cross(Ws));if(c<0||l+c>o)return null;let h=-a*Ws.dot(Yp);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Li=class extends en{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=_a,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},c_=new le,xr=new Ss,_u=new tn,h_=new I,xu=new I,vu=new I,yu=new I,$p=new I,Su=new I,u_=new I,bu=new I,Ve=class extends Te{constructor(t=new ue,e=new Li){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){Su.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&($p.fromBufferAttribute(d,t),o?Su.addScaledVector($p,h):Su.addScaledVector($p.sub(e),h))}e.add(Su)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_u.copy(n.boundingSphere),_u.applyMatrix4(r),xr.copy(t.ray).recast(t.near),!(_u.containsPoint(xr.origin)===!1&&(xr.intersectSphere(_u,h_)===null||xr.origin.distanceToSquared(h_)>(t.far-t.near)**2))&&(c_.copy(r).invert(),xr.copy(t.ray).applyMatrix4(c_),!(n.boundingBox!==null&&xr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,xr)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,T=b;x<T;x+=3){let M=a.getX(x),C=a.getX(x+1),y=a.getX(x+2);s=Mu(this,m,t,n,c,h,d,M,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let v=a.getX(g),b=a.getX(g+1),x=a.getX(g+2);s=Mu(this,o,t,n,c,h,d,v,b,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],v=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=v,T=b;x<T;x+=3){let M=x,C=x+1,y=x+2;s=Mu(this,m,t,n,c,h,d,M,C,y),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let v=g,b=g+1,x=g+2;s=Mu(this,o,t,n,c,h,d,v,b,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}};cl=new Re,d_=new Re,f_=new Re,Ub=new Re,p_=new le,Tu=new I,Zp=new tn,m_=new le,Jp=new Ss,Fl=class extends Ve{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yu,this.bindMatrix=new le,this.bindMatrixInverse=new le,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new an),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Tu),this.boundingBox.expandByPoint(Tu)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new tn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Tu),this.boundingSphere.expandByPoint(Tu)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zp.copy(this.boundingSphere),Zp.applyMatrix4(s),t.ray.intersectsSphere(Zp)!==!1&&(m_.copy(s).invert(),Jp.copy(t.ray).applyMatrix4(m_),!(this.boundingBox!==null&&Jp.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Jp)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new Re,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Yu?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===$m?this.bindMatrixInverse.copy(this.bindMatrix).invert():bt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let n=this.skeleton,s=this.geometry;d_.fromBufferAttribute(s.attributes.skinIndex,t),f_.fromBufferAttribute(s.attributes.skinWeight,t),e.isVector4?(cl.copy(e),e.set(0,0,0,0)):(cl.set(...e,1),e.set(0,0,0)),cl.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=f_.getComponent(r);if(o!==0){let a=d_.getComponent(r);p_.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Ub.copy(cl).applyMatrix4(p_),o)}}return e.isVector4&&(e.w=cl.w),e.applyMatrix4(this.bindMatrixInverse)}},qo=class extends Te{constructor(){super(),this.isBone=!0,this.type="Bone"}},Nn=class extends qe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Xe,h=Xe,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},g_=new le,Fb=new le,Ol=class i{constructor(t=[],e=[]){this.uuid=si(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){bt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new le)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let n=new le;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:Fb;g_.multiplyMatrices(a,e[r]),g_.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let n=new Nn(e,t,t,wn,Tn);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){let r=t.bones[n],o=e[r];o===void 0&&(bt("Skeleton: No bone found with UUID:",r),o=new qo),this.bones.push(o),this.boneInverses.push(new le().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){let t={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,n=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=n[s];t.boneInverses.push(a.toArray())}return t}},bs=class extends Ee{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},wo=new le,__=new le,wu=[],x_=new an,Ob=new le,hl=new Ve,ul=new tn,Bl=class extends Ve{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new bs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ob)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new an),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,wo),x_.copy(t.boundingBox).applyMatrix4(wo),this.boundingBox.union(x_)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new tn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,wo),ul.copy(t.boundingSphere).applyMatrix4(wo),this.boundingSphere.union(ul)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){let n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){let n=this.matrixWorld,s=this.count;if(hl.geometry=this.geometry,hl.material=this.material,hl.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ul.copy(this.boundingSphere),ul.applyMatrix4(n),t.ray.intersectsSphere(ul)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,wo),__.multiplyMatrices(n,wo),hl.matrixWorld=__,hl.raycast(t,wu);for(let o=0,a=wu.length;o<a;o++){let l=wu[o];l.instanceId=r,l.object=this,e.push(l)}wu.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new bs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){let n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nn(new Float32Array(s*this.count),s,this.count,Yc,Tn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Kp=new I,Bb=new I,zb=new he,Ei=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=Kp.subVectors(n,e).cross(Bb.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(Kp),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(s,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||zb.getNormalMatrix(t),s=this.coplanarPoint(Kp).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},vr=new tn,Vb=new lt(.5,.5),Au=new I,$i=class{constructor(t=new Ei,e=new Ei,n=new Ei,s=new Ei,r=new Ei,o=new Ei){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=qn,n=!1){let s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],v=r[12],b=r[13],x=r[14],T=r[15];if(s[0].setComponents(c-o,f-h,m-p,T-v).normalize(),s[1].setComponents(c+o,f+h,m+p,T+v).normalize(),s[2].setComponents(c+a,f+d,m+_,T+b).normalize(),s[3].setComponents(c-a,f-d,m-_,T-b).normalize(),n)s[4].setComponents(l,u,g,x).normalize(),s[5].setComponents(c-l,f-u,m-g,T-x).normalize();else if(s[4].setComponents(c-l,f-u,m-g,T-x).normalize(),e===qn)s[5].setComponents(c+l,f+u,m+g,T+x).normalize();else if(e===Qs)s[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(t){vr.center.set(0,0,0);let e=Vb.distanceTo(t.center);return vr.radius=.7071067811865476+e,vr.applyMatrix4(t.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Au.x=s.normal.x>0?t.max.x:t.min.x,Au.y=s.normal.y>0?t.max.y:t.min.y,Au.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Au)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},v_=new le,zl=class i{constructor(){this.coordinateSystem=qn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];v_.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new $i),n[s].setFromProjectionMatrix(v_,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new $i),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new i().copy(this)}};dm=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(t,e,n,s){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=t,a.count=e,a.z=n,a.index=s}reset(){this.list.length=0,this.index=0}},Wn=new le,Hb=new Ft(1,1,1),Wb=new $i,Xb=new zl,Eu=new an,yr=new tn,dl=new I,y_=new I,qb=new I,jp=new dm,Mn=new Ve,Cu=[];Vl=class extends Ve{constructor(t,e,n=e*2,s){super(new ue,s),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=t,this._maxVertexCount=e,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(t),this._multiDrawStarts=new Int32Array(t),this._multiDrawCount=0,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let t=Math.sqrt(this._maxInstanceCount*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4),n=new Nn(e,t,t,wn,Tn);this._matricesTexture=n}_initIndirectTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Uint32Array(t*t),n=new Nn(e,t,t,Sa,oi);this._indirectTexture=n}_initColorsTexture(){let t=Math.sqrt(this._maxInstanceCount);t=Math.ceil(t);let e=new Float32Array(t*t*4).fill(1),n=new Nn(e,t,t,wn,Tn);n.colorSpace=ye.workingColorSpace,this._colorsTexture=n}_initializeGeometry(t){let e=this.geometry,n=this._maxVertexCount,s=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in t.attributes){let o=t.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),d=new Ee(h,l,c);e.setAttribute(r,d)}if(t.getIndex()!==null){let r=n>65535?new Uint32Array(s):new Uint16Array(s);e.setIndex(new Ee(r,1))}this._geometryInitialized=!0}}_validateGeometry(t){let e=this.geometry;if(!!t.getIndex()!=!!e.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in e.attributes){if(!t.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let s=t.getAttribute(n),r=e.getAttribute(n);if(s.itemSize!==r.itemSize||s.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(t){let e=this._instanceInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${t}. Instance is either out of range or has been deleted.`)}validateGeometryId(t){let e=this._geometryInfo;if(t<0||t>=e.length||e[t].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${t}. Geometry is either out of range or has been deleted.`)}setCustomSort(t){return this.customSort=t,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new an);let t=this.boundingBox,e=this._instanceInfo;t.makeEmpty();for(let n=0,s=e.length;n<s;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(n,Wn),this.getBoundingBoxAt(r,Eu).applyMatrix4(Wn),t.union(Eu)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tn);let t=this.boundingSphere,e=this._instanceInfo;t.makeEmpty();for(let n=0,s=e.length;n<s;n++){if(e[n].active===!1)continue;let r=e[n].geometryIndex;this.getMatrixAt(n,Wn),this.getBoundingSphereAt(r,yr).applyMatrix4(Wn),t.union(yr)}}addInstance(t){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:t},s=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Qp),s=this._availableInstanceIds.shift(),this._instanceInfo[s]=n):(s=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;Wn.identity().toArray(r.image.data,s*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(Hb.toArray(o.image.data,s*4),o.needsUpdate=!0),this._visibilityChanged=!0,s}addGeometry(t,e=-1,n=-1){this._initializeGeometry(t),this._validateGeometry(t);let s={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;s.vertexStart=this._nextVertexStart,s.reservedVertexCount=e===-1?t.getAttribute("position").count:e;let o=t.getIndex();if(o!==null&&(s.indexStart=this._nextIndexStart,s.reservedIndexCount=n===-1?o.count:n),s.indexStart!==-1&&s.indexStart+s.reservedIndexCount>this._maxIndexCount||s.vertexStart+s.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Qp),l=this._availableGeometryIds.shift(),r[l]=s):(l=this._geometryCount,this._geometryCount++,r.push(s)),this.setGeometryAt(l,t),this._nextIndexStart=s.indexStart+s.reservedIndexCount,this._nextVertexStart=s.vertexStart+s.reservedVertexCount,l}setGeometryAt(t,e){if(t>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(e);let n=this.geometry,s=n.getIndex()!==null,r=n.getIndex(),o=e.getIndex(),a=this._geometryInfo[t];if(s&&o.count>a.reservedIndexCount||e.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=e.getAttribute("position").count;for(let h in n.attributes){let d=e.getAttribute(h),u=n.getAttribute(h);Yb(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(s){let h=a.indexStart,d=a.reservedIndexCount;a.indexCount=e.getIndex().count;for(let u=0;u<o.count;u++)r.setX(h+u,l+o.getX(u));for(let u=o.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=s?a.indexStart:a.vertexStart,a.count=s?a.indexCount:a.vertexCount,a.boundingBox=null,e.boundingBox!==null&&(a.boundingBox=e.boundingBox.clone()),a.boundingSphere=null,e.boundingSphere!==null&&(a.boundingSphere=e.boundingSphere.clone()),this._visibilityChanged=!0,t}deleteGeometry(t){let e=this._geometryInfo;if(t>=e.length||e[t].active===!1)return this;let n=this._instanceInfo;for(let s=0,r=n.length;s<r;s++)n[s].active&&n[s].geometryIndex===t&&this.deleteInstance(s);return e[t].active=!1,this._availableGeometryIds.push(t),this._visibilityChanged=!0,this}deleteInstance(t){return this.validateInstanceId(t),this._instanceInfo[t].active=!1,this._availableInstanceIds.push(t),this._visibilityChanged=!0,this}optimize(){let t=0,e=0,n=this._geometryInfo,s=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let l=s[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==e){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=t-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(e,h,h+u),f.addUpdateRange(e,u),f.needsUpdate=!0,c.indexStart=e}e+=c.reservedIndexCount}if(c.vertexStart!==t){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(t*g,h*g,(h+d)*g),p.addUpdateRange(t*g,d*g),p.needsUpdate=!0}c.vertexStart=t}t+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=e,this._nextVertexStart=t,this._visibilityChanged=!0,this}getBoundingBoxAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,s=this._geometryInfo[t];if(s.boundingBox===null){let r=new an,o=n.index,a=n.attributes.position;for(let l=s.start,c=s.start+s.count;l<c;l++){let h=l;o&&(h=o.getX(h)),r.expandByPoint(dl.fromBufferAttribute(a,h))}s.boundingBox=r}return e.copy(s.boundingBox),e}getBoundingSphereAt(t,e){if(t>=this._geometryCount)return null;let n=this.geometry,s=this._geometryInfo[t];if(s.boundingSphere===null){let r=new tn;this.getBoundingBoxAt(t,Eu),Eu.getCenter(r.center);let o=n.index,a=n.attributes.position,l=0;for(let c=s.start,h=s.start+s.count;c<h;c++){let d=c;o&&(d=o.getX(d)),dl.fromBufferAttribute(a,d),l=Math.max(l,r.center.distanceToSquared(dl))}r.radius=Math.sqrt(l),s.boundingSphere=r}return e.copy(s.boundingSphere),e}setMatrixAt(t,e){this.validateInstanceId(t);let n=this._matricesTexture,s=this._matricesTexture.image.data;return e.toArray(s,t*16),n.needsUpdate=!0,this}getMatrixAt(t,e){return this.validateInstanceId(t),e.fromArray(this._matricesTexture.image.data,t*16)}setColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null&&this._initColorsTexture(),e.toArray(this._colorsTexture.image.data,t*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(t,e){return this.validateInstanceId(t),this._colorsTexture===null?e.isVector4?e.set(1,1,1,1):e.setRGB(1,1,1):e.fromArray(this._colorsTexture.image.data,t*4)}setVisibleAt(t,e){return this.validateInstanceId(t),this._instanceInfo[t].visible===e?this:(this._instanceInfo[t].visible=e,this._visibilityChanged=!0,this)}getVisibleAt(t){return this.validateInstanceId(t),this._instanceInfo[t].visible}setGeometryIdAt(t,e){return this.validateInstanceId(t),this.validateGeometryId(e),this._instanceInfo[t].geometryIndex=e,this}getGeometryIdAt(t){return this.validateInstanceId(t),this._instanceInfo[t].geometryIndex}getGeometryRangeAt(t,e={}){this.validateGeometryId(t);let n=this._geometryInfo[t];return e.vertexStart=n.vertexStart,e.vertexCount=n.vertexCount,e.reservedVertexCount=n.reservedVertexCount,e.indexStart=n.indexStart,e.indexCount=n.indexCount,e.reservedIndexCount=n.reservedIndexCount,e.start=n.start,e.count=n.count,e}setInstanceCount(t){let e=this._availableInstanceIds,n=this._instanceInfo;for(e.sort(Qp);e[e.length-1]===n.length-1;)n.pop(),e.pop();if(t<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${t} are being used. Cannot shrink instance count.`);let s=new Int32Array(t),r=new Int32Array(t);Sr(this._multiDrawCounts,s),Sr(this._multiDrawStarts,r),this._multiDrawCounts=s,this._multiDrawStarts=r,this._maxInstanceCount=t;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),Sr(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),Sr(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Sr(l.image.data,this._colorsTexture.image.data))}setGeometrySize(t,e){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${e}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${e}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=t,this._maxIndexCount=e,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ue,this._initializeGeometry(r));let o=this.geometry;r.index&&Sr(r.index.array,o.index.array);for(let a in r.attributes)Sr(r.attributes[a].array,o.attributes[a].array)}raycast(t,e){let n=this._instanceInfo,s=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Mn.material=this.material,Mn.geometry.index=o.index,Mn.geometry.attributes=o.attributes,Mn.geometry.boundingBox===null&&(Mn.geometry.boundingBox=new an),Mn.geometry.boundingSphere===null&&(Mn.geometry.boundingSphere=new tn);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;let c=n[a].geometryIndex,h=s[c];Mn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Mn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Mn.geometry.boundingBox),this.getBoundingSphereAt(c,Mn.geometry.boundingSphere),Mn.raycast(t,Cu);for(let d=0,u=Cu.length;d<u;d++){let f=Cu[d];f.object=this,f.batchId=a,e.push(f)}Cu.length=0}Mn.material=null,Mn.geometry.index=null,Mn.geometry.attributes={},Mn.geometry.setDrawRange(0,1/0)}copy(t){return super.copy(t),this.geometry=t.geometry.clone(),this.perObjectFrustumCulled=t.perObjectFrustumCulled,this.sortObjects=t.sortObjects,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this._geometryInfo=t._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox!==null?e.boundingBox.clone():null,boundingSphere:e.boundingSphere!==null?e.boundingSphere.clone():null})),this._instanceInfo=t._instanceInfo.map(e=>({...e})),this._availableInstanceIds=t._availableInstanceIds.slice(),this._availableGeometryIds=t._availableGeometryIds.slice(),this._nextIndexStart=t._nextIndexStart,this._nextVertexStart=t._nextVertexStart,this._geometryCount=t._geometryCount,this._maxInstanceCount=t._maxInstanceCount,this._maxVertexCount=t._maxVertexCount,this._maxIndexCount=t._maxIndexCount,this._geometryInitialized=t._geometryInitialized,this._multiDrawCounts=t._multiDrawCounts.slice(),this._multiDrawStarts=t._multiDrawStarts.slice(),this._indirectTexture=t._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=t._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=t._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(t,e,n,s,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=s.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=s.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?Xb:Wb;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(Wn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(Wn,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){Wn.copy(this.matrixWorld).invert(),dl.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Wn),y_.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Wn);for(let x=0,T=c.length;x<T;x++)if(c[x].visible&&c[x].active){let M=c[x].geometryIndex;this.getMatrixAt(x,Wn),this.getBoundingSphereAt(M,yr).applyMatrix4(Wn);let C=!1;if(f&&(C=!g.intersectsSphere(yr)),!C){let y=u[M],w=qb.subVectors(yr.center,dl).dot(y_);jp.push(y.start,y.count,w,x)}}let v=jp.list,b=this.customSort;b===null?v.sort(r.transparent?Gb:kb):b.call(this,v,n);for(let x=0,T=v.length;x<T;x++){let M=v[x];h[m]=M.start*a*l,d[m]=M.count*l,_[m]=M.index,m++}jp.reset()}else for(let v=0,b=c.length;v<b;v++)if(c[v].visible&&c[v].active){let x=c[v].geometryIndex,T=!1;if(f&&(this.getMatrixAt(v,Wn),this.getBoundingSphereAt(x,yr).applyMatrix4(Wn),T=!g.intersectsSphere(yr)),!T){let M=u[x];h[m]=M.start*a*l,d[m]=M.count*l,_[m]=v,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._visibilityChanged=!1}onBeforeShadow(t,e,n,s,r,o){this.onBeforeRender(t,null,s,r,o)}},mn=class extends en{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},rd=new I,od=new I,S_=new le,fl=new Ss,Ru=new tn,tm=new I,b_=new I,Di=class extends Te{constructor(t=new ue,e=new mn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)rd.fromBufferAttribute(e,s-1),od.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=rd.distanceTo(od);t.setAttribute("lineDistance",new Bt(n,1))}else bt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ru.copy(n.boundingSphere),Ru.applyMatrix4(s),Ru.radius+=r,t.ray.intersectsSphere(Ru)===!1)return;S_.copy(s).invert(),fl.copy(t.ray).applyMatrix4(S_);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),v=h.getX(_+1),b=Pu(this,t,fl,l,m,v,_);b&&e.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Pu(this,t,fl,l,_,g,p-1);m&&e.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Pu(this,t,fl,l,_,_+1,_);m&&e.push(m)}if(this.isLineLoop){let _=Pu(this,t,fl,l,p-1,f,p-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};M_=new I,T_=new I,ri=class extends Di{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)M_.fromBufferAttribute(e,s),T_.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+M_.distanceTo(T_);t.setAttribute("lineDistance",new Bt(n,1))}else bt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},kl=class extends Di{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}},Yo=class extends en{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},w_=new le,fm=new Ss,Iu=new tn,Lu=new I,Gl=class extends Te{constructor(t=new ue,e=new Yo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Iu.copy(n.boundingSphere),Iu.applyMatrix4(s),Iu.radius+=r,t.ray.intersectsSphere(Iu)===!1)return;w_.copy(s).invert(),fm.copy(t.ray).applyMatrix4(w_);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);Lu.fromBufferAttribute(d,g),A_(Lu,g,l,s,t,e,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,_=f;p<_;p++)Lu.fromBufferAttribute(d,p),A_(Lu,p,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Hl=class extends qe{constructor(t,e,n,s,r=Fe,o=Fe,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in t&&(this._requestVideoFrameCallbackId=t.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let t=this.image;"requestVideoFrameCallback"in t===!1&&t.readyState>=t.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},ad=class extends Hl{constructor(t,e,n,s,r,o,a,l){super({},t,e,n,s,r,o,a,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(t){this.image=t,this.needsUpdate=!0}},ld=class extends qe{constructor(t,e){super({width:t,height:e}),this.isFramebufferTexture=!0,this.magFilter=Xe,this.minFilter=Xe,this.generateMipmaps=!1,this.needsUpdate=!0}},Fr=class extends qe{constructor(t,e,n,s,r,o,a,l,c,h,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}},cd=class extends Fr{constructor(t,e,n,s,r,o){super(t,e,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=s,this.wrapR=Dn,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},hd=class extends Fr{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,Oi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}},er=class extends qe{constructor(t=[],e=Oi,n,s,r,o,a,l,c,h){super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ud=class extends qe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},dd=class extends qe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=t?t.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let t=this.image?this.image.parentNode:null;t!==null&&"onpaint"in t&&(t.onpaint=null),super.dispose()}},Zi=class extends qe{constructor(t,e,n=oi,s,r,o,a=Xe,l=Xe,c,h=Ii,d=1){if(h!==Ii&&h!==As)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ri(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Wl=class extends Zi{constructor(t,e=oi,n=Oi,s,r,o=Xe,a=Xe,l,c=Ii){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,s,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},$o=class extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},nr=class i extends ue{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,s,o,2),p("x","z","y",1,-1,t,n,-e,s,o,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(d,2));function p(_,g,m,v,b,x,T,M,C,y,w){let R=x/C,P=T/y,D=x/2,k=T/2,F=M/2,N=C+1,G=y+1,z=0,W=0,O=new I;for(let j=0;j<G;j++){let rt=j*P-k;for(let ft=0;ft<N;ft++){let Tt=ft*R-D;O[_]=Tt*v,O[g]=rt*b,O[m]=F,c.push(O.x,O.y,O.z),O[_]=0,O[g]=0,O[m]=M>0?1:-1,h.push(O.x,O.y,O.z),d.push(ft/C),d.push(1-j/y),z+=1}}for(let j=0;j<y;j++)for(let rt=0;rt<C;rt++){let ft=u+rt+N*j,Tt=u+rt+N*(j+1),re=u+(rt+1)+N*(j+1),Yt=u+(rt+1)+N*j;l.push(ft,Tt,Yt),l.push(Tt,re,Yt),W+=6}a.addGroup(f,W,w),f+=W,u+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Xl=class i extends ue{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=e/2,d=Math.PI/2*t,u=e,f=2*d+u,p=n*2+r,_=s+1,g=new I,m=new I;for(let v=0;v<=p;v++){let b=0,x=0,T=0,M=0;if(v<=n){let w=v/n,R=w*Math.PI/2;x=-h-t*Math.cos(R),T=t*Math.sin(R),M=-t*Math.cos(R),b=w*d}else if(v<=n+r){let w=(v-n)/r;x=-h+w*e,T=t,M=0,b=d+w*u}else{let w=(v-n-r)/n,R=w*Math.PI/2;x=h+t*Math.sin(R),T=t*Math.cos(R),M=t*Math.sin(R),b=d+u+w*d}let C=Math.max(0,Math.min(1,b/f)),y=0;v===0?y=.5/s:v===p&&(y=-.5/s);for(let w=0;w<=s;w++){let R=w/s,P=R*Math.PI*2,D=Math.sin(P),k=Math.cos(P);m.x=-T*k,m.y=x,m.z=T*D,a.push(m.x,m.y,m.z),g.set(-T*k,M,T*D),g.normalize(),l.push(g.x,g.y,g.z),c.push(R+y,C)}if(v>0){let w=(v-1)*_;for(let R=0;R<s;R++){let P=w+R,D=w+R+1,k=v*_+R,F=v*_+R+1;o.push(P,D,k),o.push(D,F,k)}}}this.setIndex(o),this.setAttribute("position",new Bt(a,3)),this.setAttribute("normal",new Bt(l,3)),this.setAttribute("uv",new Bt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},ql=class i extends ue{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new I,h=new lt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){let f=n+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(a,3)),this.setAttribute("uv",new Bt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Zo=class i extends ue{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;v(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Bt(d,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(f,2));function v(){let x=new I,T=new I,M=0,C=(e-t)/n;for(let y=0;y<=r;y++){let w=[],R=y/r,P=R*(e-t)+t;for(let D=0;D<=s;D++){let k=D/s,F=k*l+a,N=Math.sin(F),G=Math.cos(F);T.x=P*N,T.y=-R*n+g,T.z=P*G,d.push(T.x,T.y,T.z),x.set(N,C,G).normalize(),u.push(x.x,x.y,x.z),f.push(k,1-R),w.push(p++)}_.push(w)}for(let y=0;y<s;y++)for(let w=0;w<r;w++){let R=_[w][y],P=_[w+1][y],D=_[w+1][y+1],k=_[w][y+1];(t>0||w!==0)&&(h.push(R,P,k),M+=3),(e>0||w!==r-1)&&(h.push(P,D,k),M+=3)}c.addGroup(m,M,0),m+=M}function b(x){let T=p,M=new lt,C=new I,y=0,w=x===!0?t:e,R=x===!0?1:-1;for(let D=1;D<=s;D++)d.push(0,g*R,0),u.push(0,R,0),f.push(.5,.5),p++;let P=p;for(let D=0;D<=s;D++){let F=D/s*l+a,N=Math.cos(F),G=Math.sin(F);C.x=w*G,C.y=g*R,C.z=w*N,d.push(C.x,C.y,C.z),u.push(0,R,0),M.x=N*.5+.5,M.y=G*.5*R+.5,f.push(M.x,M.y),p++}for(let D=0;D<s;D++){let k=T+D,F=P+D;x===!0?h.push(F,F+1,k):h.push(F+1,F,k),y+=3}c.addGroup(m,y,x===!0?1:2),m+=y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Jo=class i extends Zo{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ms=class i extends ue{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],o=[];a(s),c(n),h(),this.setAttribute("position",new Bt(r,3)),this.setAttribute("normal",new Bt(r.slice(),3)),this.setAttribute("uv",new Bt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){let b=new I,x=new I,T=new I;for(let M=0;M<e.length;M+=3)f(e[M+0],b),f(e[M+1],x),f(e[M+2],T),l(b,x,T,v)}function l(v,b,x,T){let M=T+1,C=[];for(let y=0;y<=M;y++){C[y]=[];let w=v.clone().lerp(x,y/M),R=b.clone().lerp(x,y/M),P=M-y;for(let D=0;D<=P;D++)D===0&&y===M?C[y][D]=w:C[y][D]=w.clone().lerp(R,D/P)}for(let y=0;y<M;y++)for(let w=0;w<2*(M-y)-1;w++){let R=Math.floor(w/2);w%2===0?(u(C[y][R+1]),u(C[y+1][R]),u(C[y][R])):(u(C[y][R+1]),u(C[y+1][R+1]),u(C[y+1][R]))}}function c(v){let b=new I;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(v),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){let v=new I;for(let b=0;b<r.length;b+=3){v.x=r[b+0],v.y=r[b+1],v.z=r[b+2];let x=g(v)/2/Math.PI+.5,T=m(v)/Math.PI+.5;o.push(x,1-T)}p(),d()}function d(){for(let v=0;v<o.length;v+=6){let b=o[v+0],x=o[v+2],T=o[v+4],M=Math.max(b,x,T),C=Math.min(b,x,T);M>.9&&C<.1&&(b<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),T<.2&&(o[v+4]+=1))}}function u(v){r.push(v.x,v.y,v.z)}function f(v,b){let x=v*3;b.x=t[x+0],b.y=t[x+1],b.z=t[x+2]}function p(){let v=new I,b=new I,x=new I,T=new I,M=new lt,C=new lt,y=new lt;for(let w=0,R=0;w<r.length;w+=9,R+=6){v.set(r[w+0],r[w+1],r[w+2]),b.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),M.set(o[R+0],o[R+1]),C.set(o[R+2],o[R+3]),y.set(o[R+4],o[R+5]),T.copy(v).add(b).add(x).divideScalar(3);let P=g(T);_(M,R+0,v,P),_(C,R+2,b,P),_(y,R+4,x,P)}}function _(v,b,x,T){T<0&&v.x===1&&(o[b]=v.x-1),x.x===0&&x.z===0&&(o[b]=T/2/Math.PI+.5)}function g(v){return Math.atan2(v.z,-v.x)}function m(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}},Yl=class i extends Ms{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},Du=new I,Nu=new I,em=new I,Uu=new Ci,$l=class extends ue{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(Rr*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Uu;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Uu.getNormal(em),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let v=0;v<3;v++){let b=(v+1)%3,x=d[v],T=d[b],M=Uu[h[v]],C=Uu[h[b]],y=`${x}_${T}`,w=`${T}_${x}`;w in u&&u[w]?(em.dot(u[w].normal)<=r&&(f.push(M.x,M.y,M.z),f.push(C.x,C.y,C.z)),u[w]=null):y in u||(u[y]={index0:c[v],index1:c[b],normal:em.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];Du.fromBufferAttribute(a,_),Nu.fromBufferAttribute(a,g),f.push(Du.x,Du.y,Du.z),f.push(Nu.x,Nu.y,Nu.z)}this.setAttribute("position",new Bt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},$n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){bt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],u=n[s+1]-h,f=(o-h)/u;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new lt:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new I,s=[],r=[],o=[],a=new I,l=new le;for(let f=0;f<=t;f++){let p=f/t;s[f]=this.getTangentAt(p,new I)}r[0]=new I,o[0]=new I;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ae(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(ae(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],f*p)),o[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Or=class extends $n{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new lt){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Zl=class extends Or{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};E_=new I,C_=new I,nm=new lg,im=new lg,sm=new lg,Jl=class extends $n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(C_.subVectors(s[0],s[1]).add(s[0]),c=C_);let d=s[a%r],u=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(E_.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=E_),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),nm.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),im.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),sm.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(nm.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),im.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),sm.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(nm.calc(l),im.calc(l),sm.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Ko=class extends $n{constructor(t=new lt,e=new lt,n=new lt,s=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new lt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vl(t,s.x,r.x,o.x,a.x),vl(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Kl=class extends $n{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(vl(t,s.x,r.x,o.x,a.x),vl(t,s.y,r.y,o.y,a.y),vl(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Qo=class extends $n{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ql=class extends $n{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jo=class extends $n{constructor(t=new lt,e=new lt,n=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new lt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xl(t,s.x,r.x,o.x),xl(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ta=class extends $n{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(xl(t,s.x,r.x,o.x),xl(t,s.y,r.y,o.y),xl(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ea=class extends $n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return n.set(R_(a,l.x,c.x,h.x,d.x),R_(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new lt().fromArray(s))}return this}},fd=Object.freeze({__proto__:null,ArcCurve:Zl,CatmullRomCurve3:Jl,CubicBezierCurve:Ko,CubicBezierCurve3:Kl,EllipseCurve:Or,LineCurve:Qo,LineCurve3:Ql,QuadraticBezierCurve:jo,QuadraticBezierCurve3:ta,SplineCurve:ea}),jl=class extends $n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fd[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new fd[s.type]().fromJSON(s))}return this}},ir=class extends jl{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Qo(this.currentPoint.clone(),new lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new jo(this.currentPoint.clone(),new lt(t,e),new lt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new Ko(this.currentPoint.clone(),new lt(t,e),new lt(n,s),new lt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new ea(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new Or(t,e,n,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},sr=class extends ir{constructor(t){super(t),this.uuid=si(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new ir().fromJSON(s))}return this}};gm=class{static triangulate(t,e,n=2){return eM(t,e,n)}},hi=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];I_(t),L_(n,t);let o=t.length;e.forEach(I_);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,L_(n,e[l]);let a=gm.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};ic=class i extends ue{constructor(t=new sr([new lt(.5,.5),new lt(-.5,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Bt(s,3)),this.setAttribute("uv",new Bt(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:xM,b,x=!1,T,M,C,y;if(m){b=m.getSpacedPoints(h),x=!0,u=!1;let Q=m.isCatmullRomCurve3?m.closed:!1;T=m.computeFrenetFrames(h,Q),M=new I,C=new I,y=new I}u||(g=0,f=0,p=0,_=0);let w=a.extractPoints(c),R=w.shape,P=w.holes;if(!hi.isClockWise(R)){R=R.reverse();for(let Q=0,nt=P.length;Q<nt;Q++){let K=P[Q];hi.isClockWise(K)&&(P[Q]=K.reverse())}}function k(Q){let K=10000000000000001e-36,ct=Q[0];for(let ut=1;ut<=Q.length;ut++){let Rt=ut%Q.length,Pt=Q[Rt],xt=Pt.x-ct.x,Vt=Pt.y-ct.y,L=xt*xt+Vt*Vt,Qt=Math.max(Math.abs(Pt.x),Math.abs(Pt.y),Math.abs(ct.x),Math.abs(ct.y)),st=K*Qt*Qt;if(L<=st){Q.splice(Rt,1),ut--;continue}ct=Pt}}k(R),P.forEach(k);let F=P.length,N=R;for(let Q=0;Q<F;Q++){let nt=P[Q];R=R.concat(nt)}function G(Q,nt,K){return nt||qt("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(nt,K)}let z=R.length;function W(Q,nt,K){let ct,ut,Rt,Pt=Q.x-nt.x,xt=Q.y-nt.y,Vt=K.x-Q.x,L=K.y-Q.y,Qt=Pt*Pt+xt*xt,st=Pt*L-xt*Vt;if(Math.abs(st)>Number.EPSILON){let E=Math.sqrt(Qt),S=Math.sqrt(Vt*Vt+L*L),U=nt.x-xt/E,V=nt.y+Pt/E,q=K.x-L/S,ht=K.y+Vt/S,gt=((q-U)*L-(ht-V)*Vt)/(Pt*L-xt*Vt);ct=U+Pt*gt-Q.x,ut=V+xt*gt-Q.y;let J=ct*ct+ut*ut;if(J<=2)return new lt(ct,ut);Rt=Math.sqrt(J/2)}else{let E=!1;Pt>Number.EPSILON?Vt>Number.EPSILON&&(E=!0):Pt<-Number.EPSILON?Vt<-Number.EPSILON&&(E=!0):Math.sign(xt)===Math.sign(L)&&(E=!0),E?(ct=-xt,ut=Pt,Rt=Math.sqrt(Qt)):(ct=Pt,ut=xt,Rt=Math.sqrt(Qt/2))}return new lt(ct/Rt,ut/Rt)}let O=[];for(let Q=0,nt=N.length,K=nt-1,ct=Q+1;Q<nt;Q++,K++,ct++)K===nt&&(K=0),ct===nt&&(ct=0),O[Q]=W(N[Q],N[K],N[ct]);let j=[],rt,ft=O.concat();for(let Q=0,nt=F;Q<nt;Q++){let K=P[Q];rt=[];for(let ct=0,ut=K.length,Rt=ut-1,Pt=ct+1;ct<ut;ct++,Rt++,Pt++)Rt===ut&&(Rt=0),Pt===ut&&(Pt=0),rt[ct]=W(K[ct],K[Rt],K[Pt]);j.push(rt),ft=ft.concat(rt)}let Tt;if(g===0)Tt=hi.triangulateShape(N,P);else{let Q=[],nt=[];for(let K=0;K<g;K++){let ct=K/g,ut=f*Math.cos(ct*Math.PI/2),Rt=p*Math.sin(ct*Math.PI/2)+_;for(let Pt=0,xt=N.length;Pt<xt;Pt++){let Vt=G(N[Pt],O[Pt],Rt);dt(Vt.x,Vt.y,-ut),ct===0&&Q.push(Vt)}for(let Pt=0,xt=F;Pt<xt;Pt++){let Vt=P[Pt];rt=j[Pt];let L=[];for(let Qt=0,st=Vt.length;Qt<st;Qt++){let E=G(Vt[Qt],rt[Qt],Rt);dt(E.x,E.y,-ut),ct===0&&L.push(E)}ct===0&&nt.push(L)}}Tt=hi.triangulateShape(Q,nt)}let re=Tt.length,Yt=p+_;for(let Q=0;Q<z;Q++){let nt=u?G(R[Q],ft[Q],Yt):R[Q];x?(C.copy(T.normals[0]).multiplyScalar(nt.x),M.copy(T.binormals[0]).multiplyScalar(nt.y),y.copy(b[0]).add(C).add(M),dt(y.x,y.y,y.z)):dt(nt.x,nt.y,0)}for(let Q=1;Q<=h;Q++)for(let nt=0;nt<z;nt++){let K=u?G(R[nt],ft[nt],Yt):R[nt];x?(C.copy(T.normals[Q]).multiplyScalar(K.x),M.copy(T.binormals[Q]).multiplyScalar(K.y),y.copy(b[Q]).add(C).add(M),dt(y.x,y.y,y.z)):dt(K.x,K.y,d/h*Q)}for(let Q=g-1;Q>=0;Q--){let nt=Q/g,K=f*Math.cos(nt*Math.PI/2),ct=p*Math.sin(nt*Math.PI/2)+_;for(let ut=0,Rt=N.length;ut<Rt;ut++){let Pt=G(N[ut],O[ut],ct);dt(Pt.x,Pt.y,d+K)}for(let ut=0,Rt=P.length;ut<Rt;ut++){let Pt=P[ut];rt=j[ut];for(let xt=0,Vt=Pt.length;xt<Vt;xt++){let L=G(Pt[xt],rt[xt],ct);x?dt(L.x,L.y+b[h-1].y,b[h-1].x+K):dt(L.x,L.y,d+K)}}}X(),ot();function X(){let Q=s.length/3;if(u){let nt=0,K=z*nt;for(let ct=0;ct<re;ct++){let ut=Tt[ct];Ot(ut[2]+K,ut[1]+K,ut[0]+K)}nt=h+g*2,K=z*nt;for(let ct=0;ct<re;ct++){let ut=Tt[ct];Ot(ut[0]+K,ut[1]+K,ut[2]+K)}}else{for(let nt=0;nt<re;nt++){let K=Tt[nt];Ot(K[2],K[1],K[0])}for(let nt=0;nt<re;nt++){let K=Tt[nt];Ot(K[0]+z*h,K[1]+z*h,K[2]+z*h)}}n.addGroup(Q,s.length/3-Q,0)}function ot(){let Q=s.length/3,nt=0;tt(N,nt),nt+=N.length;for(let K=0,ct=P.length;K<ct;K++){let ut=P[K];tt(ut,nt),nt+=ut.length}n.addGroup(Q,s.length/3-Q,1)}function tt(Q,nt){let K=Q.length;for(;--K>=0;){let ct=K,ut=K-1;ut<0&&(ut=Q.length-1);for(let Rt=0,Pt=h+g*2;Rt<Pt;Rt++){let xt=z*Rt,Vt=z*(Rt+1),L=nt+ct+xt,Qt=nt+ut+xt,st=nt+ut+Vt,E=nt+ct+Vt;Lt(L,Qt,st,E)}}}function dt(Q,nt,K){l.push(Q),l.push(nt),l.push(K)}function Ot(Q,nt,K){wt(Q),wt(nt),wt(K);let ct=s.length/3,ut=v.generateTopUV(n,s,ct-3,ct-2,ct-1);_t(ut[0]),_t(ut[1]),_t(ut[2])}function Lt(Q,nt,K,ct){wt(Q),wt(nt),wt(ct),wt(nt),wt(K),wt(ct);let ut=s.length/3,Rt=v.generateSideWallUV(n,s,ut-6,ut-3,ut-2,ut-1);_t(Rt[0]),_t(Rt[1]),_t(Rt[3]),_t(Rt[1]),_t(Rt[2]),_t(Rt[3])}function wt(Q){s.push(l[Q*3+0]),s.push(l[Q*3+1]),s.push(l[Q*3+2])}function _t(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return vM(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new fd[s.type]().fromJSON(s)),new i(n,t.options)}},xM={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new lt(r,o),new lt(a,l),new lt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[s*3],f=t[s*3+1],p=t[s*3+2],_=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new lt(o,1-l),new lt(c,1-d),new lt(u,1-p),new lt(_,1-m)]:[new lt(a,1-l),new lt(h,1-d),new lt(f,1-p),new lt(g,1-m)]}};sc=class i extends Ms{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},rc=class i extends ue{constructor(t=[new lt(0,-.5),new lt(.5,0),new lt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ae(s,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/e,d=new I,u=new lt,f=new I,p=new I,_=new I,g=0,m=0;for(let v=0;v<=t.length-1;v++)switch(v){case 0:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:g=t[v+1].x-t[v].x,m=t[v+1].y-t[v].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let v=0;v<=e;v++){let b=n+v*h*s,x=Math.sin(b),T=Math.cos(b);for(let M=0;M<=t.length-1;M++){d.x=t[M].x*x,d.y=t[M].y,d.z=t[M].x*T,o.push(d.x,d.y,d.z),u.x=v/e,u.y=M/(t.length-1),a.push(u.x,u.y);let C=l[3*M+0]*x,y=l[3*M+1],w=l[3*M+0]*T;c.push(C,y,w)}}for(let v=0;v<e;v++)for(let b=0;b<t.length-1;b++){let x=b+v*t.length,T=x,M=x+t.length,C=x+t.length+1,y=x+1;r.push(T,M,y),r.push(C,y,M)}this.setIndex(r),this.setAttribute("position",new Bt(o,3)),this.setAttribute("uv",new Bt(a,2)),this.setAttribute("normal",new Bt(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},ia=class i extends Ms{constructor(t=1,e=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},zr=class i extends ue{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let v=m*u-o;for(let b=0;b<c;b++){let x=b*d-r;p.push(x,-v,0),_.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let v=0;v<a;v++){let b=v+c*m,x=v+c*(m+1),T=v+1+c*(m+1),M=v+1+c*m;f.push(b,x,M),f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new Bt(p,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},oc=class i extends ue{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);let a=[],l=[],c=[],h=[],d=t,u=(e-t)/s,f=new I,p=new lt;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<s;_++){let g=_*(n+1);for(let m=0;m<n;m++){let v=m+g,b=v,x=v+n+1,T=v+n+2,M=v+1;a.push(b,x,M),a.push(x,T,M)}}this.setIndex(a),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ac=class i extends ue{constructor(t=new sr([new lt(0,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};let n=[],s=[],r=[],o=[],a=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Bt(s,3)),this.setAttribute("normal",new Bt(r,3)),this.setAttribute("uv",new Bt(o,2));function c(h){let d=s.length/3,u=h.extractPoints(e),f=u.shape,p=u.holes;hi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let v=p[g];hi.isClockWise(v)===!0&&(p[g]=v.reverse())}let _=hi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let v=p[g];f=f.concat(v)}for(let g=0,m=f.length;g<m;g++){let v=f[g];s.push(v.x,v.y,0),r.push(0,0,1),o.push(v.x,v.y)}for(let g=0,m=_.length;g<m;g++){let v=_[g],b=v[0]+d,x=v[1]+d,T=v[2]+d;n.push(b,x,T),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes;return yM(e,t)}static fromJSON(t,e){let n=[];for(let s=0,r=t.shapes.length;s<r;s++){let o=e[t.shapes[s]];n.push(o)}return new i(n,t.curveSegments)}};sa=class i extends ue{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new I,u=new I,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let v=[],b=m/n,x=o+b*a,T=t*Math.cos(x),M=Math.sqrt(t*t-T*T),C=0;m===0&&o===0?C=.5/e:m===n&&l===Math.PI&&(C=-.5/e);for(let y=0;y<=e;y++){let w=y/e,R=s+w*r;d.x=-M*Math.cos(R),d.y=T,d.z=M*Math.sin(R),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(w+C,1-b),v.push(c++)}h.push(v)}for(let m=0;m<n;m++)for(let v=0;v<e;v++){let b=h[m][v+1],x=h[m][v],T=h[m+1][v],M=h[m+1][v+1];(m!==0||o>0)&&f.push(b,x,M),(m!==n-1||l<Math.PI)&&f.push(x,T,M)}this.setIndex(f),this.setAttribute("position",new Bt(p,3)),this.setAttribute("normal",new Bt(_,3)),this.setAttribute("uv",new Bt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},lc=class i extends Ms{constructor(t=1,e=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}},cc=class i extends ue{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),s=Math.floor(s);let l=[],c=[],h=[],d=[],u=new I,f=new I,p=new I;for(let _=0;_<=n;_++){let g=o+_/n*a;for(let m=0;m<=s;m++){let v=m/s*r;f.x=(t+e*Math.cos(g))*Math.cos(v),f.y=(t+e*Math.cos(g))*Math.sin(v),f.z=e*Math.sin(g),c.push(f.x,f.y,f.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/s),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=s;g++){let m=(s+1)*_+g-1,v=(s+1)*(_-1)+g-1,b=(s+1)*(_-1)+g,x=(s+1)*_+g;l.push(m,v,x),l.push(v,b,x)}this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(h,3)),this.setAttribute("uv",new Bt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},hc=class i extends ue{constructor(t=1,e=.4,n=64,s=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:s,p:r,q:o},n=Math.floor(n),s=Math.floor(s);let a=[],l=[],c=[],h=[],d=new I,u=new I,f=new I,p=new I,_=new I,g=new I,m=new I;for(let b=0;b<=n;++b){let x=b/n*r*Math.PI*2;v(x,r,o,t,f),v(x+.01,r,o,t,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let T=0;T<=s;++T){let M=T/s*Math.PI*2,C=-e*Math.cos(M),y=e*Math.sin(M);d.x=f.x+(C*m.x+y*_.x),d.y=f.y+(C*m.y+y*_.y),d.z=f.z+(C*m.z+y*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(T/s)}}for(let b=1;b<=n;b++)for(let x=1;x<=s;x++){let T=(s+1)*(b-1)+(x-1),M=(s+1)*b+(x-1),C=(s+1)*b+x,y=(s+1)*(b-1)+x;a.push(T,M,y),a.push(M,C,y)}this.setIndex(a),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(h,2));function v(b,x,T,M,C){let y=Math.cos(b),w=Math.sin(b),R=T/x*b,P=Math.cos(R);C.x=M*(2+P)*.5*y,C.y=M*(2+P)*w*.5,C.z=M*Math.sin(R)*.5}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.tubularSegments,t.radialSegments,t.p,t.q)}},uc=class i extends ue{constructor(t=new ta(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new I,l=new I,c=new lt,h=new I,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Bt(d,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(f,2));function _(){for(let b=0;b<e;b++)g(b);g(r===!1?e:0),v(),m()}function g(b){h=t.getPointAt(b/e,h);let x=o.normals[b],T=o.binormals[b];for(let M=0;M<=s;M++){let C=M/s*Math.PI*2,y=Math.sin(C),w=-Math.cos(C);l.x=w*x.x+y*T.x,l.y=w*x.y+y*T.y,l.z=w*x.z+y*T.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=e;b++)for(let x=1;x<=s;x++){let T=(s+1)*(b-1)+(x-1),M=(s+1)*b+(x-1),C=(s+1)*b+x,y=(s+1)*(b-1)+x;p.push(T,M,y),p.push(M,C,y)}}function v(){for(let b=0;b<=e;b++)for(let x=0;x<=s;x++)c.x=b/e,c.y=x/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new fd[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},dc=class extends ue{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],n=new Set,s=new I,r=new I;if(t.index!==null){let o=t.attributes.position,a=t.index,l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=a.getX(p+g),v=a.getX(p+(g+1)%3);s.fromBufferAttribute(o,m),r.fromBufferAttribute(o,v),D_(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{let o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,d=3*a+(c+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),D_(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Bt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};N_=Object.freeze({__proto__:null,BoxGeometry:nr,CapsuleGeometry:Xl,CircleGeometry:ql,ConeGeometry:Jo,CylinderGeometry:Zo,DodecahedronGeometry:Yl,EdgesGeometry:$l,ExtrudeGeometry:ic,IcosahedronGeometry:sc,LatheGeometry:rc,OctahedronGeometry:ia,PlaneGeometry:zr,PolyhedronGeometry:Ms,RingGeometry:oc,ShapeGeometry:ac,SphereGeometry:sa,TetrahedronGeometry:lc,TorusGeometry:cc,TorusKnotGeometry:hc,TubeGeometry:uc,WireframeGeometry:dc}),fc=class extends en{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ft(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};hg={clone:$r,merge:Cn},bM=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,MM=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Un=class extends en{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bM,this.fragmentShader=MM,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=$r(t.uniforms),this.uniformsGroups=SM(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ft().setHex(s.value);break;case"v2":this.uniforms[n].value=new lt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new I().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(s.value);break;case"m3":this.uniforms[n].value=new he().fromArray(s.value);break;case"m4":this.uniforms[n].value=new le().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ra=class extends Un{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},oa=class extends en{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},pc=class extends oa{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new lt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ae(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}},mc=class extends en{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Ft(16777215),this.specular=new Ft(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=_a,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},gc=class extends en{constructor(t){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ft(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.gradientMap=t.gradientMap,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},_c=class extends en{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}},xc=class extends en{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=_a,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},aa=class extends en{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},la=class extends en{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},vc=class extends en{constructor(t){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ft(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qi,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={MATCAP:""},this.color.copy(t.color),this.matcap=t.matcap,this.map=t.map,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.alphaMap=t.alphaMap,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this.fog=t.fog,this}},yc=class extends mn{constructor(t){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}copy(t){return super.copy(t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this}};pd=class{static convertArray(t,e){return Cr(t,e)}static isTypedArray(t){return Zx(t)}static getKeyframeOrder(t){return lv(t)}static sortedArray(t,e,n){return _m(t,e,n)}static flattenJSON(t,e,n,s){cv(t,e,n,s)}static subclip(t,e,n,s,r=30){return TM(t,e,n,s,r)}static makeClipAdditive(t,e=0,n=t,s=30){return wM(t,e,n,s)}},Ts=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];t:{e:{let o;n:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break e}o=e.length;break n}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break e}o=n,n=0;break n}break t}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Sc=class extends Ts{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$s,endingEnd:$s}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zs:r=t,a=2*e-n;break;case Fo:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zs:o=t,l=2*n-e;break;case Fo:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(s-e),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,v=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let T=0;T!==a;++T)r[T]=m*o[h+T]+v*o[c+T]+b*o[l+T]+x*o[d+T];return r}},ca=class extends Ts{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},bc=class extends Ts{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Mc=class extends Ts{interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-e)/(s-e),_=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*_+o[l+g]*p;return r}let u=a*2,f=t-1;for(let p=0;p!==a;++p){let _=o[c+p],g=o[l+p],m=f*u+p*2,v=d[m],b=d[m+1],x=t*u+p*2,T=h[x],M=h[x+1],C=(n-e)/(s-e),y,w,R,P,D;for(let k=0;k<8;k++){y=C*C,w=y*C,R=1-C,P=R*R,D=P*R;let N=D*e+3*P*C*v+3*R*y*T+w*s-n;if(Math.abs(N)<1e-10)break;let G=3*P*(v-e)+6*R*C*(T-v)+3*y*(s-T);if(Math.abs(G)<1e-10)break;C=C-N/G,C=Math.max(0,Math.min(1,C))}r[p]=D*_+3*P*C*b+3*R*y*M+w*g}return r}},Fn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Cr(e,this.TimeBufferType),this.values=Cr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Cr(t.times,Array),values:Cr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new bc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ca(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Sc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Mc(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Uo:e=this.InterpolantFactoryMethodDiscrete;break;case Rl:e=this.InterpolantFactoryMethodLinear;break;case gl:e=this.InterpolantFactoryMethodSmooth;break;case $u:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return bt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Uo;case this.InterpolantFactoryMethodLinear:return Rl;case this.InterpolantFactoryMethodSmooth:return gl;case this.InterpolantFactoryMethodBezier:return $u}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(qt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(qt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){qt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){qt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Zx(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){qt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===gl,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=e[d+p];if(_!==e[u+p]||_!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Fn.prototype.ValueTypeName="";Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Rl;Ji=class extends Fn{constructor(t,e,n){super(t,e,n)}};Ji.prototype.ValueTypeName="bool";Ji.prototype.ValueBufferType=Array;Ji.prototype.DefaultInterpolation=Uo;Ji.prototype.InterpolantFactoryMethodLinear=void 0;Ji.prototype.InterpolantFactoryMethodSmooth=void 0;ha=class extends Fn{constructor(t,e,n,s){super(t,e,n,s)}};ha.prototype.ValueTypeName="color";Vr=class extends Fn{constructor(t,e,n,s){super(t,e,n,s)}};Vr.prototype.ValueTypeName="number";Tc=class extends Ts{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)pn.slerpFlat(r,0,o,c-a,o,c,l);return r}},kr=class extends Fn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new Tc(this.times,this.values,this.getValueSize(),t)}};kr.prototype.ValueTypeName="quaternion";kr.prototype.InterpolantFactoryMethodSmooth=void 0;Ki=class extends Fn{constructor(t,e,n){super(t,e,n)}};Ki.prototype.ValueTypeName="string";Ki.prototype.ValueBufferType=Array;Ki.prototype.DefaultInterpolation=Uo;Ki.prototype.InterpolantFactoryMethodLinear=void 0;Ki.prototype.InterpolantFactoryMethodSmooth=void 0;ua=class extends Fn{constructor(t,e,n,s){super(t,e,n,s)}};ua.prototype.ValueTypeName="vector";rr=class{constructor(t="",e=-1,n=[],s=Ah){this.name=t,this.tracks=n,this.duration=e,this.blendMode=s,this.uuid=si(),this.userData={},this.duration<0&&this.resetDuration()}static parse(t){let e=[],n=t.tracks,s=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(EM(n[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r.userData=JSON.parse(t.userData||"{}"),r}static toJSON(t){let e=[],n=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode,userData:JSON.stringify(t.userData)};for(let r=0,o=n.length;r!==o;++r)e.push(Fn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(t,e,n,s){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=lv(l);l=_m(l,1,h),c=_m(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Vr(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){let s=t;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===e)return n[s];return null}static CreateClipsFromMorphTargetSequences(t,e,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=s[d];u||(s[d]=u=[]),u.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,n));return o}resetDuration(){let t=this.tracks,e=0;for(let n=0,s=t.length;n!==s;++n){let r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let n=0;n<this.tracks.length;n++)t.push(this.tracks[n].clone());let e=new this.constructor(this.name,this.duration,t,this.blendMode);return e.userData=JSON.parse(JSON.stringify(this.userData)),e}toJSON(){return this.constructor.toJSON(this)}};Pi={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(F_(i)||(this.files[i]=t))},get:function(i){if(this.enabled!==!1&&!F_(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};da=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},ug=new da,xn=class{constructor(t){this.manager=t!==void 0?t:ug,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};xn.DEFAULT_MATERIAL_NAME="__DEFAULT";ms={},xm=class extends Error{constructor(t,e){super(t),this.response=e}},di=class extends xn{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Pi.get(`file:${t}`);if(r!==void 0){this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0);return}if(ms[t]!==void 0){ms[t].push({onLoad:e,onProgress:n,onError:s});return}ms[t]=[],ms[t].push({onLoad:e,onProgress:n,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&bt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ms[t],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){v();function v(){d.read().then(({done:b,value:x})=>{if(b)m.close();else{_+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let M=0,C=h.length;M<C;M++){let y=h[M];y.onProgress&&y.onProgress(T)}m.enqueue(x),v()}},b=>{m.error(b)})}}});return new Response(g)}else throw new xm(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Pi.add(`file:${t}`,c);let h=ms[t];delete ms[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ms[t];if(h===void 0)throw this.manager.itemError(t),c;delete ms[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},md=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=new di(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){s?s(l):qt(l),r.manager.itemError(t)}},n,s)}parse(t){let e=[];for(let n=0;n<t.length;n++){let s=rr.parse(t[n]);e.push(s)}return e}},gd=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=[],a=new Fr,l=new di(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(t[d],function(u){let f=r.parse(u,!0);o[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Fe),a.image=o,a.format=f.format,a.needsUpdate=!0,e&&e(a))},n,s)}if(Array.isArray(t))for(let d=0,u=t.length;d<u;++d)h(d);else l.load(t,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)o[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),o[p].format=u.format,o[p].width=u.width,o[p].height=u.height}a.image=o}else a.image.width=u.width,a.image.height=u.height,a.mipmaps=u.mipmaps;u.mipmapCount===1&&(a.minFilter=Fe),a.format=u.format,a.needsUpdate=!0,e&&e(a)},n,s);return a}},Ao=new WeakMap,or=class extends xn{constructor(t){super(t)}load(t,e,n,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Pi.get(`image:${t}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);else{let d=Ao.get(o);d===void 0&&(d=[],Ao.set(o,d)),d.push({onLoad:e,onError:s})}return o}let a=Vo("img");function l(){h(),e&&e(this);let d=Ao.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Ao.delete(this),r.manager.itemEnd(t)}function c(d){h(),s&&s(d),Pi.remove(`image:${t}`);let u=Ao.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}Ao.delete(this),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Pi.add(`image:${t}`,a),r.manager.itemStart(t),a.src=t,a}},_d=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=new er;r.colorSpace=In;let o=new or(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(t[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,e&&e(r))},void 0,s)}for(let c=0;c<t.length;++c)l(c);return r}},xd=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=new Nn,a=new di(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(l){let c;try{c=r.parse(l)}catch(h){s!==void 0?s(h):qt(h);return}r._applyTexData(o,c),e&&e(o,c)},n,s),o}createDataTexture(t){let e=new Nn;return this._applyTexData(e,this.parse(t)),e}_applyTexData(t,e){e.image!==void 0?t.image=e.image:e.data!==void 0&&(t.image.width=e.width,t.image.height=e.height,t.image.data=e.data),t.wrapS=e.wrapS!==void 0?e.wrapS:Dn,t.wrapT=e.wrapT!==void 0?e.wrapT:Dn,t.magFilter=e.magFilter!==void 0?e.magFilter:Fe,t.minFilter=e.minFilter!==void 0?e.minFilter:Fe,t.anisotropy=e.anisotropy!==void 0?e.anisotropy:1,e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.mipmaps!==void 0&&(t.mipmaps=e.mipmaps,t.minFilter=Bi),e.mipmapCount===1&&(t.minFilter=Fe),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),t.needsUpdate=!0}},vd=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=new qe,o=new or(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,s),r}},Ni=class extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},wc=class extends Ni{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},rm=new le,O_=new I,B_=new I,Ac=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=On,this.map=null,this.mapPass=null,this.matrix=new le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $i,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;O_.setFromMatrixPosition(t.matrixWorld),e.position.copy(O_),B_.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(B_),e.updateMatrixWorld(),rm.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rm,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Qs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(rm)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Bu=new I,zu=new pn,qi=new I,Gr=class extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new le,this.projectionMatrix=new le,this.projectionMatrixInverse=new le,this.coordinateSystem=qn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Bu,zu,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bu,zu,qi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Bu,zu,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Bu,zu,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Xs=new I,z_=new lt,V_=new lt,je=class extends Gr{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Pr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Rr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Pr*2*Math.atan(Math.tan(Rr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Xs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Xs.x,Xs.y).multiplyScalar(-t/Xs.z),Xs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xs.x,Xs.y).multiplyScalar(-t/Xs.z)}getViewSize(t,e){return this.getViewBounds(t,z_,V_),e.subVectors(V_,z_)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Rr*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},vm=class extends Ac{constructor(){super(new je(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){let e=this.camera,n=Pr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Ec=class extends Ni{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new vm}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.map=t.map,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.angle=this.angle,e.object.decay=this.decay,e.object.penumbra=this.penumbra,e.object.target=this.target.uuid,this.map&&this.map.isTexture&&(e.object.map=this.map.toJSON(t).uuid),e.object.shadow=this.shadow.toJSON(),e}},ym=class extends Ac{constructor(){super(new je(90,1,.5,500)),this.isPointLightShadow=!0}},Cc=class extends Ni{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new ym}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ar=class extends Gr{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Sm=class extends Ac{constructor(){super(new ar(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Rc=class extends Ni{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new Sm}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},Pc=class extends Ni{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}},Ic=class extends Ni{constructor(t,e,n=10,s=10){super(t,e),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=s}get power(){return this.intensity*this.width*this.height*Math.PI}set power(t){this.intensity=t/(this.width*this.height*Math.PI)}copy(t){return super.copy(t),this.width=t.width,this.height=t.height,this}toJSON(t){let e=super.toJSON(t);return e.object.width=this.width,e.object.height=this.height,e}},fa=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let t=0;t<9;t++)this.coefficients.push(new I)}set(t){for(let e=0;e<9;e++)this.coefficients[e].copy(t[e]);return this}zero(){for(let t=0;t<9;t++)this.coefficients[t].set(0,0,0);return this}getAt(t,e){let n=t.x,s=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.282095),e.addScaledVector(o[1],.488603*s),e.addScaledVector(o[2],.488603*r),e.addScaledVector(o[3],.488603*n),e.addScaledVector(o[4],1.092548*(n*s)),e.addScaledVector(o[5],1.092548*(s*r)),e.addScaledVector(o[6],.315392*(3*r*r-1)),e.addScaledVector(o[7],1.092548*(n*r)),e.addScaledVector(o[8],.546274*(n*n-s*s)),e}getIrradianceAt(t,e){let n=t.x,s=t.y,r=t.z,o=this.coefficients;return e.copy(o[0]).multiplyScalar(.886227),e.addScaledVector(o[1],2*.511664*s),e.addScaledVector(o[2],2*.511664*r),e.addScaledVector(o[3],2*.511664*n),e.addScaledVector(o[4],2*.429043*n*s),e.addScaledVector(o[5],2*.429043*s*r),e.addScaledVector(o[6],.743125*r*r-.247708),e.addScaledVector(o[7],2*.429043*n*r),e.addScaledVector(o[8],.429043*(n*n-s*s)),e}add(t){for(let e=0;e<9;e++)this.coefficients[e].add(t.coefficients[e]);return this}addScaledSH(t,e){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(t.coefficients[n],e);return this}scale(t){for(let e=0;e<9;e++)this.coefficients[e].multiplyScalar(t);return this}lerp(t,e){for(let n=0;n<9;n++)this.coefficients[n].lerp(t.coefficients[n],e);return this}equals(t){for(let e=0;e<9;e++)if(!this.coefficients[e].equals(t.coefficients[e]))return!1;return!0}copy(t){return this.set(t.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(t,e=0){let n=this.coefficients;for(let s=0;s<9;s++)n[s].fromArray(t,e+s*3);return this}toArray(t=[],e=0){let n=this.coefficients;for(let s=0;s<9;s++)n[s].toArray(t,e+s*3);return t}static getBasisAt(t,e){let n=t.x,s=t.y,r=t.z;e[0]=.282095,e[1]=.488603*s,e[2]=.488603*r,e[3]=.488603*n,e[4]=1.092548*n*s,e[5]=1.092548*s*r,e[6]=.315392*(3*r*r-1),e[7]=1.092548*n*r,e[8]=.546274*(n*n-s*s)}},Lc=class extends Ni{constructor(t=new fa,e=1){super(void 0,e),this.isLightProbe=!0,this.sh=t}copy(t){return super.copy(t),this.sh.copy(t.sh),this}toJSON(t){let e=super.toJSON(t);return e.object.sh=this.sh.toArray(),e}},k_={},Dc=class i extends xn{constructor(t){super(t),this.textures={}}load(t,e,n,s){let r=this,o=new di(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){s?s(l):qt(l),r.manager.itemError(t)}},n,s)}parse(t){let e=this.createMaterialFromType(t.type);return e.fromJSON(t,this.textures),e}setTextures(t){return this.textures=t,this}createMaterialFromType(t){return i.createMaterialFromType(t)}static createMaterialFromType(t){let n={ShadowMaterial:fc,SpriteMaterial:Xo,RawShaderMaterial:ra,ShaderMaterial:Un,PointsMaterial:Yo,MeshPhysicalMaterial:pc,MeshStandardMaterial:oa,MeshPhongMaterial:mc,MeshToonMaterial:gc,MeshNormalMaterial:_c,MeshLambertMaterial:xc,MeshDepthMaterial:aa,MeshDistanceMaterial:la,MeshBasicMaterial:Li,MeshMatcapMaterial:vc,LineDashedMaterial:yc,LineBasicMaterial:mn,Material:en,...k_}[t],s;return n===void 0?(xs(`MaterialLoader: Unknown material type "${t}". Use .registerMaterial() before starting the deserialization process.`),s=new en):s=new n,s}static registerMaterial(t,e){k_[t]=e}},pa=class{static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},Nc=class extends ue{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}},Uc=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=new di(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(t,function(a){try{e(r.parse(JSON.parse(a)))}catch(l){s?s(l):qt(l),r.manager.itemError(t)}},n,s)}parse(t){let e={},n={};function s(f,p){if(e[p]!==void 0)return e[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),v=Io(g.type,m),b=new Ur(v,g.stride);return b.uuid=g.uuid,e[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let o=t.isInstancedBufferGeometry?new Nc:new ue,a=t.data.index;if(a!==void 0){let f=Io(a.type,a.array);o.setIndex(new Ee(f,1))}let l=t.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=s(t.data,p.data);_=new tr(g,p.itemSize,p.offset,p.normalized)}else{let g=Io(p.type,p.array),m=p.isInstancedBufferAttribute?bs:Ee;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),o.setAttribute(f,_)}let c=t.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let v=p[g],b;if(v.isInterleavedBufferAttribute){let x=s(t.data,v.data);b=new tr(x,v.itemSize,v.offset,v.normalized)}else{let x=Io(v.type,v.array);b=new Ee(x,v.itemSize,v.normalized)}v.name!==void 0&&(b.name=v.name),_.push(b)}o.morphAttributes[f]=_}t.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let d=t.data.groups||t.data.drawcalls||t.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];o.addGroup(_.start,_.count,_.materialIndex)}let u=t.data.boundingSphere;return u!==void 0&&(o.boundingSphere=new tn().fromJSON(u)),t.name&&(o.name=t.name),t.userData&&(o.userData=t.userData),o}},om={},yd=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=this.path===""?pa.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||o;let a=new di(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(l){let c=null;try{c=JSON.parse(l)}catch(d){s!==void 0&&s(d),qt("ObjectLoader: Can't parse "+t+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){s!==void 0&&s(new Error("THREE.ObjectLoader: Can't load "+t)),qt("ObjectLoader: Can't load "+t);return}r.parse(c,e)},n,s)}async loadAsync(t,e){let n=this,s=this.path===""?pa.extractUrlBase(t):this.path;this.resourcePath=this.resourcePath||s;let r=new di(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(t,e),a;try{a=JSON.parse(o)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+t+". "+c.message)}let l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+t);return await n.parseAsync(a)}parse(t,e){let n=this.parseAnimations(t.animations),s=this.parseShapes(t.shapes),r=this.parseGeometries(t.geometries,s),o=this.parseImages(t.images,function(){e!==void 0&&e(c)}),a=this.parseTextures(t.textures,o),l=this.parseMaterials(t.materials,a),c=this.parseObject(t.object,r,l,a,n),h=this.parseSkeletons(t.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),e!==void 0){let d=!1;for(let u in o)if(o[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&e(c)}return c}async parseAsync(t){let e=this.parseAnimations(t.animations),n=this.parseShapes(t.shapes),s=this.parseGeometries(t.geometries,n),r=await this.parseImagesAsync(t.images),o=this.parseTextures(t.textures,r),a=this.parseMaterials(t.materials,o),l=this.parseObject(t.object,s,a,o,e),c=this.parseSkeletons(t.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(t,e){om[t]=e}parseShapes(t){let e={};if(t!==void 0)for(let n=0,s=t.length;n<s;n++){let r=new sr().fromJSON(t[n]);e[r.uuid]=r}return e}parseSkeletons(t,e){let n={},s={};if(e.traverse(function(r){r.isBone&&(s[r.uuid]=r)}),t!==void 0)for(let r=0,o=t.length;r<o;r++){let a=new Ol().fromJSON(t[r],s);n[a.uuid]=a}return n}parseGeometries(t,e){let n={};if(t!==void 0){let s=new Uc;for(let r=0,o=t.length;r<o;r++){let a,l=t[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=s.parse(l);break;default:l.type in N_?a=N_[l.type].fromJSON(l,e):l.type in om?a=om[l.type].fromJSON(l,e):bt(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(t,e){let n={},s={};if(t!==void 0){let r=new Dc;r.setTextures(e);for(let o=0,a=t.length;o<a;o++){let l=t[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),s[l.uuid]=n[l.uuid]}}return s}parseAnimations(t){let e={};if(t!==void 0)for(let n=0;n<t.length;n++){let s=t[n],r=rr.parse(s);e[r.uuid]=r}return e}parseImages(t,e){let n=this,s={},r;function o(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:Io(l.type,l.data),width:l.width,height:l.height}:null}if(t!==void 0&&t.length>0){let l=new da(e);r=new or(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=t.length;c<h;c++){let d=t[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Nn(m.data,m.width,m.height)))}s[d.uuid]=new Ri(f)}else{let f=a(d.url);s[d.uuid]=new Ri(f)}}}return s}async parseImagesAsync(t){let e=this,n={},s;async function r(o){if(typeof o=="string"){let a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:e.resourcePath+a;return await s.loadAsync(l)}else return o.data?{data:Io(o.type,o.data),width:o.width,height:o.height}:null}if(t!==void 0&&t.length>0){s=new or(this.manager),s.setCrossOrigin(this.crossOrigin);for(let o=0,a=t.length;o<a;o++){let l=t[o],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Nn(p.data,p.width,p.height)))}n[l.uuid]=new Ri(h)}else{let h=await r(l.url);n[l.uuid]=new Ri(h)}}}return n}parseTextures(t,e){function n(r,o){return typeof r=="number"?r:(bt("ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let s={};if(t!==void 0)for(let r=0,o=t.length;r<o;r++){let a=t[r];a.image===void 0&&bt('ObjectLoader: No "image" specified for',a.uuid),e[a.image]===void 0&&bt("ObjectLoader: Undefined image",a.image);let l=e[a.image],c=l.data,h;Array.isArray(c)?(h=new er,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new Nn:h=new qe,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,CM)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],G_),h.wrapT=n(a.wrap[1],G_)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,H_)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,H_)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.normalized!==void 0&&(h.normalized=a.normalized),a.userData!==void 0&&(h.userData=a.userData),s[a.uuid]=h}return s}parseObject(t,e,n,s,r){let o;function a(u){return e[u]===void 0&&bt("ObjectLoader: Undefined geometry",u),e[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&bt("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&bt("ObjectLoader: Undefined material",u),n[u]}}function c(u){return s[u]===void 0&&bt("ObjectLoader: Undefined texture",u),s[u]}let h,d;switch(t.type){case"Scene":o=new Dl,t.background!==void 0&&(Number.isInteger(t.background)?o.background=new Ft(t.background):o.background=c(t.background)),t.environment!==void 0&&(o.environment=c(t.environment)),t.fog!==void 0&&(t.fog.type==="Fog"?o.fog=new Ll(t.fog.color,t.fog.near,t.fog.far):t.fog.type==="FogExp2"&&(o.fog=new Il(t.fog.color,t.fog.density)),t.fog.name!==""&&(o.fog.name=t.fog.name)),t.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=t.backgroundBlurriness),t.backgroundIntensity!==void 0&&(o.backgroundIntensity=t.backgroundIntensity),t.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(t.backgroundRotation),t.environmentIntensity!==void 0&&(o.environmentIntensity=t.environmentIntensity),t.environmentRotation!==void 0&&o.environmentRotation.fromArray(t.environmentRotation);break;case"PerspectiveCamera":o=new je(t.fov,t.aspect,t.near,t.far),t.focus!==void 0&&(o.focus=t.focus),t.zoom!==void 0&&(o.zoom=t.zoom),t.filmGauge!==void 0&&(o.filmGauge=t.filmGauge),t.filmOffset!==void 0&&(o.filmOffset=t.filmOffset),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"OrthographicCamera":o=new ar(t.left,t.right,t.top,t.bottom,t.near,t.far),t.zoom!==void 0&&(o.zoom=t.zoom),t.view!==void 0&&(o.view=Object.assign({},t.view));break;case"AmbientLight":o=new Pc(t.color,t.intensity);break;case"DirectionalLight":o=new Rc(t.color,t.intensity),o.target=t.target||"";break;case"PointLight":o=new Cc(t.color,t.intensity,t.distance,t.decay);break;case"RectAreaLight":o=new Ic(t.color,t.intensity,t.width,t.height);break;case"SpotLight":o=new Ec(t.color,t.intensity,t.distance,t.angle,t.penumbra,t.decay),o.target=t.target||"";break;case"HemisphereLight":o=new wc(t.color,t.groundColor,t.intensity);break;case"LightProbe":let u=new fa().fromArray(t.sh);o=new Lc(u,t.intensity);break;case"SkinnedMesh":h=a(t.geometry),d=l(t.material),o=new Fl(h,d),t.bindMode!==void 0&&(o.bindMode=t.bindMode),t.bindMatrix!==void 0&&o.bindMatrix.fromArray(t.bindMatrix),t.skeleton!==void 0&&(o.skeleton=t.skeleton);break;case"Mesh":h=a(t.geometry),d=l(t.material),o=new Ve(h,d);break;case"InstancedMesh":h=a(t.geometry),d=l(t.material);let f=t.count,p=t.instanceMatrix,_=t.instanceColor;o=new Bl(h,d,f),o.instanceMatrix=new bs(new Float32Array(p.array),16),_!==void 0&&(o.instanceColor=new bs(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=a(t.geometry),d=l(t.material),o=new Vl(t.maxInstanceCount,t.maxVertexCount,t.maxIndexCount,d),o.geometry=h,o.perObjectFrustumCulled=t.perObjectFrustumCulled,o.sortObjects=t.sortObjects,o._drawRanges=t.drawRanges,o._reservedRanges=t.reservedRanges,o._geometryInfo=t.geometryInfo.map(g=>{let m=null,v=null;return g.boundingBox!==void 0&&(m=new an().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(v=new tn().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:v}}),o._instanceInfo=t.instanceInfo,o._availableInstanceIds=t._availableInstanceIds,o._availableGeometryIds=t._availableGeometryIds,o._nextIndexStart=t.nextIndexStart,o._nextVertexStart=t.nextVertexStart,o._geometryCount=t.geometryCount,o._maxInstanceCount=t.maxInstanceCount,o._maxVertexCount=t.maxVertexCount,o._maxIndexCount=t.maxIndexCount,o._geometryInitialized=t.geometryInitialized,o._matricesTexture=c(t.matricesTexture.uuid),o._indirectTexture=c(t.indirectTexture.uuid),t.colorsTexture!==void 0&&(o._colorsTexture=c(t.colorsTexture.uuid)),t.boundingSphere!==void 0&&(o.boundingSphere=new tn().fromJSON(t.boundingSphere)),t.boundingBox!==void 0&&(o.boundingBox=new an().fromJSON(t.boundingBox));break;case"LOD":o=new Ul;break;case"Line":o=new Di(a(t.geometry),l(t.material));break;case"LineLoop":o=new kl(a(t.geometry),l(t.material));break;case"LineSegments":o=new ri(a(t.geometry),l(t.material));break;case"PointCloud":case"Points":o=new Gl(a(t.geometry),l(t.material));break;case"Sprite":o=new Nl(l(t.material));break;case"Group":o=new _s;break;case"Bone":o=new qo;break;default:o=new Te}if(o.uuid=t.uuid,t.name!==void 0&&(o.name=t.name),t.matrix!==void 0?(o.matrix.fromArray(t.matrix),t.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=t.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(t.position!==void 0&&o.position.fromArray(t.position),t.rotation!==void 0&&o.rotation.fromArray(t.rotation),t.quaternion!==void 0&&o.quaternion.fromArray(t.quaternion),t.scale!==void 0&&o.scale.fromArray(t.scale)),t.up!==void 0&&o.up.fromArray(t.up),t.pivot!==void 0&&(o.pivot=new I().fromArray(t.pivot)),t.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),t.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=t.morphTargetInfluences.slice()),t.castShadow!==void 0&&(o.castShadow=t.castShadow),t.receiveShadow!==void 0&&(o.receiveShadow=t.receiveShadow),t.shadow&&(t.shadow.intensity!==void 0&&(o.shadow.intensity=t.shadow.intensity),t.shadow.bias!==void 0&&(o.shadow.bias=t.shadow.bias),t.shadow.normalBias!==void 0&&(o.shadow.normalBias=t.shadow.normalBias),t.shadow.radius!==void 0&&(o.shadow.radius=t.shadow.radius),t.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(t.shadow.mapSize),t.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(t.shadow.camera))),t.visible!==void 0&&(o.visible=t.visible),t.frustumCulled!==void 0&&(o.frustumCulled=t.frustumCulled),t.renderOrder!==void 0&&(o.renderOrder=t.renderOrder),t.static!==void 0&&(o.static=t.static),t.userData!==void 0&&(o.userData=t.userData),t.layers!==void 0&&(o.layers.mask=t.layers),t.children!==void 0){let u=t.children;for(let f=0;f<u.length;f++)o.add(this.parseObject(u[f],e,n,s,r))}if(t.animations!==void 0){let u=t.animations;for(let f=0;f<u.length;f++){let p=u[f];o.animations.push(r[p])}}if(t.type==="LOD"){t.autoUpdate!==void 0&&(o.autoUpdate=t.autoUpdate);let u=t.levels;for(let f=0;f<u.length;f++){let p=u[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(t,e){Object.keys(e).length!==0&&t.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let s=e[n.skeleton];s===void 0?bt("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(s,n.bindMatrix)}})}bindLightTargets(t){t.traverse(function(e){if(e.isDirectionalLight||e.isSpotLight){let n=e.target,s=t.getObjectByProperty("uuid",n);s!==void 0?e.target=s:e.target=new Te}})}},CM={UVMapping:Hc,CubeReflectionMapping:Oi,CubeRefractionMapping:ws,EquirectangularReflectionMapping:xa,EquirectangularRefractionMapping:va,CubeUVReflectionMapping:Wr},G_={RepeatWrapping:Do,ClampToEdgeWrapping:Dn,MirroredRepeatWrapping:No},H_={NearestFilter:Xe,NearestMipmapNearestFilter:mf,NearestMipmapLinearFilter:Xr,LinearFilter:Fe,LinearMipmapNearestFilter:ya,LinearMipmapLinearFilter:Bi},am=new WeakMap,Sd=class extends xn{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&bt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&bt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(t){return this.options=t,this}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Pi.get(`image-bitmap:${t}`);if(o!==void 0){if(r.manager.itemStart(t),o.then){o.then(c=>{am.has(o)===!0?(s&&s(am.get(o)),r.manager.itemError(t),r.manager.itemEnd(t)):(e&&e(c),r.manager.itemEnd(t))});return}setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(t,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){Pi.add(`image-bitmap:${t}`,c),e&&e(c),r.manager.itemEnd(t)}).catch(function(c){s&&s(c),am.set(l,c),Pi.remove(`image-bitmap:${t}`),r.manager.itemError(t),r.manager.itemEnd(t)});Pi.add(`image-bitmap:${t}`,l),r.manager.itemStart(t)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ma=class{static getContext(){return Vu===void 0&&(Vu=new(window.AudioContext||window.webkitAudioContext)),Vu}static setContext(t){Vu=t}},bd=class extends xn{constructor(t){super(t)}load(t,e,n,s){let r=this,o=new di(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(l){try{let c=l.slice(0),h=ma.getContext(),d=t+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){e(u),r.manager.itemEnd(d)}).catch(function(u){a(u),r.manager.itemEnd(d)})}catch(c){a(c)}},n,s);function a(l){s?s(l):qt(l),r.manager.itemError(t)}}},W_=new le,X_=new le,br=new le,Md=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new je,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new je,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(t){let e=this._cache;if(e.focus!==t.focus||e.fov!==t.fov||e.aspect!==t.aspect*this.aspect||e.near!==t.near||e.far!==t.far||e.zoom!==t.zoom||e.eyeSep!==this.eyeSep){e.focus=t.focus,e.fov=t.fov,e.aspect=t.aspect*this.aspect,e.near=t.near,e.far=t.far,e.zoom=t.zoom,e.eyeSep=this.eyeSep,br.copy(t.projectionMatrix);let s=e.eyeSep/2,r=s*e.near/e.focus,o=e.near*Math.tan(Rr*e.fov*.5)/e.zoom,a,l;X_.elements[12]=-s,W_.elements[12]=s,a=-o*e.aspect+r,l=o*e.aspect+r,br.elements[0]=2*e.near/(l-a),br.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(br),a=-o*e.aspect-r,l=o*e.aspect-r,br.elements[0]=2*e.near/(l-a),br.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(br)}this.cameraL.matrix.copy(t.matrixWorld).multiply(X_),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(t.matrixWorld).multiply(W_),this.cameraR.matrixWorldNeedsUpdate=!0}},Eo=-90,Co=1,Fc=class extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new je(Eo,Co,t,e);s.layers=this.layers,this.add(s);let r=new je(Eo,Co,t,e);r.layers=this.layers,this.add(r);let o=new je(Eo,Co,t,e);o.layers=this.layers,this.add(o);let a=new je(Eo,Co,t,e);a.layers=this.layers,this.add(a);let l=new je(Eo,Co,t,e);l.layers=this.layers,this.add(l);let c=new je(Eo,Co,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;t.isWebGLRenderer===!0?g=t.state.buffers.depth.getReversed():g=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),g&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Oc=class extends je{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Bc=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=RM.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};Mr=new I,lm=new pn,PM=new I,Tr=new I,wr=new I,Td=class extends Te{constructor(){super(),this.type="AudioListener",this.context=ma.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new Bc}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(t){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}updateMatrixWorld(t){super.updateMatrixWorld(t),this._timer.update();let e=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(Mr,lm,PM),Tr.set(0,0,-1).applyQuaternion(lm),wr.set(0,1,0).applyQuaternion(lm),e.positionX){let n=this.context.currentTime+this.timeDelta;e.positionX.linearRampToValueAtTime(Mr.x,n),e.positionY.linearRampToValueAtTime(Mr.y,n),e.positionZ.linearRampToValueAtTime(Mr.z,n),e.forwardX.linearRampToValueAtTime(Tr.x,n),e.forwardY.linearRampToValueAtTime(Tr.y,n),e.forwardZ.linearRampToValueAtTime(Tr.z,n),e.upX.linearRampToValueAtTime(wr.x,n),e.upY.linearRampToValueAtTime(wr.y,n),e.upZ.linearRampToValueAtTime(wr.z,n)}else e.setPosition(Mr.x,Mr.y,Mr.z),e.setOrientation(Tr.x,Tr.y,Tr.z,wr.x,wr.y,wr.z)}},zc=class extends Te{constructor(t){super(),this.type="Audio",this.listener=t,this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this}setMediaElementSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(t),this.connect(),this}setMediaStreamSource(t){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(t),this.connect(),this}setBuffer(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this}play(t=0){if(this.isPlaying===!0){bt("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){bt("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+t;let e=this.context.createBufferSource();return e.buffer=this.buffer,e.loop=this.loop,e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.onended=this.onEnded.bind(this),e.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=e,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){bt("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(t=0){if(this.hasPlaybackControl===!1){bt("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+t),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(t){return t||(t=[]),this._connected===!0?(this.disconnect(),this.filters=t.slice(),this.connect()):this.filters=t.slice(),this}setDetune(t){return this.detune=t,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(t){return this.setFilters(t?[t]:[])}setPlaybackRate(t){if(this.hasPlaybackControl===!1){bt("Audio: this Audio has no playback control.");return}return this.playbackRate=t,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(bt("Audio: this Audio has no playback control."),!1):this.loop}setLoop(t){if(this.hasPlaybackControl===!1){bt("Audio: this Audio has no playback control.");return}return this.loop=t,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(t){return this.loopStart=t,this}setLoopEnd(t){return this.loopEnd=t,this}getVolume(){return this.gain.gain.value}setVolume(t){return this.gain.gain.setTargetAtTime(t,this.context.currentTime,.01),this}copy(t,e){return super.copy(t,e),t.sourceType!=="buffer"?(bt("Audio: Audio source type cannot be copied."),this):(this.autoplay=t.autoplay,this.buffer=t.buffer,this.detune=t.detune,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.offset=t.offset,this.duration=t.duration,this.playbackRate=t.playbackRate,this.hasPlaybackControl=t.hasPlaybackControl,this.sourceType=t.sourceType,this.filters=t.filters.slice(),this)}clone(t){return new this.constructor(this.listener).copy(this,t)}},Ar=new I,q_=new pn,IM=new I,Er=new I,wd=class extends zc{constructor(t){super(t),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(t){return this.panner.refDistance=t,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(t){return this.panner.rolloffFactor=t,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(t){return this.panner.distanceModel=t,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(t){return this.panner.maxDistance=t,this}setDirectionalCone(t,e,n){return this.panner.coneInnerAngle=t,this.panner.coneOuterAngle=e,this.panner.coneOuterGain=n,this}updateMatrixWorld(t){if(super.updateMatrixWorld(t),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ar,q_,IM),Er.set(0,0,1).applyQuaternion(q_);let e=this.panner;if(e.positionX){let n=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(Ar.x,n),e.positionY.linearRampToValueAtTime(Ar.y,n),e.positionZ.linearRampToValueAtTime(Ar.z,n),e.orientationX.linearRampToValueAtTime(Er.x,n),e.orientationY.linearRampToValueAtTime(Er.y,n),e.orientationZ.linearRampToValueAtTime(Er.z,n)}else e.setPosition(Ar.x,Ar.y,Ar.z),e.setOrientation(Er.x,Er.y,Er.z)}},Ad=class{constructor(t,e=2048){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=e,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let t=0,e=this.getFrequencyData();for(let n=0;n<e.length;n++)t+=e[n];return t/e.length}},Vc=class{constructor(t,e,n){this.binding=t,this.valueSize=n;let s,r,o;switch(e){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){let n=this.buffer,s=this.valueSize,r=t*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=e}else{o+=e;let a=e/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(t){let e=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,s,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){let e=this.valueSize,n=this.buffer,s=t*e+e,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=e*this._origIndex;this._mixBufferRegion(n,s,l,1-r,e)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*e,1,e);for(let l=e,c=e+e;l!==c;++l)if(n[l]!==n[l+e]){a.setValue(n,s);break}}saveOriginalState(){let t=this.binding,e=this.buffer,n=this.valueSize,s=n*this._origIndex;t.getValue(e,s);for(let r=n,o=s;r!==o;++r)e[r]=e[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){let t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)t[e+o]=t[n+o]}_slerp(t,e,n,s){pn.slerpFlat(t,e,t,e,t,n,s)}_slerpAdditive(t,e,n,s,r){let o=this._workIndex*r;pn.multiplyQuaternionsFlat(t,o,t,e,t,n),pn.slerpFlat(t,e,t,e,t,o,s)}_lerp(t,e,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=e+a;t[l]=t[l]*o+t[n+a]*s}}_lerpAdditive(t,e,n,s,r){for(let o=0;o!==r;++o){let a=e+o;t[a]=t[a]+t[n+o]*s}}},dg="\\[\\]\\.:\\/",LM=new RegExp("["+dg+"]","g"),fg="[^"+dg+"]",DM="[^"+dg.replace("\\.","")+"]",NM=/((?:WC+[\/:])*)/.source.replace("WC",fg),UM=/(WCOD+)?/.source.replace("WCOD",DM),FM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fg),OM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fg),BM=new RegExp("^"+NM+UM+FM+OM+"$"),zM=["material","materials","bones","map"],bm=class{constructor(t,e,n){let s=n||Ce.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ce=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(LM,"")}static parseTrackName(t){let e=BM.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);zM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){bt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){qt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){qt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){qt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){qt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){qt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){qt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;qt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){qt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ce.Composite=bm;Ce.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ce.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ce.prototype.GetterByBindingType=[Ce.prototype._getValue_direct,Ce.prototype._getValue_array,Ce.prototype._getValue_arrayElement,Ce.prototype._getValue_toArray];Ce.prototype.SetterByBindingTypeAndVersioning=[[Ce.prototype._setValue_direct,Ce.prototype._setValue_direct_setNeedsUpdate,Ce.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_array,Ce.prototype._setValue_array_setNeedsUpdate,Ce.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_arrayElement,Ce.prototype._setValue_arrayElement_setNeedsUpdate,Ce.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ce.prototype._setValue_fromArray,Ce.prototype._setValue_fromArray_setNeedsUpdate,Ce.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Ed=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=si(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let t={};this._indicesByUUID=t;for(let n=0,s=arguments.length;n!==s;++n)t[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let e=this;this.stats={objects:{get total(){return e._objects.length},get inUse(){return this.total-e.nCachedObjects_}},get bindingsPerObject(){return e._bindings.length}}}add(){let t=this._objects,e=this._indicesByUUID,n=this._paths,s=this._parsedPaths,r=this._bindings,o=r.length,a,l=t.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=e[f];if(p===void 0){p=l++,e[f]=p,t.push(u);for(let _=0,g=o;_!==g;++_)r[_].push(new Ce(u,n[_],s[_]))}else if(p<c){a=t[p];let _=--c,g=t[_];e[g.uuid]=p,t[p]=g,e[f]=_,t[_]=u;for(let m=0,v=o;m!==v;++m){let b=r[m],x=b[_],T=b[p];b[p]=x,T===void 0&&(T=new Ce(u,n[m],s[m])),b[_]=T}}else t[p]!==a&&qt("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,s=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let l=arguments[o],c=l.uuid,h=e[c];if(h!==void 0&&h>=r){let d=r++,u=t[d];e[u.uuid]=h,t[h]=u,e[c]=d,t[d]=l;for(let f=0,p=s;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let t=this._objects,e=this._indicesByUUID,n=this._bindings,s=n.length,r=this.nCachedObjects_,o=t.length;for(let a=0,l=arguments.length;a!==l;++a){let c=arguments[a],h=c.uuid,d=e[h];if(d!==void 0)if(delete e[h],d<r){let u=--r,f=t[u],p=--o,_=t[p];e[f.uuid]=d,t[d]=f,e[_.uuid]=u,t[u]=_,t.pop();for(let g=0,m=s;g!==m;++g){let v=n[g],b=v[u],x=v[p];v[d]=b,v[u]=x,v.pop()}}else{let u=--o,f=t[u];u>0&&(e[f.uuid]=d),t[d]=f,t.pop();for(let p=0,_=s;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(t,e){let n=this._bindingsIndicesByPath,s=n[t],r=this._bindings;if(s!==void 0)return r[s];let o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);s=r.length,n[t]=s,o.push(t),a.push(e),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new Ce(p,t,e)}return d}unsubscribe_(t){let e=this._bindingsIndicesByPath,n=e[t];if(n!==void 0){let s=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=t[a];e[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),s[n]=s[a],s.pop()}}},kc=class{constructor(t,e,n=null,s=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=s;let r=e.tracks,o=r.length,a=new Array(o),l={endingStart:$s,endingEnd:$s};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Jm,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n=!1){if(t.fadeOut(e),this.fadeIn(e),n===!0){let s=this._clip.duration,r=t._clip.duration,o=r/s,a=s/r;t._restoreTimeScale=t.timeScale,this._restoreTimeScale=this.timeScale,t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n=!1){return t.crossFadeFrom(this,e,n)}stopFading(){let t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=t/o,c[1]=e/o,this}stopWarping(){let t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,s){if(!this.enabled){this._updateWeight(t);return}let r=this._startTime;if(r!==null){let l=(t-r)*n;l<0||n===0?e=0:(this._startTime=null,e=n*l)}e*=this._updateTimeScale(t);let o=this._updateTime(e),a=this._updateWeight(t);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case bf:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Ah:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(s,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(t)[0];e*=s,t>n.parameterPositions[1]&&(e===0?this.paused=!0:(this._restoreTimeScale!==null&&(e=this._restoreTimeScale),this.timeScale=e),this.stopWarping())}}return this._effectiveTimeScale=e,e}_updateTime(t){let e=this._clip.duration,n=this.loop,s=this.time+t,r=this._loopCount,o=n===Km;if(t===0)return r===-1?s:o&&(r&1)===1?e-s:s;if(n===Zm){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(s>=e)s=e;else if(s<0)s=0;else{this.time=s;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(r===-1&&(t>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=e||s<0){let a=Math.floor(s/e);s-=e*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=t>0?e:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(l===1){let c=t<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return e-s}return s}_setEndings(t,e,n){let s=this._interpolantSettings;n?(s.endingStart=Zs,s.endingEnd=Zs):(t?s.endingStart=this.zeroSlopeAtStart?Zs:$s:s.endingStart=Fo,e?s.endingEnd=this.zeroSlopeAtEnd?Zs:$s:s.endingEnd=Fo)}_scheduleFading(t,e,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=e,a[1]=r+t,l[1]=n,this}},VM=new Float32Array(1),Cd=class extends Yn{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(t,e){let n=t._localRoot||this._root,s=t._clip.tracks,r=s.length,o=t._propertyBindings,a=t._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=s[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,o[d]=p;else{if(p=o[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=e&&e._propertyBindings[d].binding.parsedPath;p=new Vc(Ce.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[d]=p}a[d].resultBuffer=p.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){let n=(t._localRoot||this._root).uuid,s=t._clip.uuid,r=this._actionsByClip[s];this._bindAction(t,r&&r.knownActions[0]),this._addInactiveAction(t,s,n)}let e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){let r=e[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){let e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){let r=e[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){let e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){let s=this._actions,r=this._actionsByClip,o=r[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,r[e]=o;else{let a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=s.length,s.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){let e=this._actions,n=e[e.length-1],s=t._cacheIndex;n._cacheIndex=s,e[s]=n,e.pop(),t._cacheIndex=null;let r=t._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=t._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),t._byClipCacheIndex=null;let d=a.actionByRoot,u=(t._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){let e=t._propertyBindings;for(let n=0,s=e.length;n!==s;++n){let r=e[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(t){let e=this._actions,n=t._cacheIndex,s=this._nActiveActions++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackAction(t){let e=this._actions,n=t._cacheIndex,s=--this._nActiveActions,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_addInactiveBinding(t,e,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[e];o===void 0&&(o={},s[e]=o),o[n]=t,t._cacheIndex=r.length,r.push(t)}_removeInactiveBinding(t){let e=this._bindings,n=t.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=e[e.length-1],c=t._cacheIndex;l._cacheIndex=c,e[c]=l,e.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(t){let e=this._bindings,n=t._cacheIndex,s=this._nActiveBindings++,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_takeBackBinding(t){let e=this._bindings,n=t._cacheIndex,s=--this._nActiveBindings,r=e[s];t._cacheIndex=s,e[s]=t,r._cacheIndex=n,e[n]=r}_lendControlInterpolant(){let t=this._controlInterpolants,e=this._nActiveControlInterpolants++,n=t[e];return n===void 0&&(n=new ca(new Float32Array(2),new Float32Array(2),1,VM),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){let e=this._controlInterpolants,n=t.__cacheIndex,s=--this._nActiveControlInterpolants,r=e[s];t.__cacheIndex=s,e[s]=t,r.__cacheIndex=n,e[n]=r}clipAction(t,e,n){let s=e||this._root,r=s.uuid,o=typeof t=="string"?rr.findByName(s,t):t,a=o!==null?o.uuid:t,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Ah),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new kc(this,o,e,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(t,e){let n=e||this._root,s=n.uuid,r=typeof t=="string"?rr.findByName(n,t):t,o=r?r.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;let e=this._actions,n=this._nActiveActions,s=this.time+=t,r=Math.sign(t),o=this._accuIndex^=1;for(let c=0;c!==n;++c)e[c]._update(s,t,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){let e=this._actions,n=t.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,d=e[e.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,e[h]=d,e.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(t){let e=t.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[e];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[e];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){let n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Rd=class extends Go{constructor(t=1,e=1,n=1,s={}){super(t,e,s),this.isRenderTarget3D=!0,this.depth=n,this.texture=new Lr(null,t,e,n),this._setTextureOptions(s),this.texture.isRenderTargetTexture=!0}},Pd=class i{constructor(t){this.value=t}clone(){return new i(this.value.clone===void 0?this.value:this.value.clone())}},kM=0,Id=class extends Yn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:kM++}),this.name="",this.usage=zo,this.uniforms=[]}add(t){return this.uniforms.push(t),this}remove(t){let e=this.uniforms.indexOf(t);return e!==-1&&this.uniforms.splice(e,1),this}setName(t){return this.name=t,this}setUsage(t){return this.usage=t,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(t){this.name=t.name,this.usage=t.usage;let e=t.uniforms;this.uniforms.length=0;for(let n=0,s=e.length;n<s;n++){let r=Array.isArray(e[n])?e[n]:[e[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},Ld=class extends Ur{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}},Dd=class{constructor(t,e,n,s,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=t,this.type=e,this.itemSize=n,this.elementSize=s,this.count=r,this.normalized=o,this.version=0}set needsUpdate(t){t===!0&&this.version++}setBuffer(t){return this.buffer=t,this}setType(t,e){return this.type=t,this.elementSize=e,this}setItemSize(t){return this.itemSize=t,this}setCount(t){return this.count=t,this}},Y_=new le,Nd=class{constructor(t,e,n=0,s=1/0){this.ray=new Ss(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Dr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):qt("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Y_.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Y_),this}intersectObject(t,e=!0,n=[]){return Mm(t,this,n,e),n.sort($_),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Mm(t[s],this,n,e);return n.sort($_),n}};Ud=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,bt("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}},Fd=class{constructor(t=1,e=0,n=0){this.radius=t,this.phi=e,this.theta=n}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ae(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ae(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Od=class{constructor(t=1,e=0,n=0){this.radius=t,this.theta=e,this.y=n}set(t,e,n){return this.radius=t,this.theta=e,this.y=n,this}copy(t){return this.radius=t.radius,this.theta=t.theta,this.y=t.y,this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+n*n),this.theta=Math.atan2(t,n),this.y=e,this}clone(){return new this.constructor().copy(this)}},xg=class xg{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};xg.prototype.isMatrix2=!0;Bd=xg,Z_=new lt,Gc=class{constructor(t=new lt(1/0,1/0),e=new lt(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Z_.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Z_).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},J_=new I,ku=new I,Ro=new I,Po=new I,cm=new I,GM=new I,HM=new I,zd=class{constructor(t=new I,e=new I){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){J_.subVectors(t,this.start),ku.subVectors(this.end,this.start);let n=ku.dot(ku);if(n===0)return 0;let r=ku.dot(J_)/n;return e&&(r=ae(r,0,1)),r}closestPointToPoint(t,e,n){let s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}distanceSqToLine3(t,e=GM,n=HM){let s=10000000000000001e-32,r,o,a=this.start,l=t.start,c=this.end,h=t.end;Ro.subVectors(c,a),Po.subVectors(h,l),cm.subVectors(a,l);let d=Ro.dot(Ro),u=Po.dot(Po),f=Po.dot(cm);if(d<=s&&u<=s)return e.copy(a),n.copy(l),e.sub(n),e.dot(e);if(d<=s)r=0,o=f/u,o=ae(o,0,1);else{let p=Ro.dot(cm);if(u<=s)o=0,r=ae(-p/d,0,1);else{let _=Ro.dot(Po),g=d*u-_*_;g!==0?r=ae((_*f-p*u)/g,0,1):r=0,o=(_*r+f)/u,o<0?(o=0,r=ae(-p/d,0,1)):o>1&&(o=1,r=ae((_-p)/d,0,1))}}return e.copy(a).addScaledVector(Ro,r),n.copy(l).addScaledVector(Po,o),e.distanceToSquared(n)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},K_=new I,Vd=class extends Te{constructor(t,e){super(),this.light=t,this.matrixAutoUpdate=!1,this.color=e,this.type="SpotLightHelper";let n=new ue,s=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){let c=o/l*Math.PI*2,h=a/l*Math.PI*2;s.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Bt(s,3));let r=new mn({fog:!1,toneMapped:!1});this.cone=new ri(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let t=this.light.distance?this.light.distance:1e3,e=t*Math.tan(this.light.angle);this.cone.scale.set(e,e,t),K_.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(K_),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},qs=new I,Gu=new le,hm=new le,kd=class extends ri{constructor(t){let e=hv(t),n=new ue,s=[],r=[];for(let c=0;c<e.length;c++){let h=e[c];h.parent&&h.parent.isBone&&(s.push(0,0,0),s.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new Bt(s,3)),n.setAttribute("color",new Bt(r,3));let o=new mn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1;let a=new Ft(255),l=new Ft(65280);this.setColors(a,l)}updateMatrixWorld(t){let e=this.bones,n=this.geometry,s=n.getAttribute("position");hm.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<e.length;r++){let a=e[r];a.parent&&a.parent.isBone&&(Gu.multiplyMatrices(hm,a.matrixWorld),qs.setFromMatrixPosition(Gu),s.setXYZ(o,qs.x,qs.y,qs.z),Gu.multiplyMatrices(hm,a.parent.matrixWorld),qs.setFromMatrixPosition(Gu),s.setXYZ(o+1,qs.x,qs.y,qs.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(t)}setColors(t,e){let s=this.geometry.getAttribute("color");for(let r=0;r<s.count;r+=2)s.setXYZ(r,t.r,t.g,t.b),s.setXYZ(r+1,e.r,e.g,e.b);return s.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};Gd=class extends Ve{constructor(t,e,n){let s=new sa(e,4,2),r=new Li({wireframe:!0,fog:!1,toneMapped:!1});super(s,r),this.light=t,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},WM=new I,Q_=new Ft,j_=new Ft,Hd=class extends Te{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let s=new ia(e);s.rotateY(Math.PI*.5),this.material=new Li({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=s.getAttribute("position"),o=new Float32Array(r.count*3);s.setAttribute("color",new Ee(o,3)),this.add(new Ve(s,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let t=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let e=t.geometry.getAttribute("color");Q_.copy(this.light.color),j_.copy(this.light.groundColor);for(let n=0,s=e.count;n<s;n++){let r=n<s/2?Q_:j_;e.setXYZ(n,r.r,r.g,r.b)}e.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),t.lookAt(WM.setFromMatrixPosition(this.light.matrixWorld).negate())}},Wd=class extends ri{constructor(t=10,e=10,n=4473924,s=8947848){n=new Ft(n),s=new Ft(s);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=e;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=u===r?n:s;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new ue;h.setAttribute("position",new Bt(l,3)),h.setAttribute("color",new Bt(c,3));let d=new mn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},Xd=class extends ri{constructor(t=10,e=16,n=8,s=64,r=4473924,o=8947848){r=new Ft(r),o=new Ft(o);let a=[],l=[];if(e>1)for(let d=0;d<e;d++){let u=d/e*(Math.PI*2),f=Math.sin(u)*t,p=Math.cos(u)*t;a.push(0,0,0),a.push(f,0,p);let _=d&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:o,f=t-t/n*d;for(let p=0;p<s;p++){let _=p/s*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/s*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new ue;c.setAttribute("position",new Bt(a,3)),c.setAttribute("color",new Bt(l,3));let h=new mn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},tx=new I,Hu=new I,ex=new I,qd=class extends Te{constructor(t,e,n){super(),this.light=t,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",e===void 0&&(e=1);let s=new ue;s.setAttribute("position",new Bt([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));let r=new mn({fog:!1,toneMapped:!1});this.lightPlane=new Di(s,r),this.add(this.lightPlane),s=new ue,s.setAttribute("position",new Bt([0,0,0,0,0,1],3)),this.targetLine=new Di(s,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),tx.setFromMatrixPosition(this.light.matrixWorld),Hu.setFromMatrixPosition(this.light.target.matrixWorld),ex.subVectors(Hu,tx),this.lightPlane.lookAt(Hu),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Hu),this.targetLine.scale.z=ex.length()}},Wu=new I,We=new Gr,Yd=class extends ri{constructor(t){let e=new ue,n=new mn({color:16777215,vertexColors:!0,toneMapped:!1}),s=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){s.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(s.length/3-1)}e.setAttribute("position",new Bt(s,3)),e.setAttribute("color",new Bt(r,3)),super(e,n),this.type="CameraHelper",this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let c=new Ft(16755200),h=new Ft(16711680),d=new Ft(43775),u=new Ft(16777215),f=new Ft(3355443);this.setColors(c,h,d,u,f)}setColors(t,e,n,s,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,t.r,t.g,t.b),a.setXYZ(1,t.r,t.g,t.b),a.setXYZ(2,t.r,t.g,t.b),a.setXYZ(3,t.r,t.g,t.b),a.setXYZ(4,t.r,t.g,t.b),a.setXYZ(5,t.r,t.g,t.b),a.setXYZ(6,t.r,t.g,t.b),a.setXYZ(7,t.r,t.g,t.b),a.setXYZ(8,t.r,t.g,t.b),a.setXYZ(9,t.r,t.g,t.b),a.setXYZ(10,t.r,t.g,t.b),a.setXYZ(11,t.r,t.g,t.b),a.setXYZ(12,t.r,t.g,t.b),a.setXYZ(13,t.r,t.g,t.b),a.setXYZ(14,t.r,t.g,t.b),a.setXYZ(15,t.r,t.g,t.b),a.setXYZ(16,t.r,t.g,t.b),a.setXYZ(17,t.r,t.g,t.b),a.setXYZ(18,t.r,t.g,t.b),a.setXYZ(19,t.r,t.g,t.b),a.setXYZ(20,t.r,t.g,t.b),a.setXYZ(21,t.r,t.g,t.b),a.setXYZ(22,t.r,t.g,t.b),a.setXYZ(23,t.r,t.g,t.b),a.setXYZ(24,e.r,e.g,e.b),a.setXYZ(25,e.r,e.g,e.b),a.setXYZ(26,e.r,e.g,e.b),a.setXYZ(27,e.r,e.g,e.b),a.setXYZ(28,e.r,e.g,e.b),a.setXYZ(29,e.r,e.g,e.b),a.setXYZ(30,e.r,e.g,e.b),a.setXYZ(31,e.r,e.g,e.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,s.r,s.g,s.b),a.setXYZ(39,s.r,s.g,s.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let t=this.geometry,e=this.pointMap,n=1,s=1,r,o;if(We.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===qn)r=-1,o=1;else if(this.camera.coordinateSystem===Qs)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Ke("c",e,t,We,0,0,r),Ke("t",e,t,We,0,0,o),Ke("n1",e,t,We,-n,-s,r),Ke("n2",e,t,We,n,-s,r),Ke("n3",e,t,We,-n,s,r),Ke("n4",e,t,We,n,s,r),Ke("f1",e,t,We,-n,-s,o),Ke("f2",e,t,We,n,-s,o),Ke("f3",e,t,We,-n,s,o),Ke("f4",e,t,We,n,s,o),Ke("u1",e,t,We,n*.7,s*1.1,r),Ke("u2",e,t,We,-n*.7,s*1.1,r),Ke("u3",e,t,We,0,s*2,r),Ke("cf1",e,t,We,-n,0,o),Ke("cf2",e,t,We,n,0,o),Ke("cf3",e,t,We,0,-s,o),Ke("cf4",e,t,We,0,s,o),Ke("cn1",e,t,We,-n,0,r),Ke("cn2",e,t,We,n,0,r),Ke("cn3",e,t,We,0,-s,r),Ke("cn4",e,t,We,0,s,r),t.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}};Xu=new an,$d=class extends ri{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=new Float32Array(24),r=new ue;r.setIndex(new Ee(n,1)),r.setAttribute("position",new Ee(s,3)),super(r,new mn({color:e,toneMapped:!1})),this.object=t,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Xu.setFromObject(this.object),Xu.isEmpty())return;let t=Xu.min,e=Xu.max,n=this.geometry.attributes.position,s=n.array;s[0]=e.x,s[1]=e.y,s[2]=e.z,s[3]=t.x,s[4]=e.y,s[5]=e.z,s[6]=t.x,s[7]=t.y,s[8]=e.z,s[9]=e.x,s[10]=t.y,s[11]=e.z,s[12]=e.x,s[13]=e.y,s[14]=t.z,s[15]=t.x,s[16]=e.y,s[17]=t.z,s[18]=t.x,s[19]=t.y,s[20]=t.z,s[21]=e.x,s[22]=t.y,s[23]=t.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(t){return this.object=t,this.update(),this}copy(t,e){return super.copy(t,e),this.object=t.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}},Zd=class extends ri{constructor(t,e=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new ue;r.setIndex(new Ee(n,1)),r.setAttribute("position",new Bt(s,3)),super(r,new mn({color:e,toneMapped:!1})),this.box=t,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(t){let e=this.box;e.isEmpty()||(e.getCenter(this.position),e.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(t))}dispose(){this.geometry.dispose(),this.material.dispose()}},Jd=class extends Di{constructor(t,e=1,n=16776960){let s=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new ue;o.setAttribute("position",new Bt(r,3)),o.computeBoundingSphere(),super(o,new mn({color:s,toneMapped:!1})),this.type="PlaneHelper",this.plane=t,this.size=e;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new ue;l.setAttribute("position",new Bt(a,3)),l.computeBoundingSphere(),this.add(new Ve(l,new Li({color:s,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(t){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(t)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},nx=new I,Kd=class extends Te{constructor(t=new I(0,0,1),e=new I(0,0,0),n=1,s=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",qu===void 0&&(qu=new ue,qu.setAttribute("position",new Bt([0,0,0,0,1,0],3)),um=new Jo(.5,1,5,1),um.translate(0,-.5,0)),this.position.copy(e),this.line=new Di(qu,new mn({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ve(um,new Li({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{nx.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(nx,e)}}setLength(t,e=t*.2,n=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(n,e,n),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Qd=class extends ri{constructor(t=1){let e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new ue;s.setAttribute("position",new Bt(e,3)),s.setAttribute("color",new Bt(n,3));let r=new mn({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(t,e,n){let s=new Ft,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}},jd=class{constructor(){this.type="ShapePath",this.color=new Ft,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(t,e){return this.currentPath=new ir,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,s){return this.currentPath.quadraticCurveTo(t,e,n,s),this}bezierCurveTo(t,e,n,s,r,o){return this.currentPath.bezierCurveTo(t,e,n,s,r,o),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(){function t(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function e(l,c){let h=c.getCenter(new lt);if(t(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(bt('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let s=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=hi.area(c);if(h===0)continue;let d=new Gc;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:e(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&t(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}s(c.winding)===s(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new sr;c.curves=l.subPath.curves,o.push(c),a.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=a.get(l.container);if(!c)continue;let h=new ir;h.curves=l.subPath.curves,c.holes.push(h)}return o}},tf=class extends Yn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){bt("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};ef=class{static contain(t,e){return XM(t,e)}static cover(t,e){return qM(t,e)}static fill(t){return YM(t)}static getByteLength(t,e,n,s){return Tf(t,e,n,s)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));typeof window<"u"&&(window.__THREE__?bt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185")});var Fg={};el(Fg,{ACESFilmicToneMapping:()=>uf,AddEquation:()=>ys,AddOperation:()=>Ym,AdditiveAnimationBlendMode:()=>bf,AdditiveBlending:()=>rf,AgXToneMapping:()=>ff,AlphaFormat:()=>yf,AlwaysCompare:()=>rg,AlwaysDepth:()=>Ml,AlwaysStencilFunc:()=>Zu,AmbientLight:()=>Pc,AnimationAction:()=>kc,AnimationClip:()=>rr,AnimationLoader:()=>md,AnimationMixer:()=>Cd,AnimationObjectGroup:()=>Ed,AnimationUtils:()=>pd,ArcCurve:()=>Zl,ArrayCamera:()=>Oc,ArrowHelper:()=>Kd,AttachedBindMode:()=>Yu,Audio:()=>zc,AudioAnalyser:()=>Ad,AudioContext:()=>ma,AudioListener:()=>Td,AudioLoader:()=>bd,AxesHelper:()=>Qd,BackSide:()=>En,BasicDepthPacking:()=>Qm,BasicShadowMap:()=>ox,BatchedMesh:()=>Vl,BezierInterpolant:()=>Mc,Bone:()=>qo,BooleanKeyframeTrack:()=>Ji,Box2:()=>Gc,Box3:()=>an,Box3Helper:()=>Zd,BoxGeometry:()=>nr,BoxHelper:()=>$d,BufferAttribute:()=>Ee,BufferGeometry:()=>ue,BufferGeometryLoader:()=>Uc,ByteType:()=>gf,Cache:()=>Pi,Camera:()=>Gr,CameraHelper:()=>Yd,CanvasTexture:()=>ud,CapsuleGeometry:()=>Xl,CatmullRomCurve3:()=>Jl,CineonToneMapping:()=>hf,CircleGeometry:()=>ql,ClampToEdgeWrapping:()=>Dn,Clock:()=>Ud,Color:()=>Ft,ColorKeyframeTrack:()=>ha,ColorManagement:()=>ye,Compatibility:()=>$x,CompressedArrayTexture:()=>cd,CompressedCubeTexture:()=>hd,CompressedTexture:()=>Fr,CompressedTextureLoader:()=>gd,ConeGeometry:()=>Jo,ConstantAlphaFactor:()=>Wm,ConstantColorFactor:()=>Gm,Controls:()=>tf,CubeCamera:()=>Fc,CubeDepthTexture:()=>Wl,CubeReflectionMapping:()=>Oi,CubeRefractionMapping:()=>ws,CubeTexture:()=>er,CubeTextureLoader:()=>_d,CubeUVReflectionMapping:()=>Wr,CubicBezierCurve:()=>Ko,CubicBezierCurve3:()=>Kl,CubicInterpolant:()=>Sc,CullFaceBack:()=>sf,CullFaceFront:()=>Am,CullFaceFrontBack:()=>rx,CullFaceNone:()=>wm,Curve:()=>$n,CurvePath:()=>jl,CustomBlending:()=>Cm,CustomToneMapping:()=>df,CylinderGeometry:()=>Zo,Cylindrical:()=>Od,Data3DTexture:()=>Lr,DataArrayTexture:()=>Ir,DataTexture:()=>Nn,DataTextureLoader:()=>xd,DataUtils:()=>Qu,DecrementStencilOp:()=>wx,DecrementWrapStencilOp:()=>Ex,DefaultLoadingManager:()=>ug,DepthFormat:()=>Ii,DepthStencilFormat:()=>As,DepthTexture:()=>Zi,DetachedBindMode:()=>$m,DirectionalLight:()=>Rc,DirectionalLightHelper:()=>qd,DiscreteInterpolant:()=>bc,DodecahedronGeometry:()=>Yl,DoubleSide:()=>Ui,DstAlphaFactor:()=>Om,DstColorFactor:()=>zm,DynamicCopyUsage:()=>Gx,DynamicDrawUsage:()=>Fx,DynamicReadUsage:()=>zx,EdgesGeometry:()=>$l,EllipseCurve:()=>Or,EqualCompare:()=>ng,EqualDepth:()=>wl,EqualStencilFunc:()=>Ix,EquirectangularReflectionMapping:()=>xa,EquirectangularRefractionMapping:()=>va,Euler:()=>ui,EventDispatcher:()=>Yn,ExternalTexture:()=>$o,ExtrudeGeometry:()=>ic,FileLoader:()=>di,Float16BufferAttribute:()=>sd,Float32BufferAttribute:()=>Bt,FloatType:()=>Tn,Fog:()=>Ll,FogExp2:()=>Il,FramebufferTexture:()=>ld,FrontSide:()=>Yi,Frustum:()=>$i,FrustumArray:()=>zl,GLBufferAttribute:()=>Dd,GLSL1:()=>Wx,GLSL3:()=>Mf,GreaterCompare:()=>ig,GreaterDepth:()=>El,GreaterEqualCompare:()=>Ch,GreaterEqualDepth:()=>Al,GreaterEqualStencilFunc:()=>Ux,GreaterStencilFunc:()=>Dx,GridHelper:()=>Wd,Group:()=>_s,HTMLTexture:()=>dd,HalfFloatType:()=>zi,HemisphereLight:()=>wc,HemisphereLightHelper:()=>Hd,IcosahedronGeometry:()=>sc,ImageBitmapLoader:()=>Sd,ImageLoader:()=>or,ImageUtils:()=>Pl,IncrementStencilOp:()=>Tx,IncrementWrapStencilOp:()=>Ax,InstancedBufferAttribute:()=>bs,InstancedBufferGeometry:()=>Nc,InstancedInterleavedBuffer:()=>Ld,InstancedMesh:()=>Bl,Int16BufferAttribute:()=>nd,Int32BufferAttribute:()=>id,Int8BufferAttribute:()=>ju,IntType:()=>Wc,InterleavedBuffer:()=>Ur,InterleavedBufferAttribute:()=>tr,Interpolant:()=>Ts,InterpolateBezier:()=>$u,InterpolateDiscrete:()=>Uo,InterpolateLinear:()=>Rl,InterpolateSmooth:()=>gl,InterpolationSamplingMode:()=>Yx,InterpolationSamplingType:()=>qx,InvertStencilOp:()=>Cx,KeepStencilOp:()=>Ys,KeyframeTrack:()=>Fn,LOD:()=>Ul,LatheGeometry:()=>rc,Layers:()=>Dr,LessCompare:()=>eg,LessDepth:()=>Tl,LessEqualCompare:()=>Eh,LessEqualDepth:()=>Ks,LessEqualStencilFunc:()=>Lx,LessStencilFunc:()=>Px,Light:()=>Ni,LightProbe:()=>Lc,Line:()=>Di,Line3:()=>zd,LineBasicMaterial:()=>mn,LineCurve:()=>Qo,LineCurve3:()=>Ql,LineDashedMaterial:()=>yc,LineLoop:()=>kl,LineSegments:()=>ri,LinearFilter:()=>Fe,LinearInterpolant:()=>ca,LinearMipMapLinearFilter:()=>ux,LinearMipMapNearestFilter:()=>hx,LinearMipmapLinearFilter:()=>Bi,LinearMipmapNearestFilter:()=>ya,LinearSRGBColorSpace:()=>Oo,LinearToneMapping:()=>lf,LinearTransfer:()=>Bo,Loader:()=>xn,LoaderUtils:()=>pa,LoadingManager:()=>da,LoopOnce:()=>Zm,LoopPingPong:()=>Km,LoopRepeat:()=>Jm,MOUSE:()=>ix,Material:()=>en,MaterialBlending:()=>ax,MaterialLoader:()=>Dc,MathUtils:()=>ev,Matrix2:()=>Bd,Matrix3:()=>he,Matrix4:()=>le,MaxEquation:()=>Lm,Mesh:()=>Ve,MeshBasicMaterial:()=>Li,MeshDepthMaterial:()=>aa,MeshDistanceMaterial:()=>la,MeshLambertMaterial:()=>xc,MeshMatcapMaterial:()=>vc,MeshNormalMaterial:()=>_c,MeshPhongMaterial:()=>mc,MeshPhysicalMaterial:()=>pc,MeshStandardMaterial:()=>oa,MeshToonMaterial:()=>gc,MinEquation:()=>Im,MirroredRepeatWrapping:()=>No,MixOperation:()=>qm,MultiplyBlending:()=>af,MultiplyOperation:()=>_a,NearestFilter:()=>Xe,NearestMipMapLinearFilter:()=>cx,NearestMipMapNearestFilter:()=>lx,NearestMipmapLinearFilter:()=>Xr,NearestMipmapNearestFilter:()=>mf,NeutralToneMapping:()=>pf,NeverCompare:()=>tg,NeverDepth:()=>bl,NeverStencilFunc:()=>Rx,NoBlending:()=>Fi,NoColorSpace:()=>ji,NoNormalPacking:()=>vx,NoToneMapping:()=>fi,NormalAnimationBlendMode:()=>Ah,NormalBlending:()=>Js,NormalGAPacking:()=>Sx,NormalRGPacking:()=>yx,NotEqualCompare:()=>sg,NotEqualDepth:()=>Cl,NotEqualStencilFunc:()=>Nx,NumberKeyframeTrack:()=>Vr,Object3D:()=>Te,ObjectLoader:()=>yd,ObjectSpaceNormalMap:()=>jm,OctahedronGeometry:()=>ia,OneFactor:()=>Nm,OneMinusConstantAlphaFactor:()=>Xm,OneMinusConstantColorFactor:()=>Hm,OneMinusDstAlphaFactor:()=>Bm,OneMinusDstColorFactor:()=>Vm,OneMinusSrcAlphaFactor:()=>Sl,OneMinusSrcColorFactor:()=>Fm,OrthographicCamera:()=>ar,PCFShadowMap:()=>ga,PCFSoftShadowMap:()=>Em,PMREMGenerator:()=>Lh,Path:()=>ir,PerspectiveCamera:()=>je,Plane:()=>Ei,PlaneGeometry:()=>zr,PlaneHelper:()=>Jd,PointLight:()=>Cc,PointLightHelper:()=>Gd,Points:()=>Gl,PointsMaterial:()=>Yo,PolarGridHelper:()=>Xd,PolyhedronGeometry:()=>Ms,PositionalAudio:()=>wd,PropertyBinding:()=>Ce,PropertyMixer:()=>Vc,QuadraticBezierCurve:()=>jo,QuadraticBezierCurve3:()=>ta,Quaternion:()=>pn,QuaternionKeyframeTrack:()=>kr,QuaternionLinearInterpolant:()=>Tc,R11_EAC_Format:()=>ih,RED_GREEN_RGTC2_Format:()=>Ea,RED_RGTC1_Format:()=>Mh,REVISION:()=>Tm,RG11_EAC_Format:()=>Aa,RGBADepthPacking:()=>gx,RGBAFormat:()=>wn,RGBAIntegerFormat:()=>Zc,RGBA_ASTC_10x10_Format:()=>_h,RGBA_ASTC_10x5_Format:()=>ph,RGBA_ASTC_10x6_Format:()=>mh,RGBA_ASTC_10x8_Format:()=>gh,RGBA_ASTC_12x10_Format:()=>xh,RGBA_ASTC_12x12_Format:()=>vh,RGBA_ASTC_4x4_Format:()=>oh,RGBA_ASTC_5x4_Format:()=>ah,RGBA_ASTC_5x5_Format:()=>lh,RGBA_ASTC_6x5_Format:()=>ch,RGBA_ASTC_6x6_Format:()=>hh,RGBA_ASTC_8x5_Format:()=>uh,RGBA_ASTC_8x6_Format:()=>dh,RGBA_ASTC_8x8_Format:()=>fh,RGBA_BPTC_Format:()=>yh,RGBA_ETC2_EAC_Format:()=>nh,RGBA_PVRTC_2BPPV1_Format:()=>jc,RGBA_PVRTC_4BPPV1_Format:()=>Qc,RGBA_S3TC_DXT1_Format:()=>Ma,RGBA_S3TC_DXT3_Format:()=>Ta,RGBA_S3TC_DXT5_Format:()=>wa,RGBDepthPacking:()=>_x,RGBFormat:()=>Sf,RGBIntegerFormat:()=>dx,RGB_BPTC_SIGNED_Format:()=>Sh,RGB_BPTC_UNSIGNED_Format:()=>bh,RGB_ETC1_Format:()=>th,RGB_ETC2_Format:()=>eh,RGB_PVRTC_2BPPV1_Format:()=>Kc,RGB_PVRTC_4BPPV1_Format:()=>Jc,RGB_S3TC_DXT1_Format:()=>ba,RGDepthPacking:()=>xx,RGFormat:()=>Es,RGIntegerFormat:()=>$c,RawShaderMaterial:()=>ra,Ray:()=>Ss,Raycaster:()=>Nd,RectAreaLight:()=>Ic,RedFormat:()=>Yc,RedIntegerFormat:()=>Sa,ReinhardToneMapping:()=>cf,RenderTarget:()=>Go,RenderTarget3D:()=>Rd,RepeatWrapping:()=>Do,ReplaceStencilOp:()=>Mx,ReverseSubtractEquation:()=>Pm,RingGeometry:()=>oc,SIGNED_R11_EAC_Format:()=>sh,SIGNED_RED_GREEN_RGTC2_Format:()=>wh,SIGNED_RED_RGTC1_Format:()=>Th,SIGNED_RG11_EAC_Format:()=>rh,SRGBColorSpace:()=>In,SRGBTransfer:()=>Ae,Scene:()=>Dl,ShaderChunk:()=>ge,ShaderLib:()=>Vi,ShaderMaterial:()=>Un,ShadowMaterial:()=>fc,Shape:()=>sr,ShapeGeometry:()=>ac,ShapePath:()=>jd,ShapeUtils:()=>hi,ShortType:()=>_f,Skeleton:()=>Ol,SkeletonHelper:()=>kd,SkinnedMesh:()=>Fl,Source:()=>Ri,Sphere:()=>tn,SphereGeometry:()=>sa,Spherical:()=>Fd,SphericalHarmonics3:()=>fa,SplineCurve:()=>ea,SpotLight:()=>Ec,SpotLightHelper:()=>Vd,Sprite:()=>Nl,SpriteMaterial:()=>Xo,SrcAlphaFactor:()=>yl,SrcAlphaSaturateFactor:()=>km,SrcColorFactor:()=>Um,StaticCopyUsage:()=>kx,StaticDrawUsage:()=>zo,StaticReadUsage:()=>Bx,StereoCamera:()=>Md,StreamCopyUsage:()=>Hx,StreamDrawUsage:()=>Ox,StreamReadUsage:()=>Vx,StringKeyframeTrack:()=>Ki,SubtractEquation:()=>Rm,SubtractiveBlending:()=>of,TOUCH:()=>sx,TangentSpaceNormalMap:()=>Qi,TetrahedronGeometry:()=>lc,Texture:()=>qe,TextureLoader:()=>vd,TextureUtils:()=>ef,Timer:()=>Bc,TimestampQuery:()=>Xx,TorusGeometry:()=>cc,TorusKnotGeometry:()=>hc,Triangle:()=>Ci,TriangleFanDrawMode:()=>mx,TriangleStripDrawMode:()=>px,TrianglesDrawMode:()=>fx,TubeGeometry:()=>uc,UVMapping:()=>Hc,Uint16BufferAttribute:()=>Ho,Uint32BufferAttribute:()=>Wo,Uint8BufferAttribute:()=>td,Uint8ClampedBufferAttribute:()=>ed,Uniform:()=>Pd,UniformsGroup:()=>Id,UniformsLib:()=>Ct,UniformsUtils:()=>hg,UnsignedByteType:()=>On,UnsignedInt101111Type:()=>vf,UnsignedInt248Type:()=>Yr,UnsignedInt5999Type:()=>xf,UnsignedIntType:()=>oi,UnsignedShort4444Type:()=>Xc,UnsignedShort5551Type:()=>qc,UnsignedShortType:()=>qr,VSMShadowMap:()=>Hr,Vector2:()=>lt,Vector3:()=>I,Vector4:()=>Re,VectorKeyframeTrack:()=>ua,VideoFrameTexture:()=>ad,VideoTexture:()=>Hl,WebGL3DRenderTarget:()=>Ku,WebGLArrayRenderTarget:()=>Ju,WebGLCoordinateSystem:()=>qn,WebGLCubeRenderTarget:()=>Dh,WebGLRenderTarget:()=>An,WebGLRenderer:()=>Ug,WebGLUtils:()=>zv,WebGPUCoordinateSystem:()=>Qs,WebXRController:()=>Nr,WireframeGeometry:()=>dc,WrapAroundEnding:()=>Fo,ZeroCurvatureEnding:()=>$s,ZeroFactor:()=>Dm,ZeroSlopeEnding:()=>Zs,ZeroStencilOp:()=>bx,createCanvasElement:()=>og,error:()=>qt,getConsoleFunction:()=>Kx,log:()=>ko,setConsoleFunction:()=>Jx,warn:()=>bt,warnOnce:()=>xs});function Dv(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ZM(i){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}function IA(i,t,e,n,s,r){let o=new Ft(0),a=s===!0?0:1,l,c,h=null,d=0,u=null;function f(v){let b=v.isScene===!0?v.background:null;if(b&&b.isTexture){let x=v.backgroundBlurriness>0;b=t.get(b,x)}return b}function p(v){let b=!1,x=f(v);x===null?g(o,a):x&&x.isColor&&(g(x,1),b=!0);let T=i.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||b)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function _(v,b){let x=f(b);x&&(x.isCubeTexture||x.mapping===Wr)?(c===void 0&&(c=new Ve(new nr(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:$r(Vi.backgroundCube.uniforms),vertexShader:Vi.backgroundCube.vertexShader,fragmentShader:Vi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,M,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(PA.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Nv),c.material.toneMapped=ye.getTransfer(x.colorSpace)!==Ae,(h!==x||d!==x.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ve(new zr(2,2),new Un({name:"BackgroundMaterial",uniforms:$r(Vi.background.uniforms),vertexShader:Vi.background.vertexShader,fragmentShader:Vi.background.fragmentShader,side:Yi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=ye.getTransfer(x.colorSpace)!==Ae,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function g(v,b){v.getRGB(wf,cg(i)),e.buffers.color.setClear(wf.r,wf.g,wf.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,b=1){o.set(v),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,g(o,a)},render:p,addToRenderList:_,dispose:m}}function LA(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,o=!1;function a(P,D,k,F,N){let G=!1,z=d(P,F,k,D);r!==z&&(r=z,c(r.object)),G=f(P,F,k,N),G&&p(P,F,k,N),N!==null&&t.update(N,i.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,x(P,D,k,F),N!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function d(P,D,k,F){let N=F.wireframe===!0,G=n[D.id];G===void 0&&(G={},n[D.id]=G);let z=P.isInstancedMesh===!0?P.id:0,W=G[z];W===void 0&&(W={},G[z]=W);let O=W[k.id];O===void 0&&(O={},W[k.id]=O);let j=O[N];return j===void 0&&(j=u(l()),O[N]=j),j}function u(P){let D=[],k=[],F=[];for(let N=0;N<e;N++)D[N]=0,k[N]=0,F[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:F,object:P,attributes:{},index:null}}function f(P,D,k,F){let N=r.attributes,G=D.attributes,z=0,W=k.getAttributes();for(let O in W)if(W[O].location>=0){let rt=N[O],ft=G[O];if(ft===void 0&&(O==="instanceMatrix"&&P.instanceMatrix&&(ft=P.instanceMatrix),O==="instanceColor"&&P.instanceColor&&(ft=P.instanceColor)),rt===void 0||rt.attribute!==ft||ft&&rt.data!==ft.data)return!0;z++}return r.attributesNum!==z||r.index!==F}function p(P,D,k,F){let N={},G=D.attributes,z=0,W=k.getAttributes();for(let O in W)if(W[O].location>=0){let rt=G[O];rt===void 0&&(O==="instanceMatrix"&&P.instanceMatrix&&(rt=P.instanceMatrix),O==="instanceColor"&&P.instanceColor&&(rt=P.instanceColor));let ft={};ft.attribute=rt,rt&&rt.data&&(ft.data=rt.data),N[O]=ft,z++}r.attributes=N,r.attributesNum=z,r.index=F}function _(){let P=r.newAttributes;for(let D=0,k=P.length;D<k;D++)P[D]=0}function g(P){m(P,0)}function m(P,D){let k=r.newAttributes,F=r.enabledAttributes,N=r.attributeDivisors;k[P]=1,F[P]===0&&(i.enableVertexAttribArray(P),F[P]=1),N[P]!==D&&(i.vertexAttribDivisor(P,D),N[P]=D)}function v(){let P=r.newAttributes,D=r.enabledAttributes;for(let k=0,F=D.length;k<F;k++)D[k]!==P[k]&&(i.disableVertexAttribArray(k),D[k]=0)}function b(P,D,k,F,N,G,z){z===!0?i.vertexAttribIPointer(P,D,k,N,G):i.vertexAttribPointer(P,D,k,F,N,G)}function x(P,D,k,F){_();let N=F.attributes,G=k.getAttributes(),z=D.defaultAttributeValues;for(let W in G){let O=G[W];if(O.location>=0){let j=N[W];if(j===void 0&&(W==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),W==="instanceColor"&&P.instanceColor&&(j=P.instanceColor)),j!==void 0){let rt=j.normalized,ft=j.itemSize,Tt=t.get(j);if(Tt===void 0)continue;let re=Tt.buffer,Yt=Tt.type,X=Tt.bytesPerElement,ot=Yt===i.INT||Yt===i.UNSIGNED_INT||j.gpuType===Wc;if(j.isInterleavedBufferAttribute){let tt=j.data,dt=tt.stride,Ot=j.offset;if(tt.isInstancedInterleavedBuffer){for(let Lt=0;Lt<O.locationSize;Lt++)m(O.location+Lt,tt.meshPerAttribute);P.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Lt=0;Lt<O.locationSize;Lt++)g(O.location+Lt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let Lt=0;Lt<O.locationSize;Lt++)b(O.location+Lt,ft/O.locationSize,Yt,rt,dt*X,(Ot+ft/O.locationSize*Lt)*X,ot)}else{if(j.isInstancedBufferAttribute){for(let tt=0;tt<O.locationSize;tt++)m(O.location+tt,j.meshPerAttribute);P.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let tt=0;tt<O.locationSize;tt++)g(O.location+tt);i.bindBuffer(i.ARRAY_BUFFER,re);for(let tt=0;tt<O.locationSize;tt++)b(O.location+tt,ft/O.locationSize,Yt,rt,ft*X,ft/O.locationSize*tt*X,ot)}}else if(z!==void 0){let rt=z[W];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(O.location,rt);break;case 3:i.vertexAttrib3fv(O.location,rt);break;case 4:i.vertexAttrib4fv(O.location,rt);break;default:i.vertexAttrib1fv(O.location,rt)}}}}v()}function T(){w();for(let P in n){let D=n[P];for(let k in D){let F=D[k];for(let N in F){let G=F[N];for(let z in G)h(G[z].object),delete G[z];delete F[N]}}delete n[P]}}function M(P){if(n[P.id]===void 0)return;let D=n[P.id];for(let k in D){let F=D[k];for(let N in F){let G=F[N];for(let z in G)h(G[z].object),delete G[z];delete F[N]}}delete n[P.id]}function C(P){for(let D in n){let k=n[D];for(let F in k){let N=k[F];if(N[P.id]===void 0)continue;let G=N[P.id];for(let z in G)h(G[z].object),delete G[z];delete N[P.id]}}}function y(P){for(let D in n){let k=n[D],F=P.isInstancedMesh===!0?P.id:0,N=k[F];if(N!==void 0){for(let G in N){let z=N[G];for(let W in z)h(z[W].object),delete z[W];delete N[G]}delete k[F],Object.keys(k).length===0&&delete n[D]}}}function w(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:R,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:g,disableUnusedAttributes:v}}function DA(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function NA(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let C=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(C){return!(C!==wn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){let y=C===zi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==On&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Tn&&!y)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(bt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&bt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=i.getParameter(i.MAX_SAMPLES),M=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:v,maxVaryings:b,maxFragmentUniforms:x,maxSamples:T,samples:M}}function UA(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Ei,a=new he,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=i.get(d);if(!s||p===null||p.length===0||r&&!g)r?h(null):c();else{let v=r?0:n,b=v*4,x=m.clippingState||null;l.value=x,x=h(p,u,b,f);for(let T=0;T!==b;++T)x[T]=e[T];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,v=u.matrixWorldInverse;a.getNormalMatrix(v),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,x=f;b!==_;++b,x+=4)o.copy(d[b]).applyMatrix4(v,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function BA(i){let t=[],e=[],n=[],s=i,r=i-lr+1+uv.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);t.push(a);let l=1/a;o>i-lr?l=uv[o-i+lr-1]:o===0&&(l=0),e.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,_=3,g=2,m=1,v=new Float32Array(_*p*f),b=new Float32Array(g*p*f),x=new Float32Array(m*p*f);for(let M=0;M<f;M++){let C=M%3*2/3-1,y=M>2?0:-1,w=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];v.set(w,_*p*M),b.set(u,g*p*M);let R=[M,M,M,M,M,M];x.set(R,m*p*M)}let T=new ue;T.setAttribute("position",new Ee(v,_)),T.setAttribute("uv",new Ee(b,g)),T.setAttribute("faceIndex",new Ee(x,m)),n.push(new Ve(T,null)),s>lr&&s--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function fv(i,t,e){let n=new An(i,t,e);return n.texture.mapping=Wr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ca(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function zA(i,t,e){return new Un({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:FA,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ef(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function VA(i,t,e){let n=new Float32Array(Zr),s=new I(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Zr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function pv(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function mv(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Ef(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kA(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===xa||f===va)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new Dh(p.height);return _.fromEquirectangularTexture(i,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===xa||f===va,_=f===Oi||f===ws;if(p||_){let g=e.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new Lh(i)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),g.texture;if(g!==void 0)return g.texture;{let v=u.image;return p&&v&&v.height>0||_&&v&&l(v)?(n===null&&(n=new Lh(i)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,e.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===xa?u.mapping=Oi:f===va&&(u.mapping=ws),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:d}}function GA(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function HA(i,t,e,n){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let p in u.attributes)t.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],i.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let v=f.array;_=f.version;for(let b=0,x=v.length;b<x;b+=3){let T=v[b+0],M=v[b+1],C=v[b+2];u.push(T,M,M,C,C,T)}}else{let v=p.array;_=p.version;for(let b=0,x=v.length/3-1;b<x;b+=3){let T=b+0,M=b+1,C=b+2;u.push(T,M,M,C,C,T)}}let g=new(p.count>=65535?Wo:Ho)(u,1);g.version=_;let m=r.get(d);m&&t.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function WA(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){i.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(i.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];e.update(_,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function XA(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:qt("WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function qA(i,t,e){let n=new WeakMap,s=new Re;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let w=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let x=a.attributes.position.count*b,T=1;x>t.maxTextureSize&&(T=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let M=new Float32Array(x*T*4*d),C=new Ir(M,x,T,d);C.type=Tn,C.needsUpdate=!0;let y=b*4;for(let R=0;R<d;R++){let P=g[R],D=m[R],k=v[R],F=x*T*4*R;for(let N=0;N<P.count;N++){let G=N*y;f===!0&&(s.fromBufferAttribute(P,N),M[F+G+0]=s.x,M[F+G+1]=s.y,M[F+G+2]=s.z,M[F+G+3]=0),p===!0&&(s.fromBufferAttribute(D,N),M[F+G+4]=s.x,M[F+G+5]=s.y,M[F+G+6]=s.z,M[F+G+7]=0),_===!0&&(s.fromBufferAttribute(k,N),M[F+G+8]=s.x,M[F+G+9]=s.y,M[F+G+10]=s.z,M[F+G+11]=k.itemSize===4?s.w:1)}}u={count:d,texture:C,size:new lt(x,T)},n.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function YA(i,t,e,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}function ZA(i,t,e,n,s,r){let o=new An(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,depthTexture:s?new Zi(t,e):void 0}),a=new An(t,e,{type:zi,depthBuffer:!1,stencilBuffer:!1}),l=new ue;l.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bt([0,2,0,0,2,0],2));let c=new ra({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Ve(l,c),d=new ar(-1,1,1,-1,0,1),u=null,f=null,p=!1,_,g=null,m=[],v=!1;this.setSize=function(b,x){o.setSize(b,x),a.setSize(b,x);for(let T=0;T<m.length;T++){let M=m[T];M.setSize&&M.setSize(b,x)}},this.setEffects=function(b){m=b,v=m.length>0&&m[0].isRenderPass===!0;let x=o.width,T=o.height;for(let M=0;M<m.length;M++){let C=m[M];C.setSize&&C.setSize(x,T)}},this.begin=function(b,x){if(p||b.toneMapping===fi&&m.length===0)return!1;if(g=x,x!==null){let T=x.width,M=x.height;(o.width!==T||o.height!==M)&&this.setSize(T,M)}return v===!1&&b.setRenderTarget(o),_=b.toneMapping,b.toneMapping=fi,!0},this.hasRenderPass=function(){return v},this.end=function(b,x){b.toneMapping=_,p=!0;let T=o,M=a;for(let C=0;C<m.length;C++){let y=m[C];if(y.enabled!==!1&&(y.render(b,M,T,x),y.needsSwap!==!1)){let w=T;T=M,M=w}}if(u!==b.outputColorSpace||f!==b.toneMapping){u=b.outputColorSpace,f=b.toneMapping,c.defines={},ye.getTransfer(u)===Ae&&(c.defines.SRGB_TRANSFER="");let C=$A[f];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=T.texture,b.setRenderTarget(g),b.render(h,d),g=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}function Pa(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=gv[s];if(r===void 0&&(r=new Float32Array(s),gv[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ln(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function cn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Cf(i,t){let e=_v[t];e===void 0&&(e=new Int32Array(t),_v[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function JA(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function KA(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2fv(this.addr,t),cn(e,t)}}function QA(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ln(e,t))return;i.uniform3fv(this.addr,t),cn(e,t)}}function jA(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4fv(this.addr,t),cn(e,t)}}function tE(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;yv.set(n),i.uniformMatrix2fv(this.addr,!1,yv),cn(e,n)}}function eE(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;vv.set(n),i.uniformMatrix3fv(this.addr,!1,vv),cn(e,n)}}function nE(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),cn(e,t)}else{if(ln(e,n))return;xv.set(n),i.uniformMatrix4fv(this.addr,!1,xv),cn(e,n)}}function iE(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function sE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2iv(this.addr,t),cn(e,t)}}function rE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3iv(this.addr,t),cn(e,t)}}function oE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4iv(this.addr,t),cn(e,t)}}function aE(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function lE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2uiv(this.addr,t),cn(e,t)}}function cE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3uiv(this.addr,t),cn(e,t)}}function hE(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4uiv(this.addr,t),cn(e,t)}}function uE(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ag.compareFunction=e.isReversedDepthBuffer()?Ch:Eh,r=Ag):r=Uv,e.setTexture2D(t||r,s)}function dE(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Ov,s)}function fE(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Bv,s)}function pE(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Fv,s)}function mE(i){switch(i){case 5126:return JA;case 35664:return KA;case 35665:return QA;case 35666:return jA;case 35674:return tE;case 35675:return eE;case 35676:return nE;case 5124:case 35670:return iE;case 35667:case 35671:return sE;case 35668:case 35672:return rE;case 35669:case 35673:return oE;case 5125:return aE;case 36294:return lE;case 36295:return cE;case 36296:return hE;case 35678:case 36198:case 36298:case 36306:case 35682:return uE;case 35679:case 36299:case 36307:return dE;case 35680:case 36300:case 36308:case 36293:return fE;case 36289:case 36303:case 36311:case 36292:return pE}}function gE(i,t){i.uniform1fv(this.addr,t)}function _E(i,t){let e=Pa(t,this.size,2);i.uniform2fv(this.addr,e)}function xE(i,t){let e=Pa(t,this.size,3);i.uniform3fv(this.addr,e)}function vE(i,t){let e=Pa(t,this.size,4);i.uniform4fv(this.addr,e)}function yE(i,t){let e=Pa(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function SE(i,t){let e=Pa(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function bE(i,t){let e=Pa(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function ME(i,t){i.uniform1iv(this.addr,t)}function TE(i,t){i.uniform2iv(this.addr,t)}function wE(i,t){i.uniform3iv(this.addr,t)}function AE(i,t){i.uniform4iv(this.addr,t)}function EE(i,t){i.uniform1uiv(this.addr,t)}function CE(i,t){i.uniform2uiv(this.addr,t)}function RE(i,t){i.uniform3uiv(this.addr,t)}function PE(i,t){i.uniform4uiv(this.addr,t)}function IE(i,t,e){let n=this.cache,s=t.length,r=Cf(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ag:o=Uv;for(let a=0;a!==s;++a)e.setTexture2D(t[a]||o,r[a])}function LE(i,t,e){let n=this.cache,s=t.length,r=Cf(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Ov,r[o])}function DE(i,t,e){let n=this.cache,s=t.length,r=Cf(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Bv,r[o])}function NE(i,t,e){let n=this.cache,s=t.length,r=Cf(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),cn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Fv,r[o])}function UE(i){switch(i){case 5126:return gE;case 35664:return _E;case 35665:return xE;case 35666:return vE;case 35674:return yE;case 35675:return SE;case 35676:return bE;case 5124:case 35670:return ME;case 35667:case 35671:return TE;case 35668:case 35672:return wE;case 35669:case 35673:return AE;case 5125:return EE;case 36294:return CE;case 36295:return RE;case 36296:return PE;case 35678:case 36198:case 36298:case 36306:case 35682:return IE;case 35679:case 36299:case 36307:return LE;case 35680:case 36300:case 36308:case 36293:return DE;case 36289:case 36303:case 36311:case 36292:return NE}}function Sv(i,t){i.seq.push(t),i.map[t.id]=t}function FE(i,t,e){let n=i.name,s=n.length;for(Tg.lastIndex=0;;){let r=Tg.exec(n),o=Tg.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Sv(e,c===void 0?new Eg(a,i,t):new Cg(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new Rg(a),Sv(e,d)),e=d}}}function bv(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}function zE(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function VE(i){ye._getMatrix(Mv,ye.workingColorSpace,i);let t=`mat3( ${Mv.elements.map(e=>e.toFixed(4))} )`;switch(ye.getTransfer(i)){case Bo:return[t,"LinearTransferOETF"];case Ae:return[t,"sRGBTransferOETF"];default:return bt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Tv(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+zE(i.getShaderSource(t),a)}else return r}function kE(i,t){let e=VE(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function HE(i,t){let e=GE[t];return e===void 0?(bt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function WE(){ye.getLuminanceCoefficients(Af);let i=Af.x.toFixed(4),t=Af.y.toFixed(4),e=Af.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function XE(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ih).join(`
`)}function qE(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function YE(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ih(i){return i!==""}function wv(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Av(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function Pg(i){return i.replace($E,JE)}function JE(i,t){let e=ge[t];if(e===void 0){let n=ZE.get(t);if(n!==void 0)e=ge[n],bt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Pg(e)}function Ev(i){return i.replace(KE,QE)}function QE(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Cv(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function t1(i){return jE[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function n1(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":e1[i.envMapMode]||"ENVMAP_TYPE_CUBE"}function s1(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":i1[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}function o1(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":r1[i.combine]||"ENVMAP_BLENDING_NONE"}function a1(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function l1(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=t1(e),c=n1(e),h=s1(e),d=o1(e),u=a1(e),f=XE(e),p=qE(r),_=s.createProgram(),g,m,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ih).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(Ih).join(`
`),m.length>0&&(m+=`
`)):(g=[Cv(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ih).join(`
`),m=[Cv(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==fi?"#define TONE_MAPPING":"",e.toneMapping!==fi?ge.tonemapping_pars_fragment:"",e.toneMapping!==fi?HE("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ge.colorspace_pars_fragment,kE("linearToOutputTexel",e.outputColorSpace),WE(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ih).join(`
`)),o=Pg(o),o=wv(o,e),o=Av(o,e),a=Pg(a),a=wv(a,e),a=Av(a,e),o=Ev(o),a=Ev(a),e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",e.glslVersion===Mf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Mf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=v+g+o,x=v+m+a,T=bv(s,s.VERTEX_SHADER,b),M=bv(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,M),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(P){if(i.debug.checkShaderErrors){let D=s.getProgramInfoLog(_)||"",k=s.getShaderInfoLog(T)||"",F=s.getShaderInfoLog(M)||"",N=D.trim(),G=k.trim(),z=F.trim(),W=!0,O=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,M);else{let j=Tv(s,T,"vertex"),rt=Tv(s,M,"fragment");qt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+N+`
`+j+`
`+rt)}else N!==""?bt("WebGLProgram: Program Info Log:",N):(G===""||z==="")&&(O=!1);O&&(P.diagnostics={runnable:W,programLog:N,vertexShader:{log:G,prefix:g},fragmentShader:{log:z,prefix:m}})}s.deleteShader(T),s.deleteShader(M),y=new Ra(s,_),w=YE(s,_)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(_,OE)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=BE++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=M,this}function h1(i){return i===Es||i===Aa||i===Ea}function u1(i,t,e,n,s,r){let o=new Dr,a=new Ig,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(y){return l.add(y),y===0?"uv":`uv${y}`}function _(y,w,R,P,D,k){let F=P.fog,N=D.geometry,G=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,W=t.get(y.envMap||G,z),O=W&&W.mapping===Wr?W.image.height:null,j=f[y.type];y.precision!==null&&(u=n.getMaxPrecision(y.precision),u!==y.precision&&bt("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));let rt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,ft=rt!==void 0?rt.length:0,Tt=0;N.morphAttributes.position!==void 0&&(Tt=1),N.morphAttributes.normal!==void 0&&(Tt=2),N.morphAttributes.color!==void 0&&(Tt=3);let re,Yt,X,ot;if(j){let Wt=Vi[j];re=Wt.vertexShader,Yt=Wt.fragmentShader}else{re=y.vertexShader,Yt=y.fragmentShader;let Wt=a.getVertexShaderStage(y),jt=a.getFragmentShaderStage(y);a.update(y,Wt,jt),X=Wt.id,ot=jt.id}let tt=i.getRenderTarget(),dt=i.state.buffers.depth.getReversed(),Ot=D.isInstancedMesh===!0,Lt=D.isBatchedMesh===!0,wt=!!y.map,_t=!!y.matcap,Q=!!W,nt=!!y.aoMap,K=!!y.lightMap,ct=!!y.bumpMap&&y.wireframe===!1,ut=!!y.normalMap,Rt=!!y.displacementMap,Pt=!!y.emissiveMap,xt=!!y.metalnessMap,Vt=!!y.roughnessMap,L=y.anisotropy>0,Qt=y.clearcoat>0,st=y.dispersion>0,E=y.iridescence>0,S=y.sheen>0,U=y.transmission>0,V=L&&!!y.anisotropyMap,q=Qt&&!!y.clearcoatMap,ht=Qt&&!!y.clearcoatNormalMap,gt=Qt&&!!y.clearcoatRoughnessMap,J=E&&!!y.iridescenceMap,et=E&&!!y.iridescenceThicknessMap,vt=S&&!!y.sheenColorMap,Zt=S&&!!y.sheenRoughnessMap,Et=!!y.specularMap,Mt=!!y.specularColorMap,Jt=!!y.specularIntensityMap,ie=U&&!!y.transmissionMap,ee=U&&!!y.thicknessMap,B=!!y.gradientMap,yt=!!y.alphaMap,it=y.alphaTest>0,St=!!y.alphaHash,It=!!y.extensions,at=fi;y.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(at=i.toneMapping);let Ut={shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:re,fragmentShader:Yt,defines:y.defines,customVertexShaderID:X,customFragmentShaderID:ot,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Lt,batchingColor:Lt&&D._colorsTexture!==null,instancing:Ot,instancingColor:Ot&&D.instanceColor!==null,instancingMorph:Ot&&D.morphTexture!==null,outputColorSpace:tt===null?i.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:ye.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:wt,matcap:_t,envMap:Q,envMapMode:Q&&W.mapping,envMapCubeUVHeight:O,aoMap:nt,lightMap:K,bumpMap:ct,normalMap:ut,displacementMap:Rt,emissiveMap:Pt,normalMapObjectSpace:ut&&y.normalMapType===jm,normalMapTangentSpace:ut&&y.normalMapType===Qi,packedNormalMap:ut&&y.normalMapType===Qi&&h1(y.normalMap.format),metalnessMap:xt,roughnessMap:Vt,anisotropy:L,anisotropyMap:V,clearcoat:Qt,clearcoatMap:q,clearcoatNormalMap:ht,clearcoatRoughnessMap:gt,dispersion:st,iridescence:E,iridescenceMap:J,iridescenceThicknessMap:et,sheen:S,sheenColorMap:vt,sheenRoughnessMap:Zt,specularMap:Et,specularColorMap:Mt,specularIntensityMap:Jt,transmission:U,transmissionMap:ie,thicknessMap:ee,gradientMap:B,opaque:y.transparent===!1&&y.blending===Js&&y.alphaToCoverage===!1,alphaMap:yt,alphaTest:it,alphaHash:St,combine:y.combine,mapUv:wt&&p(y.map.channel),aoMapUv:nt&&p(y.aoMap.channel),lightMapUv:K&&p(y.lightMap.channel),bumpMapUv:ct&&p(y.bumpMap.channel),normalMapUv:ut&&p(y.normalMap.channel),displacementMapUv:Rt&&p(y.displacementMap.channel),emissiveMapUv:Pt&&p(y.emissiveMap.channel),metalnessMapUv:xt&&p(y.metalnessMap.channel),roughnessMapUv:Vt&&p(y.roughnessMap.channel),anisotropyMapUv:V&&p(y.anisotropyMap.channel),clearcoatMapUv:q&&p(y.clearcoatMap.channel),clearcoatNormalMapUv:ht&&p(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&p(y.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&p(y.iridescenceMap.channel),iridescenceThicknessMapUv:et&&p(y.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&p(y.sheenColorMap.channel),sheenRoughnessMapUv:Zt&&p(y.sheenRoughnessMap.channel),specularMapUv:Et&&p(y.specularMap.channel),specularColorMapUv:Mt&&p(y.specularColorMap.channel),specularIntensityMapUv:Jt&&p(y.specularIntensityMap.channel),transmissionMapUv:ie&&p(y.transmissionMap.channel),thicknessMapUv:ee&&p(y.thicknessMap.channel),alphaMapUv:yt&&p(y.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ut||L),vertexNormals:!!N.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:D.isPoints===!0&&!!N.attributes.uv&&(wt||yt),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||N.attributes.normal===void 0&&ut===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:dt,skinning:D.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Tt,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:at,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&ye.getTransfer(y.map.colorSpace)===Ae,decodeVideoTextureEmissive:Pt&&y.emissiveMap.isVideoTexture===!0&&ye.getTransfer(y.emissiveMap.colorSpace)===Ae,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ui,flipSided:y.side===En,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:It&&y.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(It&&y.extensions.multiDraw===!0||Lt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut}function g(y){let w=[];if(y.shaderID?w.push(y.shaderID):(w.push(y.customVertexShaderID),w.push(y.customFragmentShaderID)),y.defines!==void 0)for(let R in y.defines)w.push(R),w.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(m(w,y),v(w,y),w.push(i.outputColorSpace)),w.push(y.customProgramCacheKey),w.join()}function m(y,w){y.push(w.precision),y.push(w.outputColorSpace),y.push(w.envMapMode),y.push(w.envMapCubeUVHeight),y.push(w.mapUv),y.push(w.alphaMapUv),y.push(w.lightMapUv),y.push(w.aoMapUv),y.push(w.bumpMapUv),y.push(w.normalMapUv),y.push(w.displacementMapUv),y.push(w.emissiveMapUv),y.push(w.metalnessMapUv),y.push(w.roughnessMapUv),y.push(w.anisotropyMapUv),y.push(w.clearcoatMapUv),y.push(w.clearcoatNormalMapUv),y.push(w.clearcoatRoughnessMapUv),y.push(w.iridescenceMapUv),y.push(w.iridescenceThicknessMapUv),y.push(w.sheenColorMapUv),y.push(w.sheenRoughnessMapUv),y.push(w.specularMapUv),y.push(w.specularColorMapUv),y.push(w.specularIntensityMapUv),y.push(w.transmissionMapUv),y.push(w.thicknessMapUv),y.push(w.combine),y.push(w.fogExp2),y.push(w.sizeAttenuation),y.push(w.morphTargetsCount),y.push(w.morphAttributeCount),y.push(w.numDirLights),y.push(w.numPointLights),y.push(w.numSpotLights),y.push(w.numSpotLightMaps),y.push(w.numHemiLights),y.push(w.numRectAreaLights),y.push(w.numDirLightShadows),y.push(w.numPointLightShadows),y.push(w.numSpotLightShadows),y.push(w.numSpotLightShadowsWithMaps),y.push(w.numLightProbes),y.push(w.shadowMapType),y.push(w.toneMapping),y.push(w.numClippingPlanes),y.push(w.numClipIntersection),y.push(w.depthPacking)}function v(y,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),w.packedNormalMap&&o.enable(22),w.vertexNormals&&o.enable(23),y.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),w.numLightProbeGrids>0&&o.enable(22),w.hasPositionAttribute&&o.enable(23),y.push(o.mask)}function b(y){let w=f[y.type],R;if(w){let P=Vi[w];R=hg.clone(P.uniforms)}else R=y.uniforms;return R}function x(y,w){let R=h.get(w);return R!==void 0?++R.usedTimes:(R=new l1(i,w,y,s),c.push(R),h.set(w,R)),R}function T(y){if(--y.usedTimes===0){let w=c.indexOf(y);c[w]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function M(y){a.remove(y)}function C(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:T,releaseShaderCache:M,programs:c,dispose:C}}function d1(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function f1(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function Rv(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Pv(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,g,m){let v=i[t];return v===void 0?(v={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},i[t]=v):(v.id=u.id,v.object=u,v.geometry=f,v.material=p,v.materialVariant=o(u),v.groupOrder=_,v.renderOrder=u.renderOrder,v.z=g,v.group=m),t++,v}function l(u,f,p,_,g,m){let v=a(u,f,p,_,g,m);p.transmission>0?n.push(v):p.transparent===!0?s.push(v):e.push(v)}function c(u,f,p,_,g,m){let v=a(u,f,p,_,g,m);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function h(u,f,p){e.length>1&&e.sort(u||f1),n.length>1&&n.sort(f||Rv),s.length>1&&s.sort(f||Rv),p&&(e.reverse(),n.reverse(),s.reverse())}function d(){for(let u=t,f=i.length;u<f;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:d,sort:h}}function p1(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new Pv,i.set(n,[o])):s>=r.length?(o=new Pv,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function m1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ft};break;case"SpotLight":e={position:new I,direction:new I,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function g1(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}function x1(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function v1(i){let t=new m1,e=g1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);let s=new I,r=new le,o=new le;function a(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,v=0,b=0,x=0,T=0,M=0,C=0;c.sort(x1);for(let w=0,R=c.length;w<R;w++){let P=c[w],D=P.color,k=P.intensity,F=P.distance,N=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Es?N=P.shadow.map.texture:N=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=D.r*k,d+=D.g*k,u+=D.b*k;else if(P.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(P.sh.coefficients[G],k);C++}else if(P.isDirectionalLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let z=P.shadow,W=e.get(P);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,n.directionalShadow[f]=W,n.directionalShadowMap[f]=N,n.directionalShadowMatrix[f]=P.shadow.matrix,v++}n.directional[f]=G,f++}else if(P.isSpotLight){let G=t.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(D).multiplyScalar(k),G.distance=F,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,n.spot[_]=G;let z=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,z.updateMatrices(P),P.castShadow&&M++),n.spotLightMatrix[_]=z.matrix,P.castShadow){let W=e.get(P);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,n.spotShadow[_]=W,n.spotShadowMap[_]=N,x++}_++}else if(P.isRectAreaLight){let G=t.get(P);G.color.copy(D).multiplyScalar(k),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=G,g++}else if(P.isPointLight){let G=t.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){let z=P.shadow,W=e.get(P);W.shadowIntensity=z.intensity,W.shadowBias=z.bias,W.shadowNormalBias=z.normalBias,W.shadowRadius=z.radius,W.shadowMapSize=z.mapSize,W.shadowCameraNear=z.camera.near,W.shadowCameraFar=z.camera.far,n.pointShadow[p]=W,n.pointShadowMap[p]=N,n.pointShadowMatrix[p]=P.shadow.matrix,b++}n.point[p]=G,p++}else if(P.isHemisphereLight){let G=t.get(P);G.skyColor.copy(P.color).multiplyScalar(k),G.groundColor.copy(P.groundColor).multiplyScalar(k),n.hemi[m]=G,m++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let y=n.hash;(y.directionalLength!==f||y.pointLength!==p||y.spotLength!==_||y.rectAreaLength!==g||y.hemiLength!==m||y.numDirectionalShadows!==v||y.numPointShadows!==b||y.numSpotShadows!==x||y.numSpotMaps!==T||y.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=p,n.hemi.length=m,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=x+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,y.directionalLength=f,y.pointLength=p,y.spotLength=_,y.rectAreaLength=g,y.hemiLength=m,y.numDirectionalShadows=v,y.numPointShadows=b,y.numSpotShadows=x,y.numSpotMaps=T,y.numLightProbes=C,n.version=_1++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=h.matrixWorldInverse;for(let m=0,v=c.length;m<v;m++){let b=c[m];if(b.isDirectionalLight){let x=n.directional[d];x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),d++}else if(b.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(b.isRectAreaLight){let x=n.rectArea[p];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(b.width*.5,0,0),x.halfHeight.set(0,b.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),p++}else if(b.isPointLight){let x=n.point[u];x.position.setFromMatrixPosition(b.matrixWorld),x.position.applyMatrix4(g),u++}else if(b.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(b.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function Iv(i){let t=new v1(i),e=[],n=[],s=[];function r(u){d.camera=u,e.length=0,n.length=0,s.length=0}function o(u){e.push(u)}function a(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let d={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function y1(i){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Iv(i),t.set(s,[a])):r>=o.length?(a=new Iv(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function w1(i,t,e){let n=new $i,s=new lt,r=new lt,o=new Re,a=new aa,l=new la,c={},h=e.maxTextureSize,d={[Yi]:En,[En]:Yi,[Ui]:Ui},u=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:S1,fragmentShader:b1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new ue;p.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ve(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ga;let m=this.type;this.render=function(M,C,y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||M.length===0)return;this.type===Em&&(bt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ga);let w=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),D=i.state;D.setBlending(Fi),D.buffers.depth.getReversed()===!0?D.buffers.color.setClear(0,0,0,0):D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);let k=m!==this.type;k&&C.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(N=>N.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,N=M.length;F<N;F++){let G=M[F],z=G.shadow;if(z===void 0){bt("WebGLShadowMap:",G,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);let W=z.getFrameExtents();s.multiply(W),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/W.x),s.x=r.x*W.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/W.y),s.y=r.y*W.y,z.mapSize.y=r.y));let O=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=O,z.map===null||k===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Hr){if(G.isPointLight){bt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new An(s.x,s.y,{format:Es,type:zi,minFilter:Fe,magFilter:Fe,generateMipmaps:!1}),z.map.texture.name=G.name+".shadowMap",z.map.depthTexture=new Zi(s.x,s.y,Tn),z.map.depthTexture.name=G.name+".shadowMapDepth",z.map.depthTexture.format=Ii,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Xe,z.map.depthTexture.magFilter=Xe}else G.isPointLight?(z.map=new Dh(s.x),z.map.depthTexture=new Wl(s.x,oi)):(z.map=new An(s.x,s.y),z.map.depthTexture=new Zi(s.x,s.y,oi)),z.map.depthTexture.name=G.name+".shadowMap",z.map.depthTexture.format=Ii,this.type===ga?(z.map.depthTexture.compareFunction=O?Ch:Eh,z.map.depthTexture.minFilter=Fe,z.map.depthTexture.magFilter=Fe):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Xe,z.map.depthTexture.magFilter=Xe);z.camera.updateProjectionMatrix()}let j=z.map.isWebGLCubeRenderTarget?6:1;for(let rt=0;rt<j;rt++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,rt),i.clear();else{rt===0&&(i.setRenderTarget(z.map),i.clear());let ft=z.getViewport(rt);o.set(r.x*ft.x,r.y*ft.y,r.x*ft.z,r.y*ft.w),D.viewport(o)}if(G.isPointLight){let ft=z.camera,Tt=z.matrix,re=G.distance||ft.far;re!==ft.far&&(ft.far=re,ft.updateProjectionMatrix()),Ph.setFromMatrixPosition(G.matrixWorld),ft.position.copy(Ph),wg.copy(ft.position),wg.add(M1[rt]),ft.up.copy(T1[rt]),ft.lookAt(wg),ft.updateMatrixWorld(),Tt.makeTranslation(-Ph.x,-Ph.y,-Ph.z),Lv.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Lv,ft.coordinateSystem,ft.reversedDepth)}else z.updateMatrices(G);n=z.getFrustum(),x(C,y,z.camera,G,this.type)}z.isPointLightShadow!==!0&&this.type===Hr&&v(z,y),z.needsUpdate=!1}m=this.type,g.needsUpdate=!1,i.setRenderTarget(w,R,P)};function v(M,C){let y=t.update(_);u.defines.VSM_SAMPLES!==M.blurSamples&&(u.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new An(s.x,s.y,{format:Es,type:zi})),u.uniforms.shadow_pass.value=M.map.depthTexture,u.uniforms.resolution.value=M.mapSize,u.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,y,u,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,y,f,_,null)}function b(M,C,y,w){let R=null,P=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)R=P;else if(R=y.isPointLight===!0?l:a,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){let D=R.uuid,k=C.uuid,F=c[D];F===void 0&&(F={},c[D]=F);let N=F[k];N===void 0&&(N=R.clone(),F[k]=N,C.addEventListener("dispose",T)),R=N}if(R.visible=C.visible,R.wireframe=C.wireframe,w===Hr?R.side=C.shadowSide!==null?C.shadowSide:C.side:R.side=C.shadowSide!==null?C.shadowSide:d[C.side],R.alphaMap=C.alphaMap,R.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,R.map=C.map,R.clipShadows=C.clipShadows,R.clippingPlanes=C.clippingPlanes,R.clipIntersection=C.clipIntersection,R.displacementMap=C.displacementMap,R.displacementScale=C.displacementScale,R.displacementBias=C.displacementBias,R.wireframeLinewidth=C.wireframeLinewidth,R.linewidth=C.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let D=i.properties.get(R);D.light=y}return R}function x(M,C,y,w,R){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&R===Hr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);let k=t.update(M),F=M.material;if(Array.isArray(F)){let N=k.groups;for(let G=0,z=N.length;G<z;G++){let W=N[G],O=F[W.materialIndex];if(O&&O.visible){let j=b(M,O,w,R);M.onBeforeShadow(i,M,C,y,k,j,W),i.renderBufferDirect(y,null,k,j,M,W),M.onAfterShadow(i,M,C,y,k,j,W)}}}else if(F.visible){let N=b(M,F,w,R);M.onBeforeShadow(i,M,C,y,k,N,null),i.renderBufferDirect(y,null,k,N,M,null),M.onAfterShadow(i,M,C,y,k,N,null)}}let D=M.children;for(let k=0,F=D.length;k<F;k++)x(D[k],C,y,w,R)}function T(M){M.target.removeEventListener("dispose",T);for(let y in c){let w=c[y],R=M.target.uuid;R in w&&(w[R].dispose(),delete w[R])}}}function A1(i,t){function e(){let B=!1,yt=new Re,it=null,St=new Re(0,0,0,0);return{setMask:function(It){it!==It&&!B&&(i.colorMask(It,It,It,It),it=It)},setLocked:function(It){B=It},setClear:function(It,at,Ut,Wt,jt){jt===!0&&(It*=Wt,at*=Wt,Ut*=Wt),yt.set(It,at,Ut,Wt),St.equals(yt)===!1&&(i.clearColor(It,at,Ut,Wt),St.copy(yt))},reset:function(){B=!1,it=null,St.set(-1,0,0,0)}}}function n(){let B=!1,yt=!1,it=null,St=null,It=null;return{setReversed:function(at){if(yt!==at){let Ut=t.get("EXT_clip_control");at?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),yt=at;let Wt=It;It=null,this.setClear(Wt)}},getReversed:function(){return yt},setTest:function(at){at?tt(i.DEPTH_TEST):dt(i.DEPTH_TEST)},setMask:function(at){it!==at&&!B&&(i.depthMask(at),it=at)},setFunc:function(at){if(yt&&(at=tv[at]),St!==at){switch(at){case bl:i.depthFunc(i.NEVER);break;case Ml:i.depthFunc(i.ALWAYS);break;case Tl:i.depthFunc(i.LESS);break;case Ks:i.depthFunc(i.LEQUAL);break;case wl:i.depthFunc(i.EQUAL);break;case Al:i.depthFunc(i.GEQUAL);break;case El:i.depthFunc(i.GREATER);break;case Cl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=at}},setLocked:function(at){B=at},setClear:function(at){It!==at&&(It=at,yt&&(at=1-at),i.clearDepth(at))},reset:function(){B=!1,it=null,St=null,It=null,yt=!1}}}function s(){let B=!1,yt=null,it=null,St=null,It=null,at=null,Ut=null,Wt=null,jt=null;return{setTest:function(fe){B||(fe?tt(i.STENCIL_TEST):dt(i.STENCIL_TEST))},setMask:function(fe){yt!==fe&&!B&&(i.stencilMask(fe),yt=fe)},setFunc:function(fe,Mi,ti){(it!==fe||St!==Mi||It!==ti)&&(i.stencilFunc(fe,Mi,ti),it=fe,St=Mi,It=ti)},setOp:function(fe,Mi,ti){(at!==fe||Ut!==Mi||Wt!==ti)&&(i.stencilOp(fe,Mi,ti),at=fe,Ut=Mi,Wt=ti)},setLocked:function(fe){B=fe},setClear:function(fe){jt!==fe&&(i.clearStencil(fe),jt=fe)},reset:function(){B=!1,yt=null,it=null,St=null,It=null,at=null,Ut=null,Wt=null,jt=null}}}let r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,b=null,x=null,T=null,M=null,C=null,y=new Ft(0,0,0),w=0,R=!1,P=null,D=null,k=null,F=null,N=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),z=!1,W=0,O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),z=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),z=W>=2);let j=null,rt={},ft=i.getParameter(i.SCISSOR_BOX),Tt=i.getParameter(i.VIEWPORT),re=new Re().fromArray(ft),Yt=new Re().fromArray(Tt);function X(B,yt,it,St){let It=new Uint8Array(4),at=i.createTexture();i.bindTexture(B,at),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<it;Ut++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(yt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,It):i.texImage2D(yt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,It);return at}let ot={};ot[i.TEXTURE_2D]=X(i.TEXTURE_2D,i.TEXTURE_2D,1),ot[i.TEXTURE_CUBE_MAP]=X(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ot[i.TEXTURE_2D_ARRAY]=X(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ot[i.TEXTURE_3D]=X(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),tt(i.DEPTH_TEST),o.setFunc(Ks),ct(!1),ut(sf),tt(i.CULL_FACE),nt(Fi);function tt(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function dt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Ot(B,yt){return u[B]!==yt?(i.bindFramebuffer(B,yt),u[B]=yt,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=yt),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=yt),!0):!1}function Lt(B,yt){let it=p,St=!1;if(B){it=f.get(yt),it===void 0&&(it=[],f.set(yt,it));let It=B.textures;if(it.length!==It.length||it[0]!==i.COLOR_ATTACHMENT0){for(let at=0,Ut=It.length;at<Ut;at++)it[at]=i.COLOR_ATTACHMENT0+at;it.length=It.length,St=!0}}else it[0]!==i.BACK&&(it[0]=i.BACK,St=!0);St&&i.drawBuffers(it)}function wt(B){return _!==B?(i.useProgram(B),_=B,!0):!1}let _t={[ys]:i.FUNC_ADD,[Rm]:i.FUNC_SUBTRACT,[Pm]:i.FUNC_REVERSE_SUBTRACT};_t[Im]=i.MIN,_t[Lm]=i.MAX;let Q={[Dm]:i.ZERO,[Nm]:i.ONE,[Um]:i.SRC_COLOR,[yl]:i.SRC_ALPHA,[km]:i.SRC_ALPHA_SATURATE,[zm]:i.DST_COLOR,[Om]:i.DST_ALPHA,[Fm]:i.ONE_MINUS_SRC_COLOR,[Sl]:i.ONE_MINUS_SRC_ALPHA,[Vm]:i.ONE_MINUS_DST_COLOR,[Bm]:i.ONE_MINUS_DST_ALPHA,[Gm]:i.CONSTANT_COLOR,[Hm]:i.ONE_MINUS_CONSTANT_COLOR,[Wm]:i.CONSTANT_ALPHA,[Xm]:i.ONE_MINUS_CONSTANT_ALPHA};function nt(B,yt,it,St,It,at,Ut,Wt,jt,fe){if(B===Fi){g===!0&&(dt(i.BLEND),g=!1);return}if(g===!1&&(tt(i.BLEND),g=!0),B!==Cm){if(B!==m||fe!==R){if((v!==ys||T!==ys)&&(i.blendEquation(i.FUNC_ADD),v=ys,T=ys),fe)switch(B){case Js:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rf:i.blendFunc(i.ONE,i.ONE);break;case of:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case af:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:qt("WebGLState: Invalid blending: ",B);break}else switch(B){case Js:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rf:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case of:qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case af:qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:qt("WebGLState: Invalid blending: ",B);break}b=null,x=null,M=null,C=null,y.set(0,0,0),w=0,m=B,R=fe}return}It=It||yt,at=at||it,Ut=Ut||St,(yt!==v||It!==T)&&(i.blendEquationSeparate(_t[yt],_t[It]),v=yt,T=It),(it!==b||St!==x||at!==M||Ut!==C)&&(i.blendFuncSeparate(Q[it],Q[St],Q[at],Q[Ut]),b=it,x=St,M=at,C=Ut),(Wt.equals(y)===!1||jt!==w)&&(i.blendColor(Wt.r,Wt.g,Wt.b,jt),y.copy(Wt),w=jt),m=B,R=!1}function K(B,yt){B.side===Ui?dt(i.CULL_FACE):tt(i.CULL_FACE);let it=B.side===En;yt&&(it=!it),ct(it),B.blending===Js&&B.transparent===!1?nt(Fi):nt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);let St=B.stencilWrite;a.setTest(St),St&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Pt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?tt(i.SAMPLE_ALPHA_TO_COVERAGE):dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function ct(B){P!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),P=B)}function ut(B){B!==wm?(tt(i.CULL_FACE),B!==D&&(B===sf?i.cullFace(i.BACK):B===Am?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):dt(i.CULL_FACE),D=B}function Rt(B){B!==k&&(z&&i.lineWidth(B),k=B)}function Pt(B,yt,it){B?(tt(i.POLYGON_OFFSET_FILL),(F!==yt||N!==it)&&(F=yt,N=it,o.getReversed()&&(yt=-yt),i.polygonOffset(yt,it))):dt(i.POLYGON_OFFSET_FILL)}function xt(B){B?tt(i.SCISSOR_TEST):dt(i.SCISSOR_TEST)}function Vt(B){B===void 0&&(B=i.TEXTURE0+G-1),j!==B&&(i.activeTexture(B),j=B)}function L(B,yt,it){it===void 0&&(j===null?it=i.TEXTURE0+G-1:it=j);let St=rt[it];St===void 0&&(St={type:void 0,texture:void 0},rt[it]=St),(St.type!==B||St.texture!==yt)&&(j!==it&&(i.activeTexture(it),j=it),i.bindTexture(B,yt||ot[B]),St.type=B,St.texture=yt)}function Qt(){let B=rt[j];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function st(){try{i.compressedTexImage2D(...arguments)}catch(B){qt("WebGLState:",B)}}function E(){try{i.compressedTexImage3D(...arguments)}catch(B){qt("WebGLState:",B)}}function S(){try{i.texSubImage2D(...arguments)}catch(B){qt("WebGLState:",B)}}function U(){try{i.texSubImage3D(...arguments)}catch(B){qt("WebGLState:",B)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(B){qt("WebGLState:",B)}}function q(){try{i.compressedTexSubImage3D(...arguments)}catch(B){qt("WebGLState:",B)}}function ht(){try{i.texStorage2D(...arguments)}catch(B){qt("WebGLState:",B)}}function gt(){try{i.texStorage3D(...arguments)}catch(B){qt("WebGLState:",B)}}function J(){try{i.texImage2D(...arguments)}catch(B){qt("WebGLState:",B)}}function et(){try{i.texImage3D(...arguments)}catch(B){qt("WebGLState:",B)}}function vt(B){return d[B]!==void 0?d[B]:i.getParameter(B)}function Zt(B,yt){d[B]!==yt&&(i.pixelStorei(B,yt),d[B]=yt)}function Et(B){re.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),re.copy(B))}function Mt(B){Yt.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),Yt.copy(B))}function Jt(B,yt){let it=c.get(yt);it===void 0&&(it=new WeakMap,c.set(yt,it));let St=it.get(B);St===void 0&&(St=i.getUniformBlockIndex(yt,B.name),it.set(B,St))}function ie(B,yt){let St=c.get(yt).get(B);l.get(yt)!==St&&(i.uniformBlockBinding(yt,St,B.__bindingPointIndex),l.set(yt,St))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},d={},j=null,rt={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,v=null,b=null,x=null,T=null,M=null,C=null,y=new Ft(0,0,0),w=0,R=!1,P=null,D=null,k=null,F=null,N=null,re.set(0,0,i.canvas.width,i.canvas.height),Yt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:tt,disable:dt,bindFramebuffer:Ot,drawBuffers:Lt,useProgram:wt,setBlending:nt,setMaterial:K,setFlipSided:ct,setCullFace:ut,setLineWidth:Rt,setPolygonOffset:Pt,setScissorTest:xt,activeTexture:Vt,bindTexture:L,unbindTexture:Qt,compressedTexImage2D:st,compressedTexImage3D:E,texImage2D:J,texImage3D:et,pixelStorei:Zt,getParameter:vt,updateUBOMapping:Jt,uniformBlockBinding:ie,texStorage2D:ht,texStorage3D:gt,texSubImage2D:S,texSubImage3D:U,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:Et,viewport:Mt,reset:ee}}function E1(i,t,e,n,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new lt,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(E,S){return p?new OffscreenCanvas(E,S):Vo("canvas")}function g(E,S,U){let V=1,q=st(E);if((q.width>U||q.height>U)&&(V=U/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let ht=Math.floor(V*q.width),gt=Math.floor(V*q.height);u===void 0&&(u=_(ht,gt));let J=S?_(ht,gt):u;return J.width=ht,J.height=gt,J.getContext("2d").drawImage(E,0,0,ht,gt),bt("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+ht+"x"+gt+")."),J}else return"data"in E&&bt("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),E;return E}function m(E){return E.generateMipmaps}function v(E){i.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(E,S,U,V,q,ht=!1){if(E!==null){if(i[E]!==void 0)return i[E];bt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let gt;V&&(gt=t.get("EXT_texture_norm16"),gt||bt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let J=S;if(S===i.RED&&(U===i.FLOAT&&(J=i.R32F),U===i.HALF_FLOAT&&(J=i.R16F),U===i.UNSIGNED_BYTE&&(J=i.R8),U===i.UNSIGNED_SHORT&&gt&&(J=gt.R16_EXT),U===i.SHORT&&gt&&(J=gt.R16_SNORM_EXT)),S===i.RED_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.R8UI),U===i.UNSIGNED_SHORT&&(J=i.R16UI),U===i.UNSIGNED_INT&&(J=i.R32UI),U===i.BYTE&&(J=i.R8I),U===i.SHORT&&(J=i.R16I),U===i.INT&&(J=i.R32I)),S===i.RG&&(U===i.FLOAT&&(J=i.RG32F),U===i.HALF_FLOAT&&(J=i.RG16F),U===i.UNSIGNED_BYTE&&(J=i.RG8),U===i.UNSIGNED_SHORT&&gt&&(J=gt.RG16_EXT),U===i.SHORT&&gt&&(J=gt.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RG8UI),U===i.UNSIGNED_SHORT&&(J=i.RG16UI),U===i.UNSIGNED_INT&&(J=i.RG32UI),U===i.BYTE&&(J=i.RG8I),U===i.SHORT&&(J=i.RG16I),U===i.INT&&(J=i.RG32I)),S===i.RGB_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGB8UI),U===i.UNSIGNED_SHORT&&(J=i.RGB16UI),U===i.UNSIGNED_INT&&(J=i.RGB32UI),U===i.BYTE&&(J=i.RGB8I),U===i.SHORT&&(J=i.RGB16I),U===i.INT&&(J=i.RGB32I)),S===i.RGBA_INTEGER&&(U===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),U===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),U===i.UNSIGNED_INT&&(J=i.RGBA32UI),U===i.BYTE&&(J=i.RGBA8I),U===i.SHORT&&(J=i.RGBA16I),U===i.INT&&(J=i.RGBA32I)),S===i.RGB&&(U===i.UNSIGNED_SHORT&&gt&&(J=gt.RGB16_EXT),U===i.SHORT&&gt&&(J=gt.RGB16_SNORM_EXT),U===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),U===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),S===i.RGBA){let et=ht?Bo:ye.getTransfer(q);U===i.FLOAT&&(J=i.RGBA32F),U===i.HALF_FLOAT&&(J=i.RGBA16F),U===i.UNSIGNED_BYTE&&(J=et===Ae?i.SRGB8_ALPHA8:i.RGBA8),U===i.UNSIGNED_SHORT&&gt&&(J=gt.RGBA16_EXT),U===i.SHORT&&gt&&(J=gt.RGBA16_SNORM_EXT),U===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),U===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function T(E,S){let U;return E?S===null||S===oi||S===Yr?U=i.DEPTH24_STENCIL8:S===Tn?U=i.DEPTH32F_STENCIL8:S===qr&&(U=i.DEPTH24_STENCIL8,bt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===oi||S===Yr?U=i.DEPTH_COMPONENT24:S===Tn?U=i.DEPTH_COMPONENT32F:S===qr&&(U=i.DEPTH_COMPONENT16),U}function M(E,S){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Xe&&E.minFilter!==Fe?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function C(E){let S=E.target;S.removeEventListener("dispose",C),w(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&d.delete(S)}function y(E){let S=E.target;S.removeEventListener("dispose",y),P(S)}function w(E){let S=n.get(E);if(S.__webglInit===void 0)return;let U=E.source,V=f.get(U);if(V){let q=V[S.__cacheKey];q.usedTimes--,q.usedTimes===0&&R(E),Object.keys(V).length===0&&f.delete(U)}n.remove(E)}function R(E){let S=n.get(E);i.deleteTexture(S.__webglTexture);let U=E.source,V=f.get(U);delete V[S.__cacheKey],o.memory.textures--}function P(E){let S=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(S.__webglFramebuffer[V]))for(let q=0;q<S.__webglFramebuffer[V].length;q++)i.deleteFramebuffer(S.__webglFramebuffer[V][q]);else i.deleteFramebuffer(S.__webglFramebuffer[V]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[V])}else{if(Array.isArray(S.__webglFramebuffer))for(let V=0;V<S.__webglFramebuffer.length;V++)i.deleteFramebuffer(S.__webglFramebuffer[V]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let V=0;V<S.__webglColorRenderbuffer.length;V++)S.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[V]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let U=E.textures;for(let V=0,q=U.length;V<q;V++){let ht=n.get(U[V]);ht.__webglTexture&&(i.deleteTexture(ht.__webglTexture),o.memory.textures--),n.remove(U[V])}n.remove(E)}let D=0;function k(){D=0}function F(){return D}function N(E){D=E}function G(){let E=D;return E>=s.maxTextures&&bt("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),D+=1,E}function z(E){let S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function W(E,S){let U=n.get(E);if(E.isVideoTexture&&L(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&U.__version!==E.version){let V=E.image;if(V===null)bt("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)bt("WebGLRenderer: Texture marked for update but image is incomplete");else{dt(U,E,S);return}}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,U.__webglTexture,i.TEXTURE0+S)}function O(E,S){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){dt(U,E,S);return}else E.isExternalTexture&&(U.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,U.__webglTexture,i.TEXTURE0+S)}function j(E,S){let U=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&U.__version!==E.version){dt(U,E,S);return}e.bindTexture(i.TEXTURE_3D,U.__webglTexture,i.TEXTURE0+S)}function rt(E,S){let U=n.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&U.__version!==E.version){Ot(U,E,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture,i.TEXTURE0+S)}let ft={[Do]:i.REPEAT,[Dn]:i.CLAMP_TO_EDGE,[No]:i.MIRRORED_REPEAT},Tt={[Xe]:i.NEAREST,[mf]:i.NEAREST_MIPMAP_NEAREST,[Xr]:i.NEAREST_MIPMAP_LINEAR,[Fe]:i.LINEAR,[ya]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},re={[tg]:i.NEVER,[rg]:i.ALWAYS,[eg]:i.LESS,[Eh]:i.LEQUAL,[ng]:i.EQUAL,[Ch]:i.GEQUAL,[ig]:i.GREATER,[sg]:i.NOTEQUAL};function Yt(E,S){if(S.type===Tn&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Fe||S.magFilter===ya||S.magFilter===Xr||S.magFilter===Bi||S.minFilter===Fe||S.minFilter===ya||S.minFilter===Xr||S.minFilter===Bi)&&bt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,ft[S.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,ft[S.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,ft[S.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,Tt[S.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,Tt[S.minFilter]),S.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,re[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xe||S.minFilter!==Xr&&S.minFilter!==Bi||S.type===Tn&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let U=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function X(E,S){let U=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",C));let V=S.source,q=f.get(V);q===void 0&&(q={},f.set(V,q));let ht=z(S);if(ht!==E.__cacheKey){q[ht]===void 0&&(q[ht]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,U=!0),q[ht].usedTimes++;let gt=q[E.__cacheKey];gt!==void 0&&(q[E.__cacheKey].usedTimes--,gt.usedTimes===0&&R(S)),E.__cacheKey=ht,E.__webglTexture=q[ht].texture}return U}function ot(E,S,U){return Math.floor(Math.floor(E/U)/S)}function tt(E,S,U,V){let ht=E.updateRanges;if(ht.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,U,V,S.data);else{ht.sort((Zt,Et)=>Zt.start-Et.start);let gt=0;for(let Zt=1;Zt<ht.length;Zt++){let Et=ht[gt],Mt=ht[Zt],Jt=Et.start+Et.count,ie=ot(Mt.start,S.width,4),ee=ot(Et.start,S.width,4);Mt.start<=Jt+1&&ie===ee&&ot(Mt.start+Mt.count-1,S.width,4)===ie?Et.count=Math.max(Et.count,Mt.start+Mt.count-Et.start):(++gt,ht[gt]=Mt)}ht.length=gt+1;let J=e.getParameter(i.UNPACK_ROW_LENGTH),et=e.getParameter(i.UNPACK_SKIP_PIXELS),vt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let Zt=0,Et=ht.length;Zt<Et;Zt++){let Mt=ht[Zt],Jt=Math.floor(Mt.start/4),ie=Math.ceil(Mt.count/4),ee=Jt%S.width,B=Math.floor(Jt/S.width),yt=ie,it=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),e.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,ee,B,yt,it,U,V,S.data)}E.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,J),e.pixelStorei(i.UNPACK_SKIP_PIXELS,et),e.pixelStorei(i.UNPACK_SKIP_ROWS,vt)}}function dt(E,S,U){let V=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(V=i.TEXTURE_3D);let q=X(E,S),ht=S.source;e.bindTexture(V,E.__webglTexture,i.TEXTURE0+U);let gt=n.get(ht);if(ht.version!==gt.__version||q===!0){if(e.activeTexture(i.TEXTURE0+U),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let it=ye.getPrimaries(ye.workingColorSpace),St=S.colorSpace===ji?null:ye.getPrimaries(S.colorSpace),It=S.colorSpace===ji||it===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It)}e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let et=g(S.image,!1,s.maxTextureSize);et=Qt(S,et);let vt=r.convert(S.format,S.colorSpace),Zt=r.convert(S.type),Et=x(S.internalFormat,vt,Zt,S.normalized,S.colorSpace,S.isVideoTexture);Yt(V,S);let Mt,Jt=S.mipmaps,ie=S.isVideoTexture!==!0,ee=gt.__version===void 0||q===!0,B=ht.dataReady,yt=M(S,et);if(S.isDepthTexture)Et=T(S.format===As,S.type),ee&&(ie?e.texStorage2D(i.TEXTURE_2D,1,Et,et.width,et.height):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,vt,Zt,null));else if(S.isDataTexture)if(Jt.length>0){ie&&ee&&e.texStorage2D(i.TEXTURE_2D,yt,Et,Jt[0].width,Jt[0].height);for(let it=0,St=Jt.length;it<St;it++)Mt=Jt[it],ie?B&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,vt,Zt,Mt.data):e.texImage2D(i.TEXTURE_2D,it,Et,Mt.width,Mt.height,0,vt,Zt,Mt.data);S.generateMipmaps=!1}else ie?(ee&&e.texStorage2D(i.TEXTURE_2D,yt,Et,et.width,et.height),B&&tt(S,et,vt,Zt)):e.texImage2D(i.TEXTURE_2D,0,Et,et.width,et.height,0,vt,Zt,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ie&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Et,Jt[0].width,Jt[0].height,et.depth);for(let it=0,St=Jt.length;it<St;it++)if(Mt=Jt[it],S.format!==wn)if(vt!==null)if(ie){if(B)if(S.layerUpdates.size>0){let It=Tf(Mt.width,Mt.height,S.format,S.type);for(let at of S.layerUpdates){let Ut=Mt.data.subarray(at*It/Mt.data.BYTES_PER_ELEMENT,(at+1)*It/Mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,at,Mt.width,Mt.height,1,vt,Ut)}S.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Mt.width,Mt.height,et.depth,vt,Mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,it,Et,Mt.width,Mt.height,et.depth,0,Mt.data,0,0);else bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ie?B&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,it,0,0,0,Mt.width,Mt.height,et.depth,vt,Zt,Mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,it,Et,Mt.width,Mt.height,et.depth,0,vt,Zt,Mt.data)}else{ie&&ee&&e.texStorage2D(i.TEXTURE_2D,yt,Et,Jt[0].width,Jt[0].height);for(let it=0,St=Jt.length;it<St;it++)Mt=Jt[it],S.format!==wn?vt!==null?ie?B&&e.compressedTexSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,vt,Mt.data):e.compressedTexImage2D(i.TEXTURE_2D,it,Et,Mt.width,Mt.height,0,Mt.data):bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?B&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,Mt.width,Mt.height,vt,Zt,Mt.data):e.texImage2D(i.TEXTURE_2D,it,Et,Mt.width,Mt.height,0,vt,Zt,Mt.data)}else if(S.isDataArrayTexture)if(ie){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Et,et.width,et.height,et.depth),B)if(S.layerUpdates.size>0){let it=Tf(et.width,et.height,S.format,S.type);for(let St of S.layerUpdates){let It=et.data.subarray(St*it/et.data.BYTES_PER_ELEMENT,(St+1)*it/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,St,et.width,et.height,1,vt,Zt,It)}S.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,vt,Zt,et.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Et,et.width,et.height,et.depth,0,vt,Zt,et.data);else if(S.isData3DTexture)ie?(ee&&e.texStorage3D(i.TEXTURE_3D,yt,Et,et.width,et.height,et.depth),B&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,vt,Zt,et.data)):e.texImage3D(i.TEXTURE_3D,0,Et,et.width,et.height,et.depth,0,vt,Zt,et.data);else if(S.isFramebufferTexture){if(ee)if(ie)e.texStorage2D(i.TEXTURE_2D,yt,Et,et.width,et.height);else{let it=et.width,St=et.height;for(let It=0;It<yt;It++)e.texImage2D(i.TEXTURE_2D,It,Et,it,St,0,vt,Zt,null),it>>=1,St>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let it=i.canvas;if(it.hasAttribute("layoutsubtree")||it.setAttribute("layoutsubtree","true"),et.parentNode!==it){it.appendChild(et),d.add(S),it.onpaint=St=>{let It=St.changedElements;for(let at of d)It.includes(at.image)&&(at.needsUpdate=!0)},it.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,et);else{let It=i.RGBA,at=i.RGBA,Ut=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,It,at,Ut,et)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Jt.length>0){if(ie&&ee){let it=st(Jt[0]);e.texStorage2D(i.TEXTURE_2D,yt,Et,it.width,it.height)}for(let it=0,St=Jt.length;it<St;it++)Mt=Jt[it],ie?B&&e.texSubImage2D(i.TEXTURE_2D,it,0,0,vt,Zt,Mt):e.texImage2D(i.TEXTURE_2D,it,Et,vt,Zt,Mt);S.generateMipmaps=!1}else if(ie){if(ee){let it=st(et);e.texStorage2D(i.TEXTURE_2D,yt,Et,it.width,it.height)}B&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,Zt,et)}else e.texImage2D(i.TEXTURE_2D,0,Et,vt,Zt,et);m(S)&&v(V),gt.__version=ht.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Ot(E,S,U){if(S.image.length!==6)return;let V=X(E,S),q=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+U);let ht=n.get(q);if(q.version!==ht.__version||V===!0){e.activeTexture(i.TEXTURE0+U);let gt=ye.getPrimaries(ye.workingColorSpace),J=S.colorSpace===ji?null:ye.getPrimaries(S.colorSpace),et=S.colorSpace===ji||gt===J?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let vt=S.isCompressedTexture||S.image[0].isCompressedTexture,Zt=S.image[0]&&S.image[0].isDataTexture,Et=[];for(let at=0;at<6;at++)!vt&&!Zt?Et[at]=g(S.image[at],!0,s.maxCubemapSize):Et[at]=Zt?S.image[at].image:S.image[at],Et[at]=Qt(S,Et[at]);let Mt=Et[0],Jt=r.convert(S.format,S.colorSpace),ie=r.convert(S.type),ee=x(S.internalFormat,Jt,ie,S.normalized,S.colorSpace),B=S.isVideoTexture!==!0,yt=ht.__version===void 0||V===!0,it=q.dataReady,St=M(S,Mt);Yt(i.TEXTURE_CUBE_MAP,S);let It;if(vt){B&&yt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ee,Mt.width,Mt.height);for(let at=0;at<6;at++){It=Et[at].mipmaps;for(let Ut=0;Ut<It.length;Ut++){let Wt=It[Ut];S.format!==wn?Jt!==null?B?it&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut,0,0,Wt.width,Wt.height,Jt,Wt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut,ee,Wt.width,Wt.height,0,Wt.data):bt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut,0,0,Wt.width,Wt.height,Jt,ie,Wt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut,ee,Wt.width,Wt.height,0,Jt,ie,Wt.data)}}}else{if(It=S.mipmaps,B&&yt){It.length>0&&St++;let at=st(Et[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,ee,at.width,at.height)}for(let at=0;at<6;at++)if(Zt){B?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Et[at].width,Et[at].height,Jt,ie,Et[at].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ee,Et[at].width,Et[at].height,0,Jt,ie,Et[at].data);for(let Ut=0;Ut<It.length;Ut++){let jt=It[Ut].image[at].image;B?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut+1,0,0,jt.width,jt.height,Jt,ie,jt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut+1,ee,jt.width,jt.height,0,Jt,ie,jt.data)}}else{B?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Jt,ie,Et[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ee,Jt,ie,Et[at]);for(let Ut=0;Ut<It.length;Ut++){let Wt=It[Ut];B?it&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut+1,0,0,Jt,ie,Wt.image[at]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,Ut+1,ee,Jt,ie,Wt.image[at])}}}m(S)&&v(i.TEXTURE_CUBE_MAP),ht.__version=q.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Lt(E,S,U,V,q,ht){let gt=r.convert(U.format,U.colorSpace),J=r.convert(U.type),et=x(U.internalFormat,gt,J,U.normalized,U.colorSpace),vt=n.get(S),Zt=n.get(U);if(Zt.__renderTarget=S,!vt.__hasExternalTextures){let Et=Math.max(1,S.width>>ht),Mt=Math.max(1,S.height>>ht);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,ht,et,Et,Mt,S.depth,0,gt,J,null):e.texImage2D(q,ht,et,Et,Mt,0,gt,J,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),Vt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,q,Zt.__webglTexture,0,xt(S)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,q,Zt.__webglTexture,ht),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(E,S,U){if(i.bindRenderbuffer(i.RENDERBUFFER,E),S.depthBuffer){let V=S.depthTexture,q=V&&V.isDepthTexture?V.type:null,ht=T(S.stencilBuffer,q),gt=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Vt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(S),ht,S.width,S.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(S),ht,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ht,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,gt,i.RENDERBUFFER,E)}else{let V=S.textures;for(let q=0;q<V.length;q++){let ht=V[q],gt=r.convert(ht.format,ht.colorSpace),J=r.convert(ht.type),et=x(ht.internalFormat,gt,J,ht.normalized,ht.colorSpace);Vt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,xt(S),et,S.width,S.height):U?i.renderbufferStorageMultisample(i.RENDERBUFFER,xt(S),et,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,et,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(E,S,U){let V=S.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let q=n.get(S.depthTexture);if(q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,S.depthTexture.addEventListener("dispose",C)),q.__webglTexture===void 0){q.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture),Yt(i.TEXTURE_CUBE_MAP,S.depthTexture);let vt=r.convert(S.depthTexture.format),Zt=r.convert(S.depthTexture.type),Et;S.depthTexture.format===Ii?Et=i.DEPTH_COMPONENT24:S.depthTexture.format===As&&(Et=i.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,Et,S.width,S.height,0,vt,Zt,null)}}else W(S.depthTexture,0);let ht=q.__webglTexture,gt=xt(S),J=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+U:i.TEXTURE_2D,et=S.depthTexture.format===As?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ii)Vt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,J,ht,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,et,J,ht,0);else if(S.depthTexture.format===As)Vt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,J,ht,0,gt):i.framebufferTexture2D(i.FRAMEBUFFER,et,J,ht,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Q(E){let S=n.get(E),U=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){let V=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),V){let q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),S.__depthDisposeCallback=q}S.__boundDepthTexture=V}if(E.depthTexture&&!S.__autoAllocateDepthBuffer)if(U)for(let V=0;V<6;V++)_t(S.__webglFramebuffer[V],E,V);else{let V=E.texture.mipmaps;V&&V.length>0?_t(S.__webglFramebuffer[0],E,0):_t(S.__webglFramebuffer,E,0)}else if(U){S.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[V]),S.__webglDepthbuffer[V]===void 0)S.__webglDepthbuffer[V]=i.createRenderbuffer(),wt(S.__webglDepthbuffer[V],E,!1);else{let q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=S.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ht)}}else{let V=E.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),wt(S.__webglDepthbuffer,E,!1);else{let q=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ht),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,ht)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function nt(E,S,U){let V=n.get(E);S!==void 0&&Lt(V.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),U!==void 0&&Q(E)}function K(E){let S=E.texture,U=n.get(E),V=n.get(S);E.addEventListener("dispose",y);let q=E.textures,ht=E.isWebGLCubeRenderTarget===!0,gt=q.length>1;if(gt||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=S.version,o.memory.textures++),ht){U.__webglFramebuffer=[];for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0){U.__webglFramebuffer[J]=[];for(let et=0;et<S.mipmaps.length;et++)U.__webglFramebuffer[J][et]=i.createFramebuffer()}else U.__webglFramebuffer[J]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){U.__webglFramebuffer=[];for(let J=0;J<S.mipmaps.length;J++)U.__webglFramebuffer[J]=i.createFramebuffer()}else U.__webglFramebuffer=i.createFramebuffer();if(gt)for(let J=0,et=q.length;J<et;J++){let vt=n.get(q[J]);vt.__webglTexture===void 0&&(vt.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&Vt(E)===!1){U.__webglMultisampledFramebuffer=i.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let J=0;J<q.length;J++){let et=q[J];U.__webglColorRenderbuffer[J]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,U.__webglColorRenderbuffer[J]);let vt=r.convert(et.format,et.colorSpace),Zt=r.convert(et.type),Et=x(et.internalFormat,vt,Zt,et.normalized,et.colorSpace,E.isXRRenderTarget===!0),Mt=xt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Mt,Et,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+J,i.RENDERBUFFER,U.__webglColorRenderbuffer[J])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(U.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(U.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Yt(i.TEXTURE_CUBE_MAP,S);for(let J=0;J<6;J++)if(S.mipmaps&&S.mipmaps.length>0)for(let et=0;et<S.mipmaps.length;et++)Lt(U.__webglFramebuffer[J][et],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,et);else Lt(U.__webglFramebuffer[J],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+J,0);m(S)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let J=0,et=q.length;J<et;J++){let vt=q[J],Zt=n.get(vt),Et=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Et=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Et,Zt.__webglTexture),Yt(Et,vt),Lt(U.__webglFramebuffer,E,vt,i.COLOR_ATTACHMENT0+J,Et,0),m(vt)&&v(Et)}e.unbindTexture()}else{let J=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(J=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(J,V.__webglTexture),Yt(J,S),S.mipmaps&&S.mipmaps.length>0)for(let et=0;et<S.mipmaps.length;et++)Lt(U.__webglFramebuffer[et],E,S,i.COLOR_ATTACHMENT0,J,et);else Lt(U.__webglFramebuffer,E,S,i.COLOR_ATTACHMENT0,J,0);m(S)&&v(J),e.unbindTexture()}E.depthBuffer&&Q(E)}function ct(E){let S=E.textures;for(let U=0,V=S.length;U<V;U++){let q=S[U];if(m(q)){let ht=b(E),gt=n.get(q).__webglTexture;e.bindTexture(ht,gt),v(ht),e.unbindTexture()}}}let ut=[],Rt=[];function Pt(E){if(E.samples>0){if(Vt(E)===!1){let S=E.textures,U=E.width,V=E.height,q=i.COLOR_BUFFER_BIT,ht=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,gt=n.get(E),J=S.length>1;if(J)for(let vt=0;vt<S.length;vt++)e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer);let et=E.texture.mipmaps;et&&et.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let vt=0;vt<S.length;vt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),J){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,gt.__webglColorRenderbuffer[vt]);let Zt=n.get(S[vt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Zt,0)}i.blitFramebuffer(0,0,U,V,0,0,U,V,q,i.NEAREST),l===!0&&(ut.length=0,Rt.length=0,ut.push(i.COLOR_ATTACHMENT0+vt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ut.push(ht),Rt.push(ht),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Rt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),J)for(let vt=0;vt<S.length;vt++){e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.RENDERBUFFER,gt.__webglColorRenderbuffer[vt]);let Zt=n.get(S[vt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,gt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+vt,i.TEXTURE_2D,Zt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){let S=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function xt(E){return Math.min(s.maxSamples,E.samples)}function Vt(E){let S=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function L(E){let S=o.render.frame;h.get(E)!==S&&(h.set(E,S),E.update())}function Qt(E,S){let U=E.colorSpace,V=E.format,q=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||U!==Oo&&U!==ji&&(ye.getTransfer(U)===Ae?(V!==wn||q!==On)&&bt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):qt("WebGLTextures: Unsupported texture color space:",U)),S}function st(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=k,this.getTextureUnits=F,this.setTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=O,this.setTexture3D=j,this.setTextureCube=rt,this.rebindTextures=nt,this.setupRenderTarget=K,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Q,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=Vt,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function zv(i,t){function e(n,s=ji){let r,o=ye.getTransfer(s);if(n===On)return i.UNSIGNED_BYTE;if(n===Xc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===qc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===xf)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===vf)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===gf)return i.BYTE;if(n===_f)return i.SHORT;if(n===qr)return i.UNSIGNED_SHORT;if(n===Wc)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===zi)return i.HALF_FLOAT;if(n===yf)return i.ALPHA;if(n===Sf)return i.RGB;if(n===wn)return i.RGBA;if(n===Ii)return i.DEPTH_COMPONENT;if(n===As)return i.DEPTH_STENCIL;if(n===Yc)return i.RED;if(n===Sa)return i.RED_INTEGER;if(n===Es)return i.RG;if(n===$c)return i.RG_INTEGER;if(n===Zc)return i.RGBA_INTEGER;if(n===ba||n===Ma||n===Ta||n===wa)if(o===Ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ba)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ta)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===wa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Jc||n===Kc||n===Qc||n===jc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Jc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Kc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===jc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===th||n===eh||n===nh||n===ih||n===sh||n===Aa||n===rh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===th||n===eh)return o===Ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===nh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ih)return r.COMPRESSED_R11_EAC;if(n===sh)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Aa)return r.COMPRESSED_RG11_EAC;if(n===rh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===oh||n===ah||n===lh||n===ch||n===hh||n===uh||n===dh||n===fh||n===ph||n===mh||n===gh||n===_h||n===xh||n===vh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ah)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ch)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===hh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===fh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ph)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===mh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===gh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_h)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vh)return o===Ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yh||n===Sh||n===bh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===yh)return o===Ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mh||n===Th||n===Ea||n===wh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Mh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Th)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ea)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Yr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}function I1(i,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,cg(i)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,v,b,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,v,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===En&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===En&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let v=t.get(m),b=v.envMap,x=v.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(P1.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(Vv),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,v,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*v,g.scale.value=b*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,v){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===En&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=v.texture,g.transmissionSamplerSize.value.set(v.width,v.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let v=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(v.matrixWorld),g.nearDistance.value=v.shadow.camera.near,g.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function L1(i,t,e,n){let s={},r={},o=[],a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,T){let M=T.program;n.uniformBlockBinding(x,M)}function c(x,T){let M=s[x.id];M===void 0&&(g(x),M=h(x),s[x.id]=M,x.addEventListener("dispose",v));let C=T.program;n.updateUBOMapping(x,C);let y=t.render.frame;r[x.id]!==y&&(u(x),r[x.id]=y)}function h(x){let T=d();x.__bindingPointIndex=T;let M=i.createBuffer(),C=x.__size,y=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,C,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,M),M}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let T=s[x.id],M=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let y=0,w=M.length;y<w;y++){let R=M[y];if(Array.isArray(R))for(let P=0,D=R.length;P<D;P++)f(R[P],y,P,C);else f(R,y,0,C)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,T,M,C){if(_(x,T,M,C)===!0){let y=x.__offset,w=x.value;if(Array.isArray(w)){let R=0;for(let P=0;P<w.length;P++){let D=w[P],k=m(D);p(D,x.__data,R),typeof D!="number"&&typeof D!="boolean"&&!D.isMatrix3&&!ArrayBuffer.isView(D)&&(R+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(w,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,y,x.__data)}}function p(x,T,M){typeof x=="number"||typeof x=="boolean"?T[0]=x:x.isMatrix3?(T[0]=x.elements[0],T[1]=x.elements[1],T[2]=x.elements[2],T[3]=0,T[4]=x.elements[3],T[5]=x.elements[4],T[6]=x.elements[5],T[7]=0,T[8]=x.elements[6],T[9]=x.elements[7],T[10]=x.elements[8],T[11]=0):ArrayBuffer.isView(x)?T.set(new x.constructor(x.buffer,x.byteOffset,T.length)):x.toArray(T,M)}function _(x,T,M,C){let y=x.value,w=T+"_"+M;if(C[w]===void 0)return typeof y=="number"||typeof y=="boolean"?C[w]=y:ArrayBuffer.isView(y)?C[w]=y.slice():C[w]=y.clone(),!0;{let R=C[w];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return C[w]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function g(x){let T=x.uniforms,M=0,C=16;for(let w=0,R=T.length;w<R;w++){let P=Array.isArray(T[w])?T[w]:[T[w]];for(let D=0,k=P.length;D<k;D++){let F=P[D],N=Array.isArray(F.value)?F.value:[F.value];for(let G=0,z=N.length;G<z;G++){let W=N[G],O=m(W),j=M%C,rt=j%O.boundary,ft=j+rt;M+=rt,ft!==0&&C-ft<O.storage&&(M+=C-ft),F.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=O.storage}}}let y=M%C;return y>0&&(M+=C-y),x.__size=M,x.__cache={},this}function m(x){let T={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(T.boundary=4,T.storage=4):x.isVector2?(T.boundary=8,T.storage=8):x.isVector3||x.isColor?(T.boundary=16,T.storage=12):x.isVector4?(T.boundary=16,T.storage=16):x.isMatrix3?(T.boundary=48,T.storage=48):x.isMatrix4?(T.boundary=64,T.storage=64):x.isTexture?bt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(T.boundary=16,T.storage=x.byteLength):bt("WebGLRenderer: Unsupported uniform value type.",x),T}function v(x){let T=x.target;T.removeEventListener("dispose",v);let M=o.indexOf(T.__bindingPointIndex);o.splice(M,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function b(){for(let x in s)i.deleteBuffer(s[x]);o=[],s={},r={}}return{bind:l,update:c,dispose:b}}function N1(){return ts===null&&(ts=new Nn(D1,16,16,Es,zi),ts.name="DFG_LUT",ts.minFilter=Fe,ts.magFilter=Fe,ts.wrapS=Dn,ts.wrapT=Dn,ts.generateMipmaps=!1,ts.needsUpdate=!0),ts}var JM,KM,QM,jM,tT,eT,nT,iT,sT,rT,oT,aT,lT,cT,hT,uT,dT,fT,pT,mT,gT,_T,xT,vT,yT,ST,bT,MT,TT,wT,AT,ET,CT,RT,PT,IT,LT,DT,NT,UT,FT,OT,BT,zT,VT,kT,GT,HT,WT,XT,qT,YT,$T,ZT,JT,KT,QT,jT,tw,ew,nw,iw,sw,rw,ow,aw,lw,cw,hw,uw,dw,fw,pw,mw,gw,_w,xw,vw,yw,Sw,bw,Mw,Tw,ww,Aw,Ew,Cw,Rw,Pw,Iw,Lw,Dw,Nw,Uw,Fw,Ow,Bw,zw,Vw,kw,Gw,Hw,Ww,Xw,qw,Yw,$w,Zw,Jw,Kw,Qw,jw,tA,eA,nA,iA,sA,rA,oA,aA,lA,cA,hA,uA,dA,fA,pA,mA,gA,_A,xA,vA,yA,SA,bA,MA,TA,wA,AA,EA,CA,RA,ge,Ct,Vi,wf,PA,Nv,lr,uv,Zr,FA,Rh,dv,yg,Sg,bg,Mg,OA,Lh,Dh,$A,Uv,Ag,Fv,Ov,Bv,gv,_v,xv,vv,yv,Eg,Cg,Rg,Tg,Ra,OE,BE,Mv,GE,Af,$E,ZE,KE,jE,e1,i1,r1,c1,Ig,Lg,_1,S1,b1,M1,T1,Lv,Ph,wg,C1,R1,Dg,Ng,P1,Vv,D1,ts,Ug,kv=oe(()=>{vg();vg();JM=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,KM=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,QM=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,jM=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,tT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nT=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,iT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,sT=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,oT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,aT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,lT=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,cT=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hT=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uT=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,pT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,mT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,gT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,_T=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,xT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vT=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,yT=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ST=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,bT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,MT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,TT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,AT="gl_FragColor = linearToOutputTexel( gl_FragColor );",ET=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,CT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,RT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,PT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,IT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,DT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,NT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,UT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,FT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,OT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,BT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,VT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kT=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,GT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,WT=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,XT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,qT=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$T=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ZT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,JT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,KT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,QT=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,jT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tw=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ew=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nw=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,iw=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sw=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rw=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ow=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aw=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lw=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cw=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hw=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uw=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dw=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fw=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pw=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mw=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_w=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vw=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,yw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Sw=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ww=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Aw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ew=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Cw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Iw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Lw=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dw=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Nw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Uw=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Fw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ow=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Bw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zw=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hw=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ww=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xw=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Yw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$w=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Zw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Jw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kw=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jw=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,iA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,oA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,aA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,uA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,fA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,_A=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,SA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,MA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,RA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ge={alphahash_fragment:JM,alphahash_pars_fragment:KM,alphamap_fragment:QM,alphamap_pars_fragment:jM,alphatest_fragment:tT,alphatest_pars_fragment:eT,aomap_fragment:nT,aomap_pars_fragment:iT,batching_pars_vertex:sT,batching_vertex:rT,begin_vertex:oT,beginnormal_vertex:aT,bsdfs:lT,iridescence_fragment:cT,bumpmap_pars_fragment:hT,clipping_planes_fragment:uT,clipping_planes_pars_fragment:dT,clipping_planes_pars_vertex:fT,clipping_planes_vertex:pT,color_fragment:mT,color_pars_fragment:gT,color_pars_vertex:_T,color_vertex:xT,common:vT,cube_uv_reflection_fragment:yT,defaultnormal_vertex:ST,displacementmap_pars_vertex:bT,displacementmap_vertex:MT,emissivemap_fragment:TT,emissivemap_pars_fragment:wT,colorspace_fragment:AT,colorspace_pars_fragment:ET,envmap_fragment:CT,envmap_common_pars_fragment:RT,envmap_pars_fragment:PT,envmap_pars_vertex:IT,envmap_physical_pars_fragment:GT,envmap_vertex:LT,fog_vertex:DT,fog_pars_vertex:NT,fog_fragment:UT,fog_pars_fragment:FT,gradientmap_pars_fragment:OT,lightmap_pars_fragment:BT,lights_lambert_fragment:zT,lights_lambert_pars_fragment:VT,lights_pars_begin:kT,lights_toon_fragment:HT,lights_toon_pars_fragment:WT,lights_phong_fragment:XT,lights_phong_pars_fragment:qT,lights_physical_fragment:YT,lights_physical_pars_fragment:$T,lights_fragment_begin:ZT,lights_fragment_maps:JT,lights_fragment_end:KT,lightprobes_pars_fragment:QT,logdepthbuf_fragment:jT,logdepthbuf_pars_fragment:tw,logdepthbuf_pars_vertex:ew,logdepthbuf_vertex:nw,map_fragment:iw,map_pars_fragment:sw,map_particle_fragment:rw,map_particle_pars_fragment:ow,metalnessmap_fragment:aw,metalnessmap_pars_fragment:lw,morphinstance_vertex:cw,morphcolor_vertex:hw,morphnormal_vertex:uw,morphtarget_pars_vertex:dw,morphtarget_vertex:fw,normal_fragment_begin:pw,normal_fragment_maps:mw,normal_pars_fragment:gw,normal_pars_vertex:_w,normal_vertex:xw,normalmap_pars_fragment:vw,clearcoat_normal_fragment_begin:yw,clearcoat_normal_fragment_maps:Sw,clearcoat_pars_fragment:bw,iridescence_pars_fragment:Mw,opaque_fragment:Tw,packing:ww,premultiplied_alpha_fragment:Aw,project_vertex:Ew,dithering_fragment:Cw,dithering_pars_fragment:Rw,roughnessmap_fragment:Pw,roughnessmap_pars_fragment:Iw,shadowmap_pars_fragment:Lw,shadowmap_pars_vertex:Dw,shadowmap_vertex:Nw,shadowmask_pars_fragment:Uw,skinbase_vertex:Fw,skinning_pars_vertex:Ow,skinning_vertex:Bw,skinnormal_vertex:zw,specularmap_fragment:Vw,specularmap_pars_fragment:kw,tonemapping_fragment:Gw,tonemapping_pars_fragment:Hw,transmission_fragment:Ww,transmission_pars_fragment:Xw,uv_pars_fragment:qw,uv_pars_vertex:Yw,uv_vertex:$w,worldpos_vertex:Zw,background_vert:Jw,background_frag:Kw,backgroundCube_vert:Qw,backgroundCube_frag:jw,cube_vert:tA,cube_frag:eA,depth_vert:nA,depth_frag:iA,distance_vert:sA,distance_frag:rA,equirect_vert:oA,equirect_frag:aA,linedashed_vert:lA,linedashed_frag:cA,meshbasic_vert:hA,meshbasic_frag:uA,meshlambert_vert:dA,meshlambert_frag:fA,meshmatcap_vert:pA,meshmatcap_frag:mA,meshnormal_vert:gA,meshnormal_frag:_A,meshphong_vert:xA,meshphong_frag:vA,meshphysical_vert:yA,meshphysical_frag:SA,meshtoon_vert:bA,meshtoon_frag:MA,points_vert:TA,points_frag:wA,shadow_vert:AA,shadow_frag:EA,sprite_vert:CA,sprite_frag:RA},Ct={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new he}},envmap:{envMap:{value:null},envMapRotation:{value:new he},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new he}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new he}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new he},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new he},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new he},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new he}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new he}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new he}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0},uvTransform:{value:new he}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new he},alphaMap:{value:null},alphaMapTransform:{value:new he},alphaTest:{value:0}}},Vi={basic:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:ge.meshbasic_vert,fragmentShader:ge.meshbasic_frag},lambert:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new Ft(0)},envMapIntensity:{value:1}}]),vertexShader:ge.meshlambert_vert,fragmentShader:ge.meshlambert_frag},phong:{uniforms:Cn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ge.meshphong_vert,fragmentShader:ge.meshphong_frag},standard:{uniforms:Cn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag},toon:{uniforms:Cn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new Ft(0)}}]),vertexShader:ge.meshtoon_vert,fragmentShader:ge.meshtoon_frag},matcap:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:ge.meshmatcap_vert,fragmentShader:ge.meshmatcap_frag},points:{uniforms:Cn([Ct.points,Ct.fog]),vertexShader:ge.points_vert,fragmentShader:ge.points_frag},dashed:{uniforms:Cn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ge.linedashed_vert,fragmentShader:ge.linedashed_frag},depth:{uniforms:Cn([Ct.common,Ct.displacementmap]),vertexShader:ge.depth_vert,fragmentShader:ge.depth_frag},normal:{uniforms:Cn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:ge.meshnormal_vert,fragmentShader:ge.meshnormal_frag},sprite:{uniforms:Cn([Ct.sprite,Ct.fog]),vertexShader:ge.sprite_vert,fragmentShader:ge.sprite_frag},background:{uniforms:{uvTransform:{value:new he},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ge.background_vert,fragmentShader:ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new he}},vertexShader:ge.backgroundCube_vert,fragmentShader:ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ge.cube_vert,fragmentShader:ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ge.equirect_vert,fragmentShader:ge.equirect_frag},distance:{uniforms:Cn([Ct.common,Ct.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ge.distance_vert,fragmentShader:ge.distance_frag},shadow:{uniforms:Cn([Ct.lights,Ct.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:ge.shadow_vert,fragmentShader:ge.shadow_frag}};Vi.physical={uniforms:Cn([Vi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new he},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new he},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new he},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new he},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new he},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new he},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new he},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new he},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new he},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new he},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new he},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new he}}]),vertexShader:ge.meshphysical_vert,fragmentShader:ge.meshphysical_frag};wf={r:0,b:0,g:0},PA=new le,Nv=new he;Nv.set(-1,0,0,0,1,0,0,0,1);lr=4,uv=[.125,.215,.35,.446,.526,.582],Zr=20,FA=256,Rh=new ar,dv=new Ft,yg=null,Sg=0,bg=0,Mg=!1,OA=new I,Lh=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:o=256,position:a=OA}=r;yg=this._renderer.getRenderTarget(),Sg=this._renderer.getActiveCubeFace(),bg=this._renderer.getActiveMipmapLevel(),Mg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(yg,Sg,bg),this._renderer.xr.enabled=Mg,t.scissorTest=!1,Ca(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Oi||t.mapping===ws?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),yg=this._renderer.getRenderTarget(),Sg=this._renderer.getActiveCubeFace(),bg=this._renderer.getActiveMipmapLevel(),Mg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fe,minFilter:Fe,generateMipmaps:!1,type:zi,format:wn,colorSpace:Oo,depthBuffer:!1},s=fv(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fv(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=BA(r)),this._blurMaterial=VA(r,t,e),this._ggxMaterial=zA(r,t,e)}return s}_compileMaterial(t){let e=new Ve(new ue,t);this._renderer.compile(e,Rh)}_sceneToCubeUV(t,e,n,s,r){let l=new je(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(dv),d.toneMapping=fi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ve(new nr,new Li({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,v=t.background;v?v.isColor&&(g.color.copy(v),t.background=null,m=!0):(g.color.copy(dv),m=!0);for(let b=0;b<6;b++){let x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let T=this._cubeSize;Ca(s,x*T,b>2?T:0,T,T),d.setRenderTarget(s),m&&d.render(_,l),d.render(t,l)}d.toneMapping=f,d.autoClear=u,t.background=v}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Oi||t.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pv());let r=s?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ca(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Rh)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=0+c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-lr?n-p+lr:0),m=4*(this._cubeSize-_);l.envMap.value=t.texture,l.roughness.value=f,l.mipInt.value=p-e,Ca(r,g,m,3*_,2*_),s.setRenderTarget(r),s.render(a,Rh),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Ca(t,g,m,3*_,2*_),s.setRenderTarget(t),s.render(a,Rh)}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&qt("blur direction must be either latitudinal or longitudinal!");let h=3,d=this._lodMeshes[s];d.material=c;let u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Zr-1),_=r/p,g=isFinite(r)?1+Math.floor(h*_):Zr;g>Zr&&bt(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Zr}`);let m=[],v=0;for(let C=0;C<Zr;++C){let y=C/_,w=Math.exp(-y*y/2);m.push(w),C===0?v+=w:C<g&&(v+=2*w)}for(let C=0;C<m.length;C++)m[C]=m[C]/v;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:b}=this;u.dTheta.value=p,u.mipInt.value=b-n;let x=this._sizeLods[s],T=3*x*(s>b-lr?s-b+lr:0),M=4*(this._cubeSize-x);Ca(e,T,M,3*x,2*x),l.setRenderTarget(e),l.render(d,Rh)}};Dh=class extends An{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new er(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new nr(5,5,5),r=new Un({name:"CubemapFromEquirect",uniforms:$r(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:Fi});r.uniforms.tEquirect.value=e;let o=new Ve(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Fe),new Fc(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}};$A={[lf]:"LINEAR_TONE_MAPPING",[cf]:"REINHARD_TONE_MAPPING",[hf]:"CINEON_TONE_MAPPING",[uf]:"ACES_FILMIC_TONE_MAPPING",[ff]:"AGX_TONE_MAPPING",[pf]:"NEUTRAL_TONE_MAPPING",[df]:"CUSTOM_TONE_MAPPING"};Uv=new qe,Ag=new Zi(1,1),Fv=new Ir,Ov=new Lr,Bv=new er,gv=[],_v=[],xv=new Float32Array(16),vv=new Float32Array(9),yv=new Float32Array(4);Eg=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=mE(e.type)}},Cg=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=UE(e.type)}},Rg=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},Tg=/(\w+)(\])?(\[|\.)?/g;Ra=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);FE(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};OE=37297,BE=0;Mv=new he;GE={[lf]:"Linear",[cf]:"Reinhard",[hf]:"Cineon",[uf]:"ACESFilmic",[ff]:"AgX",[pf]:"Neutral",[df]:"Custom"};Af=new I;$E=/^[ \t]*#include +<([\w\d./]+)>/gm;ZE=new Map;KE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;jE={[ga]:"SHADOWMAP_TYPE_PCF",[Hr]:"SHADOWMAP_TYPE_VSM"};e1={[Oi]:"ENVMAP_TYPE_CUBE",[ws]:"ENVMAP_TYPE_CUBE",[Wr]:"ENVMAP_TYPE_CUBE_UV"};i1={[ws]:"ENVMAP_MODE_REFRACTION"};r1={[_a]:"ENVMAP_BLENDING_MULTIPLY",[qm]:"ENVMAP_BLENDING_MIX",[Ym]:"ENVMAP_BLENDING_ADD"};c1=0,Ig=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Lg(t),e.set(t,n)),n}},Lg=class{constructor(t){this.id=c1++,this.code=t,this.usedTimes=0}};_1=0;S1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,b1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,M1=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],T1=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Lv=new le,Ph=new I,wg=new I;C1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,R1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Dg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new $o(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Un({vertexShader:C1,fragmentShader:R1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ve(new zr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ng=class extends Yn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new Dg,m={},v=e.getContextAttributes(),b=null,x=null,T=[],M=[],C=new lt,y=null,w=new je;w.viewport=new Re;let R=new je;R.viewport=new Re;let P=[w,R],D=new Oc,k=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ot=T[X];return ot===void 0&&(ot=new Nr,T[X]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(X){let ot=T[X];return ot===void 0&&(ot=new Nr,T[X]=ot),ot.getGripSpace()},this.getHand=function(X){let ot=T[X];return ot===void 0&&(ot=new Nr,T[X]=ot),ot.getHandSpace()};function N(X){let ot=M.indexOf(X.inputSource);if(ot===-1)return;let tt=T[ot];tt!==void 0&&(tt.update(X.inputSource,X.frame,c||o),tt.dispatchEvent({type:X.type,data:X.inputSource}))}function G(){s.removeEventListener("select",N),s.removeEventListener("selectstart",N),s.removeEventListener("selectend",N),s.removeEventListener("squeeze",N),s.removeEventListener("squeezestart",N),s.removeEventListener("squeezeend",N),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",z);for(let X=0;X<T.length;X++){let ot=M[X];ot!==null&&(M[X]=null,T[X].disconnect(ot))}k=null,F=null,g.reset();for(let X in m)delete m[X];t.setRenderTarget(b),f=null,u=null,d=null,s=null,x=null,Yt.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&bt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&bt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(s,e)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",N),s.addEventListener("selectstart",N),s.addEventListener("selectend",N),s.addEventListener("squeeze",N),s.addEventListener("squeezestart",N),s.addEventListener("squeezeend",N),s.addEventListener("end",G),s.addEventListener("inputsourceschange",z),v.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(C),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,dt=null,Ot=null;v.depth&&(Ot=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=v.stencil?As:Ii,dt=v.stencil?Yr:oi);let Lt={colorFormat:e.RGBA8,depthFormat:Ot,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Lt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),x=new An(u.textureWidth,u.textureHeight,{format:wn,type:On,depthTexture:new Zi(u.textureWidth,u.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{let tt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,tt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new An(f.framebufferWidth,f.framebufferHeight,{format:wn,type:On,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Yt.setContext(s),Yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function z(X){for(let ot=0;ot<X.removed.length;ot++){let tt=X.removed[ot],dt=M.indexOf(tt);dt>=0&&(M[dt]=null,T[dt].disconnect(tt))}for(let ot=0;ot<X.added.length;ot++){let tt=X.added[ot],dt=M.indexOf(tt);if(dt===-1){for(let Lt=0;Lt<T.length;Lt++)if(Lt>=M.length){M.push(tt),dt=Lt;break}else if(M[Lt]===null){M[Lt]=tt,dt=Lt;break}if(dt===-1)break}let Ot=T[dt];Ot&&Ot.connect(tt)}}let W=new I,O=new I;function j(X,ot,tt){W.setFromMatrixPosition(ot.matrixWorld),O.setFromMatrixPosition(tt.matrixWorld);let dt=W.distanceTo(O),Ot=ot.projectionMatrix.elements,Lt=tt.projectionMatrix.elements,wt=Ot[14]/(Ot[10]-1),_t=Ot[14]/(Ot[10]+1),Q=(Ot[9]+1)/Ot[5],nt=(Ot[9]-1)/Ot[5],K=(Ot[8]-1)/Ot[0],ct=(Lt[8]+1)/Lt[0],ut=wt*K,Rt=wt*ct,Pt=dt/(-K+ct),xt=Pt*-K;if(ot.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xt),X.translateZ(Pt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ot[10]===-1)X.projectionMatrix.copy(ot.projectionMatrix),X.projectionMatrixInverse.copy(ot.projectionMatrixInverse);else{let Vt=wt+Pt,L=_t+Pt,Qt=ut-xt,st=Rt+(dt-xt),E=Q*_t/L*Vt,S=nt*_t/L*Vt;X.projectionMatrix.makePerspective(Qt,st,E,S,Vt,L),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function rt(X,ot){ot===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ot.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let ot=X.near,tt=X.far;g.texture!==null&&(g.depthNear>0&&(ot=g.depthNear),g.depthFar>0&&(tt=g.depthFar)),D.near=R.near=w.near=ot,D.far=R.far=w.far=tt,(k!==D.near||F!==D.far)&&(s.updateRenderState({depthNear:D.near,depthFar:D.far}),k=D.near,F=D.far),D.layers.mask=X.layers.mask|6,w.layers.mask=D.layers.mask&-5,R.layers.mask=D.layers.mask&-3;let dt=X.parent,Ot=D.cameras;rt(D,dt);for(let Lt=0;Lt<Ot.length;Lt++)rt(Ot[Lt],dt);Ot.length===2?j(D,w,R):D.projectionMatrix.copy(w.projectionMatrix),ft(X,D,dt)};function ft(X,ot,tt){tt===null?X.matrix.copy(ot.matrixWorld):(X.matrix.copy(tt.matrixWorld),X.matrix.invert(),X.matrix.multiply(ot.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ot.projectionMatrix),X.projectionMatrixInverse.copy(ot.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Pr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(D)},this.getCameraTexture=function(X){return m[X]};let Tt=null;function re(X,ot){if(h=ot.getViewerPose(c||o),p=ot,h!==null){let tt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let dt=!1;tt.length!==D.cameras.length&&(D.cameras.length=0,dt=!0);for(let _t=0;_t<tt.length;_t++){let Q=tt[_t],nt=null;if(f!==null)nt=f.getViewport(Q);else{let ct=d.getViewSubImage(u,Q);nt=ct.viewport,_t===0&&(t.setRenderTargetTextures(x,ct.colorTexture,ct.depthStencilTexture),t.setRenderTarget(x))}let K=P[_t];K===void 0&&(K=new je,K.layers.enable(_t),K.viewport=new Re,P[_t]=K),K.matrix.fromArray(Q.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(Q.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(nt.x,nt.y,nt.width,nt.height),_t===0&&(D.matrix.copy(K.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),dt===!0&&D.cameras.push(K)}let Ot=s.enabledFeatures;if(Ot&&Ot.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let _t=d.getDepthInformation(tt[0]);_t&&_t.isValid&&_t.texture&&g.init(_t,s.renderState)}if(Ot&&Ot.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let _t=0;_t<tt.length;_t++){let Q=tt[_t].camera;if(Q){let nt=m[Q];nt||(nt=new $o,m[Q]=nt);let K=d.getCameraImage(Q);nt.sourceTexture=K}}}}for(let tt=0;tt<T.length;tt++){let dt=M[tt],Ot=T[tt];dt!==null&&Ot!==void 0&&Ot.update(dt,ot,c||o)}Tt&&Tt(X,ot),ot.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ot}),p=null}let Yt=new Dv;Yt.setAnimationLoop(re),this.setAnimationLoop=function(X){Tt=X},this.dispose=function(){}}},P1=new le,Vv=new he;Vv.set(-1,0,0,0,1,0,0,0,1);D1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ts=null;Ug=class{constructor(t={}){let{canvas:e=og(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=On}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,g=new Set([Zc,$c,Sa]),m=new Set([On,oi,qr,Yr,Xc,qc]),v=new Uint32Array(4),b=new Int32Array(4),x=new I,T=null,M=null,C=[],y=[],w=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,D=null,k=null,F=null,N=null;this._outputColorSpace=In;let G=0,z=0,W=null,O=-1,j=null,rt=new Re,ft=new Re,Tt=null,re=new Ft(0),Yt=0,X=e.width,ot=e.height,tt=1,dt=null,Ot=null,Lt=new Re(0,0,X,ot),wt=new Re(0,0,X,ot),_t=!1,Q=new $i,nt=!1,K=!1,ct=new le,ut=new I,Rt=new Re,Pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},xt=!1;function Vt(){return W===null?tt:1}let L=n;function Qt(A,H){return e.getContext(A,H)}try{let A={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"185"}`),e.addEventListener("webglcontextlost",jt,!1),e.addEventListener("webglcontextrestored",fe,!1),e.addEventListener("webglcontextcreationerror",Mi,!1),L===null){let H="webgl2";if(L=Qt(H,A),L===null)throw Qt(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw qt("WebGLRenderer: "+A.message),A}let st,E,S,U,V,q,ht,gt,J,et,vt,Zt,Et,Mt,Jt,ie,ee,B,yt,it,St,It,at;function Ut(){st=new GA(L),st.init(),St=new zv(L,st),E=new NA(L,st,t,St),S=new A1(L,st),E.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),k=L.createFramebuffer(),F=L.createFramebuffer(),N=L.createFramebuffer(),U=new XA(L),V=new d1,q=new E1(L,st,S,V,E,St,U),ht=new kA(R),gt=new ZM(L),It=new LA(L,gt),J=new HA(L,gt,U,It),et=new YA(L,J,gt,It,U),B=new qA(L,E,q),Jt=new UA(V),vt=new u1(R,ht,st,E,It,Jt),Zt=new I1(R,V),Et=new p1,Mt=new y1(st),ee=new IA(R,ht,S,et,p,l),ie=new w1(R,et,E),at=new L1(L,U,E,S),yt=new DA(L,st,U),it=new WA(L,st,U),U.programs=vt.programs,R.capabilities=E,R.extensions=st,R.properties=V,R.renderLists=Et,R.shadowMap=ie,R.state=S,R.info=U}Ut(),_!==On&&(w=new ZA(_,e.width,e.height,a,s,r));let Wt=new Ng(R,L);this.xr=Wt,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let A=st.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=st.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(A){A!==void 0&&(tt=A,this.setSize(X,ot,!1))},this.getSize=function(A){return A.set(X,ot)},this.setSize=function(A,H,Z=!0){if(Wt.isPresenting){bt("WebGLRenderer: Can't change size while VR device is presenting.");return}X=A,ot=H,e.width=Math.floor(A*tt),e.height=Math.floor(H*tt),Z===!0&&(e.style.width=A+"px",e.style.height=H+"px"),w!==null&&w.setSize(e.width,e.height),this.setViewport(0,0,A,H)},this.getDrawingBufferSize=function(A){return A.set(X*tt,ot*tt).floor()},this.setDrawingBufferSize=function(A,H,Z){X=A,ot=H,tt=Z,e.width=Math.floor(A*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,A,H)},this.setEffects=function(A){if(_===On){qt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let H=0;H<A.length;H++)if(A[H].isOutputPass===!0){bt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(rt)},this.getViewport=function(A){return A.copy(Lt)},this.setViewport=function(A,H,Z,Y){A.isVector4?Lt.set(A.x,A.y,A.z,A.w):Lt.set(A,H,Z,Y),S.viewport(rt.copy(Lt).multiplyScalar(tt).round())},this.getScissor=function(A){return A.copy(wt)},this.setScissor=function(A,H,Z,Y){A.isVector4?wt.set(A.x,A.y,A.z,A.w):wt.set(A,H,Z,Y),S.scissor(ft.copy(wt).multiplyScalar(tt).round())},this.getScissorTest=function(){return _t},this.setScissorTest=function(A){S.setScissorTest(_t=A)},this.setOpaqueSort=function(A){dt=A},this.setTransparentSort=function(A){Ot=A},this.getClearColor=function(A){return A.copy(ee.getClearColor())},this.setClearColor=function(){ee.setClearColor(...arguments)},this.getClearAlpha=function(){return ee.getClearAlpha()},this.setClearAlpha=function(){ee.setClearAlpha(...arguments)},this.clear=function(A=!0,H=!0,Z=!0){let Y=0;if(A){let $=!1;if(W!==null){let Nt=W.texture.format;$=g.has(Nt)}if($){let Nt=W.texture.type,kt=m.has(Nt),Dt=ee.getClearColor(),$t=ee.getClearAlpha(),Kt=Dt.r,pe=Dt.g,ve=Dt.b;kt?(v[0]=Kt,v[1]=pe,v[2]=ve,v[3]=$t,L.clearBufferuiv(L.COLOR,0,v)):(b[0]=Kt,b[1]=pe,b[2]=ve,b[3]=$t,L.clearBufferiv(L.COLOR,0,b))}else Y|=L.COLOR_BUFFER_BIT}H&&(Y|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Z&&(Y|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y!==0&&L.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),D=A},this.dispose=function(){e.removeEventListener("webglcontextlost",jt,!1),e.removeEventListener("webglcontextrestored",fe,!1),e.removeEventListener("webglcontextcreationerror",Mi,!1),ee.dispose(),Et.dispose(),Mt.dispose(),V.dispose(),ht.dispose(),et.dispose(),It.dispose(),at.dispose(),vt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",z0),Wt.removeEventListener("sessionend",V0),mr.stop()};function jt(A){A.preventDefault(),ko("WebGLRenderer: Context Lost."),P=!0}function fe(){ko("WebGLRenderer: Context Restored."),P=!1;let A=U.autoReset,H=ie.enabled,Z=ie.autoUpdate,Y=ie.needsUpdate,$=ie.type;Ut(),U.autoReset=A,ie.enabled=H,ie.autoUpdate=Z,ie.needsUpdate=Y,ie.type=$}function Mi(A){qt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function ti(A){let H=A.target;H.removeEventListener("dispose",ti),qS(H)}function qS(A){YS(A),V.remove(A)}function YS(A){let H=V.get(A).programs;H!==void 0&&(H.forEach(function(Z){vt.releaseProgram(Z)}),A.isShaderMaterial&&vt.releaseShaderCache(A))}this.renderBufferDirect=function(A,H,Z,Y,$,Nt){H===null&&(H=Pt);let kt=$.isMesh&&$.matrixWorld.determinantAffine()<0,Dt=JS(A,H,Z,Y,$);S.setMaterial(Y,kt);let $t=Z.index,Kt=1;if(Y.wireframe===!0){if($t=J.getWireframeAttribute(Z),$t===void 0)return;Kt=2}let pe=Z.drawRange,ve=Z.attributes.position,te=pe.start*Kt,Ie=(pe.start+pe.count)*Kt;Nt!==null&&(te=Math.max(te,Nt.start*Kt),Ie=Math.min(Ie,(Nt.start+Nt.count)*Kt)),$t!==null?(te=Math.max(te,0),Ie=Math.min(Ie,$t.count)):ve!=null&&(te=Math.max(te,0),Ie=Math.min(Ie,ve.count));let Ze=Ie-te;if(Ze<0||Ze===1/0)return;It.setup($,Y,Dt,Z,$t);let He,De=yt;if($t!==null&&(He=gt.get($t),De=it,De.setIndex(He)),$.isMesh)Y.wireframe===!0?(S.setLineWidth(Y.wireframeLinewidth*Vt()),De.setMode(L.LINES)):De.setMode(L.TRIANGLES);else if($.isLine){let yn=Y.linewidth;yn===void 0&&(yn=1),S.setLineWidth(yn*Vt()),$.isLineSegments?De.setMode(L.LINES):$.isLineLoop?De.setMode(L.LINE_LOOP):De.setMode(L.LINE_STRIP)}else $.isPoints?De.setMode(L.POINTS):$.isSprite&&De.setMode(L.TRIANGLES);if($.isBatchedMesh)if(st.get("WEBGL_multi_draw"))De.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let yn=$._multiDrawStarts,zt=$._multiDrawCounts,ei=$._multiDrawCount,Me=$t?gt.get($t).bytesPerElement:1,li=V.get(Y).currentProgram.getUniforms();for(let Xi=0;Xi<ei;Xi++)li.setValue(L,"_gl_DrawID",Xi),De.render(yn[Xi]/Me,zt[Xi])}else if($.isInstancedMesh)De.renderInstances(te,Ze,$.count);else if(Z.isInstancedBufferGeometry){let yn=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,zt=Math.min(Z.instanceCount,yn);De.renderInstances(te,Ze,zt)}else De.render(te,Ze)};function B0(A,H,Z){A.transparent===!0&&A.side===Ui&&A.forceSinglePass===!1?(A.side=En,A.needsUpdate=!0,iu(A,H,Z),A.side=Yi,A.needsUpdate=!0,iu(A,H,Z),A.side=Ui):iu(A,H,Z)}this.compile=function(A,H,Z=null){Z===null&&(Z=A),M=Mt.get(Z),M.init(H),y.push(M),Z.traverseVisible(function($){$.isLight&&$.layers.test(H.layers)&&(M.pushLight($),$.castShadow&&M.pushShadow($))}),A!==Z&&A.traverseVisible(function($){$.isLight&&$.layers.test(H.layers)&&(M.pushLight($),$.castShadow&&M.pushShadow($))}),M.setupLights();let Y=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Nt=$.material;if(Nt)if(Array.isArray(Nt))for(let kt=0;kt<Nt.length;kt++){let Dt=Nt[kt];B0(Dt,Z,$),Y.add(Dt)}else B0(Nt,Z,$),Y.add(Nt)}),M=y.pop(),Y},this.compileAsync=function(A,H,Z=null){let Y=this.compile(A,H,Z);return new Promise($=>{function Nt(){if(Y.forEach(function(kt){V.get(kt).currentProgram.isReady()&&Y.delete(kt)}),Y.size===0){$(A);return}setTimeout(Nt,10)}st.get("KHR_parallel_shader_compile")!==null?Nt():setTimeout(Nt,10)})};let Ap=null;function $S(A){Ap&&Ap(A)}function z0(){mr.stop()}function V0(){mr.start()}let mr=new Dv;mr.setAnimationLoop($S),typeof self<"u"&&mr.setContext(self),this.setAnimationLoop=function(A){Ap=A,Wt.setAnimationLoop(A),A===null?mr.stop():mr.start()},Wt.addEventListener("sessionstart",z0),Wt.addEventListener("sessionend",V0),this.render=function(A,H){if(H!==void 0&&H.isCamera!==!0){qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;D!==null&&D.renderStart(A,H);let Z=Wt.enabled===!0&&Wt.isPresenting===!0,Y=w!==null&&(W===null||Z)&&w.begin(R,W);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(H),H=Wt.getCamera()),A.isScene===!0&&A.onBeforeRender(R,A,H,W),M=Mt.get(A,y.length),M.init(H),M.state.textureUnits=q.getTextureUnits(),y.push(M),ct.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),Q.setFromProjectionMatrix(ct,qn,H.reversedDepth),K=this.localClippingEnabled,nt=Jt.init(this.clippingPlanes,K),T=Et.get(A,C.length),T.init(),C.push(T),Wt.enabled===!0&&Wt.isPresenting===!0){let kt=R.xr.getDepthSensingMesh();kt!==null&&Ep(kt,H,-1/0,R.sortObjects)}Ep(A,H,0,R.sortObjects),T.finish(),R.sortObjects===!0&&T.sort(dt,Ot,H.reversedDepth),xt=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1,xt&&ee.addToRenderList(T,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),nt===!0&&Jt.beginShadows();let $=M.state.shadowsArray;if(ie.render($,A,H),nt===!0&&Jt.endShadows(),(Y&&w.hasRenderPass())===!1){let kt=T.opaque,Dt=T.transmissive;if(M.setupLights(),H.isArrayCamera){let $t=H.cameras;if(Dt.length>0)for(let Kt=0,pe=$t.length;Kt<pe;Kt++){let ve=$t[Kt];G0(kt,Dt,A,ve)}xt&&ee.render(A);for(let Kt=0,pe=$t.length;Kt<pe;Kt++){let ve=$t[Kt];k0(T,A,ve,ve.viewport)}}else Dt.length>0&&G0(kt,Dt,A,H),xt&&ee.render(A),k0(T,A,H)}W!==null&&z===0&&(q.updateMultisampleRenderTarget(W),q.updateRenderTargetMipmap(W)),Y&&w.end(R),A.isScene===!0&&A.onAfterRender(R,A,H),It.resetDefaultState(),O=-1,j=null,y.pop(),y.length>0?(M=y[y.length-1],q.setTextureUnits(M.state.textureUnits),nt===!0&&Jt.setGlobalState(R.clippingPlanes,M.state.camera)):M=null,C.pop(),C.length>0?T=C[C.length-1]:T=null,D!==null&&D.renderEnd()};function Ep(A,H,Z,Y){if(A.visible===!1)return;if(A.layers.test(H.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(H);else if(A.isLightProbeGrid)M.pushLightProbeGrid(A);else if(A.isLight)M.pushLight(A),A.castShadow&&M.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Q.intersectsSprite(A)){Y&&Rt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ct);let kt=et.update(A),Dt=A.material;Dt.visible&&T.push(A,kt,Dt,Z,Rt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Q.intersectsObject(A))){let kt=et.update(A),Dt=A.material;if(Y&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Rt.copy(A.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),Rt.copy(kt.boundingSphere.center)),Rt.applyMatrix4(A.matrixWorld).applyMatrix4(ct)),Array.isArray(Dt)){let $t=kt.groups;for(let Kt=0,pe=$t.length;Kt<pe;Kt++){let ve=$t[Kt],te=Dt[ve.materialIndex];te&&te.visible&&T.push(A,kt,te,Z,Rt.z,ve)}}else Dt.visible&&T.push(A,kt,Dt,Z,Rt.z,null)}}let Nt=A.children;for(let kt=0,Dt=Nt.length;kt<Dt;kt++)Ep(Nt[kt],H,Z,Y)}function k0(A,H,Z,Y){let{opaque:$,transmissive:Nt,transparent:kt}=A;M.setupLightsView(Z),nt===!0&&Jt.setGlobalState(R.clippingPlanes,Z),Y&&S.viewport(rt.copy(Y)),$.length>0&&nu($,H,Z),Nt.length>0&&nu(Nt,H,Z),kt.length>0&&nu(kt,H,Z),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function G0(A,H,Z,Y){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[Y.id]===void 0){let te=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[Y.id]=new An(1,1,{generateMipmaps:!0,type:te?zi:On,minFilter:Bi,samples:Math.max(4,E.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ye.workingColorSpace})}let Nt=M.state.transmissionRenderTarget[Y.id],kt=Y.viewport||rt;Nt.setSize(kt.z*R.transmissionResolutionScale,kt.w*R.transmissionResolutionScale);let Dt=R.getRenderTarget(),$t=R.getActiveCubeFace(),Kt=R.getActiveMipmapLevel();R.setRenderTarget(Nt),R.getClearColor(re),Yt=R.getClearAlpha(),Yt<1&&R.setClearColor(16777215,.5),R.clear(),xt&&ee.render(Z);let pe=R.toneMapping;R.toneMapping=fi;let ve=Y.viewport;if(Y.viewport!==void 0&&(Y.viewport=void 0),M.setupLightsView(Y),nt===!0&&Jt.setGlobalState(R.clippingPlanes,Y),nu(A,Z,Y),q.updateMultisampleRenderTarget(Nt),q.updateRenderTargetMipmap(Nt),st.has("WEBGL_multisampled_render_to_texture")===!1){let te=!1;for(let Ie=0,Ze=H.length;Ie<Ze;Ie++){let He=H[Ie],{object:De,geometry:yn,material:zt,group:ei}=He;if(zt.side===Ui&&De.layers.test(Y.layers)){let Me=zt.side;zt.side=En,zt.needsUpdate=!0,H0(De,Z,Y,yn,zt,ei),zt.side=Me,zt.needsUpdate=!0,te=!0}}te===!0&&(q.updateMultisampleRenderTarget(Nt),q.updateRenderTargetMipmap(Nt))}R.setRenderTarget(Dt,$t,Kt),R.setClearColor(re,Yt),ve!==void 0&&(Y.viewport=ve),R.toneMapping=pe}function nu(A,H,Z){let Y=H.isScene===!0?H.overrideMaterial:null;for(let $=0,Nt=A.length;$<Nt;$++){let kt=A[$],{object:Dt,geometry:$t,group:Kt}=kt,pe=kt.material;pe.allowOverride===!0&&Y!==null&&(pe=Y),Dt.layers.test(Z.layers)&&H0(Dt,H,Z,$t,pe,Kt)}}function H0(A,H,Z,Y,$,Nt){A.onBeforeRender(R,H,Z,Y,$,Nt),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(R,H,Z,Y,A,Nt),$.transparent===!0&&$.side===Ui&&$.forceSinglePass===!1?($.side=En,$.needsUpdate=!0,R.renderBufferDirect(Z,H,Y,$,A,Nt),$.side=Yi,$.needsUpdate=!0,R.renderBufferDirect(Z,H,Y,$,A,Nt),$.side=Ui):R.renderBufferDirect(Z,H,Y,$,A,Nt),A.onAfterRender(R,H,Z,Y,$,Nt)}function iu(A,H,Z){H.isScene!==!0&&(H=Pt);let Y=V.get(A),$=M.state.lights,Nt=M.state.shadowsArray,kt=$.state.version,Dt=vt.getParameters(A,$.state,Nt,H,Z,M.state.lightProbeGridArray),$t=vt.getProgramCacheKey(Dt),Kt=Y.programs;Y.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?H.environment:null,Y.fog=H.fog;let pe=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;Y.envMap=ht.get(A.envMap||Y.environment,pe),Y.envMapRotation=Y.environment!==null&&A.envMap===null?H.environmentRotation:A.envMapRotation,Kt===void 0&&(A.addEventListener("dispose",ti),Kt=new Map,Y.programs=Kt);let ve=Kt.get($t);if(ve!==void 0){if(Y.currentProgram===ve&&Y.lightsStateVersion===kt)return X0(A,Dt),ve}else Dt.uniforms=vt.getUniforms(A),D!==null&&A.isNodeMaterial&&D.build(A,Z,Dt),A.onBeforeCompile(Dt,R),ve=vt.acquireProgram(Dt,$t),Kt.set($t,ve),Y.uniforms=Dt.uniforms;let te=Y.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(te.clippingPlanes=Jt.uniform),X0(A,Dt),Y.needsLights=QS(A),Y.lightsStateVersion=kt,Y.needsLights&&(te.ambientLightColor.value=$.state.ambient,te.lightProbe.value=$.state.probe,te.directionalLights.value=$.state.directional,te.directionalLightShadows.value=$.state.directionalShadow,te.spotLights.value=$.state.spot,te.spotLightShadows.value=$.state.spotShadow,te.rectAreaLights.value=$.state.rectArea,te.ltc_1.value=$.state.rectAreaLTC1,te.ltc_2.value=$.state.rectAreaLTC2,te.pointLights.value=$.state.point,te.pointLightShadows.value=$.state.pointShadow,te.hemisphereLights.value=$.state.hemi,te.directionalShadowMatrix.value=$.state.directionalShadowMatrix,te.spotLightMatrix.value=$.state.spotLightMatrix,te.spotLightMap.value=$.state.spotLightMap,te.pointShadowMatrix.value=$.state.pointShadowMatrix),Y.lightProbeGrid=M.state.lightProbeGridArray.length>0,Y.currentProgram=ve,Y.uniformsList=null,ve}function W0(A){if(A.uniformsList===null){let H=A.currentProgram.getUniforms();A.uniformsList=Ra.seqWithValue(H.seq,A.uniforms)}return A.uniformsList}function X0(A,H){let Z=V.get(A);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function ZS(A,H){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(H.matrixWorld);for(let Z=0,Y=A.length;Z<Y;Z++){let $=A[Z];if($.texture!==null&&$.boundingBox.containsPoint(x))return $}return null}function JS(A,H,Z,Y,$){H.isScene!==!0&&(H=Pt),q.resetTextureUnits();let Nt=H.fog,kt=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial?H.environment:null,Dt=W===null?R.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:ye.workingColorSpace,$t=Y.isMeshStandardMaterial||Y.isMeshLambertMaterial&&!Y.envMap||Y.isMeshPhongMaterial&&!Y.envMap,Kt=ht.get(Y.envMap||kt,$t),pe=Y.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,ve=!!Z.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),te=!!Z.morphAttributes.position,Ie=!!Z.morphAttributes.normal,Ze=!!Z.morphAttributes.color,He=fi;Y.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&(He=R.toneMapping);let De=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,yn=De!==void 0?De.length:0,zt=V.get(Y),ei=M.state.lights;if(nt===!0&&(K===!0||A!==j)){let Ue=A===j&&Y.id===O;Jt.setState(Y,A,Ue)}let Me=!1;Y.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==ei.state.version||zt.outputColorSpace!==Dt||$.isBatchedMesh&&zt.batching===!1||!$.isBatchedMesh&&zt.batching===!0||$.isBatchedMesh&&zt.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&zt.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&zt.instancing===!1||!$.isInstancedMesh&&zt.instancing===!0||$.isSkinnedMesh&&zt.skinning===!1||!$.isSkinnedMesh&&zt.skinning===!0||$.isInstancedMesh&&zt.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&zt.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&zt.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&zt.instancingMorph===!1&&$.morphTexture!==null||zt.envMap!==Kt||Y.fog===!0&&zt.fog!==Nt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==Jt.numPlanes||zt.numIntersection!==Jt.numIntersection)||zt.vertexAlphas!==pe||zt.vertexTangents!==ve||zt.morphTargets!==te||zt.morphNormals!==Ie||zt.morphColors!==Ze||zt.toneMapping!==He||zt.morphTargetsCount!==yn||!!zt.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(Me=!0):(Me=!0,zt.__version=Y.version);let li=zt.currentProgram;Me===!0&&(li=iu(Y,H,$),D&&Y.isNodeMaterial&&D.onUpdateProgram(Y,li,zt));let Xi=!1,Os=!1,lo=!1,Ne=li.getUniforms(),Je=zt.uniforms;if(S.useProgram(li.program)&&(Xi=!0,Os=!0,lo=!0),Y.id!==O&&(O=Y.id,Os=!0),zt.needsLights){let Ue=ZS(M.state.lightProbeGridArray,$);zt.lightProbeGrid!==Ue&&(zt.lightProbeGrid=Ue,Os=!0)}if(Xi||j!==A){S.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ne.setValue(L,"projectionMatrix",A.projectionMatrix),Ne.setValue(L,"viewMatrix",A.matrixWorldInverse);let zs=Ne.map.cameraPosition;zs!==void 0&&zs.setValue(L,ut.setFromMatrixPosition(A.matrixWorld)),E.logarithmicDepthBuffer&&Ne.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Ne.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),j!==A&&(j=A,Os=!0,lo=!0)}if(zt.needsLights&&(ei.state.directionalShadowMap.length>0&&Ne.setValue(L,"directionalShadowMap",ei.state.directionalShadowMap,q),ei.state.spotShadowMap.length>0&&Ne.setValue(L,"spotShadowMap",ei.state.spotShadowMap,q),ei.state.pointShadowMap.length>0&&Ne.setValue(L,"pointShadowMap",ei.state.pointShadowMap,q)),$.isSkinnedMesh){Ne.setOptional(L,$,"bindMatrix"),Ne.setOptional(L,$,"bindMatrixInverse");let Ue=$.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),Ne.setValue(L,"boneTexture",Ue.boneTexture,q))}$.isBatchedMesh&&(Ne.setOptional(L,$,"batchingTexture"),Ne.setValue(L,"batchingTexture",$._matricesTexture,q),Ne.setOptional(L,$,"batchingIdTexture"),Ne.setValue(L,"batchingIdTexture",$._indirectTexture,q),Ne.setOptional(L,$,"batchingColorTexture"),$._colorsTexture!==null&&Ne.setValue(L,"batchingColorTexture",$._colorsTexture,q));let Bs=Z.morphAttributes;if((Bs.position!==void 0||Bs.normal!==void 0||Bs.color!==void 0)&&B.update($,Z,li),(Os||zt.receiveShadow!==$.receiveShadow)&&(zt.receiveShadow=$.receiveShadow,Ne.setValue(L,"receiveShadow",$.receiveShadow)),(Y.isMeshStandardMaterial||Y.isMeshLambertMaterial||Y.isMeshPhongMaterial)&&Y.envMap===null&&H.environment!==null&&(Je.envMapIntensity.value=H.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=N1()),Os){if(Ne.setValue(L,"toneMappingExposure",R.toneMappingExposure),zt.needsLights&&KS(Je,lo),Nt&&Y.fog===!0&&Zt.refreshFogUniforms(Je,Nt),Zt.refreshMaterialUniforms(Je,Y,tt,ot,M.state.transmissionRenderTarget[A.id]),zt.needsLights&&zt.lightProbeGrid){let Ue=zt.lightProbeGrid;Je.probesSH.value=Ue.texture,Je.probesMin.value.copy(Ue.boundingBox.min),Je.probesMax.value.copy(Ue.boundingBox.max),Je.probesResolution.value.copy(Ue.resolution)}Ra.upload(L,W0(zt),Je,q)}if(Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(Ra.upload(L,W0(zt),Je,q),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Ne.setValue(L,"center",$.center),Ne.setValue(L,"modelViewMatrix",$.modelViewMatrix),Ne.setValue(L,"normalMatrix",$.normalMatrix),Ne.setValue(L,"modelMatrix",$.matrixWorld),Y.uniformsGroups!==void 0){let Ue=Y.uniformsGroups;for(let zs=0,co=Ue.length;zs<co;zs++){let q0=Ue[zs];at.update(q0,li),at.bind(q0,li)}}return li}function KS(A,H){A.ambientLightColor.needsUpdate=H,A.lightProbe.needsUpdate=H,A.directionalLights.needsUpdate=H,A.directionalLightShadows.needsUpdate=H,A.pointLights.needsUpdate=H,A.pointLightShadows.needsUpdate=H,A.spotLights.needsUpdate=H,A.spotLightShadows.needsUpdate=H,A.rectAreaLights.needsUpdate=H,A.hemisphereLights.needsUpdate=H}function QS(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return W},this.setRenderTargetTextures=function(A,H,Z){let Y=V.get(A);Y.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Y.__autoAllocateDepthBuffer===!1&&(Y.__useRenderToTexture=!1),V.get(A.texture).__webglTexture=H,V.get(A.depthTexture).__webglTexture=Y.__autoAllocateDepthBuffer?void 0:Z,Y.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,H){let Z=V.get(A);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(A,H=0,Z=0){W=A,G=H,z=Z;let Y=null,$=!1,Nt=!1;if(A){let Dt=V.get(A);if(Dt.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(L.FRAMEBUFFER,Dt.__webglFramebuffer),rt.copy(A.viewport),ft.copy(A.scissor),Tt=A.scissorTest,S.viewport(rt),S.scissor(ft),S.setScissorTest(Tt),O=-1;return}else if(Dt.__webglFramebuffer===void 0)q.setupRenderTarget(A);else if(Dt.__hasExternalTextures)q.rebindTextures(A,V.get(A.texture).__webglTexture,V.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let pe=A.depthTexture;if(Dt.__boundDepthTexture!==pe){if(pe!==null&&V.has(pe)&&(A.width!==pe.image.width||A.height!==pe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(A)}}let $t=A.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(Nt=!0);let Kt=V.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Kt[H])?Y=Kt[H][Z]:Y=Kt[H],$=!0):A.samples>0&&q.useMultisampledRTT(A)===!1?Y=V.get(A).__webglMultisampledFramebuffer:Array.isArray(Kt)?Y=Kt[Z]:Y=Kt,rt.copy(A.viewport),ft.copy(A.scissor),Tt=A.scissorTest}else rt.copy(Lt).multiplyScalar(tt).floor(),ft.copy(wt).multiplyScalar(tt).floor(),Tt=_t;if(Z!==0&&(Y=k),S.bindFramebuffer(L.FRAMEBUFFER,Y)&&S.drawBuffers(A,Y),S.viewport(rt),S.scissor(ft),S.setScissorTest(Tt),$){let Dt=V.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,Dt.__webglTexture,Z)}else if(Nt){let Dt=H;for(let $t=0;$t<A.textures.length;$t++){let Kt=V.get(A.textures[$t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+$t,Kt.__webglTexture,Z,Dt)}}else if(A!==null&&Z!==0){let Dt=V.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Dt.__webglTexture,Z)}O=-1},this.readRenderTargetPixels=function(A,H,Z,Y,$,Nt,kt,Dt=0){if(!(A&&A.isWebGLRenderTarget)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $t=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&kt!==void 0&&($t=$t[kt]),$t){S.bindFramebuffer(L.FRAMEBUFFER,$t);try{let Kt=A.textures[Dt],pe=Kt.format,ve=Kt.type;if(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Dt),!E.textureFormatReadable(pe)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(ve)){qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=A.width-Y&&Z>=0&&Z<=A.height-$&&L.readPixels(H,Z,Y,$,St.convert(pe),St.convert(ve),Nt)}finally{let Kt=W!==null?V.get(W).__webglFramebuffer:null;S.bindFramebuffer(L.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(A,H,Z,Y,$,Nt,kt,Dt=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let $t=V.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&kt!==void 0&&($t=$t[kt]),$t)if(H>=0&&H<=A.width-Y&&Z>=0&&Z<=A.height-$){S.bindFramebuffer(L.FRAMEBUFFER,$t);let Kt=A.textures[Dt],pe=Kt.format,ve=Kt.type;if(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Dt),!E.textureFormatReadable(pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let te=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,te),L.bufferData(L.PIXEL_PACK_BUFFER,Nt.byteLength,L.STREAM_READ),L.readPixels(H,Z,Y,$,St.convert(pe),St.convert(ve),0);let Ie=W!==null?V.get(W).__webglFramebuffer:null;S.bindFramebuffer(L.FRAMEBUFFER,Ie);let Ze=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await jx(L,Ze,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,te),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Nt),L.deleteBuffer(te),L.deleteSync(Ze),Nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,H=null,Z=0){let Y=Math.pow(2,-Z),$=Math.floor(A.image.width*Y),Nt=Math.floor(A.image.height*Y),kt=H!==null?H.x:0,Dt=H!==null?H.y:0;q.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,Z,0,0,kt,Dt,$,Nt),S.unbindTexture()},this.copyTextureToTexture=function(A,H,Z=null,Y=null,$=0,Nt=0){let kt,Dt,$t,Kt,pe,ve,te,Ie,Ze,He=A.isCompressedTexture?A.mipmaps[Nt]:A.image;if(Z!==null)kt=Z.max.x-Z.min.x,Dt=Z.max.y-Z.min.y,$t=Z.isBox3?Z.max.z-Z.min.z:1,Kt=Z.min.x,pe=Z.min.y,ve=Z.isBox3?Z.min.z:0;else{let Je=Math.pow(2,-$);kt=Math.floor(He.width*Je),Dt=Math.floor(He.height*Je),A.isDataArrayTexture?$t=He.depth:A.isData3DTexture?$t=Math.floor(He.depth*Je):$t=1,Kt=0,pe=0,ve=0}Y!==null?(te=Y.x,Ie=Y.y,Ze=Y.z):(te=0,Ie=0,Ze=0);let De=St.convert(H.format),yn=St.convert(H.type),zt;H.isData3DTexture?(q.setTexture3D(H,0),zt=L.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(q.setTexture2DArray(H,0),zt=L.TEXTURE_2D_ARRAY):(q.setTexture2D(H,0),zt=L.TEXTURE_2D),S.activeTexture(L.TEXTURE0),S.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),S.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),S.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);let ei=S.getParameter(L.UNPACK_ROW_LENGTH),Me=S.getParameter(L.UNPACK_IMAGE_HEIGHT),li=S.getParameter(L.UNPACK_SKIP_PIXELS),Xi=S.getParameter(L.UNPACK_SKIP_ROWS),Os=S.getParameter(L.UNPACK_SKIP_IMAGES);S.pixelStorei(L.UNPACK_ROW_LENGTH,He.width),S.pixelStorei(L.UNPACK_IMAGE_HEIGHT,He.height),S.pixelStorei(L.UNPACK_SKIP_PIXELS,Kt),S.pixelStorei(L.UNPACK_SKIP_ROWS,pe),S.pixelStorei(L.UNPACK_SKIP_IMAGES,ve);let lo=A.isDataArrayTexture||A.isData3DTexture,Ne=H.isDataArrayTexture||H.isData3DTexture;if(A.isDepthTexture){let Je=V.get(A),Bs=V.get(H),Ue=V.get(Je.__renderTarget),zs=V.get(Bs.__renderTarget);S.bindFramebuffer(L.READ_FRAMEBUFFER,Ue.__webglFramebuffer),S.bindFramebuffer(L.DRAW_FRAMEBUFFER,zs.__webglFramebuffer);for(let co=0;co<$t;co++)lo&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(A).__webglTexture,$,ve+co),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,V.get(H).__webglTexture,Nt,Ze+co)),L.blitFramebuffer(Kt,pe,kt,Dt,te,Ie,kt,Dt,L.DEPTH_BUFFER_BIT,L.NEAREST);S.bindFramebuffer(L.READ_FRAMEBUFFER,null),S.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if($!==0||A.isRenderTargetTexture||V.has(A)){let Je=V.get(A),Bs=V.get(H);S.bindFramebuffer(L.READ_FRAMEBUFFER,F),S.bindFramebuffer(L.DRAW_FRAMEBUFFER,N);for(let Ue=0;Ue<$t;Ue++)lo?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Je.__webglTexture,$,ve+Ue):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Je.__webglTexture,$),Ne?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Bs.__webglTexture,Nt,Ze+Ue):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Bs.__webglTexture,Nt),$!==0?L.blitFramebuffer(Kt,pe,kt,Dt,te,Ie,kt,Dt,L.COLOR_BUFFER_BIT,L.NEAREST):Ne?L.copyTexSubImage3D(zt,Nt,te,Ie,Ze+Ue,Kt,pe,kt,Dt):L.copyTexSubImage2D(zt,Nt,te,Ie,Kt,pe,kt,Dt);S.bindFramebuffer(L.READ_FRAMEBUFFER,null),S.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ne?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(zt,Nt,te,Ie,Ze,kt,Dt,$t,De,yn,He.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(zt,Nt,te,Ie,Ze,kt,Dt,$t,De,He.data):L.texSubImage3D(zt,Nt,te,Ie,Ze,kt,Dt,$t,De,yn,He):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Nt,te,Ie,kt,Dt,De,yn,He.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Nt,te,Ie,He.width,He.height,De,He.data):L.texSubImage2D(L.TEXTURE_2D,Nt,te,Ie,kt,Dt,De,yn,He);S.pixelStorei(L.UNPACK_ROW_LENGTH,ei),S.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Me),S.pixelStorei(L.UNPACK_SKIP_PIXELS,li),S.pixelStorei(L.UNPACK_SKIP_ROWS,Xi),S.pixelStorei(L.UNPACK_SKIP_IMAGES,Os),Nt===0&&H.generateMipmaps&&L.generateMipmap(zt),S.unbindTexture()},this.initRenderTarget=function(A){V.get(A).__webglFramebuffer===void 0&&q.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?q.setTextureCube(A,0):A.isData3DTexture?q.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?q.setTexture2DArray(A,0):q.setTexture2D(A,0),S.unbindTexture()},this.resetState=function(){G=0,z=0,W=null,S.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=ye._getDrawingBufferColorSpace(t),e.unpackColorSpace=ye._getUnpackColorSpace()}}});var Zn,hn,Xt,Pe,de,un,Le,Og,pi,Ia,cr,Rf,se,Jn,nn,Nh,mi,Gv,Uh,Pf,La,Hv,ne,Wv,Xv,qv,Yv,$v,Zv,Jv,Bg,If,Kv,Lf,Qv,we=oe(()=>{Zn=typeof window<"u",hn=Zn?window:null,Xt=Zn?document:null,Pe={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},de={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},un={NONE:0,AUTO:1,FORCE:2},Le={replace:0,none:1,blend:2},Og=Symbol(),pi=Symbol(),Ia=Symbol(),cr=Symbol(),Rf=Symbol(),se=1e-11,Jn=1e12,nn=1e3,Nh=240,mi="",Gv="var(",Uh=[],Pf=(()=>{let i=new Map;return i.set("x","translateX"),i.set("y","translateY"),i.set("z","translateZ"),i})(),La=["perspective","translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY"],Hv=La.reduce((i,t)=>({...i,[t]:t+"("}),{}),ne=()=>{},Wv=i=>i,Xv=/\)\s*[-.\d]/,qv=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,Yv=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,$v=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Zv=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,Jv=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Bg=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,If=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,Kv=/([a-z])([A-Z])/g,Lf=/(\*=|\+=|-=)/,Qv=/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/});var Da,Oe,At,zg,gn=oe(()=>{we();Da={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:Nh,loop:0,reversed:!1,alternate:!1,autoplay:!0,persist:!1,duration:nn,delay:0,loopDelay:0,ease:"out(2)",composition:Le.replace,modifier:Wv,onBegin:ne,onBeforeUpdate:ne,onUpdate:ne,onLoop:ne,onPause:ne,onComplete:ne,onRender:ne},Oe={current:null,root:Xt},At={defaults:Da,precision:4,timeScale:1,tickThreshold:200,editor:null},zg={version:"4.5.0",engine:null};Zn&&(hn.AnimeJS||(hn.AnimeJS=[]),hn.AnimeJS.push(zg))});var kg,Bn,gi,Ye,Be,ke,Ge,Se,pt,es,Na,Gg,Hg,Wg,jv,Jr,U1,ty,Df,Cs,vn,Ua,Fa,Kn,Fh,Kr,ey,Xg,Oa,Qn,Vg,Gt,mt,Rs,_i,Qr,Ps,sn,Is,_e,zn,Rn,be=oe(()=>{we();gn();kg=i=>i.replace(Kv,"$1-$2").toLowerCase(),Bn=(i,t)=>i.indexOf(t)===0,gi=Date.now,Ye=Array.isArray,Be=i=>i&&i.constructor===Object,ke=i=>typeof i=="number"&&!isNaN(i),Ge=i=>typeof i=="string",Se=i=>typeof i=="function",pt=i=>typeof i>"u",es=i=>pt(i)||i===null,Na=i=>Zn&&i instanceof SVGElement,Gg=i=>qv.test(i),Hg=i=>Bn(i,"rgb"),Wg=i=>Bn(i,"hsl"),jv=i=>Gg(i)||(Hg(i)||Wg(i))&&(i[i.length-1]===")"||!Xv.test(i)),Jr=i=>!At.defaults.hasOwnProperty(i),U1=["opacity","rotate","overflow","color"],ty=(i,t)=>{if(U1.includes(t))return!1;if(i.getAttribute(t)||t in i){if(t==="scale"){let e=i.parentNode;return e&&e.tagName==="filter"}return!0}},Df=i=>Ge(i)?parseFloat(i):i,Cs=Math.pow,vn=Math.sqrt,Ua=Math.sin,Fa=Math.cos,Kn=Math.abs,Fh=Math.exp,Kr=Math.floor,ey=Math.asin,Xg=Math.max,Oa=Math.atan2,Qn=Math.PI,Vg=Math.round,Gt=(i,t,e)=>i<t?t:i>e?e:i,mt=(i,t)=>{if(t<0)return i;if(!t)return Vg(i);let e=10**t;return Vg(i*e)/e},Rs=(i,t)=>Ye(t)?t.reduce((e,n)=>Kn(n-i)<Kn(e-i)?n:e):t?Vg(i/t)*t:i,_i=(i,t,e)=>e===1?t:e===0?i:i+(t-i)*e,Qr=i=>i===1/0?Jn:i===-1/0?-Jn:i,Ps=i=>i<=se?se:Qr(mt(i,11)),sn=i=>Ye(i)?[...i]:i,Is=(i,t)=>{let e={...i};for(let n in t){let s=i[n];e[n]=pt(s)?t[n]:s}return e},_e=(i,t,e,n="_prev",s="_next")=>{let r=i._head,o=s;for(e&&(r=i._tail,o=n);r;){let a=r[o];t(r),r=a}},zn=(i,t,e="_prev",n="_next")=>{let s=t[e],r=t[n];s?s[n]=r:i._head=r,r?r[e]=s:i._tail=s,t[e]=null,t[n]=null},Rn=(i,t,e,n="_prev",s="_next")=>{let r=i._tail;for(;r&&e&&e(r,t);)r=r[n];let o=r?r[s]:i._head;r?r[s]=t:i._head=t,o?o[n]=t:i._tail=t,t[n]=r,t[s]=o}});var ny,Nf,Uf=oe(()=>{we();be();ny=(i,t,e)=>{let n=i.style.transform;if(n){let s=i[cr],r=0,o=n.length,a;for(;r<o;){for(;r<o&&n.charCodeAt(r)===32;)r++;if(r>=o)break;let c=r;for(;r<o&&n.charCodeAt(r)!==40;)r++;if(r>=o)break;let h=n.substring(c,r),d=1,u=r+1,f=-1,p=-1;for(r++;r<o&&d>0;){let g=n.charCodeAt(r);g===40?d++:g===41?d--:g===44&&d===1&&(f===-1?f=r:p===-1&&(p=r)),r++}let _=r-1;h==="translate"||h==="translate3d"?(f===-1?s.translateX=n.substring(u,_).trim():(s.translateX=n.substring(u,f).trim(),p===-1?s.translateY=n.substring(f+1,_).trim():(s.translateY=n.substring(f+1,p).trim(),s.translateZ=n.substring(p+1,_).trim())),a=n.substring(u,_)):h==="scale"||h==="scale3d"?f===-1?s.scale=n.substring(u,_).trim():(s.scaleX=n.substring(u,f).trim(),p===-1?s.scaleY=n.substring(f+1,_).trim():(s.scaleY=n.substring(f+1,p).trim(),s.scaleZ=n.substring(p+1,_).trim())):s[h]=n.substring(u,_)}if(t==="translate3d"&&a)return e&&(e[t]=a),a;let l=s[t];if(!pt(l))return e&&(e[t]=l),l}return t==="translate3d"?"0px, 0px, 0px":t==="rotate3d"?"0, 0, 0, 0deg":Bn(t,"scale")?"1":Bn(t,"rotate")||Bn(t,"skew")?"0deg":"0px"},Nf=i=>{let t=mi;for(let e=0,n=La.length;e<n;e++){let s=La[e],r=i[s];if(r!==void 0){if(s==="translateX"){let o=i.translateY;if(o!==void 0){let a=i.translateZ;a!==void 0?(t+=`translate3d(${r},${o},${a}) `,e+=2):(t+=`translate(${r},${o}) `,e+=1);continue}}if(s==="scaleX"&&i.scale===void 0){let o=i.scaleY;if(o!==void 0){let a=i.scaleZ;a!==void 0?(t+=`scale3d(${r},${o},${a}) `,e+=2):(t+=`scale(${r},${o}) `,e+=1);continue}}t+=`${Hv[s]}${r}) `}s==="rotateZ"&&i.rotate3d!==void 0&&(t+=`rotate3d(${i.rotate3d}) `)}return i.matrix!==void 0&&(t+=`matrix(${i.matrix}) `),i.matrix3d!==void 0&&(t+=`matrix3d(${i.matrix3d}) `),t}});function Ff(i,t){if(!i)return null;let e=qg.length;t:for(let n=0;n<e;n++){let s=qg[n];if(s.detect&&!s.detect(i))continue;let r=s.targetAdapters;for(let o=0,a=r.length;o<a;o++){let l=r[o];if(l.detect(i)){let c=l.props[t];if(c&&(!c.gate||c.gate(i)))return c;break t}}}for(let n=0;n<e;n++){let s=qg[n];if(s.detect&&!s.detect(i))continue;let r=s.propertyResolvers;for(let o=0,a=r.length;o<a;o++){let l=r[o](i,t);if(l)return l}}return null}var qg,Yg=oe(()=>{qg=[]});var F1,O1,$g,B1,iy,sy=oe(()=>{we();be();F1=i=>{let t=Yv.exec(i)||$v.exec(i),e=pt(t[4])?1:+t[4];return[+t[1],+t[2],+t[3],e]},O1=i=>{let t=i.length,e=t===4||t===5;return[+("0x"+i[1]+i[e?1:2]),+("0x"+i[e?2:3]+i[e?2:4]),+("0x"+i[e?3:5]+i[e?3:6]),t===5||t===9?+(+("0x"+i[e?4:7]+i[e?4:8])/255).toFixed(3):1]},$g=(i,t,e)=>(e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*(2/3-e)*6:i),B1=i=>{let t=Zv.exec(i)||Jv.exec(i),e=+t[1]/360,n=+t[2]/100,s=+t[3]/100,r=pt(t[4])?1:+t[4],o,a,l;if(n===0)o=a=l=s;else{let c=s<.5?s*(1+n):s+n-s*n,h=2*s-c;o=mt($g(h,c,e+1/3)*255,0),a=mt($g(h,c,e)*255,0),l=mt($g(h,c,e-1/3)*255,0)}return[o,a,l,r]},iy=i=>Hg(i)?F1(i):Gg(i)?O1(i):Wg(i)?B1(i):[0,0,0,1]});var Ht,ry,ns,Oh,oy,is,ss,Of,_n,Zg,$e,Bf,ai=oe(()=>{we();be();Uf();Yg();sy();Ht=(i,t)=>pt(i)?t:i,ry=(i,t)=>{let e=i.match(Qv),n=t[pi]?t:document.documentElement,s=getComputedStyle(n)?.getPropertyValue(e[1]);return(!s||s.trim()===mi)&&e[2]&&(s=e[2].trim()),s||0},ns=(i,t,e,n,s,r)=>{if(Se(i)){if(!s){let a=i(t,e,n,r);return isNaN(+a)?a||0:+a}let o=()=>{let a=i(t,e,n,r);return isNaN(+a)?a||0:+a};return s.func=o,o()}if(Ge(i)&&Bn(i,Gv)){if(!s)return ry(i,t);let o=()=>ry(i,t);return s.func=o,o()}return i},Oh=(i,t)=>i[pi]?i[Ia]&&ty(i,t)?Pe.ATTRIBUTE:La.includes(t)||Pf.get(t)?Pe.TRANSFORM:Bn(t,"--")?Pe.CSS_VAR:t in i.style?Pe.CSS:t in i?Pe.OBJECT:Pe.ATTRIBUTE:Pe.OBJECT,oy=(i,t,e)=>{let n=i.style[t];n&&e&&(e[t]=n);let s=n||getComputedStyle(i[Rf]||i).getPropertyValue(t);return s==="auto"?"0":s},is=(i,t,e,n)=>{let s=pt(e)?Oh(i,t):e,r=Ff(i,t);if(r){let o=r.get(i);return o&&n&&(n[t]=o),o??0}if(s===Pe.OBJECT){let o=i[t];return o&&n&&(n[t]=o),o||0}if(s===Pe.ATTRIBUTE){let o=i.getAttribute(t);return o&&n&&(n[t]=o),o}return s===Pe.TRANSFORM?ny(i,t,n):s===Pe.CSS_VAR?oy(i,t,n).trimStart():oy(i,t,n)},ss=(i,t,e)=>e==="-"?i-t:e==="+"?i+t:i*t,Of=()=>({t:de.NUMBER,n:0,u:null,o:null,d:null,s:null}),_n=(i,t)=>{if(t.t=de.NUMBER,t.n=0,t.u=null,t.o=null,t.d=null,t.s=null,!i)return t;let e=+i;if(!isNaN(e))return t.n=e,t;let n=i;n[1]==="="&&(t.o=n[0],n=n.slice(2));let s=n.includes(" ")?!1:If.exec(n);if(s)return t.t=de.UNIT,t.n=+s[1],t.u=s[2],t;if(t.o)return t.n=+n,t;if(jv(n))return t.t=de.COLOR,t.d=iy(n),t;{let r=n.match(Bg);return t.t=de.COMPLEX,t.d=r?r.map(Number):[],t.s=n.split(Bg)||[],t}},Zg=(i,t)=>(t.t=i._valueType,t.n=i._toNumber,t.u=i._unit,t.o=null,t.d=sn(i._toNumbers),t.s=sn(i._strings),t),$e=Of(),Bf=(i,t,e)=>{let n=i._modifier,s=i._fromNumbers,r=i._toNumbers,o=i._strings,a=o[0];for(let l=0,c=r.length;l<c;l++){let h=n(mt(_i(s[l],r[l],t),e)),d=o[l+1];a+=`${d?h+d:h}`,i._numbers[l]=h}return a}});var Bh,rs,zh=oe(()=>{gn();we();be();Uf();ai();Bh=(i,t,e,n,s)=>{let r=i.parent,o=i.duration,a=i.completed,l=i.iterationDuration,c=i.iterationCount,h=i._currentIteration,d=i._loopDelay,u=i._reversed,f=i._alternate,p=i._hasChildren,_=i._delay,g=i._currentTime,m=_+l,v=t-_,b=Gt(g,-_,o),x=Gt(v,-_,o),T=v-g,M=x>0,C=x>=o,y=o<=se,w=s===un.FORCE,R=0,P=v,D=0;if(c>1){let z=l+(C?0:d),W=~~(x/z);i._currentIteration=Gt(W,0,c),C&&i._currentIteration--,R=i._currentIteration%2,P=x-W*z||0}let k=u^(f&&R),F=i._ease,N=C?k?0:o:k?l-P:P;F&&(N=l*F(N/l)||0);let G=(r?r.backwards:v<g)?!k:!!k;if(i._currentTime=v,i._iterationTime=N,i.backwards=G,M&&!i.began?(i.began=!0,!e&&!(r&&(G||!r.began))&&i.onBegin(i)):v<=0&&(i.began=!1),!e&&!p&&M&&i._currentIteration!==h&&i.onLoop(i),w||s===un.AUTO&&(t>=(r&&_>0?0:_)&&t<=m||t<=_&&b>_||t>=m&&b!==o)||N>=m&&b!==o||N<=_&&b>0&&!C||t<=b&&b===o&&a||C&&!a&&y){if(M&&(i.computeDeltaTime(b),e||i.onBeforeUpdate(i)),!p){let z=w||(G?T*-1:T)>=At.tickThreshold,W=mt(i._offset+(r?r._offset:0)+_+N,12),O=i._head,j,rt,ft,Tt,re=0;for(;O;){let Yt=O._composition,X=O._currentTime,ot=O._changeDuration,tt=O._absoluteStartTime+O._changeDuration,dt=O._nextRep,Ot=O._prevRep,Lt=Yt!==Le.none,wt=Ot?Ot._absoluteStartTime+Ot._changeDuration:0,_t=Ot&&Ot.parent!==O.parent,Q=!dt||dt._isOverridden?tt:dt.parent===O.parent?tt+dt._delay:dt._absoluteStartTime<dt._absoluteUpdateStartTime?dt._absoluteStartTime:dt._absoluteUpdateStartTime;if((z||(X!==ot||W<=Q||Ot&&!_t&&(!dt||dt.parent!==O.parent))&&(X!==0||W>=O._absoluteStartTime||_t&&!O._hasFromValue&&!Ot._isOverridden&&W>=wt||dt&&!dt._isOverridden&&dt.parent===O.parent&&dt._currentTime!==0&&N<dt._startTime))&&(!Ot||_t||N>=O._startTime)&&(!Lt||!O._isOverridden&&(!O._isOverlapped||W<=tt)&&(!dt||dt._isOverridden||W<=Q)&&(!Ot||Ot._isOverridden||(_t?W>=O._absoluteStartTime||!O._hasFromValue&&W>=wt:W>=wt+O._delay)))){let nt=O._currentTime=Gt(N-O._startTime,0,ot),K=O._ease(nt/O._updateDuration),ct=O._modifier,ut=O._valueType,Rt=O._tweenType,Pt=Rt===Pe.OBJECT,xt=ut===de.NUMBER,Vt=xt&&Pt||K===0||K===1?-1:At.precision,L,Qt;if(xt)L=Qt=ct(mt(_i(O._fromNumber,O._toNumber,K),Vt));else if(ut===de.UNIT)Qt=ct(mt(_i(O._fromNumber,O._toNumber,K),Vt)),L=`${Qt}${O._unit}`;else if(ut===de.COLOR){let st=O._numbers,E=O._fromNumbers,S=O._toNumbers,U=1-K,V=E[0],q=E[1],ht=E[2],gt=S[0],J=S[1],et=S[2];st[0]=ct(Math.sqrt(V*V*U+gt*gt*K)),st[1]=ct(Math.sqrt(q*q*U+J*J*K)),st[2]=ct(Math.sqrt(ht*ht*U+et*et*K)),st[3]=ct(_i(E[3],S[3],K)),(!O._setter||n)&&(L=`rgba(${mt(st[0],0)},${mt(st[1],0)},${mt(st[2],0)},${st[3]})`)}else ut===de.COMPLEX&&(L=Bf(O,K,Vt));if(Lt&&(O._number=Qt),!n&&Yt!==Le.blend){let st=O.property;j=O.target,O._setter?O._setter(j,Qt,O):Pt?j[st]=L:Rt===Pe.ATTRIBUTE?j.setAttribute(st,L):(rt=j.style,Rt===Pe.TRANSFORM?(j!==ft&&(ft=j,Tt=j[cr]),Tt[st]=L,re=1):Rt===Pe.CSS?rt[st]=L:Rt===Pe.CSS_VAR&&rt.setProperty(st,L)),M&&(D=1)}else O._value=L}else X&&Ot&&!_t&&N<O._startTime&&(O._currentTime=0);re&&O._renderTransforms&&(rt.transform=Nf(Tt),re=0),O=O._next}!e&&D&&i.onRender(i)}!e&&M&&i.onUpdate(i)}return r&&y?!e&&(r.began&&!G&&v>0&&!a||G&&v<=se&&a)&&(i.onComplete(i),i.completed=!G):M&&C?c===1/0?i._startTime+=i.duration:i._currentIteration>=c-1&&(i.paused=!0,!a&&!p&&(i.completed=!0,!e&&!(r&&(G||!r.began))&&(i.onComplete(i),i._resolve(i)))):i.completed=!1,D},rs=(i,t,e,n,s)=>{let r=i._currentIteration;if(Bh(i,t,e,n,s),i._hasChildren){let o=i,a=o.backwards,l=n?t:o._iterationTime,c=gi(),h=0,d=!0;if(!n&&o._currentIteration!==r){let u=o.iterationDuration;_e(o,f=>{if(!a)!f.completed&&!f.backwards&&f._currentTime<f.iterationDuration&&Bh(f,u,e,1,un.FORCE),f.began=!1,f.completed=!1;else{let p=f.duration,_=f._offset+f._delay,g=_+p;!e&&p<=se&&(!_||g===u)&&f.onComplete(f)}}),e||o.onLoop(o)}_e(o,u=>{let f=mt((l-u._offset)*u._speed,12);if(a&&f>u._delay+u.duration)return;let p=u._fps<o._fps?u.requestTick(c):s;h+=Bh(u,f,e,n,p),!u.completed&&d&&(d=!1)},a),!e&&h&&o.onRender(o),(d||a)&&o._currentTime>=o.duration&&(o.paused=!0,o.completed||(o.completed=!0,e||(o.onComplete(o),o._resolve(o))))}}});var ay,Ba,za,ly,Va=oe(()=>{we();be();Uf();ai();ay={},Ba=(i,t,e)=>{if(e===Pe.TRANSFORM){let n=Pf.get(i);return n||i}else if(e===Pe.CSS||e===Pe.ATTRIBUTE&&Na(t)&&i in t.style){let n=ay[i];if(n)return n;{let s=i&&kg(i);return ay[i]=s,s}}else return i},za=(i,t=!1)=>{if(i._hasChildren)_e(i,e=>za(e,t),!0);else{let e=i;e.pause(),_e(e,n=>{let s=n.property,r=n.target,o=n._tweenType,a=n._inlineValue,l=es(a)||a===mi;if(n._setter){if(!t&&!l){if(_n(a,$e),$e.d){let c=$e.d,h=n._numbers;for(let d=0,u=c.length;d<u;d++)h[d]=c[d]}else n._number=$e.n;n._setter(n.target,n._number,n)}}else if(o===Pe.OBJECT)!t&&!l&&(r[s]=a);else if(r[pi])if(o===Pe.ATTRIBUTE)t||(l?r.removeAttribute(s):r.setAttribute(s,a));else{let c=r.style;if(o===Pe.TRANSFORM){let h=r[cr];l?delete h[s]:h[s]=a,n._renderTransforms&&(Object.keys(h).length?c.transform=Nf(h):c.removeProperty("transform"))}else l?c.removeProperty(kg(s)):c[s]=a}r[pi]&&e._tail===n&&e.targets.forEach(c=>{c.getAttribute&&c.getAttribute("style")===mi&&c.removeAttribute("style")})})}return i},ly=i=>za(i,!0)});var ka,Jg=oe(()=>{we();gn();ka=class{constructor(t=0){this.deltaTime=0,this._currentTime=t,this._lastTickTime=t,this._startTime=t,this._lastTime=t,this._frameDuration=nn/Nh,this._fps=Nh,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(t){let e=+t,n=e<se?se:e,s=nn/n;n>Da.frameRate&&(Da.frameRate=n),this._fps=n,this._frameDuration=s}get speed(){return this._speed}set speed(t){let e=+t;this._speed=e<se?se:e}requestTick(t){let e=this._frameDuration,n=t-this._lastTickTime,s=e*.25,r=s<4?s:4;return n+r<e?un.NONE:(this._lastTickTime=n>=e?t-n%e:t,un.AUTO)}computeDeltaTime(t){let e=t-this._lastTime;return this.deltaTime=e,this._lastTime=t,e}}});var Ls,cy,zf=oe(()=>{we();be();zh();Ls={animation:null,update:ne},cy=i=>{let t=Ls.animation;return t||(t={duration:se,computeDeltaTime:ne,_offset:0,_delay:0,_head:null,_tail:null},Ls.animation=t,Ls.update=()=>{i.forEach(e=>{for(let n in e){let s=e[n],r=s._head;if(r){let o=r._valueType,a=o===de.COMPLEX||o===de.COLOR?sn(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(a)for(let h=0,d=c._numbers.length;h<d;h++)a[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=a}}}),Bh(t,1,1,0,un.FORCE)}),t}});var hy,z1,Kg,dn,uy,V1,Qg=oe(()=>{gn();we();be();Jg();zh();zf();hy=Zn?requestAnimationFrame:setImmediate,z1=Zn?cancelAnimationFrame:clearImmediate,Kg=class extends ka{constructor(t){super(t),this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Da,this.paused=!0,this.reqId=0}update(){let t=this._currentTime=gi();if(this.requestTick(t)){this.computeDeltaTime(t);let e=this._speed,n=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(zn(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):rs(s,(t-s._startTime)*s._speed*e,0,0,s._fps<n?s.requestTick(t):un.AUTO),s=r}Ls.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&(this.requestTick(gi()),this.reqId=hy(uy)),this}pause(){if(this.reqId)return this.paused=!0,V1()}resume(){if(this.paused)return this.paused=!1,_e(this,t=>t.resetTime()),this.wake()}get speed(){return this._speed*(At.timeScale===1?1:nn)}set speed(t){let e=t*At.timeScale;this._speed!==e&&(this._speed=e,_e(this,n=>n.speed=n._speed))}get timeUnit(){return At.timeScale===1?"ms":"s"}set timeUnit(t){let n=t==="s",s=n?.001:1;if(At.timeScale!==s){At.timeScale=s,At.tickThreshold=200*s;let r=n?.001:nn;this.defaults.duration*=r,this._speed*=r}}get precision(){return At.precision}set precision(t){At.precision=t}},dn=(()=>{let i=new Kg(gi());return Zn&&(zg.engine=i,Xt.addEventListener("visibilitychange",()=>{i.pauseOnDocumentHidden&&(Xt.hidden?i.pause():i.resume())})),i})(),uy=()=>{dn._head?(dn.reqId=hy(uy),dn.update()):dn.reqId=0},V1=()=>(z1(dn.reqId),dn.reqId=0,dn)});var Vf,kh,k1,Vh,kf,jg,dy,xi,Ga=oe(()=>{we();be();Va();Qg();zf();Vf={_rep:new WeakMap,_add:new Map},kh=(i,t,e="_rep")=>{let n=Vf[e],s=n.get(i);return s||(s={},n.set(i,s)),s[t]?s[t]:s[t]={_head:null,_tail:null}},k1=(i,t)=>i._isOverridden||i._absoluteStartTime>t._absoluteStartTime,Vh=i=>{i._isOverlapped=1,i._isOverridden=1,i._changeDuration=se,i._currentTime=se},kf=(i,t)=>{let e=i._composition;if(e===Le.replace){let n=i._absoluteStartTime;Rn(t,i,k1,"_prevRep","_nextRep");let s=i._prevRep;if(s){let r=s.parent,o=s._absoluteEndTime;if(i.parent.id!==r.id&&r.iterationCount>1&&o+(r.duration-r.iterationDuration)>n){Vh(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Vh(c),c=c._prevRep}let a=i._absoluteUpdateStartTime;if(o>a){let c=s._startTime,h=o-(c+s._updateDuration),d=mt(a-h-c,12);s._changeDuration=d,s._currentTime=d,s._isOverlapped=1,d<se&&Vh(s)}let l=i.parent.parent;if(!l||l!==r.parent){let c=!0;if(_e(r,h=>{h._isOverlapped||(c=!1)}),c){let h=r.parent;if(h){let d=!0;_e(h,u=>{u!==r&&_e(u,f=>{f._isOverlapped||(d=!1)})}),d&&h.cancel()}else r.cancel()}}}}else if(e===Le.blend){let n=kh(i.target,i.property,"_add"),s=cy(Vf._add),r=n._head;r||(r={...i},r._composition=Le.replace,r._updateDuration=se,r._startTime=0,r._numbers=sn(i._fromNumbers),r._number=0,r._next=null,r._prev=null,Rn(n,r),Rn(s,r));let o=i._toNumber;if(i._fromNumber=r._fromNumber-o,i._toNumber=0,i._numbers=sn(i._fromNumbers),i._number=0,r._fromNumber=o,i._toNumbers.length){let a=sn(i._toNumbers);a.forEach((l,c)=>{i._fromNumbers[c]=r._fromNumbers[c]-l,i._toNumbers[c]=0}),r._fromNumbers=a}Rn(n,i,null,"_prevAdd","_nextAdd")}return i},jg=i=>{let t=i._composition;if(t!==Le.none){let e=i.target,n=i.property,o=Vf._rep.get(e)[n];if(zn(o,i,"_prevRep","_nextRep"),t===Le.blend){let a=Vf._add,l=a.get(e);if(!l)return;let c=l[n],h=Ls.animation;zn(c,i,"_prevAdd","_nextAdd");let d=c._head;if(d&&d===c._tail){zn(c,d,"_prevAdd","_nextAdd"),zn(h,d);let u=!0;for(let f in l)if(l[f]._head){u=!1;break}u&&a.delete(e)}}}return i},dy=(i,t,e)=>{let n=!1;return _e(t,s=>{let r=s.target;if(i.includes(r)){let o=s.property,a=s._tweenType,l=Ba(e,r,a);(!l||l&&l===o)&&(s.parent._tail===s&&s._tweenType===Pe.TRANSFORM&&s._prev&&s._prev._tweenType===Pe.TRANSFORM&&(s._prev._renderTransforms=1),zn(t,s),jg(s),n=!0)}},!0),n},xi=(i,t,e)=>{let n=t||dn,s;if(n._hasChildren){let r=0;_e(n,o=>{if(!o._hasChildren)if(s=dy(i,o,e),s&&!o._head)o.cancel(),zn(n,o);else{let l=o._offset+o._delay+o.duration;l>r&&(r=l)}o._head?xi(i,o,e):o._hasChildren=!1},!0),pt(n.iterationDuration)||(n.iterationDuration=r)}else s=dy(i,n,e);s&&!n._head&&(n._hasChildren=!1,n.cancel&&n.cancel())}});var fy,t0,py,G1,rn,e0,jr=oe(()=>{we();be();gn();ai();zh();Ga();Jg();Qg();fy=i=>(i.paused=!0,i.began=!1,i.completed=!1,i),t0=i=>(i._cancelled&&(i._hasChildren?_e(i,t0):_e(i,t=>{t._composition!==Le.none&&kf(t,kh(t.target,t.property))}),i._cancelled=0),i),py=0,G1=(i,t)=>i._priority>t._priority,rn=class extends ka{constructor(t={},e=null,n=0){super(0),++py;let{id:s,delay:r,duration:o,reversed:a,alternate:l,loop:c,loopDelay:h,autoplay:d,frameRate:u,playbackRate:f,priority:p,onComplete:_,onLoop:g,onPause:m,onBegin:v,onBeforeUpdate:b,onUpdate:x}=t;Oe.current&&Oe.current.register(this);let T=e?0:dn._lastTickTime,M=e?e.defaults:At.defaults,C=Se(r)||pt(r)?M.delay:+r,y=Se(o)||pt(o)?1/0:+o,w=Ht(c,M.loop),R=Ht(h,M.loopDelay),P=w===!0||w===1/0||w<0?1/0:w+1,D=0;e?D=n:(dn.reqId||dn.requestTick(gi()),D=(dn._lastTickTime-dn._startTime)*At.timeScale),this.id=pt(s)?py:s,this.parent=e,this.duration=Qr((y+R)*P-R)||se,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=v||M.onBegin,this.onBeforeUpdate=b||M.onBeforeUpdate,this.onUpdate=x||M.onUpdate,this.onLoop=g||M.onLoop,this.onPause=m||M.onPause,this.onComplete=_||M.onComplete,this.iterationDuration=y,this.iterationCount=P,this._autoplay=e?!1:Ht(d,M.autoplay),this._offset=D,this._delay=C,this._loopDelay=R,this._iterationTime=0,this._currentIteration=0,this._resolve=ne,this._running=!1,this._reversed=+Ht(a,M.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=Ht(l,M.alternate),this._prev=null,this._next=null,this._lastTickTime=T,this._startTime=T,this._lastTime=T,this._fps=Ht(u,M.frameRate),this._speed=Ht(f,M.playbackRate),this._priority=+Ht(p,1)}get cancelled(){return!!this._cancelled}set cancelled(t){t?this.cancel():this.reset(!0).play()}get currentTime(){return Gt(mt(this._currentTime,At.precision),-this._delay,this.duration)}set currentTime(t){let e=this.paused;this.pause().seek(+t),e||this.resume()}get iterationCurrentTime(){return Gt(mt(this._iterationTime,At.precision),0,this.iterationDuration)}set iterationCurrentTime(t){this.currentTime=this.iterationDuration*this._currentIteration+t}get progress(){return Gt(mt(this._currentTime/this.duration,10),0,1)}set progress(t){this.currentTime=this.duration*t}get iterationProgress(){return Gt(mt(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(t){let e=this.iterationDuration;this.currentTime=e*this._currentIteration+e*t}get currentIteration(){return this._currentIteration}set currentIteration(t){this.currentTime=this.iterationDuration*Gt(+t,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(t){t?this.reverse():this.play()}get speed(){return super.speed}set speed(t){super.speed=t,this.resetTime()}reset(t=!1){return t0(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,rs(this,0,1,~~t,un.FORCE),fy(this),this._hasChildren&&_e(this,fy),this}init(t=!1){this.fps=this._fps,this.speed=this._speed,!t&&this._hasChildren&&rs(this,this.duration,1,~~t,un.FORCE),this.reset(t);let e=this._autoplay;return e===!0?this.resume():e&&!pt(e.linked)&&e.link(this),this}resetTime(){let t=1/(this._speed*dn._speed);return this._startTime=gi()-(this._currentTime+this._delay)*t,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=se&&!this._hasChildren?rs(this,se,0,0,un.FORCE):(this._running||(Rn(dn,this,G1),dn._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,dn.wake()),this):this}restart(){return this.reset().resume()}seek(t,e=0,n=0){t0(this),this.completed=!1;let s=this.paused;return this.paused=!0,rs(this,t+this._delay,~~e,~~n,un.AUTO),s?this:this.resume()}alternate(){let t=this._reversed,e=this.iterationCount,n=this.iterationDuration,s=e===1/0?Kr(Jn/n):e;return this._reversed=+(this._alternate&&!(s%2)?t:!t),e===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(n*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?_e(this,t=>t.cancel(),!0):_e(this,jg),this._cancelled=1,this.pause()}stretch(t){let e=this.duration,n=Ps(t);if(e===n)return this;let s=t/e,r=t<=se;return this.duration=r?se:n,this.iterationDuration=r?se:Ps(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){rs(this,0,1,0,un.AUTO);let t=this._autoplay;return t&&t.linked&&t.linked===this&&t.revert(),this.cancel()}complete(t=0){return this.seek(this.duration,t).cancel()}then(t=ne){let e=this.then,n=()=>{this.then=null,t(this),this.then=e,this._resolve=ne};return new Promise(s=>(this._resolve=()=>s(n()),this.completed&&this._resolve(),this))}},e0=i=>new rn(i,null,0).init()});function Gf(i){let t=Ge(i)?Oe.root.querySelectorAll(i):i;if(t instanceof NodeList||t instanceof HTMLCollection)return t}function on(i){if(es(i))return[];if(!Zn)return Ye(i)&&i.flat(1/0)||[i];if(Ye(i)){let e=i.flat(1/0),n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];if(!es(o)){let a=Gf(o);if(a)for(let l=0,c=a.length;l<c;l++){let h=a[l];if(!es(h)){let d=!1;for(let u=0,f=n.length;u<f;u++)if(n[u]===h){d=!0;break}d||n.push(h)}}else{let l=!1;for(let c=0,h=n.length;c<h;c++)if(n[c]===o){l=!0;break}l||n.push(o)}}}return n}let t=Gf(i);return t?Array.from(t):[i]}function hr(i){let t=on(i),e=t.length;for(let n=0;n<e;n++){let s=t[n];if(!s[Og]){s[Og]=!0;let r=Na(s);(s.nodeType||r)&&(s[pi]=!0,s[Ia]=r,s[cr]={})}}return t}var vi=oe(()=>{gn();we();be();});var n0,my,to,Hf=oe(()=>{we();be();n0={deg:1,rad:180/Qn,turn:360},my={},to=(i,t,e,n=!1)=>{let s=t.u,r=t.n;if(t.t===de.UNIT&&s===e)return t;let o=r+s+e,a=my[o];if(!pt(a)&&!n)t.n=a;else{let l;if(s in n0)l=r*n0[s]/n0[e];else{let h=i.cloneNode(),d=i.parentNode,u=d&&d!==Xt?d:Xt.body;u.appendChild(h);let f=h.style;f.width=100+s;let p=h.offsetWidth||100;f.width=100+e;let _=h.offsetWidth||100,g=p/_;u.removeChild(h),l=g*r}t.n=l,my[o]=l}return t.t,de.UNIT,t.u=e,t}});var yi,i0=oe(()=>{yi=i=>i});var Gh,s0,H1,gy,_y,ki,Wf,W1,xy,Vn,Ds=oe(()=>{we();be();i0();Gh=(i=1.68)=>t=>Cs(t,+i),s0={in:i=>t=>i(t),out:i=>t=>1-i(1-t),inOut:i=>t=>t<.5?i(t*2)/2:1-i(t*-2+2)/2,outIn:i=>t=>t<.5?(1-i(1-t*2))/2:(i(t*2-1)+1)/2},H1=Qn/2,gy=Qn*2,_y={[mi]:Gh,Quad:Gh(2),Cubic:Gh(3),Quart:Gh(4),Quint:Gh(5),Sine:i=>1-Fa(i*H1),Circ:i=>1-vn(1-i*i),Expo:i=>i?Cs(2,10*i-10):0,Bounce:i=>{let t,e=4;for(;i<((t=Cs(2,--e))-1)/11;);return 1/Cs(4,3-e)-7.5625*Cs((t*3-2)/22-i,2)},Back:(i=1.7)=>t=>(+i+1)*t*t*t-+i*t*t,Elastic:(i=1,t=.3)=>{let e=Gt(+i,1,10),n=Gt(+t,se,2),s=n/gy*ey(1/e),r=gy/n;return o=>o===0||o===1?o:-e*Cs(2,-10*(1-o))*Ua((1-o-s)*r)}},ki=(()=>{let i={linear:yi,none:yi};for(let t in s0)for(let e in _y){let n=_y[e],s=s0[t];i[t+e]=e===mi||e==="Back"||e==="Elastic"?(r,o)=>s(n(r,o)):s(n)}return i})(),Wf={linear:yi,none:yi},W1=i=>{if(Wf[i])return Wf[i];if(i.indexOf("(")<=-1){let e=s0[i]||i.includes("Back")||i.includes("Elastic")?ki[i]():ki[i];return e?Wf[i]=e:yi}else{let t=i.slice(0,-1).split("("),e=ki[t[0]];return e?Wf[i]=e(...t[1].split(",")):yi}},xy=["steps(","irregular(","linear(","cubicBezier("],Vn=i=>{if(Ge(i)){for(let e=0,n=xy.length;e<n;e++)if(Bn(i,xy[e]))return console.warn(`String syntax for \`ease: "${i}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${i}\``),yi}return Se(i)?i:Ge(i)?W1(i):yi}});var ce,xe,Ha,Xf,qf,Yf,Wa,$f,X1,vy,ur,os,q1,kn,r0,Xa=oe(()=>{we();be();gn();vi();Yg();ai();Va();Hf();Ds();jr();Ga();zf();ce=Of(),xe=Of(),Ha={},Xf={func:null},qf={func:null},Yf=[null],Wa=[null,null],$f={to:null},X1=0,vy=0,q1=(i,t)=>{let e={};if(Ye(i)){let n=[].concat(...i.map(s=>Object.keys(s))).filter(Jr);for(let s=0,r=n.length;s<r;s++){let o=n[s],a=i.map(l=>{let c={};for(let h in l){let d=l[h];Jr(h)?h===o&&(c.to=d):c[h]=d}return c});e[o]=a}}else{let n=Ht(t.duration,At.defaults.duration);Object.keys(i).map(r=>({o:parseFloat(r)/100,p:i[r]})).sort((r,o)=>r.o-o.o).forEach(r=>{let o=r.o,a=r.p;for(let l in a)if(Jr(l)){let c=e[l];c||(c=e[l]=[]);let h=o*n,d=c.length,u=c[d-1],f={to:a[l]},p=0;for(let _=0;_<d;_++)p+=c[_].duration;d===1&&(f.from=u.to),a.ease&&(f.ease=a.ease),f.duration=h-(d?p:0),c.push(f)}return r});for(let r in e){let o=e[r],a;for(let l=0,c=o.length;l<c;l++){let h=o[l],d=h.ease;h.ease=a||void 0,a=d}o[0].duration||o.shift()}}return e},kn=class extends rn{constructor(t,e,n,s,r=!1,o=0,a){super(e,n,s),this._head,this._tail,++vy;let l=hr(t),c=l.length,h=e.keyframes,d=h?Is(q1(h,e),e):e,{id:u,delay:f,duration:p,ease:_,playbackEase:g,modifier:m,composition:v,onRender:b}=d,x=n?n.defaults:At.defaults,T=Ht(_,x.ease),M=Ht(g,x.playbackEase),C=M?Vn(M):null,y=!pt(T.ease),w=y?T.ease:Ht(_,C?"linear":x.ease),R=y?T.settlingDuration:Ht(p,x.duration),P=Ht(f,x.delay),D=m||x.modifier,k=pt(v)&&c>=nn?Le.none:pt(v)?x.composition:v,F=this._offset+(n?n._offset:0);y&&(T.parent=this);let N=NaN,G=NaN,z=0,W=0;for(let O=0;O<c;O++){let j=l[O],rt=o||O,ft=a||l,Tt=NaN,re=NaN;for(let Yt in d)if(Jr(Yt)){let X=Oh(j,Yt),ot=Ff(j,Yt),tt=Ba(Yt,j,X),dt=d[Yt],Ot=Ye(dt);if(r&&!Ot&&(Wa[0]=dt,Wa[1]=dt,dt=Wa),Ot){let K=dt.length,ct=!Be(dt[0]);K===2&&ct?($f.to=dt,Yf[0]=$f,ur=Yf):K>2&&ct?(ur=[],dt.forEach((ut,Rt)=>{Rt?Rt===1?(Wa[1]=ut,ur.push(Wa)):ur.push(ut):Wa[0]=ut})):ur=dt}else Yf[0]=dt,ur=Yf;let Lt=null,wt=null,_t=NaN,Q=0,nt=0;for(let K=ur.length;nt<K;nt++){let ct=ur[nt];Be(ct)?os=ct:($f.to=ct,os=$f),Xf.func=null,qf.func=null;let ut=ns(Ht(os.composition,k),j,rt,ft,null,null),Rt=ke(ut)?ut:Le[ut];!Lt&&Rt!==Le.none&&(Lt=kh(j,tt));let Pt=Lt?Lt._tail:null,xt=n&&Pt&&Pt.parent.parent===n?Pt:wt,Vt=ns(os.to,j,rt,ft,Xf,xt),L;Be(Vt)&&!pt(Vt.to)?(os=Vt,L=Vt.to):L=Vt;let Qt=ns(os.from,j,rt,ft,qf,xt),st=os.ease||w,E=ns(st,j,rt,ft,null,xt),S=Se(E)||Ge(E)?E:st,U=!pt(S)&&!pt(S.ease),V=U?S.ease:S,q=U?S.settlingDuration:ns(Ht(os.duration,K>1?ns(R,j,rt,ft,null,xt)/K:R),j,rt,ft,null,xt),ht=ns(Ht(os.delay,nt?0:P),j,rt,ft,null,xt),gt=os.modifier||D,J=!pt(Qt),et=!pt(L),vt=Ye(L),Zt=vt||J&&et,Et=wt?Q:0,Mt=wt?Q+ht:ht,Jt=mt(F+Mt,12),ie=mt(F+Et,12);!W&&(J||vt)&&(W=1);let ee=wt;if(Rt!==Le.none){let jt=Lt._head;for(;jt&&jt._absoluteStartTime<=Jt;)if(jt._isOverridden||(ee=jt),jt=jt._nextRep,jt&&jt._absoluteStartTime>=Jt)for(;jt;)Vh(jt),jt=jt._nextRep}if(Zt){_n(vt?ns(L[0],j,rt,ft,qf,xt):Qt,ce),_n(vt?ns(L[1],j,rt,ft,Xf,xt):L,xe);let jt=is(j,tt,X,Ha);ce.t===de.NUMBER&&(ee?ee._valueType===de.UNIT&&(ce.t=de.UNIT,ce.u=ee._unit):(_n(jt,$e),$e.t===de.UNIT&&(ce.t=de.UNIT,ce.u=$e.u)))}else et?_n(L,xe):wt?Zg(wt,xe):_n(n&&ee&&ee.parent.parent===n?ee._value:is(j,tt,X,Ha),xe),J?_n(Qt,ce):wt?Zg(wt,ce):_n(n&&ee&&ee.parent.parent===n?ee._value:is(j,tt,X,Ha),ce);if(ce.o&&(ce.n=ss(ee?ee._toNumber:_n(is(j,tt,X,Ha),$e).n,ce.n,ce.o)),xe.o&&(xe.n=ss(ce.n,xe.n,xe.o)),ce.t!==xe.t){if(ce.t===de.COMPLEX||xe.t===de.COMPLEX){let jt=ce.t===de.COMPLEX?ce:xe,fe=ce.t===de.COMPLEX?xe:ce;fe.t=de.COMPLEX,fe.s=sn(jt.s),fe.d=jt.d.map(()=>fe.n)}else if(ce.t===de.UNIT||xe.t===de.UNIT){let jt=ce.t===de.UNIT?ce:xe,fe=ce.t===de.UNIT?xe:ce;fe.t=de.UNIT,fe.u=jt.u}else if(ce.t===de.COLOR||xe.t===de.COLOR){let jt=ce.t===de.COLOR?ce:xe,fe=ce.t===de.COLOR?xe:ce;fe.t=de.COLOR,fe.d=jt.d.map(()=>0)}}if(ce.u!==xe.u){let jt=xe.u?ce:xe;jt=to(j,jt,xe.u?xe.u:ce.u,!1)}if(xe.d&&ce.d&&xe.d.length!==ce.d.length){let jt=ce.d.length>xe.d.length?ce:xe,fe=jt===ce?xe:ce;fe.d=jt.d.map((Mi,ti)=>pt(fe.d[ti])?0:fe.d[ti]),fe.s=sn(jt.s)}let B=mt(+q||se,12),yt=Ha[tt];es(yt)||(Ha[tt]=null);let it=ot?ot.set:null;Q=mt(Mt+B,12);let St=ce.d,It=xe.d,at=xe.s,Ut={parent:this,id:X1++,property:tt,target:j,_value:null,_toFunc:Xf.func,_fromFunc:qf.func,_ease:Vn(V),_fromNumbers:St?sn(St):Uh,_toNumbers:It?sn(It):Uh,_strings:at?sn(at):Uh,_fromNumber:ce.n,_toNumber:xe.n,_numbers:St?sn(St):Uh,_number:ce.n,_unit:xe.u,_modifier:gt,_currentTime:0,_startTime:Mt,_delay:+ht,_updateDuration:B,_changeDuration:B,_absoluteStartTime:Jt,_absoluteUpdateStartTime:ie,_absoluteEndTime:mt(F+Q,12),_hasFromValue:J||vt?1:0,_tweenType:X,_setter:it,_valueType:xe.t,_composition:Rt,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_inlineValue:yt,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};Rt!==Le.none&&kf(Ut,Lt);let Wt=Ut._valueType;if(Wt===de.COMPLEX)Ut._value=Bf(Ut,1,-1);else if(Wt===de.UNIT)Ut._value=`${gt(Ut._toNumber)}${Ut._unit}`;else if(Wt===de.COLOR){let jt=xe.d;Ut._value=`rgba(${mt(jt[0],0)},${mt(jt[1],0)},${mt(jt[2],0)},${jt[3]})`}else Ut._value=gt(Ut._toNumber);isNaN(_t)&&(_t=Ut._startTime),wt=Ut,z++,Rn(this,Ut)}(isNaN(G)||_t<G)&&(G=_t),(isNaN(N)||Q>N)&&(N=Q),X===Pe.TRANSFORM&&(Tt=z-nt,re=z)}if(!isNaN(Tt)){let Yt=0;_e(this,X=>{Yt>=Tt&&Yt<re&&(X._renderTransforms=1,X._composition===Le.blend&&_e(Ls.animation,ot=>{ot.id===X.id&&(ot._renderTransforms=1)})),Yt++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),G?(_e(this,O=>{O._startTime-O._delay||(O._delay-=G),O._startTime-=G}),N-=G):G=0,N||(N=se,this.iterationCount=0),this.targets=l,this.id=pt(u)?vy:u,this.duration=N===se?se:Qr((N+this._loopDelay)*this.iterationCount-this._loopDelay)||se,this.onRender=b||x.onRender,this._ease=C,this._delay=G,this.iterationDuration=N,!this._autoplay&&W&&this.onRender(this)}stretch(t){let e=this.duration;if(e===Ps(t))return this;let n=t/e;return _e(this,s=>{s._updateDuration=Ps(s._updateDuration*n),s._changeDuration=Ps(s._changeDuration*n),s._currentTime*=n,s._delay*=n,s._startTime*=n,s._absoluteStartTime*=n,s._absoluteUpdateStartTime*=n,s._absoluteEndTime*=n}),super.stretch(t)}refresh(){return _e(this,t=>{let e=t._toFunc,n=t._fromFunc;(e||n)&&(n?(_n(n(),ce),ce.u!==t._unit&&t.target[pi]&&to(t.target,ce,t._unit,!0),t._fromNumbers=sn(ce.d),t._fromNumber=ce.n):e&&(_n(is(t.target,t.property,t._tweenType),$e),t._fromNumbers=sn($e.d),t._fromNumber=$e.n),e&&(_n(e(),xe),t._toNumbers=sn(xe.d),t._strings=sn(xe.s),t._toNumber=xe.o?ss(t._fromNumber,xe.n,xe.o):xe.n))}),this.duration===se&&this.restart(),this}revert(){return super.revert(),za(this)}then(t){return super.then(t)}},r0=(i,t)=>At.editor?At.editor.addAnimation(i,t):new kn(i,t,null,0,!1).init()});var Y1,eo,o0=oe(()=>{we();be();ai();Y1=(i,t)=>{if(Bn(t,"<")){let e=t[1]==="<",n=i._tail,s=n?n._offset+n._delay:0;return e?s:s+n.duration}},eo=(i,t)=>{let e=i.iterationDuration;if(e===se&&(e=0),pt(t))return e;if(ke(+t))return+t;let n=t,s=i?i.labels:null,r=!es(s),o=Y1(i,n),a=!pt(o),l=Lf.exec(n);if(l){let c=l[0],h=n.split(c),d=r&&h[0]?s[h[0]]:e,u=a?o:r?d:e,f=+h[1];return ss(u,f,c[0])}else return a?o:r?pt(s[n])?e:s[n]:e}});function $1(i){return Qr((i.iterationDuration+i._loopDelay)*i.iterationCount-i._loopDelay)||se}function a0(i,t,e,n,s,r){let a=ke(i.duration)&&i.duration<=se?e-se:e;t.composition&&rs(t,a,1,1,un.AUTO);let l=n?new kn(n,i,t,a,!1,s,r):new rn(i,t,a);return t.composition&&l.init(!0),Rn(t,l),_e(t,c=>{let d=c._offset+c._delay+c.duration;d>t.iterationDuration&&(t.iterationDuration=d)}),t.duration=$1(t),t}var yy,Zf,l0,Sy=oe(()=>{gn();we();be();ai();vi();zh();Va();jr();Ga();Xa();Ds();o0();yy=0,Zf=class extends rn{constructor(t={}){super(t,null,0),++yy,this.id=pt(t.id)?yy:t.id,this.duration=0,this.labels={};let e=t.defaults,n=At.defaults;this.defaults=e?Is(e,n):n,this.composition=Ht(t.composition,!0),this.onRender=t.onRender||n.onRender;let s=Ht(t.playbackEase,n.playbackEase);this._ease=s?Vn(s):null,this.iterationDuration=0}add(t,e,n){let s=Be(e),r=Be(t);if(s||r){if(this._hasChildren=!0,s){let o=e,a=At.editor&&At.editor.addTimelineChild,l=n&&n.type==="Stagger"&&At.editor,c=Se(n)?n:null;if(c||l){let h=on(t),d=this.duration,u=this.iterationDuration,f=o.id,p=0,_=h.length,g=a?a(t,o,this.id,n,_):null,m=c||At.editor.resolveStagger(n.defaultValue);h.forEach(v=>{let b={...g||o};this.duration=d,this.iterationDuration=u,pt(f)||(b.id=f+"-"+p);let x=eo(this,m(v,p,h,null,this));a0(b,this,x,v,p,h),p++})}else{let h=a?a(t,o,this.id,n):o,d=n&&n.type?n.defaultValue:n;a0(h,this,eo(this,d),t)}}else a0(t,this,eo(this,e));return this.composition&&this.init(!0),this}}sync(t,e){if(pt(t)||t&&pt(t.pause))return this;t.pause();let n=+(t.effect?t.effect.getTiming().duration:t.duration);!pt(t)&&!pt(t.persist)&&(t.persist=!0);let s=At.editor,r=s&&s.addTimelineChild;s&&s.addTimelineSync&&(e=s.addTimelineSync(t,e,this.id),s.addTimelineChild=null);let o=this.add(t,{currentTime:[0,n],duration:n,delay:0,ease:"linear",playbackEase:"linear"},e);return s&&(s.addTimelineChild=r),o}set(t,e,n){return pt(e)?this:(e.duration=se,e.composition=Le.replace,this.add(t,e,n))}call(t,e){return pt(t)||t&&!Se(t)?this:(At.editor&&At.editor.addTimelineCall&&(e=At.editor.addTimelineCall(t,e,this.id)),this.add({duration:0,delay:0,onComplete:()=>t(this)},e))}label(t,e){return pt(t)||t&&!Ge(t)?this:(At.editor&&At.editor.addTimelineLabel&&(e=At.editor.addTimelineLabel(t,e,this.id)),this.labels[t]=eo(this,e),this)}remove(t,e){return xi(on(t),this,e),this}stretch(t){let e=this.duration;if(e===Ps(t))return this;let n=t/e,s=this.labels;_e(this,r=>r.stretch(r.duration*n));for(let r in s)s[r]*=n;return super.stretch(t)}refresh(){return _e(this,t=>{t.refresh&&t.refresh()}),this}revert(){return super.revert(),_e(this,t=>t.revert,!0),za(this)}then(t){return super.then(t)}},l0=i=>At.editor?At.editor.addTimeline(i):new Zf(i).init()});var Jf,by=oe(()=>{we();gn();be();Xa();Ds();Jf=class{constructor(t,e){Oe.current&&Oe.current.register(this);let n=()=>{this.callbacks.completed&&this.callbacks.reset(),this.callbacks.play()},s=()=>{if(this.callbacks.completed)return;let l=!0;for(let c in this.animations)if(!this.animations[c].paused&&l){l=!1;break}l&&this.callbacks.complete()},r={onBegin:n,onComplete:s,onPause:s},o={v:1,autoplay:!1},a={};if(this.targets=[],this.animations={},this.callbacks=null,!(pt(t)||pt(e))){for(let l in e){let c=e[l];Jr(l)?a[l]=c:Bn(l,"on")?o[l]=c:r[l]=c}this.callbacks=new kn({v:0},o);for(let l in a){let c=a[l],h=Be(c),d={},u="+=0";if(h){let _=c.unit;Ge(_)&&(u+=_)}else d.duration=c;d[l]=h?Is({to:u},c):u;let f=Is(r,d);f.composition=Le.replace,f.autoplay=!1;let p=this.animations[l]=new kn(t,f,null,0,!1).init();this.targets.length||this.targets.push(...p.targets),this[l]=(_,g,m)=>{let v=p._head;if(pt(_)&&v){let b=v._numbers;return b&&b.length?b:v._modifier(v._number)}else return _e(p,b=>{if(Ye(_))for(let x=0,T=_.length;x<T;x++)pt(b._numbers[x])||(b._fromNumbers[x]=b._modifier(b._numbers[x]),b._toNumbers[x]=_[x]);else b._fromNumber=b._modifier(b._number),b._toNumber=_;pt(m)||(b._ease=Vn(m)),b._currentTime=0}),pt(g)||p.stretch(g),p.reset(!0).resume(),this}}}}revert(){for(let t in this.animations)this[t]=ne,this.animations[t].revert();return this.animations={},this.targets.length=0,this.callbacks&&this.callbacks.revert(),this}}});var c0={};el(c0,{clamp:()=>Gt,damp:()=>eC,degToRad:()=>j1,lerp:()=>_i,mapRange:()=>qa,padEnd:()=>K1,padStart:()=>J1,radToDeg:()=>tC,round:()=>mt,roundPad:()=>Z1,snap:()=>Rs,wrap:()=>Q1});var Z1,J1,K1,Q1,qa,j1,tC,eC,h0=oe(()=>{be();be();Z1=(i,t)=>(+i).toFixed(t),J1=(i,t,e)=>`${i}`.padStart(t,e),K1=(i,t,e)=>`${i}`.padEnd(t,e),Q1=(i,t,e)=>((i-t)%(e-t)+(e-t))%(e-t)+t,qa=(i,t,e,n,s)=>n+(i-t)/(e-t)*(s-n),j1=i=>i*Math.PI/180,tC=i=>i*180/Math.PI,eC=(i,t,e,n)=>n?n===1?t:_i(i,t,1-Math.exp(-n*e*.1)):i});var jn,Hh,Kf,u0,d0=oe(()=>{we();gn();be();ai();jn=nn*10,Hh=class{constructor(t={}){let e=!pt(t.bounce)||!pt(t.duration);this.timeStep=.02,this.restThreshold=5e-4,this.restDuration=200,this.maxDuration=6e4,this.maxRestSteps=this.restDuration/this.timeStep/nn,this.maxIterations=this.maxDuration/this.timeStep/nn,this.bn=Gt(Ht(t.bounce,.5),-1,1),this.pd=Gt(Ht(t.duration,628),10*At.timeScale,jn*At.timeScale),this.m=Gt(Ht(t.mass,1),1,jn),this.s=Gt(Ht(t.stiffness,100),se,jn),this.d=Gt(Ht(t.damping,10),se,jn),this.v=Gt(Ht(t.velocity,0),-jn,jn),this.w0=0,this.zeta=0,this.wd=0,this.b=0,this.completed=!1,this.solverDuration=0,this.settlingDuration=0,this.parent=null,this.onComplete=t.onComplete||ne,e&&this.calculateSDFromBD(),this.compute(),this.ease=n=>{let s=n*this.settlingDuration,r=this.completed,o=this.pd;return s>=o&&!r&&(this.completed=!0,this.onComplete(this.parent)),s<o&&r&&(this.completed=!1),n===0||n===1?n:this.solve(n*this.solverDuration)}}solve(t){let{zeta:e,w0:n,wd:s,b:r}=this,o=t;return e<1?o=Fh(-o*e*n)*(1*Fa(s*o)+r*Ua(s*o)):e===1?o=(1+r*o)*Fh(-o*n):o=((1+r)*Fh((-e*n+s)*o)+(1-r)*Fh((-e*n-s)*o))/2,1-o}calculateSDFromBD(){let t=At.timeScale===1?this.pd/nn:this.pd;this.m=1,this.v=0,this.s=Cs(2*Qn/t,2),this.bn>=0?this.d=(1-this.bn)*4*Qn/t:this.d=4*Qn/(t*(1+this.bn)),this.s=mt(Gt(this.s,se,jn),3),this.d=mt(Gt(this.d,se,300),3)}calculateBDFromSD(){let t=2*Qn/vn(this.s);this.pd=t*(At.timeScale===1?nn:1),this.d/(2*vn(this.s))<=1?this.bn=1-this.d*t/(4*Qn):this.bn=4*Qn/(this.d*t)-1,this.bn=mt(Gt(this.bn,-1,1),3),this.pd=mt(Gt(this.pd,10*At.timeScale,jn*At.timeScale),3)}compute(){let{maxRestSteps:t,maxIterations:e,restThreshold:n,timeStep:s,m:r,d:o,s:a,v:l}=this,c=this.w0=Gt(vn(a/r),se,nn),h=this.zeta=o/(2*vn(a*r));h<1?(this.wd=c*vn(1-h*h),this.b=(h*c+-l)/this.wd):h===1?(this.wd=0,this.b=-l+c):(this.wd=c*vn(h*h-1),this.b=(h*c+-l)/this.wd);let d=0,u=0,f=0;for(;u<=t&&f<=e;)Kn(1-this.solve(d))<n?u++:u=0,this.solverDuration=d,d+=s,f++;this.settlingDuration=mt(this.solverDuration*nn,0)*At.timeScale}get bounce(){return this.bn}set bounce(t){this.bn=Gt(Ht(t,1),-1,1),this.calculateSDFromBD(),this.compute()}get duration(){return this.pd}set duration(t){this.pd=Gt(Ht(t,1),10*At.timeScale,jn*At.timeScale),this.calculateSDFromBD(),this.compute()}get stiffness(){return this.s}set stiffness(t){this.s=Gt(Ht(t,100),se,jn),this.calculateBDFromSD(),this.compute()}get damping(){return this.d}set damping(t){this.d=Gt(Ht(t,10),se,jn),this.calculateBDFromSD(),this.compute()}get mass(){return this.m}set mass(t){this.m=Gt(Ht(t,1),1,jn),this.compute()}get velocity(){return this.v}set velocity(t){this.v=Gt(Ht(t,0),-jn,jn),this.compute()}},Kf=i=>new Hh(i),u0=i=>(console.warn("createSpring() is deprecated use spring() instead"),new Hh(i))});var My,Ty,wy=oe(()=>{be();My={_head:null,_tail:null},Ty=(i,t,e)=>{let n=My._head,s;for(;n;){let r=n._next,o=n.$el===i,a=!t||n.property===t,l=!e||n.parent===e;if(o&&a&&l){s=n.animation;try{s.commitStyles()}catch{}s.cancel(),zn(My,n);let c=n.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.paused=!0,c.muteCallbacks||(c.onComplete(c),c._resolve(c))))}n=r}return s}});function as(i,t,e){let n=hr(i);if(!n.length)return;let[s]=n,r=Oh(s,t),o=Ba(t,s,r),a=is(s,o);if(pt(e))return a;if(_n(a,$e),$e.t===de.NUMBER||$e.t===de.UNIT){if(e===!1)return $e.n;{let l=to(s,$e,e,!1);return`${mt(l.n,At.precision)}${l.u}`}}}var Gi,Ay,Qf=oe(()=>{gn();we();be();vi();Va();ai();Hf();wy();Ga();Xa();Gi=(i,t)=>{if(!pt(t))return At.editor&&At.editor.addSet?At.editor.addSet(i,t):(t.duration=se,t.composition=Ht(t.composition,Le.none),new kn(i,t,null,0,!0).resume())},Ay=(i,t,e)=>{let n=on(i);for(let s=0,r=n.length;s<r;s++)Ty(n[s],e,t&&t.controlAnimation&&t);return xi(n,t,e),n}});var dr,f0,p0,Gn,jf,tp,m0,Ey=oe(()=>{gn();we();vi();be();ai();h0();jr();Xa();Ga();by();Ds();d0();Qf();dr=i=>{i.cancelable&&i.preventDefault()},f0=class{constructor(t){this.el=t,this.zIndex=0,this.parentElement=null,this.classList={add:ne,remove:ne}}get x(){return this.el.x||0}set x(t){this.el.x=t}get y(){return this.el.y||0}set y(t){this.el.y=t}get width(){return this.el.width||0}set width(t){this.el.width=t}get height(){return this.el.height||0}set height(t){this.el.height=t}getBoundingClientRect(){return{top:this.y,right:this.x,bottom:this.y+this.height,left:this.x+this.width}}},p0=class{constructor(t){this.$el=t,this.inlineTransforms=[],this.point=new DOMPoint,this.inversedMatrix=this.getMatrix().inverse()}normalizePoint(t,e){return this.point.x=t,this.point.y=e,this.point.matrixTransform(this.inversedMatrix)}traverseUp(t){let e=this.$el.parentElement,n=0;for(;e&&e!==Xt;)t(e,n),e=e.parentElement,n++}getMatrix(){let t=new DOMMatrix;return this.traverseUp(e=>{let n=getComputedStyle(e).transform;if(n){let s=new DOMMatrix(n);t.preMultiplySelf(s)}}),t}remove(){this.traverseUp((t,e)=>{this.inlineTransforms[e]=t.style.transform,t.style.transform="none"})}revert(){this.traverseUp((t,e)=>{let n=this.inlineTransforms[e];n===""?t.style.removeProperty("transform"):t.style.transform=n})}},Gn=(i,t)=>i&&Se(i)?i(t):i,jf=0,tp=class{constructor(t,e={}){if(!t)return;Oe.current&&Oe.current.register(this);let n=e.x,s=e.y,r=e.trigger,o=e.modifier,a=e.releaseEase,l=a&&Vn(a),c=!pt(a)&&!pt(a.ease),h=Be(n)&&!pt(n.mapTo)?n.mapTo:"translateX",d=Be(s)&&!pt(s.mapTo)?s.mapTo:"translateY",u=Gn(e.container,this);this.containerArray=Ye(u)?u:null,this.$container=u&&!this.containerArray?on(u)[0]:Xt.body,this.useWin=this.$container===Xt.body,this.$scrollContainer=this.useWin?hn:this.$container,this.$target=Be(t)?new f0(t):on(t)[0],this.$trigger=on(r||t)[0],this.fixed=as(this.$target,"position")==="fixed",this.isFinePointer=!0,this.containerPadding=[0,0,0,0],this.containerFriction=0,this.releaseContainerFriction=0,this.snapX=0,this.snapY=0,this.scrollSpeed=0,this.scrollThreshold=0,this.dragSpeed=0,this.dragThreshold=3,this.maxVelocity=0,this.minVelocity=0,this.velocityMultiplier=0,this.cursor=!1,this.releaseXSpring=c?a:Kf({mass:Ht(e.releaseMass,1),stiffness:Ht(e.releaseStiffness,80),damping:Ht(e.releaseDamping,20)}),this.releaseYSpring=c?a:Kf({mass:Ht(e.releaseMass,1),stiffness:Ht(e.releaseStiffness,80),damping:Ht(e.releaseDamping,20)}),this.releaseEase=l||ki.outQuint,this.hasReleaseSpring=c,this.onGrab=e.onGrab||ne,this.onDrag=e.onDrag||ne,this.onRelease=e.onRelease||ne,this.onUpdate=e.onUpdate||ne,this.onSettle=e.onSettle||ne,this.onSnap=e.onSnap||ne,this.onResize=e.onResize||ne,this.onAfterResize=e.onAfterResize||ne,this.disabled=[0,0];let f={};if(o&&(f.modifier=o),pt(n)||n===!0)f[h]=0;else if(Be(n)){let p=n,_={};p.modifier&&(_.modifier=p.modifier),p.composition&&(_.composition=p.composition),f[h]=_}else n===!1&&(f[h]=0,this.disabled[0]=1);if(pt(s)||s===!0)f[d]=0;else if(Be(s)){let p=s,_={};p.modifier&&(_.modifier=p.modifier),p.composition&&(_.composition=p.composition),f[d]=_}else s===!1&&(f[d]=0,this.disabled[1]=1);this.animate=new Jf(this.$target,f),this.xProp=h,this.yProp=d,this.destX=0,this.destY=0,this.deltaX=0,this.deltaY=0,this.scroll={x:0,y:0},this.coords=[this.x,this.y,0,0],this.snapped=[0,0],this.pointer=[0,0,0,0,0,0,0,0],this.scrollView=[0,0],this.dragArea=[0,0,0,0],this.containerBounds=[-Jn,Jn,Jn,-Jn],this.scrollBounds=[0,0,0,0],this.targetBounds=[0,0,0,0],this.window=[0,0],this.velocityStack=[0,0,0],this.velocityStackIndex=0,this.velocityTime=gi(),this.velocity=0,this.angle=0,this.cursorStyles=null,this.triggerStyles=null,this.bodyStyles=null,this.targetStyles=null,this.touchActionStyles=null,this.transforms=new p0(this.$target),this.overshootCoords={x:0,y:0},this.overshootTicker=new rn({autoplay:!1,onUpdate:()=>{this.updated=!0,this.manual=!0,this.disabled[0]||this.animate[this.xProp](this.overshootCoords.x,1),this.disabled[1]||this.animate[this.yProp](this.overshootCoords.y,1)},onComplete:()=>{this.manual=!1,this.disabled[0]||this.animate[this.xProp](this.overshootCoords.x,0),this.disabled[1]||this.animate[this.yProp](this.overshootCoords.y,0)}},null,0).init(),this.updateTicker=new rn({autoplay:!1,onUpdate:()=>this.update()},null,0).init(),this.contained=!pt(u),this.manual=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.enabled=!1,this.initialized=!1,this.activeProp=this.disabled[1]?h:d,this.animate.callbacks.onRender=()=>{let p=this.updated,g=!(this.grabbed&&p)&&this.released,m=this.x,v=this.y,b=m-this.coords[2],x=v-this.coords[3];this.deltaX=b,this.deltaY=x,this.coords[2]=m,this.coords[3]=v,p&&(b||x)&&this.onUpdate(this),g?(this.computeVelocity(b,x),this.angle=Oa(x,b)):this.updated=!1},this.animate.callbacks.onComplete=()=>{!this.grabbed&&this.released&&(this.released=!1),this.manual||(this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.onSettle(this))},this.resizeTicker=new rn({autoplay:!1,duration:150*At.timeScale,onComplete:()=>{this.onResize(this),this.refresh(),this.onAfterResize(this)}}).init(),this.parameters=e,this.resizeObserver=new ResizeObserver(()=>{this.initialized?this.resizeTicker.restart():this.initialized=!0}),this.enable(),this.refresh(),this.resizeObserver.observe(this.$container),Be(t)||this.resizeObserver.observe(this.$target)}computeVelocity(t,e){let n=this.velocityTime,s=gi(),r=s-n;if(r<17)return this.velocity;this.velocityTime=s;let o=this.velocityStack,a=this.velocityMultiplier,l=this.minVelocity,c=this.maxVelocity,h=this.velocityStackIndex;o[h]=mt(Gt(vn(t*t+e*e)/r*a,l,c),5);let d=Xg(o[0],o[1],o[2]);return this.velocity=d,this.velocityStackIndex=(h+1)%3,d}setX(t,e=!1){if(this.disabled[0])return;let n=mt(t,5);return this.overshootTicker.pause(),this.manual=!0,this.updated=!e,this.destX=n,this.snapped[0]=Rs(n,this.snapX),this.animate[this.xProp](n,0),this.manual=!1,this}setY(t,e=!1){if(this.disabled[1])return;let n=mt(t,5);return this.overshootTicker.pause(),this.manual=!0,this.updated=!e,this.destY=n,this.snapped[1]=Rs(n,this.snapY),this.animate[this.yProp](n,0),this.manual=!1,this}get x(){return mt(this.animate[this.xProp](),At.precision)}set x(t){this.setX(t,!1)}get y(){return mt(this.animate[this.yProp](),At.precision)}set y(t){this.setY(t,!1)}get progressX(){return qa(this.x,this.containerBounds[3],this.containerBounds[1],0,1)}set progressX(t){this.setX(qa(t,0,1,this.containerBounds[3],this.containerBounds[1]),!1)}get progressY(){return qa(this.y,this.containerBounds[0],this.containerBounds[2],0,1)}set progressY(t){this.setY(qa(t,0,1,this.containerBounds[0],this.containerBounds[2]),!1)}updateScrollCoords(){let t=mt(this.useWin?hn.scrollX:this.$container.scrollLeft,0),e=mt(this.useWin?hn.scrollY:this.$container.scrollTop,0),[n,s,r,o]=this.containerPadding,a=this.scrollThreshold;this.scroll.x=t,this.scroll.y=e,this.scrollBounds[0]=e-this.targetBounds[0]+n-a,this.scrollBounds[1]=t-this.targetBounds[1]-s+a,this.scrollBounds[2]=e-this.targetBounds[2]-r+a,this.scrollBounds[3]=t-this.targetBounds[3]+o-a}updateBoundingValues(){let t=this.$container;if(!t)return;let e=this.x,n=this.y,s=this.coords[2],r=this.coords[3];this.coords[2]=0,this.coords[3]=0,this.setX(0,!0),this.setY(0,!0),this.transforms.remove();let o=this.window[0]=hn.innerWidth,a=this.window[1]=hn.innerHeight,l=this.useWin,c=t.scrollWidth,h=t.scrollHeight,d=this.fixed,u=t.getBoundingClientRect(),[f,p,_,g]=this.containerPadding;this.dragArea[0]=l?0:u.left,this.dragArea[1]=l?0:u.top,this.scrollView[0]=l?Gt(c,o,c):c,this.scrollView[1]=l?Gt(h,a,h):h,this.updateScrollCoords();let{width:m,height:v,left:b,top:x,right:T,bottom:M}=t.getBoundingClientRect();this.dragArea[2]=mt(l?Gt(m,o,o):m,0),this.dragArea[3]=mt(l?Gt(v,a,a):v,0);let C=as(t,"overflow"),y=C==="visible",w=C==="hidden";if(this.canScroll=d?!1:this.contained&&(t===Xt.body&&y||!w&&!y)&&(c>this.dragArea[2]+g-p||h>this.dragArea[3]+f-_)&&(!this.containerArray||this.containerArray&&!Ye(this.containerArray)),this.contained){let R=this.scroll.x,P=this.scroll.y,D=this.canScroll,k=this.$target.getBoundingClientRect(),F=D?l?0:t.scrollLeft:0,N=D?l?0:t.scrollTop:0,G=D?this.scrollView[0]-F-m:0,z=D?this.scrollView[1]-N-v:0;this.targetBounds[0]=mt(k.top+P-(l?0:x),0),this.targetBounds[1]=mt(k.right+R-(l?o:T),0),this.targetBounds[2]=mt(k.bottom+P-(l?a:M),0),this.targetBounds[3]=mt(k.left+R-(l?0:b),0),this.containerArray?(this.containerBounds[0]=this.containerArray[0]+f,this.containerBounds[1]=this.containerArray[1]-p,this.containerBounds[2]=this.containerArray[2]-_,this.containerBounds[3]=this.containerArray[3]+g):(this.containerBounds[0]=-mt(k.top-(d?Gt(x,0,a):x)+N-f,0),this.containerBounds[1]=-mt(k.right-(d?Gt(T,0,o):T)-G+p,0),this.containerBounds[2]=-mt(k.bottom-(d?Gt(M,0,a):M)-z+_,0),this.containerBounds[3]=-mt(k.left-(d?Gt(b,0,o):b)+F-g,0))}this.transforms.revert(),this.coords[2]=s,this.coords[3]=r,this.setX(e,!0),this.setY(n,!0)}isOutOfBounds(t,e,n){if(!this.contained)return 0;let[s,r,o,a]=t,[l,c]=this.disabled,h=!l&&e<a||!l&&e>r,d=!c&&n<s||!c&&n>o;return h&&!d?1:!h&&d?2:h&&d?3:0}refresh(){let t=this.parameters,e=t.x,n=t.y,s=Gn(t.container,this),r=Gn(t.containerPadding,this)||0,o=Ye(r)?r:[r,r,r,r],a=this.x,l=this.y,c=Gn(t.cursor,this),h={onHover:"grab",onGrab:"grabbing"};if(c){let{onHover:m,onGrab:v}=c;m&&(h.onHover=m),v&&(h.onGrab=v)}let d=Gn(t.dragThreshold,this),u={mouse:3,touch:7};if(ke(d))u.mouse=d,u.touch=d;else if(d){let{mouse:m,touch:v}=d;pt(m)||(u.mouse=m),pt(v)||(u.touch=v)}this.containerArray=Ye(s)?s:null,this.$container=s&&!this.containerArray?on(s)[0]:Xt.body,this.useWin=this.$container===Xt.body,this.$scrollContainer=this.useWin?hn:this.$container,this.isFinePointer=matchMedia("(pointer:fine)").matches,this.containerPadding=Ht(o,[0,0,0,0]),this.containerFriction=Gt(Ht(Gn(t.containerFriction,this),.8),0,1),this.releaseContainerFriction=Gt(Ht(Gn(t.releaseContainerFriction,this),this.containerFriction),0,1),this.snapX=Gn(Be(e)&&!pt(e.snap)?e.snap:t.snap,this),this.snapY=Gn(Be(n)&&!pt(n.snap)?n.snap:t.snap,this),this.scrollSpeed=Ht(Gn(t.scrollSpeed,this),1.5),this.scrollThreshold=Ht(Gn(t.scrollThreshold,this),20),this.dragSpeed=Ht(Gn(t.dragSpeed,this),1),this.dragThreshold=this.isFinePointer?u.mouse:u.touch,this.minVelocity=Ht(Gn(t.minVelocity,this),0),this.maxVelocity=Ht(Gn(t.maxVelocity,this),50),this.velocityMultiplier=Ht(Gn(t.velocityMultiplier,this),1),this.cursor=c===!1?!1:h,this.updateBoundingValues();let[f,p,_,g]=this.containerBounds;this.setX(Gt(a,g,p),!0),this.setY(Gt(l,f,_),!0)}update(){if(this.updateScrollCoords(),this.canScroll){let[v,b,x,T]=this.containerPadding,[M,C]=this.scrollView,y=this.dragArea[2],w=this.dragArea[3],R=this.scroll.x,P=this.scroll.y,D=this.$container.scrollWidth,k=this.$container.scrollHeight,F=this.useWin?Gt(D,this.window[0],D):D,N=this.useWin?Gt(k,this.window[1],k):k,G=M-F,z=C-N;this.dragged&&G>0&&(this.coords[0]-=G,this.scrollView[0]=F),this.dragged&&z>0&&(this.coords[1]-=z,this.scrollView[1]=N);let W=this.scrollSpeed*10,O=this.scrollThreshold,[j,rt]=this.coords,[ft,Tt,re,Yt]=this.scrollBounds,X=mt(Gt((rt-ft+v)/O,-1,0)*W,0),ot=mt(Gt((j-Tt-b)/O,0,1)*W,0),tt=mt(Gt((rt-re-x)/O,0,1)*W,0),dt=mt(Gt((j-Yt+T)/O,-1,0)*W,0);if(X||tt||dt||ot){let[Ot,Lt]=this.disabled,wt=R,_t=P;Ot||(wt=mt(Gt(R+(dt||ot),0,M-y),0),this.coords[0]-=R-wt),Lt||(_t=mt(Gt(P+(X||tt),0,C-w),0),this.coords[1]-=P-_t),this.useWin?this.$scrollContainer.scrollBy(-(R-wt),-(P-_t)):this.$scrollContainer.scrollTo(wt,_t)}}let[t,e,n,s]=this.containerBounds,[r,o,a,l,c,h]=this.pointer;this.coords[0]+=(r-c)*this.dragSpeed,this.coords[1]+=(o-h)*this.dragSpeed,this.pointer[4]=r,this.pointer[5]=o;let[d,u]=this.coords,[f,p]=this.snapped,_=(1-this.containerFriction)*this.dragSpeed;this.setX(d>e?e+(d-e)*_:d<s?s+(d-s)*_:d,!1),this.setY(u>n?n+(u-n)*_:u<t?t+(u-t)*_:u,!1),this.computeVelocity(r-c,o-h),this.angle=Oa(o-l,r-a);let[g,m]=this.snapped;(g!==f&&this.snapX||m!==p&&this.snapY)&&this.onSnap(this)}stop(){this.updateTicker.pause(),this.overshootTicker.pause();for(let t in this.animate.animations)this.animate.animations[t].pause();return xi([this],null,"x"),xi([this],null,"y"),xi([this],null,"progressX"),xi([this],null,"progressY"),xi([this.scroll]),xi([this.overshootCoords]),this}scrollInView(t,e=0,n=ki.inOutQuad){this.updateScrollCoords();let s=this.destX,r=this.destY,o=this.scroll,a=this.scrollBounds,l=this.canScroll;if(!this.containerArray&&this.isOutOfBounds(a,s,r)){let[c,h,d,u]=a,f=mt(Gt(r-c,-Jn,0),0),p=mt(Gt(s-h,0,Jn),0),_=mt(Gt(r-d,0,Jn),0),g=mt(Gt(s-u,-Jn,0),0);new kn(o,{x:mt(o.x+(g?g-e:p?p+e:0),0),y:mt(o.y+(f?f-e:_?_+e:0),0),duration:pt(t)?350*At.timeScale:t,ease:n,onUpdate:()=>{this.canScroll=!1,this.$scrollContainer.scrollTo(o.x,o.y)}}).init().then(()=>{this.canScroll=l})}return this}handleHover(){this.isFinePointer&&this.cursor&&!this.cursorStyles&&(this.cursorStyles=Gi(this.$trigger,{cursor:this.cursor.onHover}))}animateInView(t,e=0,n=ki.inOutQuad){this.stop(),this.updateBoundingValues();let s=this.x,r=this.y,[o,a,l,c]=this.containerPadding,h=this.scroll.y-this.targetBounds[0]+o+e,d=this.scroll.x-this.targetBounds[1]-a-e,u=this.scroll.y-this.targetBounds[2]-l-e,f=this.scroll.x-this.targetBounds[3]+c+e,p=this.isOutOfBounds([h,d,u,f],s,r);if(p){let[_,g]=this.disabled,m=Gt(Rs(s,this.snapX),f,d),v=Gt(Rs(r,this.snapY),h,u),b=pt(t)?350*At.timeScale:t;!_&&(p===1||p===3)&&this.animate[this.xProp](m,b,n),!g&&(p===2||p===3)&&this.animate[this.yProp](v,b,n)}return this}handleDown(t){let e=t.target;if(this.grabbed||e.type==="range")return;t.stopPropagation(),this.grabbed=!0,this.released=!1,this.stop(),this.updateBoundingValues();let n=t.changedTouches,s=n?n[0].clientX:t.clientX,r=n?n[0].clientY:t.clientY,{x:o,y:a}=this.transforms.normalizePoint(s,r),[l,c,h,d]=this.containerBounds,u=(1-this.containerFriction)*this.dragSpeed,f=this.x,p=this.y;this.coords[0]=this.coords[2]=u?f>c?c+(f-c)/u:f<d?d+(f-d)/u:f:f,this.coords[1]=this.coords[3]=u?p>h?h+(p-h)/u:p<l?l+(p-l)/u:p:p,this.pointer[0]=o,this.pointer[1]=a,this.pointer[2]=o,this.pointer[3]=a,this.pointer[4]=o,this.pointer[5]=a,this.pointer[6]=o,this.pointer[7]=a,this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null);let _=as(this.$target,"zIndex",!1);jf=(_>jf?_:jf)+1,this.targetStyles=Gi(this.$target,{zIndex:jf}),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.isFinePointer&&this.cursor&&(this.bodyStyles=Gi(Xt.body,{cursor:this.cursor.onGrab})),this.scrollInView(100,0,ki.out(3)),this.onGrab(this),Xt.addEventListener("touchmove",this),Xt.addEventListener("touchend",this),Xt.addEventListener("touchcancel",this),Xt.addEventListener("mousemove",this),Xt.addEventListener("mouseup",this),Xt.addEventListener("selectstart",this)}handleMove(t){if(!this.grabbed)return;let e=t.changedTouches,n=e?e[0].clientX:t.clientX,s=e?e[0].clientY:t.clientY,{x:r,y:o}=this.transforms.normalizePoint(n,s),a=r-this.pointer[6],l=o-this.pointer[7],c=t.target,h=!1,d=!1,u=!1;for(;e&&c&&c!==this.$trigger;){let f=as(c,"overflow-y");if(f!=="hidden"&&f!=="visible"){let{scrollTop:p,scrollHeight:_,clientHeight:g}=c;if(_>g){u=!0,h=p<=3,d=p>=_-g-3;break}}c=c.parentElement}u&&(!h&&!d||h&&l<0||d&&l>0)?(this.pointer[0]=r,this.pointer[1]=o,this.pointer[2]=r,this.pointer[3]=o,this.pointer[4]=r,this.pointer[5]=o,this.pointer[6]=r,this.pointer[7]=o):(dr(t),this.triggerStyles||(this.triggerStyles=Gi(this.$trigger,{pointerEvents:"none"})),this.$trigger.addEventListener("touchstart",dr,{passive:!1}),this.$trigger.addEventListener("touchmove",dr,{passive:!1}),this.$trigger.addEventListener("touchend",dr),(this.dragged||!this.disabled[0]&&Kn(a)>this.dragThreshold||!this.disabled[1]&&Kn(l)>this.dragThreshold)&&(this.updateTicker.resume(),this.pointer[2]=this.pointer[0],this.pointer[3]=this.pointer[1],this.pointer[0]=r,this.pointer[1]=o,this.dragged=!0,this.released=!1,this.onDrag(this)))}handleUp(){if(!this.grabbed)return;this.updateTicker.pause(),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null);let[t,e]=this.disabled,[n,s,r,o,a,l]=this.pointer,[c,h,d,u]=this.containerBounds,[f,p]=this.snapped,_=this.releaseXSpring,g=this.releaseYSpring,m=this.releaseEase,v=this.hasReleaseSpring,b=this.overshootCoords,x=this.x,T=this.y,M=this.computeVelocity(n-a,s-l),C=this.angle=Oa(s-o,n-r),y=M*150,w=(1-this.releaseContainerFriction)*this.dragSpeed,R=x+Fa(C)*y,P=T+Ua(C)*y,D=R>h?h+(R-h)*w:R<u?u+(R-u)*w:R,k=P>d?d+(P-d)*w:P<c?c+(P-c)*w:P,F=this.destX=Gt(mt(Rs(D,this.snapX),5),u,h),N=this.destY=Gt(mt(Rs(k,this.snapY),5),c,d),G=this.isOutOfBounds(this.containerBounds,R,P),z=0,W=0,O=m,j=m,rt=0;if(b.x=x,b.y=T,!t){let Tt=F===h?x>h?-1:1:x<u?-1:1,re=mt(x-F,0);_.velocity=e&&v?re?y*Tt/Kn(re):0:M;let{ease:Yt,settlingDuration:X,restDuration:ot}=_;z=x===F?0:v?X:X-ot*At.timeScale,v&&(O=Yt),z>rt&&(rt=z)}if(!e){let Tt=N===d?T>d?-1:1:T<c?-1:1,re=mt(T-N,0);g.velocity=t&&v?re?y*Tt/Kn(re):0:M;let{ease:Yt,settlingDuration:X,restDuration:ot}=g;W=T===N?0:v?X:X-ot*At.timeScale,v&&(j=Yt),W>rt&&(rt=W)}if(!v&&G&&w&&(z||W)){let Tt=Le.blend;new kn(b,{x:{to:D,duration:z*.65},y:{to:k,duration:W*.65},ease:m,composition:Tt}).init(),new kn(b,{x:{to:F,duration:z},y:{to:N,duration:W},ease:m,composition:Tt}).init(),this.overshootTicker.stretch(Xg(z,W)).restart()}else t||this.animate[this.xProp](F,z,O),e||this.animate[this.yProp](N,W,j);this.scrollInView(rt,this.scrollThreshold,m);let ft=!1;F!==f&&(this.snapped[0]=F,this.snapX&&(ft=!0)),N!==p&&this.snapY&&(this.snapped[1]=N,this.snapY&&(ft=!0)),ft&&this.onSnap(this),this.grabbed=!1,this.dragged=!1,this.updated=!0,this.released=!0,this.onRelease(this),this.$trigger.removeEventListener("touchstart",dr),this.$trigger.removeEventListener("touchmove",dr),this.$trigger.removeEventListener("touchend",dr),Xt.removeEventListener("touchmove",this),Xt.removeEventListener("touchend",this),Xt.removeEventListener("touchcancel",this),Xt.removeEventListener("mousemove",this),Xt.removeEventListener("mouseup",this),Xt.removeEventListener("selectstart",this)}reset(){return this.stop(),this.resizeTicker.pause(),this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.setX(0,!0),this.setY(0,!0),this.coords[0]=0,this.coords[1]=0,this.pointer[0]=0,this.pointer[1]=0,this.pointer[2]=0,this.pointer[3]=0,this.pointer[4]=0,this.pointer[5]=0,this.pointer[6]=0,this.pointer[7]=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this}enable(){return this.enabled||(this.enabled=!0,this.$target.classList.remove("is-disabled"),this.touchActionStyles=Gi(this.$trigger,{touchAction:this.disabled[0]?"pan-x":this.disabled[1]?"pan-y":"none"}),this.$trigger.addEventListener("touchstart",this,{passive:!0}),this.$trigger.addEventListener("mousedown",this,{passive:!0}),this.$trigger.addEventListener("mouseenter",this)),this}disable(){return this.enabled=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.touchActionStyles.revert(),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null),this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null),this.$target.classList.add("is-disabled"),this.$trigger.removeEventListener("touchstart",this),this.$trigger.removeEventListener("mousedown",this),this.$trigger.removeEventListener("mouseenter",this),Xt.removeEventListener("touchmove",this),Xt.removeEventListener("touchend",this),Xt.removeEventListener("touchcancel",this),Xt.removeEventListener("mousemove",this),Xt.removeEventListener("mouseup",this),Xt.removeEventListener("selectstart",this),this}revert(){return this.reset(),this.disable(),this.$target.classList.remove("is-disabled"),this.updateTicker.revert(),this.overshootTicker.revert(),this.resizeTicker.revert(),this.animate.revert(),this.resizeObserver.disconnect(),this}handleEvent(t){switch(t.type){case"mousedown":this.handleDown(t);break;case"touchstart":this.handleDown(t);break;case"mousemove":this.handleMove(t);break;case"touchmove":this.handleMove(t);break;case"mouseup":this.handleUp();break;case"touchend":this.handleUp();break;case"touchcancel":this.handleUp();break;case"mouseenter":this.handleHover();break;case"selectstart":dr(t);break}}},m0=(i,t)=>new tp(i,t)});var ep,Ya,Wh=oe(()=>{we();gn();be();jr();ep=(i=ne)=>new rn({duration:1*At.timeScale,onComplete:i},null,0).resume(),Ya=i=>{let t;return((...e)=>{let n,s,r,o,a;t&&(n=t.currentIteration,s=t.iterationProgress,r=t.reversed,o=t._alternate,a=t._startTime,t.revert());let l=i(...e);return l&&!Se(l)&&l.revert&&(t=l),pt(s)||(t.currentIteration=n,t.iterationProgress=(o&&n%2?!r:r)?1-s:s,t._startTime=a),l||ne})}});var np,g0,Cy=oe(()=>{we();gn();be();vi();Wh();np=class{constructor(t={}){Oe.current&&Oe.current.register(this);let e=t.root,n=Xt;e&&(n=e.current||e.nativeElement||on(e)[0]||Xt);let s=t.defaults,r=At.defaults,o=t.mediaQueries;if(this.defaults=s?Is(s,r):r,this.root=n,this.constructors=[],this.revertConstructors=[],this.revertibles=[],this.constructorsOnce=[],this.revertConstructorsOnce=[],this.revertiblesOnce=[],this.once=!1,this.onceIndex=0,this.methods={},this.matches={},this.mediaQueryLists={},this.data={},o)for(let a in o){let l=hn.matchMedia(o[a]);this.mediaQueryLists[a]=l,l.addEventListener("change",this)}}register(t){(this.once?this.revertiblesOnce:this.revertibles).push(t)}execute(t){let e=Oe.current,n=Oe.root,s=At.defaults;Oe.current=this,Oe.root=this.root,At.defaults=this.defaults;let r=this.mediaQueryLists;for(let a in r)this.matches[a]=r[a].matches;let o=t(this);return Oe.current=e,Oe.root=n,At.defaults=s,o}refresh(){return this.onceIndex=0,this.execute(()=>{let t=this.revertibles.length,e=this.revertConstructors.length;for(;t--;)this.revertibles[t].revert();for(;e--;)this.revertConstructors[e](this);this.revertibles.length=0,this.revertConstructors.length=0,this.constructors.forEach(n=>{let s=n(this);Se(s)&&this.revertConstructors.push(s)})}),this}add(t,e){if(this.once=!1,Se(t)){let n=t;this.constructors.push(n),this.execute(()=>{let s=n(this);Se(s)&&this.revertConstructors.push(s)})}else this.methods[t]=(...n)=>this.execute(()=>e(...n));return this}addOnce(t){if(this.once=!0,Se(t)){let e=this.onceIndex++;if(this.constructorsOnce[e])return this;let s=t;this.constructorsOnce[e]=s,this.execute(()=>{let r=s(this);Se(r)&&this.revertConstructorsOnce.push(r)})}return this}keepTime(t){this.once=!0;let e=this.onceIndex++,n=this.constructorsOnce[e];if(Se(n))return n(this);let s=Ya(t);this.constructorsOnce[e]=s;let r;return this.execute(()=>{r=s(this)}),r}handleEvent(t){t.type==="change"&&this.refresh()}revert(){let t=this.revertibles,e=this.revertConstructors,n=this.revertiblesOnce,s=this.revertConstructorsOnce,r=this.mediaQueryLists,o=t.length,a=e.length,l=n.length,c=s.length;for(;o--;)t[o].revert();for(;a--;)e[a](this);for(;l--;)n[l].revert();for(;c--;)s[c](this);for(let h in r)r[h].removeEventListener("change",this);t.length=0,e.length=0,this.constructors.length=0,n.length=0,s.length=0,this.constructorsOnce.length=0,this.onceIndex=0,this.matches={},this.methods={},this.mediaQueryLists={},this.data={}}},g0=i=>new np(i)});var nC,ip,rp,_0,iC,Xh,sp,Ry,sC,Py,op,x0,Iy=oe(()=>{we();gn();be();vi();ai();Hf();jr();Qf();Wh();i0();Ds();nC=()=>{let i=Xt.createElement("div");Xt.body.appendChild(i),i.style.height="100lvh";let t=i.offsetHeight;return Xt.body.removeChild(i),t},ip=(i,t)=>i&&Se(i)?i(t):i,rp=new Map,_0=class{constructor(t){this.element=t,this.useWin=this.element===Xt.body,this.winWidth=0,this.winHeight=0,this.width=0,this.height=0,this.left=0,this.top=0,this.scale=1,this.zIndex=0,this.scrollX=0,this.scrollY=0,this.prevScrollX=0,this.prevScrollY=0,this.scrollWidth=0,this.scrollHeight=0,this.velocity=0,this.backwardX=!1,this.backwardY=!1,this.scrollTicker=new rn({autoplay:!1,onBegin:()=>this.dataTimer.resume(),onUpdate:()=>{let e=this.backwardX||this.backwardY;_e(this,n=>n.handleScroll(),e)},onComplete:()=>this.dataTimer.pause()}).init(),this.dataTimer=new rn({autoplay:!1,frameRate:30,onUpdate:e=>{let n=e.deltaTime,s=this.prevScrollX,r=this.prevScrollY,o=this.scrollX,a=this.scrollY,l=s-o,c=r-a;this.prevScrollX=o,this.prevScrollY=a,l&&(this.backwardX=s>o),c&&(this.backwardY=r>a),this.velocity=mt(n>0?Math.sqrt(l*l+c*c)/n:0,5)}}).init(),this.resizeTicker=new rn({autoplay:!1,duration:250*At.timeScale,onComplete:()=>{this.updateWindowBounds(),this.refreshScrollObservers(),this.handleScroll()}}).init(),this.wakeTicker=new rn({autoplay:!1,duration:500*At.timeScale,onBegin:()=>{this.scrollTicker.resume()},onComplete:()=>{this.scrollTicker.pause()}}).init(),this._head=null,this._tail=null,this.updateScrollCoords(),this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll(),this.resizeObserver=new ResizeObserver(()=>this.resizeTicker.restart()),this.resizeObserver.observe(this.element),(this.useWin?hn:this.element).addEventListener("scroll",this,!1)}updateScrollCoords(){let t=this.useWin,e=this.element;this.scrollX=mt(t?hn.scrollX:e.scrollLeft,0),this.scrollY=mt(t?hn.scrollY:e.scrollTop,0)}updateWindowBounds(){this.winWidth=hn.innerWidth,this.winHeight=nC()}updateBounds(){let t=getComputedStyle(this.element),e=this.element;this.scrollWidth=e.scrollWidth+parseFloat(t.marginLeft)+parseFloat(t.marginRight),this.scrollHeight=e.scrollHeight+parseFloat(t.marginTop)+parseFloat(t.marginBottom),this.updateWindowBounds();let n,s;if(this.useWin)n=this.winWidth,s=this.winHeight;else{let r=e.getBoundingClientRect();n=e.clientWidth,s=e.clientHeight,this.top=r.top,this.left=r.left,this.scale=r.width?n/r.width:r.height?s/r.height:1}this.width=n,this.height=s}refreshScrollObservers(){_e(this,t=>{t.ready&&t._debug&&t.removeDebug()}),this.updateBounds(),_e(this,t=>{t.ready&&(t.refresh(),t.onResize(t),t._debug&&t.debug())})}refresh(){this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll()}handleScroll(){this.updateScrollCoords(),this.wakeTicker.restart()}handleEvent(t){t.type==="scroll"&&this.handleScroll()}revert(){this.scrollTicker.cancel(),this.dataTimer.cancel(),this.resizeTicker.cancel(),this.wakeTicker.cancel(),this.resizeObserver.disconnect(),(this.useWin?hn:this.element).removeEventListener("scroll",this),rp.delete(this.element)}},iC=i=>{let t=i?on(i)[0]||Xt.body:Xt.body,e=rp.get(t);return e||(e=new _0(t),rp.set(t,e)),e},Xh=(i,t,e,n,s)=>{let r=t==="min",o=t==="max",a=t==="top"||t==="left"||t==="start"||r?0:t==="bottom"||t==="right"||t==="end"||o?"100%":t==="center"?"50%":t,{n:l,u:c}=_n(a,$e),h=l;return c==="%"?h=l/100*e:c&&(h=to(i,$e,"px",!0).n),o&&n<0&&(h+=n),r&&s>0&&(h+=s),h},sp=(i,t,e,n,s)=>{let r;if(Ge(t)){let o=Lf.exec(t);if(o){let a=o[0],l=a[0],c=t.split(a),h=c[0]==="min",d=c[0]==="max",u=Xh(i,c[0],e,n,s),f=Xh(i,c[1],e,n,s);if(h){let p=ss(Xh(i,"min",e),f,l);r=p<u?u:p}else if(d){let p=ss(Xh(i,"max",e),f,l);r=p>u?u:p}else r=ss(u,f,l)}else r=Xh(i,t,e,n,s)}else r=t;return mt(r,0)},Ry=i=>{let t,e=i.targets;for(let n=0,s=e.length;n<s;n++){let r=e[n];if(r[pi]){t=r;break}}return t},sC=0,Py=["#FF4B4B","#FF971B","#FFC730","#F9F640","#7AFF5A","#18FF74","#17E09B","#3CFFEC","#05DBE9","#33B3F1","#638CF9","#C563FE","#FF4FCF","#F93F8A"],op=class{constructor(t={}){Oe.current&&Oe.current.register(this);let e=Ht(t.sync,"play pause"),n=e?Vn(e):null,s=e&&(e==="linear"||e===yi),r=e&&!(n===yi&&!s),o=e&&(ke(e)||e===!0||s),a=e&&Ge(e)&&!r&&!o,l=a?e.split(" ").map(h=>()=>{let d=this.linked;return d&&d[h]?d[h]():null}):null,c=a&&l.length>2;this.index=sC++,this.id=pt(t.id)?this.index:t.id,this.container=iC(t.container),this.target=null,this.linked=null,this.repeat=null,this.horizontal=null,this.enter=null,this.leave=null,this.sync=r||o||!!l,this.syncEase=r?n:null,this.syncSmooth=o?e===!0||s?1:e:null,this.onSyncEnter=l&&!c&&l[0]?l[0]:ne,this.onSyncLeave=l&&!c&&l[1]?l[1]:ne,this.onSyncEnterForward=l&&c&&l[0]?l[0]:ne,this.onSyncLeaveForward=l&&c&&l[1]?l[1]:ne,this.onSyncEnterBackward=l&&c&&l[2]?l[2]:ne,this.onSyncLeaveBackward=l&&c&&l[3]?l[3]:ne,this.onEnter=t.onEnter||ne,this.onLeave=t.onLeave||ne,this.onEnterForward=t.onEnterForward||ne,this.onLeaveForward=t.onLeaveForward||ne,this.onEnterBackward=t.onEnterBackward||ne,this.onLeaveBackward=t.onLeaveBackward||ne,this.onUpdate=t.onUpdate||ne,this.onResize=t.onResize||ne,this.onSyncComplete=t.onSyncComplete||ne,this.reverted=!1,this.ready=!1,this.completed=!1,this.began=!1,this.isInView=!1,this.forceEnter=!1,this.hasEntered=!1,this.offset=0,this.offsetStart=0,this.offsetEnd=0,this.distance=0,this.prevProgress=0,this.thresholds=["start","end","end","start"],this.coords=[0,0,0,0],this.debugStyles=null,this.$debug=null,this._params=t,this._debug=Ht(t.debug,!1),this._next=null,this._prev=null,Rn(this.container,this),ep(()=>{if(!this.reverted){if(!this.target){let h=on(t.target)[0];this.target=h||Xt.body,this.refresh()}this._debug&&this.debug()}})}link(t){if(t&&(t.pause(),this.linked=t,!pt(t)&&!pt(t.persist)&&(t.persist=!0),!this._params.target)){let e;pt(t.targets)?_e(t,n=>{n.targets&&!e&&(e=Ry(n))}):e=Ry(t),this.target=e||Xt.body,this.refresh()}return this}get velocity(){return this.container.velocity}get backward(){return this.horizontal?this.container.backwardX:this.container.backwardY}get scroll(){return this.horizontal?this.container.scrollX:this.container.scrollY}get progress(){let t=(this.scroll-this.offsetStart)/this.distance;return t===1/0||isNaN(t)?0:mt(Gt(t,0,1),6)}refresh(){this.ready=!0,this.reverted=!1;let t=this._params;return this.repeat=Ht(ip(t.repeat,this),!0),this.horizontal=Ht(ip(t.axis,this),"y")==="x",this.enter=Ht(ip(t.enter,this),"end start"),this.leave=Ht(ip(t.leave,this),"start end"),this.updateBounds(),this.handleScroll(),this}removeDebug(){return this.$debug&&(this.$debug.parentNode.removeChild(this.$debug),this.$debug=null),this.debugStyles&&(this.debugStyles.revert(),this.$debug=null),this}debug(){this.removeDebug();let t=this.container,e=this.horizontal,n=t.element.querySelector(":scope > .animejs-onscroll-debug"),s=Xt.createElement("div"),r=Xt.createElement("div"),o=Xt.createElement("div"),a=Py[this.index%Py.length],l=t.useWin,c=l?t.winWidth:t.width,h=l?t.winHeight:t.height,d=t.scrollWidth,u=t.scrollHeight,f=this.container.width>360?320:260,p=e?0:10,_=e?10:0,g=e?24:f/2,m=e?g:15,v=e?60:g,b=e?v:m,x=e?"repeat-x":"repeat-y",T=R=>e?"0px "+R+"px":R+"px 2px",M=R=>`linear-gradient(${e?90:0}deg, ${R} 2px, transparent 1px)`,C=(R,P,D,k,F)=>`position:${R};left:${P}px;top:${D}px;width:${k}px;height:${F}px;`;s.style.cssText=`${C("absolute",p,_,e?d:f,e?f:u)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${e?"column":"row"};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `,r.style.cssText=`${C("sticky",0,0,e?c:g,e?g:h)}`,n||(r.style.cssText+=`background:
        ${M("#FFFF")}${T(g-10)} / 100px 100px ${x},
        ${M("#FFF8")}${T(g-10)} / 10px 10px ${x};
      `),o.style.cssText=`${C("relative",0,0,e?d:g,e?g:u)}`,n||(o.style.cssText+=`background:
        ${M("#FFFF")}${T(0)} / ${e?"100px 10px":"10px 100px"} ${x},
        ${M("#FFF8")}${T(0)} / ${e?"10px 0px":"0px 10px"} ${x};
      `);let y=[" enter: "," leave: "];this.coords.forEach((R,P)=>{let D=P>1,k=(D?0:this.offset)+R,F=P%2,N=k<b,G=k>(D?e?c:h:e?d:u)-b,z=(D?F&&!N:!F&&!N)||G,W=Xt.createElement("div"),O=Xt.createElement("div"),j=e?z?"right":"left":z?"bottom":"top",rt=z?(e?v:m)+(D?e?-1:G?0:-2:e?-1:-2):e?1:0;O.innerHTML=`${this.id}${y[F]}${this.thresholds[P]}`,W.style.cssText=`${C("absolute",0,0,v,m)}
        display: flex;
        flex-direction: ${e?"column":"row"};
        justify-content: flex-${D?"start":"end"};
        align-items: flex-${z?"end":"start"};
        border-${j}: 2px solid ${a};
      `,O.style.cssText=`
        overflow: hidden;
        max-width: ${f/2-10}px;
        height: ${m};
        margin-${e?z?"right":"left":z?"bottom":"top"}: -2px;
        padding: 1px;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: -.025em;
        line-height: 9px;
        font-weight: 600;
        text-align: ${e&&z||!e&&!D?"right":"left"};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${F?a:"rgba(0,0,0,.75)"};
        background-color: ${F?"rgba(0,0,0,.65)":a};
        border: 2px solid ${F?a:"transparent"};
        border-${e?z?"top-left":"top-right":z?"top-left":"bottom-left"}-radius: 5px;
        border-${e?z?"bottom-left":"bottom-right":z?"top-right":"bottom-right"}-radius: 5px;
      `,W.appendChild(O);let ft=k-rt+(e?1:0);W.style[e?"left":"top"]=`${ft}px`,(D?r:o).appendChild(W)}),s.appendChild(r),s.appendChild(o),t.element.appendChild(s),n||s.classList.add("animejs-onscroll-debug"),this.$debug=s,as(t.element,"position")==="static"&&(this.debugStyles=Gi(t.element,{position:"relative "}))}updateBounds(){this._debug&&this.removeDebug();let t,e=this.target,n=this.container,s=this.horizontal,r=this.linked,o,a=e;for(r&&(o=r.currentTime,r.seek(0,!0));a&&a!==n.element&&a!==Xt.body;){let F=as(a,"position")==="sticky"?Gi(a,{position:"static"}):!1;a=a.parentElement,F&&(t||(t=[]),t.push(F))}let l=e.getBoundingClientRect(),c=n.scale,h=(s?l.left+n.scrollX-n.left:l.top+n.scrollY-n.top)*c,d=(s?l.width:l.height)*c,u=s?n.width:n.height,p=(s?n.scrollWidth:n.scrollHeight)-u,_=this.enter,g=this.leave,m="start",v="end",b="end",x="start";if(Ge(_)){let F=_.split(" ");b=F[0],m=F.length>1?F[1]:m}else if(Be(_)){let F=_;pt(F.container)||(b=F.container),pt(F.target)||(m=F.target)}else ke(_)&&(b=_);if(Ge(g)){let F=g.split(" ");x=F[0],v=F.length>1?F[1]:v}else if(Be(g)){let F=g;pt(F.container)||(x=F.container),pt(F.target)||(v=F.target)}else ke(g)&&(x=g);let T=sp(e,m,d),M=sp(e,v,d),C=T+h-u,y=M+h-p,w=sp(e,b,u,C,y),R=sp(e,x,u,C,y),P=T+h-w,D=M+h-R,k=D-P;this.offset=h,this.offsetStart=P,this.offsetEnd=D,this.distance=k<=0?0:k,this.thresholds=[m,v,b,x],this.coords=[T,M,w,R],t&&t.forEach(F=>F.revert()),r&&r.seek(o,!0),this._debug&&this.debug()}handleScroll(){if(!this.ready)return;let t=this.linked,e=this.sync,n=this.syncEase,s=this.syncSmooth,r=t&&(n||s),o=this.horizontal,a=this.container,l=this.scroll,c=l<=this.offsetStart,h=l>=this.offsetEnd,d=!c&&!h,u=l===this.offsetStart||l===this.offsetEnd,f=!this.hasEntered&&u,p=this._debug&&this.$debug,_=!1,g=!1,m=this.progress;if(c&&this.began&&(this.began=!1),m>0&&!this.began&&(this.began=!0),r){let v=t.progress;if(s&&ke(s)){if(s<1){let x=v<m&&m===1?1e-4:v>m&&!m?-1e-4:0;m=mt(_i(v,m,_i(.01,.2,s))+x,6)}}else n&&(m=n(m));_=m!==this.prevProgress,g=v===1,_&&!g&&s&&v&&a.wakeTicker.restart()}if(p){let v=o?a.scrollY:a.scrollX;p.style[o?"top":"left"]=v+10+"px"}(d&&!this.isInView||f&&!this.forceEnter&&!this.hasEntered)&&(d&&(this.isInView=!0),!this.forceEnter||!this.hasEntered?(p&&d&&(p.style.zIndex=`${this.container.zIndex++}`),this.onSyncEnter(this),this.onEnter(this),this.backward?(this.onSyncEnterBackward(this),this.onEnterBackward(this)):(this.onSyncEnterForward(this),this.onEnterForward(this)),this.hasEntered=!0,f&&(this.forceEnter=!0)):d&&(this.forceEnter=!1)),(d||!d&&this.isInView)&&(_=!0),_&&(r&&t.seek(t.duration*m),this.onUpdate(this)),!d&&this.isInView&&(this.isInView=!1,this.onSyncLeave(this),this.onLeave(this),this.backward?(this.onSyncLeaveBackward(this),this.onLeaveBackward(this)):(this.onSyncLeaveForward(this),this.onLeaveForward(this)),e&&!s&&(g=!0)),m>=1&&this.began&&!this.completed&&(e&&g||!e)&&(e&&this.onSyncComplete(this),this.completed=!0,(!this.repeat&&!t||!this.repeat&&t&&t.completed)&&this.revert()),m<1&&this.completed&&(this.completed=!1),this.prevProgress=m}revert(){if(this.reverted)return;let t=this.container;return zn(t,this),t._head||t.revert(),this._debug&&this.removeDebug(),this.reverted=!0,this.ready=!1,this}},x0=(i={})=>new op(i)});var Si,ap,rC,Ly,bi,Dy,Ny,Uy,Fy,Oy,By,zy,Vy,ky,Gy,Hy,Wy,Xy=oe(()=>{we();h0();Si=c0,ap={},rC=(i,t=0)=>(...e)=>t?n=>i(...e,n):n=>i(n,...e),Ly=i=>(...t)=>{let e=i(...t);return new Proxy(ne,{apply:(n,s,[r])=>e(r),get:(n,s)=>{if(ap[s])return Ly((...r)=>{let o=ap[s](...r);return a=>o(e(a))})}})},bi=(i,t,e=0)=>{let n=(...s)=>(s.length<t.length?Ly(rC(t,e)):t)(...s);return ap[i]||(ap[i]=n),n},Dy=bi("roundPad",Si.roundPad),Ny=bi("padStart",Si.padStart),Uy=bi("padEnd",Si.padEnd),Fy=bi("wrap",Si.wrap),Oy=bi("mapRange",Si.mapRange),By=bi("degToRad",Si.degToRad),zy=bi("radToDeg",Si.radToDeg),Vy=bi("snap",Si.snap),ky=bi("clamp",Si.clamp),Gy=bi("round",Si.round),Hy=bi("lerp",Si.lerp,1),Wy=bi("damp",Si.damp,1)});var $a,oC,no,qy,lp,cp=oe(()=>{$a=(i=0,t=1,e=0)=>{let n=10**e;return Math.floor((Math.random()*(t-i+1/n)+i)*n)/n},oC=0,no=(i,t=0,e=1,n=0)=>{let s=i===void 0?oC++:i;return(r=t,o=e,a=n)=>{s+=1831565813,s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61);let l=10**a;return Math.floor((((s^s>>>14)>>>0)/4294967296*(o-r+1/l)+r)*l)/l}},qy=i=>i[$a(0,i.length-1)],lp=(i,t=$a)=>{let e=i.length,n,s;for(;e;)s=t(0,--e),n=i[e],i[e]=i[s],i[s]=n;return i}});var qh,v0=oe(()=>{we();be();Ds();o0();ai();vi();cp();qh=(i,t={})=>{let e=[],n=0,s,r=null,o=t.from,a=t.reversed,l=t.ease,c=!pt(l),d=c&&!pt(l.ease)?l.ease:c?Vn(l):null,u=t.grid,f=u===!0,p=t.axis,_=t.total,g=pt(o)||o===0||o==="first",m=o==="center",v=o==="last",b=o==="random",x=Ye(o),T=Ye(i),M=t.use,C=T?Df(i[0]):Df(i),y=T?Df(i[1]):0,w=If.exec((T?i[1]:i)+mi),R=t.start||0+(T?C:0),P=t.seed,k=!pt(P)&&P!==!1?no(P===!0?0:P):$a,F=t.jitter,N=!pt(F),G=Ye(F),z=G?F[0]:F||0,W=G?F[1]:F||0,O=g?0:ke(o)?o:0;return(j,rt,ft,Tt,re)=>{let[Yt]=hr(j),X=pt(_)?ft.length:_,ot=pt(M)?!1:Se(M)?M(Yt,rt,X):is(Yt,M),tt=ke(ot)||Ge(ot)&&ke(+ot)?+ot:rt,dt=tt>=0&&tt<X?tt:rt;if(m&&(O=(X-1)/2),v&&(O=X-1),!e.length){if(f){let wt=!0,_t=!1,Q=1/0,nt=1/0,K=1/0,ct=-1/0,ut=-1/0,Rt=-1/0,Pt=[],xt=[],Vt=[];for(let L=0;L<X;L++){let Qt=ft[L],st=0,E=0,S=0,U=!1;if(Qt&&Se(Qt.getBoundingClientRect)){let V=Qt.getBoundingClientRect();st=V.left+V.width/2,E=V.top+V.height/2,U=!0}else{let V=Qt;V&&ke(V.x)&&ke(V.y)&&(st=V.x,E=V.y,ke(V.z)&&(S=V.z,_t=!0),U=!0)}if(!U){wt=!1;break}Pt.push(st),xt.push(E),Vt.push(S),st<Q&&(Q=st),E<nt&&(nt=E),S<K&&(K=S),st>ct&&(ct=st),E>ut&&(ut=E),S>Rt&&(Rt=S)}if(wt){let L=Pt[0],Qt=xt[0],st=Vt[0];x?(L=Q+o[0]*(ct-Q),Qt=nt+o[1]*(ut-nt),st=_t?K+(o.length>=3?o[2]:.5)*(Rt-K):0):m?(L=(Q+ct)/2,Qt=(nt+ut)/2,st=(K+Rt)/2):v?(L=Pt[X-1],Qt=xt[X-1],st=Vt[X-1]):ke(o)&&(L=Pt[o],Qt=xt[o],st=Vt[o]);for(let S=0;S<X;S++){let U=L-Pt[S],V=Qt-xt[S],q=st-Vt[S],ht=vn(U*U+V*V+(_t?q*q:0));p==="x"&&(ht=-U),p==="y"&&(ht=-V),p==="z"&&(ht=-q),e.push(ht)}let E=1/0;for(let S=0;S<X;S++){let U=Kn(e[S]);U>0&&U<E&&(E=U)}if(E>0&&E<1/0)for(let S=0;S<X;S++)e[S]=e[S]/E}else for(let L=0;L<X;L++)e.push(Kn(O-L))}else for(let wt=0;wt<X;wt++)if(!u)e.push(Kn(O-wt));else{let _t=u.length,Q=u[0]*u[1],nt,K,ct;x?(nt=o[0]*(u[0]-1),K=o[1]*(u[1]-1),ct=_t===3?(o.length>=3?o[2]:.5)*(u[2]-1):0):m?(nt=(u[0]-1)/2,K=(u[1]-1)/2,ct=_t===3?(u[2]-1)/2:0):(nt=O%u[0],K=Kr(O/u[0])%u[1],ct=_t===3?Kr(O/Q):0);let ut=wt%u[0],Rt=Kr(wt/u[0])%u[1],Pt=_t===3?Kr(wt/Q):0,xt=nt-ut,Vt=K-Rt,L=ct-Pt,Qt=vn(xt*xt+Vt*Vt+(_t===3?L*L:0));p==="x"&&(Qt=-xt),p==="y"&&(Qt=-Vt),p==="z"&&(Qt=-L),e.push(Qt)}n=e[0];for(let wt=1;wt<X;wt++)e[wt]>n&&(n=e[wt]);if(d||a)for(let wt=0;wt<X;wt++){let _t=e[wt];d&&(_t=d(_t/n)*n),a&&(_t=p?-_t:Kn(n-_t)),e[wt]=_t}if(N){r=new Array(X);for(let wt=0;wt<X;wt++)r[wt]=k(-1,1,4)}b&&(e=lp(e,k))}let Ot=T?(y-C)/n:C;pt(s)&&(s=re?eo(re,pt(t.start)?re.iterationDuration:R):R);let Lt=s+(Ot*mt(e[dt],2)||0);if(N){let wt=n?e[dt]/n:0,_t=z+(W-z)*wt;Lt=Lt+r[dt]*_t}return t.modifier&&(Lt=t.modifier(Lt)),w&&(Lt=`${Lt}${w[2]}`),Lt}}});var hp={};el(hp,{$:()=>hr,addChild:()=>Rn,clamp:()=>ky,cleanInlineStyles:()=>ly,createSeededRandom:()=>no,damp:()=>Wy,degToRad:()=>By,forEachChildren:()=>_e,get:()=>as,keepTime:()=>Ya,lerp:()=>Hy,mapRange:()=>Oy,padEnd:()=>Uy,padStart:()=>Ny,radToDeg:()=>zy,random:()=>$a,randomPick:()=>qy,remove:()=>Ay,removeChild:()=>zn,round:()=>Gy,roundPad:()=>Dy,set:()=>Gi,shuffle:()=>lp,snap:()=>Vy,stagger:()=>qh,sync:()=>ep,wrap:()=>Fy});var Yy=oe(()=>{Xy();cp();Wh();Qf();v0();be();Va();vi();});var up,y0=oe(()=>{be();vi();up=i=>{let e=on(i)[0];return!e||!Na(e)?console.warn(`${i} is not a valid SVGGeometryElement`):e}});var S0,b0,$y,Zy=oe(()=>{we();be();y0();S0=(i,t,e,n,s)=>{let r=e+n,o=s?Math.max(0,Math.min(r,t)):(r%t+t)%t;return i.getPointAtLength(o)},b0=(i,t,e=0)=>n=>{let s=+i.getTotalLength(),r=n[Ia],o=i.getCTM(),a=e===0;return{from:0,to:s,modifier:l=>{let c=e*s,h=l+c;if(t==="a"){let d=S0(i,s,h,-1,a),u=S0(i,s,h,1,a);return Oa(u.y-d.y,u.x-d.x)*180/Qn}else{let d=S0(i,s,h,0,a);return t==="x"?r||!o?d.x:d.x*o.a+d.y*o.c+o.e:r||!o?d.y:d.x*o.b+d.y*o.d+o.f}}}},$y=(i,t=0)=>{let e=up(i);if(e)return{translateX:b0(e,"x",t),translateY:b0(e,"y",t),rotate:b0(e,"a",t)}}});var aC,lC,Jy,Ky=oe(()=>{we();be();vi();aC=i=>{let t=1;if(i&&i.getCTM){let e=i.getCTM();if(e){let n=vn(e.a*e.a+e.b*e.b),s=vn(e.c*e.c+e.d*e.d);t=(n+s)/2}}return t},lC=(i,t,e)=>{let n=nn,s=getComputedStyle(i),r=s.strokeLinecap,o=s.vectorEffect==="non-scaling-stroke"?i:null,a=r,l=new Proxy(i,{get(c,h){let d=c[h];return h===Rf?c:h==="setAttribute"?(...u)=>{if(u[0]==="draw"){let p=u[1].split(" "),_=+p[0],g=+p[1],m=aC(o),v=_*-n*m,b=g*n*m+v,x=n*m+(_===0&&g===1||_===1&&g===0?0:10*m)-b;if(r!=="butt"){let T=_===g?"butt":r;a!==T&&(c.style.strokeLinecap=`${T}`,a=T)}c.setAttribute("stroke-dashoffset",`${v}`),c.setAttribute("stroke-dasharray",`${b} ${x}`)}return Reflect.apply(d,c,u)}:Se(d)?(...u)=>Reflect.apply(d,c,u):d}});return i.getAttribute("pathLength")!==`${n}`&&(i.setAttribute("pathLength",`${n}`),l.setAttribute("draw",`${t} ${e}`)),l},Jy=(i,t=0,e=0)=>on(i).map(s=>lC(s,t,e))});var Qy,jy=oe(()=>{be();y0();Qy=(i,t=.33)=>(e,n,s,r)=>{if(!(e.tagName||"").toLowerCase().match(/^(path|polygon|polyline)$/))throw new Error(`Can't morph a <${e.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);let a=up(i);if(!a)throw new Error("Can't morph to an invalid target. 'path2' must resolve to an existing <path>, <polygon> or <polyline> SVG element.");if(!(a.tagName||"").toLowerCase().match(/^(path|polygon|polyline)$/))throw new Error(`Can't morph a <${a.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);let c=e.tagName==="path",h=c?" ":",",d=r?r._value:null;d&&e.setAttribute(c?"d":"points",d);let u="",f="";if(!t)u=e.getAttribute(c?"d":"points"),f=a.getAttribute(c?"d":"points");else{let p=e.getTotalLength(),_=a.getTotalLength(),g=Math.max(Math.ceil(p*t),Math.ceil(_*t));for(let m=0;m<g;m++){let v=m/(g-1),b=e.getPointAtLength(p*v),x=a.getPointAtLength(_*v),T=c?m===0?"M":"L":"";u+=T+mt(b.x,3)+h+b.y+" ",f+=T+mt(x.x,3)+h+x.y+" "}}return[u,f]}});var dp={};el(dp,{createDrawable:()=>Jy,createMotionPath:()=>$y,morphTo:()=>Qy});var tS=oe(()=>{Zy();Ky();jy();});var fp,cC,hC,M0,R0,P0,Yh,$h,Zh,T0,w0,mp,eS,A0,pp,uC,nS,iS,E0,C0,Za,sS,rS,oS=oe(()=>{we();gn();be();vi();ai();Wh();fp=typeof Intl<"u"&&Intl.Segmenter,cC=/\{value\}/g,hC=/\{i\}/g,M0=/(\s+)/,R0=/^\s+$/,P0="line",Yh="word",$h="char",Zh="data-line",T0=null,w0=null,mp=null,eS=i=>i.isWordLike||i.segment===" "||ke(+i.segment),A0=i=>i.setAttribute("aria-hidden","true"),pp=(i,t)=>[...i.querySelectorAll(`[data-${t}]:not([data-${t}] [data-${t}])`)],uC={line:"#00D672",word:"#FF4B4B",char:"#5A87FF"},nS=i=>{if(!i.childElementCount&&!i.textContent.trim()){let t=i.parentElement;i.remove(),t&&nS(t)}},iS=(i,t,e)=>{let n=i.getAttribute(Zh);if(n!==null&&+n!==t||i.tagName==="BR"){e.add(i);let r=i.previousSibling,o=i.nextSibling;r&&r.nodeType===3&&R0.test(r.textContent)&&e.add(r),o&&o.nodeType===3&&R0.test(o.textContent)&&e.add(o)}let s=i.childElementCount;for(;s--;)iS(i.children[s],t,e);return e},E0=(i,t={})=>{let e="";t||(t={});let n=Ge(t.class)?` class="${t.class}"`:"",s=Ht(t.clone,!1),r=Ht(t.wrap,!1),o=r?r===!0?"clip":r:s?"clip":!1;if(r&&(e+=`<span${o?` style="overflow:${o};"`:""}>`),e+=`<span${n}${s?' style="position:relative;"':""} data-${i}="{i}">`,s){let a=s==="left"?"-100%":s==="right"?"100%":"0",l=s==="top"?"-100%":s==="bottom"?"100%":"0";e+="<span>{value}</span>",e+=`<span inert style="position:absolute;top:${l};left:${a};white-space:nowrap;">{value}</span>`}else e+="{value}";return e+="</span>",r&&(e+="</span>"),e},C0=(i,t,e,n,s,r,o,a,l)=>{let c=s===P0,h=s===$h,d=`_${s}_`,u=Se(i)?i(e):i,f=c?"block":"inline-block";mp.innerHTML=u.replace(cC,`<i class="${d}"></i>`).replace(hC,`${h?l:c?o:a}`);let p=mp.content,_=p.firstElementChild,g=p.querySelector(`[data-${s}]`)||_,m=p.querySelectorAll(`i.${d}`),v=m.length;if(v){_.style.display=f,g.style.display=f,g.setAttribute(Zh,`${o}`),c||(g.setAttribute("data-word",`${a}`),h&&g.setAttribute("data-char",`${l}`));let b=v;for(;b--;){let x=m[b],T=x.parentElement;T.style.display=f,c?T.innerHTML=e.innerHTML:T.replaceChild(e.cloneNode(!0),x)}t.push(g),n.appendChild(p)}else console.warn('The expression "{value}" is missing from the provided template.');return r&&(_.style.outline=`1px dotted ${uC[s]}`),_},Za=class{constructor(t,e={}){T0||(T0=fp?new fp([],{granularity:Yh}):{segment:p=>{let _=[],g=p.split(M0);for(let m=0,v=g.length;m<v;m++){let b=g[m];_.push({segment:b,isWordLike:!R0.test(b)})}return _}}),w0||(w0=fp?new fp([],{granularity:"grapheme"}):{segment:p=>[...p].map(_=>({segment:_}))}),!mp&&Zn&&(mp=Xt.createElement("template")),Oe.current&&Oe.current.register(this);let{words:n,chars:s,lines:r,accessible:o,includeSpaces:a,debug:l}=e,c=(t=Ye(t)?t[0]:t)&&t.nodeType?t:(Gf(t)||[])[0],h=r===!0?{}:r,d=n===!0||pt(n)?{}:n,u=s===!0?{}:s;this.debug=Ht(l,!1),this.includeSpaces=Ht(a,!1),this.accessible=Ht(o,!0),this.linesOnly=h&&!d&&!u,this.lineTemplate=Be(h)?E0(P0,h):h,this.wordTemplate=Be(d)||this.linesOnly?E0(Yh,d):d,this.charTemplate=Be(u)?E0($h,u):u,this.$target=c,this.html=c&&c.innerHTML,this.lines=[],this.words=[],this.chars=[],this.effects=[],this.effectsCleanups=[],this.cache=null,this.ready=!1,this.width=0,this.resizeTimeout=null;let f=()=>this.html&&(h||d||u)&&this.split();this.resizeObserver=new ResizeObserver(()=>{clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{let p=c.offsetWidth;p!==this.width&&(this.width=p,f())},150)}),this.lineTemplate&&!this.ready?Xt.fonts.ready.then(f):f(),c?this.resizeObserver.observe(c):console.warn("No Text Splitter target found.")}addEffect(t){if(!Se(t))return console.warn("Effect must return a function."),this;let e=Ya(t);return this.effects.push(e),this.ready&&(this.effectsCleanups[this.effects.length-1]=e(this)),this}revert(){return clearTimeout(this.resizeTimeout),this.lines.length=this.words.length=this.chars.length=0,this.resizeObserver.disconnect(),this.effectsCleanups.forEach(t=>Se(t)?t(this):t.revert&&t.revert()),this.$target.innerHTML=this.html,this}splitNode(t){let e=this.wordTemplate,n=this.charTemplate,s=this.includeSpaces,r=this.debug,o=t.nodeType;if(o===3){let a=t.nodeValue;if(a.trim()){let l=[],c=this.words,h=this.chars,d=T0.segment(a),u=Xt.createDocumentFragment(),f=null;for(let p of d){let _=p.segment,g=eS(p);if(!f||g&&f&&eS(f))l.push(_);else{let m=l.length-1,v=l[m];!M0.test(v)&&!M0.test(_)?l[m]+=_:l.push(_)}f=p}for(let p=0,_=l.length;p<_;p++){let g=l[p];if(g.trim()){let m=l[p+1],v=s&&m&&!m.trim(),b=g,x=n?w0.segment(b):null,T=n?Xt.createDocumentFragment():Xt.createTextNode(v?g+"\xA0":g);if(n){let M=[...x];for(let C=0,y=M.length;C<y;C++){let w=M[C],P=C===y-1&&v?w.segment+"\xA0":w.segment,D=Xt.createTextNode(P);C0(n,h,D,T,$h,r,-1,c.length,h.length)}}e?C0(e,c,T,u,Yh,r,-1,c.length,h.length):n?u.appendChild(T):u.appendChild(Xt.createTextNode(g)),v&&p++}else{if(p&&s)continue;u.appendChild(Xt.createTextNode(g))}}t.parentNode.replaceChild(u,t)}}else if(o===1){let a=[...t.childNodes];for(let l=0,c=a.length;l<c;l++)this.splitNode(a[l])}}split(t=!1){let e=this.$target,n=!!this.cache&&!t,s=this.lineTemplate,r=this.wordTemplate,o=this.charTemplate,a=Xt.fonts.status!=="loading",l=s&&a;this.ready=!s||a,(l||t)&&this.effectsCleanups.forEach(u=>Se(u)&&u(this)),n||(t&&(e.innerHTML=this.html,this.words.length=this.chars.length=0),this.splitNode(e),this.cache=e.innerHTML),l&&(n&&(e.innerHTML=this.cache),this.lines.length=0,r&&(this.words=pp(e,Yh))),o&&(l||r)&&(this.chars=pp(e,$h));let c=this.words.length?this.words:this.chars,h,d=0;for(let u=0,f=c.length;u<f;u++){let p=c[u],{top:_,height:g}=p.getBoundingClientRect();!pt(h)&&_-h>g*.5&&d++,p.setAttribute(Zh,`${d}`);let m=p.querySelectorAll(`[${Zh}]`),v=m.length;for(;v--;)m[v].setAttribute(Zh,`${d}`);h=_}if(l){let u=Xt.createDocumentFragment(),f=new Set,p=[];for(let _=0;_<d+1;_++){let g=e.cloneNode(!0);iS(g,_,new Set).forEach(m=>{let v=m.parentNode;v&&(m.nodeType===1&&f.add(v),v.removeChild(m))}),p.push(g)}f.forEach(nS);for(let _=0,g=p.length;_<g;_++)C0(s,this.lines,p[_],u,P0,this.debug,_);e.innerHTML="",e.appendChild(u),r&&(this.words=pp(e,Yh)),o&&(this.chars=pp(e,$h))}if(this.linesOnly){let u=this.words,f=u.length;for(;f--;){let p=u[f];p.replaceWith(p.textContent)}u.length=0}if(this.accessible&&(l||!n)){let u=Xt.createElement("span");u.style.cssText="position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;",u.innerHTML=this.html,e.insertBefore(u,e.firstChild),this.lines.forEach(A0),this.words.forEach(A0),this.chars.forEach(A0)}return this.width=e.offsetWidth,(l||t)&&this.effects.forEach((u,f)=>this.effectsCleanups[f]=u(this)),this}refresh(){this.split(!0)}},sS=(i,t)=>new Za(i,t),rS=(i,t)=>(console.warn("text.split() is deprecated, import splitText() directly, or text.splitText()"),new Za(i,t))});var aS,lS,I0,cS,hS=oe(()=>{cp();gn();be();Ds();we();aS=i=>{let t="";for(let e=0,n=i.length;e<n;e++)if(e+2<n&&i[e+1]==="-"&&i.charCodeAt(e)<i.charCodeAt(e+2)){let s=i.charCodeAt(e),r=i.charCodeAt(e+2);for(let o=s;o<=r;o++)t+=String.fromCharCode(o);e+=2}else t+=i[e];return t},lS={lowercase:"a-z",uppercase:"A-Z",numbers:"0-9",symbols:"!%#_|*+=",braille:"\u2800-\u28FF",blocks:"\u2580-\u259F",shades:"\u2591-\u2593"},I0=new WeakMap,cS=(i={})=>{i||(i={});let t=i.chars,e=Vn(i.ease||"linear"),n=i.text,s=i.from,r=i.reversed||!1,o=i.perturbation||0,a=i.cursor,l=a===!0?"_":typeof a=="number"?String.fromCharCode(a):typeof a=="string"?a:"",c=l.length,h=i.seed||0,d=i.override!==void 0?i.override:!0,u=i.revealRate||60,f=1e3*At.timeScale/u,p=i.settleDuration||300*At.timeScale,_=i.settleRate||30,g=i.duration,m=i.revealDelay,v=i.delay,b=i.onChange||ne;return(x,T,M,C)=>{let y=typeof t=="function"?t(x,T,M):t||"a-zA-Z0-9!%#_",w=aS(lS[y]||y),R=w.length-1,P=typeof g=="function"?g(x,T,M):g,D=typeof m=="function"?m(x,T,M):m||0,k=typeof v=="function"?v(x,T,M):v||0,F=h?no(h):no();I0.has(x)||I0.set(x,x.textContent);let N=C?C._value:x.textContent,G=n!==void 0?typeof n=="function"?n(x,T,M):n:C?C._value:I0.get(x),z=G===" "||G==="&nbsp;"?"\xA0":G,W=N==="\xA0"?0:N.length,O=z.length,j=d===!0?w:typeof d=="string"&&d.length>0?aS(lS[d]||d):null,rt=j?j.length-1:0,ft=d===" "?"\xA0":null,Tt=d===""?O:Math.max(W,O),re=P>0?P:(Tt-1)*f+p,Yt=mt((re+D)/At.timeScale,0)*At.timeScale,X=D>0?mt(D/Yt,12):0,ot=s===void 0||s==="auto"?O<W?"right":"left":s,tt=new Int32Array(Tt);if(ot==="random"){for(let st=0;st<Tt;st++)tt[st]=st;for(let st=Tt-1;st>0;st--){let E=F(0,st),S=tt[st];tt[st]=tt[E],tt[E]=S}}else{let st=ot==="right"?(d===""||!W?Tt:W)-1:ot==="center"?((d===""||!W?Tt:W)-1)/2:typeof ot=="number"?ot:0,E=Math.abs,S=new Array(Tt);for(let U=0;U<Tt;U++)S[U]=U;S.sort((U,V)=>E(U-st)-E(V-st));for(let U=0;U<Tt;U++)tt[S[U]]=U}if(r){let st=Tt-1;for(let E=0;E<Tt;E++)tt[E]=st-tt[E]}let dt=mt(p/re,12),Ot=mt((1-dt)/Tt,12),Lt=c*Ot,wt=mt(1e3*At.timeScale/(_*Yt),12),_t=new Float32Array(Tt),Q=new Float32Array(Tt),nt=o>0?o*dt:0;for(let st=0;st<Tt;st++){let E=nt>0?(F(0,2e3)-1e3)/1e3*nt:0,S=nt>0?(F(0,2e3)-1e3)/1e3*nt:0;_t[st]=tt[st]*Ot+E,Q[st]=Math.ceil((_t[st]+dt+S)/wt)*wt}if(O<Tt&&ot!=="left"&&ot!=="right"&&ot!=="random"){let st=0;for(let U=O;U<Tt;U++)Q[U]>st&&(st=Q[U]);let E=new Array(O);for(let U=0;U<O;U++)E[U]=U;E.sort((U,V)=>tt[U]-tt[V]);let S=(1-st)/O;for(let U=0;U<O;U++){let V=st+U*S;V>Q[E[U]]&&(Q[E[U]]=V)}}let K=new Array(Tt);for(let st=0;st<Tt;st++)K[st]=w[F(0,R)];let ct=j?j===w?K:new Array(Tt):null;if(ct&&ct!==K)for(let st=0;st<Tt;st++)ct[st]=ft||j[F(0,j.length-1)];let ut=N;if(!C){if(d==="")ut="";else if(j){ut="";for(let st=0;st<W;st++)ut+=N[st]===" "?" ":ct[st]}}let Rt=-1,Pt=-1,xt="",Vt=d!=="",L=!!j,Qt=c>0;return{from:0,to:1,duration:Yt,delay:k,ease:"linear",modifier:st=>{if(st===Rt)return xt;if(Rt=st,k>0&&st<=0)return xt=N,N;if(st<=0)return xt=ut,ut;if(st>=1)return xt=z,z;xt="";let E=st/wt|0,S=E!==Pt;S&&(Pt=E);let U=X>0?(st-X)/(1-X):st,V=U>0?e(U):0;for(let q=0;q<Tt;q++){let ht=_t[q],gt=Q[q];if(V>=gt){q<O&&(xt+=z[q]);continue}if(V<=0||V<ht){Vt&&q<W&&(L?N[q]===" "?xt+=" ":(S&&(ct[q]=ft||j[F(0,rt)]),xt+=ct[q]):xt+=N[q]);continue}q<O&&z[q]===" "||q<W&&N[q]===" "?xt+=" ":Qt&&V-ht<Lt?xt+=l[c-1-((V-ht)/Ot|0)]:(S&&(K[q]=w[F(0,R)]),xt+=K[q])}return S&&b(xt,V),xt}}}}});var gp={};el(gp,{TextSplitter:()=>Za,scrambleText:()=>cS,split:()=>rS,splitText:()=>sS});var uS=oe(()=>{oS();hS();});var dS=oe(()=>{jr();Xa();Sy();Ey();Cy();Iy();Yy();tS();uS();d0();Ds();v0();});function L0(i,t,e){return Ns(i,fr(t,e))}function Ja(i,t){return typeof i=="function"?i(t):i}function io(i){return i.split("-")[0]}function Ka(i){return i.split("-")[1]}function D0(i){return i==="x"?"y":"x"}function xp(i){return i==="y"?"height":"width"}function Us(i){let t=i[0];return t==="t"||t==="b"?"y":"x"}function vp(i){return D0(Us(i))}function mS(i,t,e){e===void 0&&(e=!1);let n=Ka(i),s=vp(i),r=xp(s),o=s==="x"?n===(e?"end":"start")?"right":"left":n==="start"?"bottom":"top";return t.reference[r]>t.floating[r]&&(o=Jh(o)),[o,Jh(o)]}function gS(i){let t=Jh(i);return[_p(i),t,_p(t)]}function _p(i){return i.includes("start")?i.replace("start","end"):i.replace("end","start")}function mC(i,t,e){switch(i){case"top":case"bottom":return e?t?pS:fS:t?fS:pS;case"left":case"right":return t?fC:pC;default:return[]}}function _S(i,t,e,n){let s=Ka(i),r=mC(io(i),e==="start",n);return s&&(r=r.map(o=>o+"-"+s),t&&(r=r.concat(r.map(_p)))),r}function Jh(i){let t=io(i);return dC[t]+i.slice(t.length)}function gC(i){var t,e,n,s;return{top:(t=i.top)!=null?t:0,right:(e=i.right)!=null?e:0,bottom:(n=i.bottom)!=null?n:0,left:(s=i.left)!=null?s:0}}function N0(i){return typeof i!="number"?gC(i):{top:i,right:i,bottom:i,left:i}}function so(i){let{x:t,y:e,width:n,height:s}=i;return{width:n,height:s,top:e,left:t,right:t+n,bottom:e+s,x:t,y:e}}var fr,Ns,Kh,Qh,ls,dC,fS,pS,fC,pC,yp=oe(()=>{fr=Math.min,Ns=Math.max,Kh=Math.round,Qh=Math.floor,ls=i=>({x:i,y:i}),dC={left:"right",right:"left",bottom:"top",top:"bottom"};fS=["left","right"],pS=["right","left"],fC=["top","bottom"],pC=["bottom","top"]});function xS(i,t,e){let{reference:n,floating:s}=i,r=Us(t),o=vp(t),a=xp(o),l=io(t),c=r==="y",h=n.x+n.width/2-s.width/2,d=n.y+n.height/2-s.height/2,u=n[a]/2-s[a]/2,f;switch(l){case"top":f={x:h,y:n.y-s.height};break;case"bottom":f={x:h,y:n.y+n.height};break;case"right":f={x:n.x+n.width,y:d};break;case"left":f={x:n.x-s.width,y:d};break;default:f={x:n.x,y:n.y}}let p=Ka(t);return p&&(f[o]+=u*(p==="end"?1:-1)*(e&&c?-1:1)),f}async function vS(i,t){var e;t===void 0&&(t={});let{x:n,y:s,platform:r,rects:o,elements:a,strategy:l}=i,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:u=!1,padding:f=0}=Ja(t,i),p=N0(f),g=a[u?d==="floating"?"reference":"floating":d],m=so(await r.getClippingRect({element:(e=await(r.isElement==null?void 0:r.isElement(g)))==null||e?g:g.contextElement||await(r.getDocumentElement==null?void 0:r.getDocumentElement(a.floating)),boundary:c,rootBoundary:h,strategy:l})),v=d==="floating"?{x:n,y:s,width:o.floating.width,height:o.floating.height}:o.reference,b=await(r.getOffsetParent==null?void 0:r.getOffsetParent(a.floating)),x=await(r.isElement==null?void 0:r.isElement(b))&&await(r.getScale==null?void 0:r.getScale(b))||{x:1,y:1},T=so(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:v,offsetParent:b,strategy:l}):v);return{top:(m.top-T.top+p.top)/x.y,bottom:(T.bottom-m.bottom+p.bottom)/x.y,left:(m.left-T.left+p.left)/x.x,right:(T.right-m.right+p.right)/x.x}}async function vC(i,t){let{placement:e,platform:n,elements:s}=i,r=await(n.isRTL==null?void 0:n.isRTL(s.floating)),o=io(e),a=Ka(e),l=Us(e)==="y",c=xC.has(o)?-1:1,h=r&&l?-1:1,d=Ja(t,i),{mainAxis:u,crossAxis:f,alignmentAxis:p}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&typeof p=="number"&&(f=a==="end"?p*-1:p),l?{x:f*h,y:u*c}:{x:u*c,y:f*h}}var _C,yS,SS,bS,xC,MS,TS,wS=oe(()=>{yp();yp();_C=50,yS=async(i,t,e)=>{let{placement:n="bottom",strategy:s="absolute",middleware:r=[],platform:o}=e,a=o.detectOverflow?o:{...o,detectOverflow:vS},l=await(o.isRTL==null?void 0:o.isRTL(t)),c=await o.getElementRects({reference:i,floating:t,strategy:s}),{x:h,y:d}=xS(c,n,l),u=n,f=0,p={};for(let _=0;_<r.length;_++){let g=r[_];if(!g)continue;let{name:m,fn:v}=g,{x:b,y:x,data:T,reset:M}=await v({x:h,y:d,initialPlacement:n,placement:u,strategy:s,middlewareData:p,rects:c,platform:a,elements:{reference:i,floating:t}});h=b??h,d=x??d,p[m]={...p[m],...T},M&&f<_C&&(f++,typeof M=="object"&&(M.placement&&(u=M.placement),M.rects&&(c=M.rects===!0?await o.getElementRects({reference:i,floating:t,strategy:s}):M.rects),{x:h,y:d}=xS(c,u,l)),_=-1)}return{x:h,y:d,placement:u,strategy:s,middlewareData:p}},SS=i=>({name:"arrow",options:i,async fn(t){let{x:e,y:n,placement:s,rects:r,platform:o,elements:a,middlewareData:l}=t,{element:c,padding:h=0}=Ja(i,t)||{};if(c==null)return{};let d=N0(h),u={x:e,y:n},f=vp(s),p=xp(f),_=await o.getDimensions(c),g=f==="y",m=g?"top":"left",v=g?"bottom":"right",b=g?"clientHeight":"clientWidth",x=r.reference[p]+r.reference[f]-u[f]-r.floating[p],T=u[f]-r.reference[f],M=await(o.getOffsetParent==null?void 0:o.getOffsetParent(c)),C=M?M[b]:0;(!C||!await(o.isElement==null?void 0:o.isElement(M)))&&(C=a.floating[b]||r.floating[p]);let y=x/2-T/2,w=C/2-_[p]/2-1,R=fr(d[m],w),P=fr(d[v],w),D=C-_[p]-P,k=C/2-_[p]/2+y,F=L0(R,k,D),N=!l.arrow&&Ka(s)!=null&&k!==F&&r.reference[p]/2-(k<R?R:P)-_[p]/2<0,G=N?k<R?k-R:k-D:0;return{[f]:u[f]+G,data:{[f]:F,centerOffset:k-F-G,...N&&{alignmentOffset:G}},reset:N}}}),bS=function(i){return i===void 0&&(i={}),{name:"flip",options:i,async fn(t){var e,n;let{placement:s,middlewareData:r,rects:o,initialPlacement:a,platform:l,elements:c}=t,{mainAxis:h=!0,crossAxis:d=!0,fallbackPlacements:u,fallbackStrategy:f="bestFit",fallbackAxisSideDirection:p="none",flipAlignment:_=!0,...g}=Ja(i,t);if((e=r.arrow)!=null&&e.alignmentOffset)return{};let m=io(s),v=Us(a),b=io(a)===a,x=await(l.isRTL==null?void 0:l.isRTL(c.floating)),T=u||(b||!_?[Jh(a)]:gS(a)),M=p!=="none";!u&&M&&T.push(..._S(a,_,p,x));let C=[a,...T],y=await l.detectOverflow(t,g),w=[],R=((n=r.flip)==null?void 0:n.overflows)||[];if(h&&w.push(y[m]),d){let F=mS(s,o,x);w.push(y[F[0]],y[F[1]])}if(R=[...R,{placement:s,overflows:w}],!w.every(F=>F<=0)){var P,D;let F=(((P=r.flip)==null?void 0:P.index)||0)+1,N=C[F];if(N&&(!(d==="alignment"?v!==Us(N):!1)||R.every(W=>Us(W.placement)===v?W.overflows[0]>0:!0)))return{data:{index:F,overflows:R},reset:{placement:N}};let G=(D=R.filter(z=>z.overflows[0]<=0).sort((z,W)=>z.overflows[1]-W.overflows[1])[0])==null?void 0:D.placement;if(!G)switch(f){case"bestFit":{var k;let z=(k=R.filter(W=>{if(M){let O=Us(W.placement);return O===v||O==="y"}return!0}).map(W=>[W.placement,W.overflows.filter(O=>O>0).reduce((O,j)=>O+j,0)]).sort((W,O)=>W[1]-O[1])[0])==null?void 0:k[0];z&&(G=z);break}case"initialPlacement":G=a;break}if(s!==G)return{reset:{placement:G}}}return{}}}},xC=new Set(["left","top"]);MS=function(i){return i===void 0&&(i=0),{name:"offset",options:i,async fn(t){var e,n;let{x:s,y:r,placement:o,middlewareData:a}=t,l=await vC(t,i);return o===((e=a.offset)==null?void 0:e.placement)&&(n=a.arrow)!=null&&n.alignmentOffset?{}:{x:s+l.x,y:r+l.y,data:{...l,placement:o}}}}},TS=function(i){return i===void 0&&(i={}),{name:"shift",options:i,async fn(t){let{x:e,y:n,placement:s,platform:r}=t,{mainAxis:o=!0,crossAxis:a=!1,limiter:l={fn:v=>{let{x:b,y:x}=v;return{x:b,y:x}}},...c}=Ja(i,t),h={x:e,y:n},d=await r.detectOverflow(t,c),u=Us(s),f=D0(u),p=h[f],_=h[u],g=(v,b)=>L0(b+d[v==="y"?"top":"left"],b,b-d[v==="y"?"bottom":"right"]);o&&(p=g(f,p)),a&&(_=g(u,_));let m=l.fn({...t,[f]:p,[u]:_});return{...m,data:{x:m.x-e,y:m.y-n,enabled:{[f]:o,[u]:a}}}}}}});function Sp(){return typeof window<"u"}function oo(i){return ES(i)?(i.nodeName||"").toLowerCase():"#document"}function Hn(i){var t;return(i==null||(t=i.ownerDocument)==null?void 0:t.defaultView)||window}function cs(i){var t;return(t=(ES(i)?i.ownerDocument:i.document)||window.document)==null?void 0:t.documentElement}function ES(i){return Sp()?i instanceof Node||i instanceof Hn(i).Node:!1}function Hi(i){return Sp()?i instanceof Element||i instanceof Hn(i).Element:!1}function Fs(i){return Sp()?i instanceof HTMLElement||i instanceof Hn(i).HTMLElement:!1}function AS(i){return!Sp()||typeof ShadowRoot>"u"?!1:i instanceof ShadowRoot||i instanceof Hn(i).ShadowRoot}function jh(i){let{overflow:t,overflowX:e,overflowY:n,display:s}=Wi(i);return/auto|scroll|overlay|hidden|clip/.test(t+n+e)&&s!=="inline"&&s!=="contents"}function CS(i){return/^(table|td|th)$/.test(oo(i))}function tu(i){try{if(i.matches(":popover-open"))return!0}catch{}try{return i.matches(":modal")}catch{return!1}}function bp(i){let t=Hi(i)?Wi(i):i;return ro(t.transform)||ro(t.translate)||ro(t.scale)||ro(t.rotate)||ro(t.perspective)||!Mp()&&(ro(t.backdropFilter)||ro(t.filter))||yC.test(t.willChange||"")||SC.test(t.contain||"")}function RS(i){let t=pr(i);for(;Fs(t)&&!ja(t);){if(bp(t))return t;if(tu(t))return null;t=pr(t)}return null}function Mp(){return U0==null&&(U0=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),U0}function ja(i){return/^(html|body|#document)$/.test(oo(i))}function Wi(i){return Hn(i).getComputedStyle(i)}function eu(i){return Hi(i)?{scrollLeft:i.scrollLeft,scrollTop:i.scrollTop}:{scrollLeft:i.scrollX,scrollTop:i.scrollY}}function pr(i){if(oo(i)==="html")return i;let t=i.assignedSlot||i.parentNode||AS(i)&&i.host||cs(i);return AS(t)?t.host:t}function PS(i){let t=pr(i);return ja(t)?(i.ownerDocument||i).body:Fs(t)&&jh(t)?t:PS(t)}function Qa(i,t,e){var n;t===void 0&&(t=[]),e===void 0&&(e=!0);let s=PS(i),r=s===((n=i.ownerDocument)==null?void 0:n.body),o=Hn(s);if(r){let a=Tp(o);return t.concat(o,o.visualViewport||[],jh(s)?s:[],a&&e?Qa(a):[])}else return t.concat(s,Qa(s,[],e))}function Tp(i){return i.parent&&Object.getPrototypeOf(i.parent)?i.frameElement:null}var yC,SC,ro,U0,IS=oe(()=>{yC=/transform|translate|scale|rotate|perspective|filter/,SC=/paint|layout|strict|content/,ro=i=>!!i&&i!=="none"});function NS(i){let t=Wi(i),e=parseFloat(t.width)||0,n=parseFloat(t.height)||0,s=Fs(i),r=s?i.offsetWidth:e,o=s?i.offsetHeight:n,a=Kh(e)!==r||Kh(n)!==o;return a&&(e=r,n=o),{width:e,height:n,$:a}}function O0(i){return Hi(i)?i:i.contextElement}function tl(i){let t=O0(i);if(!Fs(t))return ls(1);let e=t.getBoundingClientRect(),{width:n,height:s,$:r}=NS(t),o=(r?Kh(e.width):e.width)/n,a=(r?Kh(e.height):e.height)/s;return(!o||!Number.isFinite(o))&&(o=1),(!a||!Number.isFinite(a))&&(a=1),{x:o,y:a}}function US(i){let t=Hn(i);return!Mp()||!t.visualViewport?bC:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function MC(i,t,e){return t===void 0&&(t=!1),!!e&&t&&e===Hn(i)}function ao(i,t,e,n){t===void 0&&(t=!1),e===void 0&&(e=!1);let s=i.getBoundingClientRect(),r=O0(i),o=ls(1);t&&(n?Hi(n)&&(o=tl(n)):o=tl(i));let a=MC(r,e,n)?US(r):ls(0),l=(s.left+a.x)/o.x,c=(s.top+a.y)/o.y,h=s.width/o.x,d=s.height/o.y;if(r&&n){let u=Hn(r),f=Hi(n)?Hn(n):n,p=u,_=Tp(p);for(;_&&f!==p;){let g=tl(_),m=_.getBoundingClientRect(),v=Wi(_),b=m.left+(_.clientLeft+parseFloat(v.paddingLeft))*g.x,x=m.top+(_.clientTop+parseFloat(v.paddingTop))*g.y;l*=g.x,c*=g.y,h*=g.x,d*=g.y,l+=b,c+=x,p=Hn(_),_=Tp(p)}}return so({width:h,height:d,x:l,y:c})}function wp(i,t){let e=eu(i).scrollLeft;return t?t.left+e:ao(cs(i)).left+e}function FS(i,t){let e=i.getBoundingClientRect(),n=e.left+t.scrollLeft-wp(i,e),s=e.top+t.scrollTop;return{x:n,y:s}}function TC(i){let{elements:t,rect:e,offsetParent:n,strategy:s}=i,r=s==="fixed",o=cs(n),a=t?tu(t.floating):!1;if(n===o||a&&r)return e;let l={scrollLeft:0,scrollTop:0},c=ls(1),h=ls(0),d=Fs(n);if((d||!r)&&((oo(n)!=="body"||jh(o))&&(l=eu(n)),d)){let f=ao(n);c=tl(n),h.x=f.x+n.clientLeft,h.y=f.y+n.clientTop}let u=o&&!d&&!r?FS(o,l):ls(0);return{width:e.width*c.x,height:e.height*c.y,x:e.x*c.x-l.scrollLeft*c.x+h.x+u.x,y:e.y*c.y-l.scrollTop*c.y+h.y+u.y}}function wC(i){return i.getClientRects?Array.from(i.getClientRects()):[]}function AC(i){let t=eu(i),e=i.ownerDocument.body,n=Ns(i.scrollWidth,i.clientWidth,e.scrollWidth,e.clientWidth),s=Ns(i.scrollHeight,i.clientHeight,e.scrollHeight,e.clientHeight),r=-t.scrollLeft+wp(i),o=-t.scrollTop;return Wi(e).direction==="rtl"&&(r+=Ns(i.clientWidth,e.clientWidth)-n),{width:n,height:s,x:r,y:o}}function CC(i,t,e){e===void 0&&(e="viewport");let n=e==="layoutViewport",s=Hn(i),r=cs(i),o=s.visualViewport,a=r.clientWidth,l=r.clientHeight,c=0,h=0;if(o){let u=!Mp()||t==="fixed";n?u||(c=-o.offsetLeft,h=-o.offsetTop):(a=o.width,l=o.height,u&&(c=o.offsetLeft,h=o.offsetTop))}if(wp(r)<=0){let u=r.ownerDocument,f=u.body,p=getComputedStyle(f),_=u.compatMode==="CSS1Compat"&&parseFloat(p.marginLeft)+parseFloat(p.marginRight)||0,g=Math.abs(r.clientWidth-f.clientWidth-_),m=getComputedStyle(r).scrollbarGutter==="stable both-edges"?g/2:g;m<=EC&&(a-=m)}return{width:a,height:l,x:c,y:h}}function RC(i,t){let e=ao(i,!0,t==="fixed"),n=e.top+i.clientTop,s=e.left+i.clientLeft,r=tl(i),o=i.clientWidth*r.x,a=i.clientHeight*r.y,l=s*r.x,c=n*r.y;return{width:o,height:a,x:l,y:c}}function LS(i,t,e){let n;if(t==="viewport"||t==="layoutViewport")n=CC(i,e,t);else if(t==="document")n=AC(cs(i));else if(Hi(t))n=RC(t,e);else{let s=US(i);n={x:t.x-s.x,y:t.y-s.y,width:t.width,height:t.height}}return so(n)}function PC(i,t){let e=t.get(i);if(e)return e;let n=Qa(i,[],!1).filter(a=>Hi(a)&&oo(a)!=="body"),s=null,r=Wi(i).position==="fixed",o=r?pr(i):i;for(;Hi(o)&&!ja(o);){let a=Wi(o),l=bp(o),c=s?s.position:r?"fixed":"";!l&&(c==="fixed"||c==="absolute"&&a.position==="static")?n=n.filter(d=>d!==o):s=a,o=pr(o)}return t.set(i,n),n}function IC(i){let{element:t,boundary:e,rootBoundary:n,strategy:s}=i,o=[...e==="clippingAncestors"?tu(t)?[]:PC(t,this._c):[].concat(e),n],a=LS(t,o[0],s),l=a.top,c=a.right,h=a.bottom,d=a.left;for(let u=1;u<o.length;u++){let f=LS(t,o[u],s);l=Ns(f.top,l),c=fr(f.right,c),h=fr(f.bottom,h),d=Ns(f.left,d)}return{width:c-d,height:h-l,x:d,y:l}}function LC(i){let{width:t,height:e}=NS(i);return{width:t,height:e}}function DC(i,t,e){let n=Fs(t),s=cs(t),r=e==="fixed",o=ao(i,!0,r,t),a={scrollLeft:0,scrollTop:0},l=ls(0);if((n||!r)&&((oo(t)!=="body"||jh(s))&&(a=eu(t)),n)){let u=ao(t,!0,r,t);l.x=u.x+t.clientLeft,l.y=u.y+t.clientTop}!n&&s&&(l.x=wp(s));let c=s&&!n&&!r?FS(s,a):ls(0),h=o.left+a.scrollLeft-l.x-c.x,d=o.top+a.scrollTop-l.y-c.y;return{x:h,y:d,width:o.width,height:o.height}}function F0(i){return Wi(i).position==="static"}function DS(i,t){if(!Fs(i)||Wi(i).position==="fixed")return null;if(t)return t(i);let e=i.offsetParent;return cs(i)===e&&(e=e.ownerDocument.body),e}function OS(i,t){let e=Hn(i);if(tu(i))return e;if(!Fs(i)){let s=pr(i);for(;s&&!ja(s);){if(Hi(s)&&!F0(s))return s;s=pr(s)}return e}let n=DS(i,t);for(;n&&CS(n)&&F0(n);)n=DS(n,t);return n&&ja(n)&&F0(n)&&!bp(n)?e:n||RS(i)||e}function UC(i){return Wi(i).direction==="rtl"}function BS(i,t){return i.x===t.x&&i.y===t.y&&i.width===t.width&&i.height===t.height}function OC(i,t,e){let n=null,s,r=cs(i);function o(){var h;clearTimeout(s),(h=n)==null||h.disconnect(),n=null}function a(h,d){h===void 0&&(h=!1),d===void 0&&(d=1),o();let u=i.getBoundingClientRect(),{left:f,top:p,width:_,height:g}=u;if(h||t(),!_||!g)return;let m=Qh(p),v=Qh(r.clientWidth-(f+_)),b=Qh(r.clientHeight-(p+g)),x=Qh(f),M={rootMargin:-m+"px "+-v+"px "+-b+"px "+-x+"px",threshold:Ns(0,fr(1,d))||1},C=!0;function y(w){let R=w[0].intersectionRatio;if(!BS(u,i.getBoundingClientRect()))return a();if(R!==d){if(!C)return a();R?a(!1,R):s=setTimeout(()=>{a(!1,1e-7)},1e3)}C=!1}try{n=new IntersectionObserver(y,{...M,root:r.ownerDocument})}catch{n=new IntersectionObserver(y,M)}n.observe(i)}let l=Hn(i),c=()=>a(e);return l.addEventListener("resize",c),a(!0),()=>{l.removeEventListener("resize",c),o()}}function zS(i,t,e,n){n===void 0&&(n={});let{ancestorScroll:s=!0,ancestorResize:r=!0,elementResize:o=typeof ResizeObserver=="function",layoutShift:a=typeof IntersectionObserver=="function",animationFrame:l=!1}=n,c=O0(i),h=s||r?[...c?Qa(c):[],...t?Qa(t):[]]:[];h.forEach(m=>{s&&m.addEventListener("scroll",e),r&&m.addEventListener("resize",e)});let d=c&&a?OC(c,e,r):null,u=-1,f=null;o&&(f=new ResizeObserver(m=>{let[v]=m;v&&v.target===c&&f&&t&&(f.unobserve(t),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var b;(b=f)==null||b.observe(t)})),e()}),c&&!l&&f.observe(c),t&&f.observe(t));let p,_=l?ao(i):null;l&&g();function g(){let m=ao(i);_&&!BS(_,m)&&e(),_=m,p=requestAnimationFrame(g)}return e(),()=>{var m;h.forEach(v=>{s&&v.removeEventListener("scroll",e),r&&v.removeEventListener("resize",e)}),d?.(),(m=f)==null||m.disconnect(),f=null,l&&cancelAnimationFrame(p)}}var bC,EC,NC,FC,VS,kS,GS,HS,WS,XS=oe(()=>{wS();yp();IS();bC=ls(0);EC=25;NC=async function(i){let t=this.getOffsetParent||OS,e=this.getDimensions,n=await e(i.floating);return{reference:DC(i.reference,await t(i.floating),i.strategy),floating:{x:0,y:0,width:n.width,height:n.height}}};FC={convertOffsetParentRelativeRectToViewportRelativeRect:TC,getDocumentElement:cs,getClippingRect:IC,getOffsetParent:OS,getElementRects:NC,getClientRects:wC,getDimensions:LC,getScale:tl,isElement:Hi,isRTL:UC};VS=MS,kS=TS,GS=bS,HS=SS,WS=(i,t,e)=>{let n=new Map,s=e??{},r={...FC,...s.platform,_c:n};return yS(i,t,{...s,platform:r})}});var BC=tb(()=>{kv();dS();XS();window.THREE=Fg;window.A={animate:r0,createTimeline:l0,createTimer:e0,createScope:g0,createDraggable:m0,createSpring:u0,stagger:qh,svg:dp,text:gp,utils:hp,eases:ki,onScroll:x0};window.FUI={computePosition:WS,offset:VS,flip:GS,shift:kS,arrow:HS,autoUpdate:zS}});BC();})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

animejs/dist/modules/core/consts.js:
animejs/dist/modules/core/globals.js:
animejs/dist/modules/core/helpers.js:
animejs/dist/modules/core/transforms.js:
animejs/dist/modules/core/colors.js:
animejs/dist/modules/core/values.js:
animejs/dist/modules/core/render.js:
animejs/dist/modules/core/styles.js:
animejs/dist/modules/core/clock.js:
animejs/dist/modules/core/targets.js:
animejs/dist/modules/core/units.js:
  (**
   * Anime.js - core - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/adapters/registry.js:
  (**
   * Anime.js - adapters - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/animation/additive.js:
animejs/dist/modules/animation/composition.js:
animejs/dist/modules/animation/animation.js:
  (**
   * Anime.js - animation - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/engine/engine.js:
  (**
   * Anime.js - engine - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timer/timer.js:
  (**
   * Anime.js - timer - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/easings/none.js:
animejs/dist/modules/easings/eases/parser.js:
animejs/dist/modules/easings/spring/index.js:
  (**
   * Anime.js - easings - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/timeline/position.js:
animejs/dist/modules/timeline/timeline.js:
  (**
   * Anime.js - timeline - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/animatable/animatable.js:
  (**
   * Anime.js - animatable - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/utils/number.js:
animejs/dist/modules/utils/target.js:
animejs/dist/modules/utils/time.js:
animejs/dist/modules/utils/chainable.js:
animejs/dist/modules/utils/random.js:
animejs/dist/modules/utils/stagger.js:
animejs/dist/modules/utils/index.js:
  (**
   * Anime.js - utils - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/waapi/composition.js:
  (**
   * Anime.js - waapi - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/draggable/draggable.js:
  (**
   * Anime.js - draggable - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/scope/scope.js:
  (**
   * Anime.js - scope - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/events/scroll.js:
  (**
   * Anime.js - events - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/svg/helpers.js:
animejs/dist/modules/svg/motionpath.js:
animejs/dist/modules/svg/drawable.js:
animejs/dist/modules/svg/morphto.js:
animejs/dist/modules/svg/index.js:
  (**
   * Anime.js - svg - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/text/split.js:
animejs/dist/modules/text/scramble.js:
animejs/dist/modules/text/index.js:
  (**
   * Anime.js - text - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)

animejs/dist/modules/index.js:
  (**
   * Anime.js - ESM
   * @version v4.5.0
   * @license MIT
   * @copyright 2026 - Julian Garnier
   *)
*/
