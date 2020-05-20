//alert("Hello!!!");   Tested Ok!!

var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red","blue","green","yellow"];

var level = 0;

var started = false;


$(document).keypress(function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
  });



$(".btn").on("click",function(){
    var userChosenColor = $(this).attr("id");//When user clicks on any button then this. will assign the attribute value of id to the variable userChosenColor 
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);


    checkAnswer(userClickedPattern.length-1);
    
});

function nextsequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    // var randomNumberr=nextsequence();
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);    
}

function playSound(press){
    var audio = new Audio("./sounds/"+press+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
            
        }

    }
    else{
        console.log("False");
        console.log(gamePattern);
        console.log(userClickedPattern);
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }    
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


