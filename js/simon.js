$(document).ready(function(){
    var count = 0;
    var level = 1;
    var sequenceFinished = false;
    var lightOn = true;
    
    var computer = [];
    var player = [];

    var gameOver = false;
    var nextMove = true;

    //Store original button colors and shaders
    var ogGreen = $("#topLeft").css("background-color");
    var ogGShadow = $("#topLeft").css("box-shadow");
    var ogRed = $("#topRight").css("background-color");
    var ogRShadow = $("#topRight").css("box-shadow");
    var ogYellow = $("#bottomLeft").css("background-color");
    var ogYShadow = $("#bottomLeft").css("box-shadow");
    var ogBlue = $("#bottomRight").css("background-color");
    var ogBShadow = $("#bottomRight").css("box-shadow");

    var toggle = false;

    $("#topLeft").on("click", function(){
        player.push(0);
    });
    $("#topRight").on("click", function(){
        player.push(1);
    });
    $("#bottomLeft").on("click", function(){
        player.push(2);
    });
    $("#bottomRight").on("click", function(){
        player.push(3);
    });
    $("#b2").on("click", function(){        
        startGame();
    });

    function startGame(){
        for(var i=0; i<20; i++){
            computer.push(Math.round(Math.random() * 3));
        }             
        setInterval(myTimer, 1000);
    }

    function myTimer(){           
        if(count < level){
            if(lightOn){
                lightUpColor(count);                
                $("#button1").html(level);
                lightOn = !lightOn;
            }else if(!lightOn){
                resetColor(count);
                lightOn = !lightOn;
                count++;
            }
        }
        /*Continuously check if player has submitted the required sequence.
        If they have then increment the level and reset count and the player's submitted
        sequence in the array*/
        if(checkPlayerResponse()){            
            level += 1;
            count = 0;
            player = [];
        }
       
    }

    function checkPlayerResponse(){
        for(var i=0; i<level; i++){
            if(player[i] != computer[i]){
                return false;
            }
        }
        return true;
    }

    function resetColor(x){
        console.log("now here");
        //$(position).css({"background-color":bgColor, "box-shadow":shadowColor});
        switch(computer[x]){
            case 0: $("#topLeft").css({"background-color":ogGreen, "box-shadow":ogGShadow});
            break;
            case 1: $("#topRight").css({"background-color":ogRed, "box-shadow":ogRShadow});        
            break;
            case 2: $("#bottomLeft").css({"background-color":ogYellow, "box-shadow":ogYShadow});        
            break;
            case 3: $("#bottomRight").css({"background-color":ogBlue, "box-shadow":ogBShadow});
            break;
        }
    }

    function lightUpColor(x){
        console.log("here");
        //debugger;
        switch(computer[x]){
            case 0: $("#topLeft").css({"background-color":"rgb(117, 228, 135)", "box-shadow":"none"});
            break;
            case 1: $("#topRight").css({"background-color":"rgb(255, 74, 74)", "box-shadow":"none"});        
            break;
            case 2: $("#bottomLeft").css({"background-color":"rgb(251, 255, 0)", "box-shadow":"none"});        
            break;
            case 3: $("#bottomRight").css({"background-color":"rgb(132, 189, 255)", "box-shadow":"none"});
            break;
        }
    }
});