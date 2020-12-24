
// start this function when game is ready
const game = () => {
  let pScore = 0
  let cScore = 0
  const message = document.querySelector('.messageDisplay h1')
  const score = document.querySelector('audio[data-key="score"]')
  const tieSound = document.querySelector('audio[data-key="tie"]')
  const loseSound = document.querySelector('audio[data-key="lose"]')
  const winSound = document.querySelector('audio[data-key="win"]');

  // remove the pointers to avoid clicking in start screen
  let button = document.querySelectorAll('.btn', '.resetGame')
  button.forEach(b => {
    b.style.pointerEvents = 'none'
  });
  
  // function to run when button is clicked
  const startGame = () => {
    const start = document.querySelector('.start')
    const adjustAudio = document.querySelector('.adjustAudio')
    const introDisplay = document.querySelector('.first')
    const scoreDisplay = document.querySelector('.top')
    const gameDisplay = document.querySelector('.second')
    const bottom = document.querySelector('.bottom')
    const resetBtn = document.querySelector('.resetGame')
    const intro = document.querySelector('audio[data-key="intro"]');

    
    // click event for start button
    start.addEventListener('click', function () {
      // start pointer events after running start game
      let btn = document.querySelectorAll('.btn', '.resetGame')
      btn.forEach(b => {
      b.style.pointerEvents = 'all'
      })

      // play audio effect
      intro.play()
      // fadeOut and fadeIn transition
      adjustAudio.classList.add('fadeOut')
      introDisplay.classList.add('fadeOut')
      bottom.classList.add('fadeIn')
      scoreDisplay.classList.add('fadeIn')
      gameDisplay.classList.add('fadeIn')
      resetBtn.classList.add('fadeIn')      
      setTimeout(() => {
        introDisplay.style.display = 'none'
      }, 300)
    })
  }

  const playGame = () => {
    const btn = document.querySelectorAll('.btn')
    const imgs = document.querySelectorAll('img')
    const player = document.querySelector('.player')
    const computer = document.querySelector('.computer')
    const shake = document.querySelector('audio[data-key="shake"]');
    

    // computer selection options
    const select = ['rock', 'paper', 'scissors']

    // remove message animation after run 
    message.addEventListener('animationend', function () {
      this.style.animation = '';
    })

    // remove animation for each img elements after running animation
    imgs.forEach(img => {
      img.addEventListener('animationend', function () {
        this.style.animation = '';
      })
    })


    // event listener for each btn
    btn.forEach(bt => {
      bt.addEventListener('click', function () {

        // set the img back to rock image
        player.src = `./libs/img/rock.png`
        computer.src = `./libs/img/rock.png`

        // play audio effect
        shake.play()

        // remove the pointers to avoid double clicking
        btn.forEach(b => {
          b.style.pointerEvents = 'none'
        })

        // create a random choice for the computer
        let computerPlay = Math.floor(Math.random() * select.length)
        const playerSel = this.classList[1]
        const compSel = select[computerPlay]

        // add animation
        player.style.animation = 'shakePlayer 1s ease'
        computer.style.animation = 'shakeComputer 1s ease'
        message.textContent = 'Ro-Sham-Bo . . .'
        message.style.animation = 'shaking 0.4s ease'

        // timer after runntion
        setTimeout(() => {

          computer.src = `./libs/img/${compSel}.png`
          player.src = `./libs/img/${playerSel}.png`

          // put back the pointer events after running
          btn.forEach(b => {
            b.style.pointerEvents = 'all'
          })

          // evaluate who won the game
          evaluateResult(playerSel, compSel)
        }, 900)
      })
    })
  };

  


  const evaluateResult = (player, comp) => {
    // set the evaluation after 200 mils
    setTimeout(() => {
      // if player is rock
      if (player === 'rock') comp === 'scissors' ? win() : comp === 'paper' ? lose() : tie()
      // if player is paper
      if (player === 'paper') comp === 'rock' ? win() : comp === 'scissors' ? lose() : tie()
      // if player is scissors
      if (player === 'scissors') comp === 'paper' ? win() : comp === 'rock' ? lose() : tie()
      // if player score is 5 first
      if (pScore >= 5 && cScore < 5) plWin ()
      // if computer score is 5 first
      if (pScore < 5 && cScore >= 5) compWin ()
    }, 500)
  };

  // if player wins
  const win = () => {
    const plScore = document.querySelector('.plScore')

    // remove animation after 
    plScore.addEventListener('animationend', function () { this.style.animation = '' })

    // play audio
    score.play()
    pScore = pScore + 1
    message.textContent = 'You Win this Round!'
    plScore.textContent = pScore
    plScore.style.animation = 'addScore 0.2s ease'
  }

  // if player lose
  const lose = () => {
    const comScore = document.querySelector('.comScore')

    // remove animation after
    comScore.addEventListener('animationend', function () { this.style.animation = '' })

    // play audio
    score.play()
    cScore = cScore + 1
    message.textContent = 'You lose this Round!'
    comScore.textContent = cScore
    comScore.style.animation = 'addScore 0.2s ease'
  }

  // when game is tied
  const tie = () => {
    message.textContent = `It is a tie!`
    tieSound.play()
  }
  
  // computer won the game
  const compWin = () => {
    const comScore = document.querySelector('.comScore')
    const btn = document.querySelectorAll('.btn')

    // remove animation after
    comScore.addEventListener('animationend', function () { this.style.animation = '' })

    // play audio
    loseSound.play()
    cScore = cScore
    message.textContent = 'The Computer Wins!'
    comScore.textContent = cScore
    comScore.style.animation = 'addScore 0.2s ease'


    // remove the pointers to end game
    btn.forEach(b => {
      b.style.pointerEvents = 'none'
      })
  };
  
  // player won the game
  const plWin = () => {
    const plScore = document.querySelector('.plScore')
    const btn = document.querySelectorAll('.btn')

    // remove animation after 
    plScore.addEventListener('animationend', function () { this.style.animation = '' })

    // play audio
    winSound.play()
    pScore = pScore
    message.textContent = 'You Beat The Computer!'
    plScore.textContent = pScore
    plScore.style.animation = 'addScore 0.2s ease'

    
    // remove the pointers to end game
    btn.forEach(b => {
      b.style.pointerEvents = 'none'
      })
  };
  
  // reset the game  
  const resetGame = () => {
    let resetBtn = document.querySelector('.resetGame')
    resetBtn.addEventListener('click', () => 
      location.reload()); 
  };

  // start game
  startGame()
  playGame()  
  resetGame()
};

game()