
var buttonColors = ["red" , "blue" , "green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;


$(document).keydown(function() {                                                 //detects only the first keypress of the game and starts
  if (level === 0) {
    $("#level-title").text("Start playing");
    nextSequence();
  }
})


$(".btn").click(function() {

  if (gamePattern.length === 0) {                                                //detects only the first click and starts the game
    gamePattern.push(event.target.id);
  }

  var userChosenColor = event.target.id;                                         //targets the user's chosen color

  userClickedPattern.push(userChosenColor);                                      //adds chosen starting color to the sequence

  playSound(userChosenColor);

  animatePress(userChosenColor);

  if (gamePattern.length === userClickedPattern.length) {                        //checks answer only if user finished the sequence
    checkAnswer();
  }

})


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);                                           //adds random color to the sequence

  $("#" + randomChosenColor).fadeOut().fadeIn();                                 //makes chosen color flash

  playSound(randomChosenColor);
}


function playSound(name) {

  var audio = new Audio(name + ".mp3");                                         //plays color sound
  audio.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");                                    //adds shadow to pressed color

  setTimeout(function(){                                                         //removes shadow after delay
    $("#" + currentColor).removeClass("pressed");
  } , 100);

}


function checkAnswer() {

  var counter = 0;

  for (i = 0; i < userClickedPattern.length; i++) {

    if (gamePattern[i] === userClickedPattern[i]) {                              //checks if user is choosing right colors

      counter++;

    }
  }


  if (counter === gamePattern.length) {                                          //trigers only if user got all colors right

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level)                                     //changes the heading to the current level

    setTimeout(function() {                                                      //shows the next color in a delay
      nextSequence();
    }, 1000);

  } else {

    $("#level-title").text("Game Over, Press Any Key to Restart");               //changes the heading to game over

    var wrong = new Audio("wrong.mp3");                                          //plays wrong sound
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    startOver();

  }
}


function startOver() {                                                          //resets the game

  level = 0;

  gamePattern = [];

  userClickedPattern = [];

}
