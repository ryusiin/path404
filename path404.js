/*Pixel 2XL Resolution 2880(/3:960)x1440(/3:480)*/
document.addEventListener("DOMContentLoaded", () => {
    let cvs = document.getElementById("canvas404");
    let ctx = cvs.getContext("2d");
    
    let currentPath = document.getElementById("currentPath");
    var count = 0;
    
    /*Load Images*/
    let img_boat = new Image();
    img_boat.src = "./images/kayak.png";
    let hurdle = new Image();
    hurdle.src = "./images/pipe.png";
    
    /*Boat X:def(200) Y:def(225)*/
    /*X*/
    var x = 200;
    var defX = x;
    /*Y*/
    var y = 175;
    var defY = y;
    var jumY = y - 150;
    var divY = y + 150;
    var accY = 0.5;
    
    /*Hurdle X:def(960) Y:def(0)*/
    var x_hur = 960;
    var defX_hur = x_hur;
    
    /*Boat Status*/
    var status = "idle";
    
    /*Key Press Up(Jump:38) Down(Dive:40) */
    document.onkeydown = () => {
        switch(event.keyCode) {
            /*Boat Jump*/
            case 38:
                status === "idle" ? status = "jump" : "";
                break;
            /*Boat Dive*/
            case 40:
                status === "idle" ? status = "dive" : "";
                break;
        }
    }
    
    /*Draw*/
    var draw = () => {
        /*Draw BG*/
        ctx.drawImage(img_boat, 0, 0);
        
        /*Draw Boat*/
        ctx.drawImage(img_boat, x, y, 100, 100);
        
        /*Draw Hurdle*/
        ctx.drawImage(hurdle, x_hur, 0, 50, 250);
        x_hur < -50 ? x_hur = defX_hur : x_hur -= 5;
        
        
        /*Boat Jump & Recovery*/
        /*Jump*/
        status === "jump" ? y === jumY ? status = "fall" : y -= Math.ceil((y - jumY)/10) : "";
        /*Fall*/
        if(y < defY && status === "fall") {
            y += Math.round(accY);
            accY += 0.5;
        } else if(y >= defY && status === "fall") {
            resetToIdle();
        }
        
        /*Boat Dive & Recovery*/
        /*Dive*/
        status === "dive" ? y === divY ? status = "gravity" : y += Math.ceil((divY - y)/10) : "";
        /*Gravity*/
        if(y > defY && status === "gravity") {
            y -= Math.round(accY);
            accY += 0.5;
        } else if(y <= defY && status === "gravity") {
            resetToIdle();
        }
        
        /*Reset Status to Idle*/
        function resetToIdle() {
            y = defY;
            accY = 1;
            status = "idle";
        }
        
        /*Idle Check*/
        y === defY ? status = "idle" : "";
        
        /*Count*/
        count++;
        currentPath.innerText = "Path: " + Math.round(count/10) + " :" + ((defY - y)/20) + " :" + status + " :" + y;
    }
    
    
    
    /*Redraw Canvas*/
    var id = setInterval(draw, 30);
})