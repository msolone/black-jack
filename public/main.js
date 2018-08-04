const deck = []
const suit = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const rank = ['Ace', '2','3','4','5','6','7','8','9','10','Jack','Queen','King']
const cardValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
let playerHand = []
let dealerHand = []
let playerOneScore = 0
let dealerScore = 0

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
  // Displays players current score
  let score = playerHand[0].value + playerHand[1].value
  changeDOMText('.current-score', score)
  score = dealerHand[0].value 
  changeDOMText('.dealer-score', score)
}

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
  // Updates the players current score
  changeDOMText('.current-score', playerOneScore)
  // Ends game if players score goes over 21
  if (playerOneScore > 21 ) {
    changeDOMText('.declare-winner-banner', 'Bust, Dealer Wins!')
  }
}

const standAndPresent = () => {
  // Re-establish players score
  playerOneScore = 0
  for (i = 0; i < playerHand.length; i++) {
    playerOneScore += playerHand[i].value 
    }
  dealerScore = dealerHand[0].value + dealerHand[1].value
  // Add cards to Dealers hand until score is greater then players
  while (dealerScore < playerOneScore  && dealerScore <= 21) {
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
  // Compares scores and announces winner
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
  }
  
  const playAgain = () => {
    // Sets all arrays back to empty
    playerHand.length = 0
    dealerHand.length = 0
    deck.length = 0
    // Recreates deck and shuffles
    createDeckOfCards()
    // Clears the table and resets scores to zero
    changeDOMText('.player-hand', '')
    changeDOMText('.dealer-hand', '')
    changeDOMText('.current-score', '0')
    changeDOMText('.dealer-score', '0')
    changeDOMText('.declare-winner-banner', '')
  }

  // Events
document.addEventListener('DOMContentLoaded', createDeckOfCards)
document.querySelector('.deal').addEventListener('click', dealCards)
document.querySelector('.hit').addEventListener('click', hitMe)
document.querySelector('.stand').addEventListener('click', standAndPresent)
document.querySelector('.play-again').addEventListener('click', playAgain)