var buttonColors=['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var started = true;
function nextSequence(){
  userClickedPattern=[];
  var randomNumber = (Math.floor(Math.random()*4));
  var randomChooseColor =  buttonColors[randomNumber];
  gamePattern.push(randomChooseColor);
  $('#'+randomChooseColor).fadeOut(100).fadeIn(100);
  playSound(randomChooseColor);
  $('#level-title').text('level '+level);
  level++;

}



$('.btn').on('click',function(){
  var input=$(this).attr('id');
  userClickedPattern.push(input);
  playSound(input);
  animatePress(input);
  checkAnswer((userClickedPattern.length)-1);

});

$('body').on('keydown',function(){
  if(started){
    nextSequence();
    started=false;
  }

})

function checkAnswer(currentLevel){
   if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

}
    else{
      $('body').addClass('game-over');
      setTimeout(function(){
        $('body').removeClass('game-over');
      },200);
      $('h1').text('Game Over, Press Any Key to Restart');
      startOver();
    }
}


function playSound(text){
  var audio = new Audio('sounds/'+text+".mp3");
  audio.play();
}


function animatePress(text){
  $('#'+text).addClass('pressed');
  setTimeout(function(){
    $('#'+text).removeClass('pressed');
  },100);

}
function startOver(){
  level = 0;
  gamePattern=[];
  started=true;
}
