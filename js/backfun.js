/* Backfun class
 * Author: Benjamin Kaiser
 * Website: kaiserapps.com
 * Copyright of Benjamin Kaiser 2012
*/

function Backfun (centerDivId,backgroundColor) {
    var cdiv = centerDivId;
    var bc = backgroundColor;
    
    var canvas = $("<canvas></canvas>").attr({ id :"backFunCanvas" }).get(0);
    var ctx = canvas.getContext('2d');
    var w = document.body.clientWidth;
	var h = window.innerHeight;
	
	var mousex = -100, mousey = -100;
	var circles = new Array();
	
	canvas.width = w;
	canvas.height = h;
    canvas.style.position = "fixed";
    canvas.style.zIndex = "-1";
    canvas.style.margin = "0";
    canvas.style.padding = "0";
    var tmpMargin = $("#"+cdiv).css("margin-top");
    canvas.style.marginTop = (tmpMargin == 0)? 0 : "-"+tmpMargin;
    
    $("#"+cdiv).before(jQuery(canvas));
    $("#"+cdiv).css("z-index","1");
    
    // onresize
	$(window).resize(function() {
		w = document.body.clientWidth;
		h = window.innerHeight;
		canvas.height = h;
		canvas.width = w;
	});
    
    // mouse co-ordinate stuff
	document.onmousemove=getMouseCoordinates;
	
	function getMouseCoordinates(event){
	        ev = event || window.event;
	        mousex = ev.pageX;
	        mousey = ev.pageY - $(document).scrollTop();
	}

    
    var update = function() {
	    // add new circle
        var tmp = {
                x: mousex,
                y: mousey,
                s: Math.random()*20+5,
                color: rgbToHex(hslToRgb(Math.random(),1,.5)),
                mx: Math.random()*20-10,
                my: Math.random()*20-10
        };
        circles.push(tmp);
        
        // keep array short
        /*if(circles.length > 100){
                circles.splice(0,1);
        }*/
        
        // move circles
        for(c in circles){
    		var index = c;
            c = circles[c];
            
            c.x += c.mx * Math.random();
            c.y += c.my * Math.random();
            c.s -= .5;
            
            if(c.s < 1){
                circles.splice(index,1);
            }
        }
    }
    
    this.start = function(){
	    setInterval(this.render, 1000/24);
    }
    
    
    this.render = function(){
	    update();
	    
	    ctx.fillStyle = bc;
        ctx.fillRect(0,0,10000,10000);
        
         for(c in circles){
                c = circles[c];
                drawCircle(ctx, c.color, c.x, c.y, c.s, 0, 0);        
        }
    }
    
    // function to simplify drawing of circles
	var drawCircle = function(ctx, fillColor, x, y, radius, strokeWidth, strokeColor){
	        ctx.fillStyle = fillColor;
	        ctx.beginPath();
	        ctx.arc(x,y,radius,0,Math.PI*2,false);
	        ctx.closePath();
	        if(strokeWidth != 0){
	                ctx.lineWidth = strokeWidth;
	                ctx.strokeStyle=strokeColor;
	                ctx.stroke();
	        }
	        ctx.fill();
	}
    
    this.setBackgroundColor = function(bgcolor){
	    this.bc = bgcolor;
    }
    
    this.setCenterDivId = function(centerDivId){
	    this.cdiv = centerDivId;
    }
    
    this.getBackgroundColor = function(){
	    return this.bc;
    }
    
    this.getCenterDivId = function(){
	    return this.cdiv;
    }
}


// colour converting functions, used to create random color (see update function)
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {r: parseInt(r * 255),g: parseInt(g * 255),b: parseInt(b * 255)};
}

function rgbToHex(x) {
    return "#" + ((1 << 24) + (x.r << 16) + (x.g << 8) + x.b).toString(16).slice(1);
}