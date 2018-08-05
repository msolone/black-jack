const deck = []
const suit = ['hearts', 'diamonds', 'clubs', 'spades']
const rank = ['ace', '2','3','4','5','6','7','8','9','10','jack','queen','king']
const cardValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
let playerHand = []
let dealerHand = []
let playerHand2 = []
let playerOneScore = 0
let dealerScore = 0
let playerOneScore2 = 0

// Attaching card images to objects
const cardImagesAttacher = () => {
  for (i = 0; i < deck.length; i++) {
    card[i].image = "playing-card-images/"+deck[i].rank+"_of_"+deck[i].suit+".png)"
  }
}
document.body.style.backgroundImage = "url('playing-card-images/9_of_spades.png')"


// Creates an Array of 52 shuffled objects with rank, suits, and card values 
const createDeckOfCards = () => { 
  // creates 52 object array with rank, suit, and value
  for(let j = 0; j < suit.length; j++) {
    for (let i = 0; i < rank.length; i++) {
      let card = {
        rank: rank[i],
        suit: suit[j], 
        value: cardValue[i]
      }
      deck.push(card)
    }
  }

  for (i = 0; i < deck.length; i++) {
    deck[i].image = "playing-card-images/"+deck[i].rank+"_of_"+deck[i].suit+".png)"
  }
 
  // shuffles array
  for (i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * i)
    let temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }
}

// Adds new list items to the DOM
const addNewListItem = (whoseHand, handPosition, listClass) => {
  let newLi = document.createElement('li')
  card = whoseHand[handPosition]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector(listClass).appendChild(newLi)
}

// Changes text content on DOM 
const changeDOMText = (tagClass, newContent) => {
  document.querySelector(tagClass).textContent = newContent
}

// Changes values of Aces in first hand
const changeOneAceValue = () => {
    for (i = 0; i < playerHand.length; i++) {
      if (playerHand[i].rank === 'Ace') {
        playerHand[i].value = 11
        break

      }
    }
  playerScore = 0
  for (i = 0; i < playerHand.length; i++) {
    playerScore += playerHand[i].value 
    }
changeDOMText('.current-score', playerScore)
  // Ends game if players score goes over 21
  if (playerScore > 21 ) {
    changeDOMText('.declare-winner-banner', 'Bust, Dealer Wins!')
  }
}

// Changes value of Aces in second hand
const changeOneAceValue2 = () => {
  for (i = 0; i < playerHand2.length; i++) {
    if (playerHand2[i].rank === 'Ace') {
      playerHand2[i].value = 11
      break

    }
  }
playerScore2 = 0
for (i = 0; i < playerHand2.length; i++) {
  playerScore2 += playerHand2[i].value 
  }
changeDOMText('.current-score2', playerScore2)
// Ends game if players score goes over 21
if (playerScore2 > 21 ) {
  changeDOMText('#declare-winner-banner2', 'Bust, Dealer Wins!')
  }
}

// Split the original hand into 2 hands
const split = () => {
  playerHand2.push(playerHand[1])
  playerHand.pop()
  changeDOMText('.player-hand', '')
  document.getElementById('player-hand-and-score2').style.display = 'flex'
  document.getElementById('buttons2').style.display = 'flex'
  document.getElementById('declare-winner-banner2').style.display = 'flex'
  addNewListItem(playerHand, 0, '.player-hand')
  addNewListItem(playerHand2, 0, '.player-hand2')
  changeDOMText('.current-score', playerHand[0].value)
  changeDOMText('.current-score2', playerHand2[0].value)
  document.getElementById('split').style.display = 'none'
  document.getElementById('stand').style.display = 'none'
}

// Deals cards to player and dealer
const dealCards = () => {
  for (i = 1; i < 5; i++) {
    if (i % 2 == 0) {
      // If index is even add to players hand
      playerHand.push(deck[deck.length - 1])
      deck.pop()
      } else {
        // if index is odd add to dealers hand
        dealerHand.push(deck[deck.length - 1])
        deck.pop()
      }
  }
  // Reveals first card in players hand
  addNewListItem(playerHand, 0, '.player-hand')
  // Reveals second card in players hand
  addNewListItem(playerHand, 1, '.player-hand')
  // Reveals dealers first card
  addNewListItem(dealerHand, 0, '.dealer-hand')
  

  // Sets player score
  let playerScore = playerHand[0].value + playerHand[1].value
  // Sets dealers score based on face up card
  let dealerShownScore = dealerHand[0].value 
  // Sets dealer hidden score for future calculation
  let dealerHiddenScore = dealerHand[0].value + dealerHand[1].value
  // Change value of Ace to 1 if score over 21
    if (playerScore > 21) {
      for (i = 0; i < playerHand.length; i++) {
        if (playerHand[i].rank === 'Ace') {
          playerHand[i].value = 1
        }
      }  
      playerScore = 0
      for (i = 0; i < playerHand.length; i++) {
        playerScore += playerHand[i].value 
        }
    }
  if (playerScore === 21 && dealerHiddenScore === 21) {
    changeDOMText('.declare-winner-banner', 'You both have Black Jack, its a Push')
  } else if (playerScore === 21) {
    changeDOMText('.declare-winner-banner', 'Black Jack, You Win!')
  } else if (dealerHiddenScore === 21) {
    changeDOMText('.declare-winner-banner', 'Dealer has Black Jack, You Lose!')
    addNewListItem(dealerHand, 1, '.dealer-hand')
  }
  // Displays players current score
  changeDOMText('.current-score', playerScore)
  changeDOMText('.dealer-score', dealerShownScore)
  if (playerHand[0].rank === playerHand[1].rank) {
    document.getElementById('split').style.display = 'flex'
  }
}

// Adds cards to first hand
const hitMe = () => {
  // Adds cards to player hand, eliminates top card from deck
  playerHand.push(deck[deck.length - 1])
  deck.pop()
  // determines player score
  playerOneScore = 0
  for (i = 0; i < playerHand.length; i++) {
    playerOneScore += playerHand[i].value 
    }
  // Reveals card dealt to player 
  addNewListItem(playerHand, playerHand.length - 1, '.player-hand') 
  // Change value of Ace to 1 if score over 21
  if (playerOneScore > 21) {
    for (i = 0; i < playerHand.length; i++) {
      if (playerHand[i].rank === 'Ace') {
        playerHand[i].value = 1
      }
    }  
    playerOneScore = 0
    for (i = 0; i < playerHand.length; i++) {
      playerOneScore += playerHand[i].value 
      }
  }
  // Updates the players current score
  changeDOMText('.current-score', playerOneScore)
  // Ends game if players score goes over 21
  if (playerOneScore > 21 ) {
    changeDOMText('.declare-winner-banner', 'Bust, Dealer Wins!')
  }
}

// Adds cards to second hand
const hitMe2 = () => {
  // Adds cards to player hand, eliminates top card from deck
  playerHand2.push(deck[deck.length - 1])
  deck.pop()
  // determines player score
  playerOneScore2 = 0
  for (i = 0; i < playerHand2.length; i++) {
    playerOneScore2 += playerHand2[i].value 
    }
  // Reveals card dealt to player 
  addNewListItem(playerHand2, playerHand2.length - 1, '.player-hand2') 
  // Change value of Ace to 1 if score over 21
  if (playerOneScore2 > 21) {
    for (i = 0; i < playerHand2.length; i++) {
      if (playerHand2[i].rank === 'Ace') {
        playerHand2[i].value = 1
      }
    }  
    playerOneScore2 = 0
    for (i = 0; i < playerHand2.length; i++) {
      playerOneScore2 += playerHand2[i].value 
      }
  }
  // Updates the players current score
  changeDOMText('.current-score2', playerOneScore2)
  // Ends game if players score goes over 21
  if (playerOneScore2 > 21 ) {
    changeDOMText('#declare-winner-banner2', 'Bust, Dealer Wins!')
  }
}

// Calculates player/dealer score and decides winner
const standAndPresent = () => {
  // Re-establish players score
  playerOneScore = 0
  for (i = 0; i < playerHand.length; i++) {
    playerOneScore += playerHand[i].value 
    }
  playerOneScore2 = 0
  for (i = 0; i < playerHand2.length; i++) {
    playerOneScore2 += playerHand2[i].value 
    }
  dealerScore = dealerHand[0].value + dealerHand[1].value
  // Add cards to Dealers hand until score is greater then at least of the players hands 
  while ((dealerScore < playerOneScore && dealerScore <= 21) || (dealerScore < playerOneScore2 && dealerScore <= 21)) {
    dealerScore = 0
    dealerHand.push(deck[deck.length - 1])
    deck.pop() 
    for (let i = 0; i < dealerHand.length; i++) {
      dealerScore += dealerHand[i].value 
    }
  }
  // Reveal dealer cards 
  for (let i = 1; i < dealerHand.length; i ++) {
    addNewListItem(dealerHand, i, '.dealer-hand')
    changeDOMText('.dealer-score', dealerScore)
  }
  // Compares scores of first hand and announces winner
  if (dealerScore > 21) {
    changeDOMText('.declare-winner-banner', 'Dealer Bust, You Win!')
    } else {
      if (dealerScore === playerOneScore) {
        changeDOMText('.declare-winner-banner', 'Tie, Push')
      } else if (dealerScore > playerOneScore) {
        changeDOMText('.declare-winner-banner', 'Dealer Wins!')
        } else {
          changeDOMText('.declare-winner-banner', 'You Win!')
        }
      }
  // Compares scores of second hand and announces winner
  if (dealerScore > 21) {
    changeDOMText('#declare-winner-banner2', 'Dealer Bust, You Win!')
    } else {
      if (dealerScore === playerOneScore2) {
        changeDOMText('#declare-winner-banner2', 'Tie, Push')
      } else if (dealerScore > playerOneScore2) {
        changeDOMText('#declare-winner-banner2', 'Dealer Wins!')
        } else {
          changeDOMText('#declare-winner-banner2', 'You Win!')
        }
      }
      // Removes Hit Me options
      document.getElementById('hit').style.display = 'none'
      document.getElementById('hit2').style.display = 'none'  
    
  }

// Resets the boards and reshuffles deck
const playAgain = () => {
    // Sets all arrays back to empty
    playerHand.length = 0
    playerHand2.length = 0
    dealerHand.length = 0
    deck.length = 0
    // Recreates deck and shuffles
    createDeckOfCards()
    // Clears the table and resets scores to zero
    changeDOMText('.player-hand', '')
    changeDOMText('.player-hand2', '')
    changeDOMText('.dealer-hand', '')
    changeDOMText('.current-score', '0')
    changeDOMText('.dealer-score', '0')
    changeDOMText('.declare-winner-banner', '')
    changeDOMText('#declare-winner-banner2', '')
    document.getElementById('split').style.display = 'none'
    document.getElementById('player-hand-and-score2').style.display = 'none'
    document.getElementById('buttons2').style.display = 'none'
    document.getElementById('hit').style.display = 'flex'
    document.getElementById('stand').style.display = 'flex'
    document.getElementById('hit2').style.display = 'flex'
    
  }

  // Events
document.addEventListener('DOMContentLoaded', createDeckOfCards)
document.querySelector('.deal').addEventListener('click', dealCards)
document.querySelector('#split').addEventListener('click', split)
document.querySelector('#hit').addEventListener('click', hitMe)
document.querySelector('#hit2').addEventListener('click', hitMe2)
document.querySelector('#stand').addEventListener('click', standAndPresent)
document.querySelector('#stand2').addEventListener('click', standAndPresent)
document.querySelector('.play-again').addEventListener('click', playAgain)
document.querySelector('.change-one-ace').addEventListener('click', changeOneAceValue)
document.querySelector('.change-one-ace2').addEventListener('click', changeOneAceValue2)