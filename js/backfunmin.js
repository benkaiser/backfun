function Backfun(a,b){function q(a){ev=a||window.event;j=ev.pageX;k=ev.pageY-$(document).scrollTop()}var d=a;var e=b;var f=$("<canvas></canvas>").attr({id:"backFunCanvas"}).get(0);var g=f.getContext("2d");var h=document.body.clientWidth;var i=window.innerHeight;var j=-100,k=-100;var l=new Array;var m=new Array;var n=false;f.width=h;f.height=i;f.style.position="fixed";f.style.zIndex="-1";f.style.margin="0";f.style.padding="0";var o=$("#"+d).css("margin-top");f.style.marginTop=o==0?0:"-"+o;$("#"+d).before(jQuery(f));$("#"+d).css("z-index","1");$(window).resize(function(){h=document.body.clientWidth;i=window.innerHeight;f.height=i;f.width=h});document.onmousemove=q;this.addMouse=function(a){m.push({mouse:true,col:a});n=true;return m.length-1};this.addPoint=function(a,b,c){m.push({mouse:false,x:a,y:b,col:c});return m.length-1};this.get=function(a){return m[a]};var r=function(){for(p in m){p=m[p];var a=j,b=k;if(!p.mouse){a=p.x;b=p.y}var d="#FFF";if(p.col!==undefined){d=p.col[Math.floor(Math.random()*p.col.length)]}else{d=rgbToHex(hslToRgb(Math.random(),1,.5))}var e={x:a,y:b,s:Math.random()*20+5,color:d,mx:Math.random()*10-5,my:Math.random()*10-5};l.push(e)}for(c in l){var f=c;c=l[c];c.x+=c.mx;c.y+=c.my;c.s-=.5;if(c.s<1){l.splice(f,1)}}};this.start=function(){setInterval(this.render,1e3/24)};this.render=function(){r();g.fillStyle=e;g.fillRect(0,0,1e4,1e4);for(c in l){c=l[c];drawCircle(g,c.color,c.x,c.y,c.s,0,0)}if(n){drawCircle(g,"rgba(0,0,0,.5)",j,k,10,0,0)}};this.setBackgroundColor=function(a){this.bc=a};this.setCenterDivId=function(a){this.cdiv=a};this.getBackgroundColor=function(){return this.bc};this.getCenterDivId=function(){return this.cdiv}}function LoadingSign(){var a=$("<canvas></canvas>").attr({id:"loadCanvas"}).get(0);var b=a.getContext("2d");var d=600;var e=600;var f=600;var g=0;var h=new Array;var i=0;a.width=e;a.height=f;a.style.position="fixed";a.style.zIndex="100";a.style.margin="0";a.style.padding="0";a.style.top="50%";a.style.left="50%";a.style.marginTop="-"+d/2+"px";a.style.marginLeft="-"+d/2+"px";a.style.display="none";document.body.appendChild(a);var j=function(){var a=hslToRgb(Math.random(),1,.5);var b={x:d/2,y:d/2,s:Math.random()*20+5,color:"rgba("+a.r+","+a.g+","+a.b+",.5)",mx:Math.random()*10-5,my:Math.random()*10-5};h.push(b);for(c in h){var e=c;c=h[c];c.x+=c.mx;c.y+=c.my;c.s-=.5;if(c.s<1){h.splice(e,1)}}g+=.01};this.begin=function(){i=setInterval(this.render,1e3/24)};this.stop=function(){clearInterval(i);h=new Array;a.style.display="none"};this.render=function(){j();b.clearRect(0,0,d,d);for(c in h){c=h[c];drawCircle(b,c.color,c.x,c.y,c.s,0,0)}var e=g%1<.5?1-g%1:g%1;b.fillStyle="rgba(0,0,0,"+e+")";b.font="30px sans-serif";b.textBaseline="bottom";b.fillText("Loading...",d/2-50,d/2);a.style.display="block"}}function drawCircle(a,b,c,d,e,f,g){a.fillStyle=b;a.beginPath();a.arc(c,d,e,0,Math.PI*2,false);a.closePath();if(f!=0){a.lineWidth=f;a.strokeStyle=g;a.stroke()}a.fill()}function hslToRgb(a,b,c){var d,e,f;if(b==0){d=e=f=c}else{function g(a,b,c){if(c<0)c+=1;if(c>1)c-=1;if(c<1/6)return a+(b-a)*6*c;if(c<1/2)return b;if(c<2/3)return a+(b-a)*(2/3-c)*6;return a}var h=c<.5?c*(1+b):c+b-c*b;var i=2*c-h;d=g(i,h,a+1/3);e=g(i,h,a);f=g(i,h,a-1/3)}return{r:parseInt(d*255),g:parseInt(e*255),b:parseInt(f*255)}}function rgbToHex(a){return"#"+((1<<24)+(a.r<<16)+(a.g<<8)+a.b).toString(16).slice(1)}