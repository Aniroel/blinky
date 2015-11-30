$(document).ready(function() {
  /* BLINKY v.14
  1.  introScreen shows:
    a. Text box with instructions
    b. Game level buttons - Normal/Hard
  2.  After button is pressed:
    a. introScreen disappears.
    b. Countdown is initiated.
    c. After countdown, timer starts.
    d. Blinky is activated @ timer starting.
  3.  During game-time:
    a. Blinky will randomly appear between 1-5 second intervals.
    b. To earn points, User will hit spacebar at each spotted Blinky.
    c. blinkyCounter starts to track how many times Blinky appears for the duration of game.
    d. userCounter keeps track of all correctly spotted Blinkys. If User hits the spacebar outside of timeframe (0-700ms) or erroneously, it will not be counted nor will User get points deducted.
    e. blinkTracker will keep track of both blinkyCounter and userCounter.
  4.  At end of game:
    a. endScreen and heatmap will appear with:
      1. endScreen: shows actual score and % score
      2. Heatmap results (all Blue: Missed Blinky, with Red: Spotted Blinky) */

  var gameTimer;
  var blinkyTimer;
  var blinkyTracker;
  var userCounter;
  var blinkyCounter;
  var blinkyPoppedUp = false;
  var gameStopped = true;
  var music = document.getElementsByTagName("audio")[0]  //sample from freesound.org
  var sparkleDuration;  // can make hard mode harder if set to <200

  /*Functions*/
  function startCountdown(callback){
    $('body').append('<div id="countdown">3</div>');
    setTimeout(function(){
      $('#countdown').text("2");
    }, 1000);
    setTimeout(function(){
      $('#countdown').text("1");
    }, 2000);
    setTimeout(function(){
      $('#countdown').remove();
      callback();
    }, 3000);
  }

  function gameStart(){
    gameStopped = false;
    userCounter = 0;
    blinkyCounter = 0;
    blinkyTracker = []
    music.play();
    blink();
    gameTimer = setTimeout(function(){
      gameOver();
    }, 30000); //game duration/ 5000 for test
  }

  function blink(){
    if(gameStopped) {
      return;
    }
    blinkyTimer = setTimeout(function(){
      var newLeft = Math.random() * ($(window).width() - $('#blinky').width());
      var newTop = Math.random() * ($(window).height() - $('#blinky').height());
      $('#blinky').css({
        top: newTop,
        left: newLeft
      });
      $('#blinky').show();
      blinkyTracker.push({x: newLeft, y: newTop, value: 20});
      blinkyCounter++;
      blinkyPoppedUp = true;
      setTimeout(function(){
        blinkyPoppedUp = false;
      }, 700)
      setTimeout(function() {
        $('#blinky').hide();
        blink();
      }, sparkleDuration);
    }, Math.random()*4000+1000);
  }

  function gameOver(){
    gameStopped = true; // 1. Stop game
    music.pause();
    // 2. Show results screen
    var endMsg = $('<p><br><strong>Thanks for playing!</strong><br><br>You spotted '+userCounter+' Blinkys out of '+blinkyCounter+' Blinkys.<br> <br>Your accuracy rate is '+Number(((userCounter/blinkyCounter)*100).toFixed(0))+'% <br><br> Choose a level to play again! </p>')
    clearTimeout(blinkyTimer);
    clearTimeout(gameTimer);
    $('#endScreen').html(endMsg);
    $('#endScreen').show();

    // 3. Show heatmap results
    $('#heatMapScreen').css({
      height: $('body').height() + 'px',
      width: $('body').width() + 'px'
    })
    var heatmap = h337.create({
      container: document.querySelector('#heatMapScreen')
    });
    var blinkyData = {
      min: 1,
      max: 101,
      data: blinkyTracker
    };
    heatmap.setData(blinkyData);
    $('#heatMapScreen').show();

    // 4. Play again option
    $('#goButtons').show();
    $('#goButtons').on('click', function(){
      heatmap.setData({min: 1, max:101, data:[]});
    })
  }

  function hideAtStart(){
    $('#goButtons').hide();
    $('#endScreen').hide();
    $('#heatMapScreen').hide();
    $('#introScreen').hide();
  }

  /*Event Handlers*/
  $('#normalButton').on('click', function(){
    $('body').removeClass('hard');
    sparkleDuration = 200;
    startCountdown(gameStart);
    hideAtStart();
  });

  $('#hardButton').on('click', function(){
    sparkleDuration = 175;
    startCountdown(function(){
      $('body').addClass('hard');
      gameStart();
    });
    hideAtStart();
  });

  // Spacebar key
  $(document).keydown(function(event){
    if(event.which === 32 && blinkyPoppedUp){
      blinkyTracker[blinkyTracker.length-1].value = 100;
      userCounter++;
      blinkyPoppedUp = false;
    }
  });

  // Esc key
  $(document).keydown(function(event){
    if(event.which === 27 && !gameStopped){
      gameOver(); //only call stop if the game is already running
    }
  });

});
