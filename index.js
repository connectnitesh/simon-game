let colors = ["green","red","yellow","blue"];

let gamePattern = [];

let userClicked = [];

let started = false;
var level = 0;

$("#start-btn").click(function(){
    if(!started){
        $("h1").html("Level "+ level);
        allSequence();
        started=true;
    }
});

function allSequence(){
    userClicked = [];
    level++;
    $("h1").html("Level "+ level);

    
      let randomNumber = Math.floor(Math.random()*4);
      let randomColor = colors[randomNumber];
      gamePattern.push(randomColor);

    let pt = 0;

    function playGame(){
      setTimeout(function(){
      // console.log(gamePattern[pt]);
      $("#"+gamePattern[pt]).fadeOut(100).fadeIn(100);
      playSound(gamePattern[pt]);
      pt++;
      if (pt < gamePattern.length){
        playGame();
      }
      }, 1000); 
    }
    
    playGame();

}

$(".btn").click(function(){
  let userPress = $(this).attr("id");
  userClicked.push(userPress);
  playSound(userPress);
  animatePress(userPress);
  checkAnswer(userClicked.length-1);
});

function checkAnswer(currentLevel) {

  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClicked[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClicked.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        allSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("h1").html("Game Over! Start Again");

    startOver();

  }

}

function  startOver(){
    level=0;
    gamePattern = [];
    started = false;
    userClicked = [];

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

let rulesState = false;

$('#rules-btn').click(function(){
  rulesState = !rulesState;
  if(rulesState == true){
    $('#rules-menu').addClass('show');
  }else{
    $('#rules-menu').removeClass('show');
  }
})