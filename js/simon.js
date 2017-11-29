$(document).ready(function(){
    var count = 0;
    
    var computer = [];
    var player = [];

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
        setInterval(myTimer, 1000);
    }

    function myTimer(){   
        
        //Reset Colors
        $("#topLeft").css({"background-color":ogGreen, "box-shadow":ogGShadow});
        $("#topRight").css({"background-color":ogRed, "box-shadow":ogRShadow});
        $("#bottomLeft").css({"background-color":ogYellow, "box-shadow":ogYShadow});
        $("#bottomRight").css({"background-color":ogBlue, "box-shadow":ogBShadow});

        //Add new random element to sequence     
        if(computer.length < 20 && !toggle){
            computer.push(Math.round(Math.random() * 3));

            //Playback sequence so far
            for(var i=count; i<count+1; i++){
                console.log("current: "+computer[i]);
                switch(computer[i]){
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
            count += 1;
            $("#button1").html(count);
        }
        toggle = !toggle;
    }
});