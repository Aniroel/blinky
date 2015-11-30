# blinky
My first project: an eye tracking game with a shiny yellow target.

Runs only in Google Chrome.  Other browser compatibility still in progress.

# blinky game outline

  1.  introScreen shows:
    1. Text box with instructions
    2. Game level buttons - Normal/Hard
  2.  After button is pressed:
    1. introScreen disappears.
    2. Countdown is initiated.
    3. After countdown, timer starts.
    4. Blinky is activated @ timer starting.
  3.  During game-time:
    1. Blinky will randomly appear between 1-5 second intervals.
    2. To earn points, User will hit spacebar at each spotted Blinky.
    3. blinkyCounter starts to track how many times Blinky appears for the duration of game.
    4. userCounter keeps track of all correctly spotted Blinkys. If User hits the spacebar outside of timeframe (0-700ms) or erroneously, it will not be counted nor will User get points deducted.
    5. blinkTracker will keep track of both blinkyCounter and userCounter.
  4.  At end of game:
    1. endScreen and heatmap will appear with:
      1. endScreen: shows actual score and % score
      2. Heatmap results (all Blue: Missed Blinky, with Red: Spotted Blinky)
