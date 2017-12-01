$(document).ready(function(){
    //Setup variables
    var count, level, lightOn,
     gameOver,interval, toggle, toggle2;
    
    var player = [];
    var computer = [];
    var strict = false;
    
    //Store original button colors and shaders
    var ogGreen = $("#topLeft").css("background-color");
    var ogGShadow = $("#topLeft").css("box-shadow");
    var ogRed = $("#topRight").css("background-color");
    var ogRShadow = $("#topRight").css("box-shadow");
    var ogYellow = $("#bottomLeft").css("background-color");
    var ogYShadow = $("#bottomLeft").css("box-shadow");
    var ogBlue = $("#bottomRight").css("background-color");
    var ogBShadow = $("#bottomRight").css("box-shadow");

    var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    
    $("#topLeft").on("click", function(){
        player.push(0);        
        sound1.play();
    });
    $("#topRight").on("click", function(){
        player.push(1);   
        sound2.play();
    });
    $("#bottomLeft").on("click", function(){        
        player.push(2);  
        sound3.play();
    });
    $("#bottomRight").on("click", function(){
        player.push(3); 
        sound4.play();
    });
    $("#b2").on("click", function(){        
        startGame();        
    });
    $("#button3").on("click", function(){
        strict = !strict;
        if(strict){
            $(this).css({"background-color":"yellow", "box-shadow":"1px 1px 5px rgb(141, 140, 140), 2px 2px 5px rgb(153, 161, 33) inset"});
        }else{
            $(this).css({"background-color":"rgb(223, 194, 32)", "box-shadow":"1px 1px 5px rgb(141, 140, 140), 2px 2px 5px rgb(153, 161, 33) inset"});
        }
    });

    function resetVariables(){
        count = 0;
        level = 1;    
        lightOn = true;        
        computer = [];
        player = [];
        gameOver = false; 
        toggle = true;
        toggle2 = true;
        $("#button1").html("--");
    }
    function startGame(){
        //reset variables
        resetVariables();

        //Clear timer
        clearInterval(interval);

        //Create random sequence        
        for(var i=0; i<20; i++){
            computer.push(Math.round(Math.random() * 3));
        }     
        console.log(computer);
        //Create timer        
        interval = setInterval(myTimer, 1000);
    }

    function myTimer(){   
        
        //resetColor(count);        
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

        //Win game if level > 20
        if(level > 20){
            if(toggle2){
                $("#button1").html("WIN");
                toggle2 = !toggle2;
                lightOn = !lightOn;
            }else{
                startGame();
            }
        }
        
        if(gameOver){
            //If strict mode then start new game
            if(strict){
                if(toggle){
                    $("#button1").html("-X-");
                    toggle = !toggle;
                }else{
                    startGame();
                }
                
            //otherwise reset count to replay sequence    
            }else{
                gameOver = false;                
                count = 0; 
                player = [];                
                $("#button1").html("--");
            }
            
        }
    }

    function checkPlayerResponse(){
        for(var i=0; i<level; i++){
            if(player.length === level && 
                player[i] != computer[i]){
                    gameOver = true;
                    return false;
            }else if(player[i] != computer[i]){
                return false;
            }
        }
        return true;
    }

    function resetColor(x){   
        console.log("here");           
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
        switch(computer[x]){
            case 0: $("#topLeft").css({"background-color":"rgb(117, 228, 135)", "box-shadow":"none"});
            sound1.play();
            break;
            case 1: $("#topRight").css({"background-color":"rgb(255, 74, 74)", "box-shadow":"none"});        
            sound2.play();
            break;
            case 2: $("#bottomLeft").css({"background-color":"rgb(251, 255, 0)", "box-shadow":"none"});        
            sound3.play();
            break;
            case 3: $("#bottomRight").css({"background-color":"rgb(132, 189, 255)", "box-shadow":"none"});
            sound4.play();
            break;
        }
    }
});