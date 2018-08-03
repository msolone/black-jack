
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
  let newLi = document.createElement('li')
  card = playerHand[0]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)
  // Reveals second card in players hand
  newLi = document.createElement('li')
  card = playerHand[1]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)
  // Displays players current score
  let score = playerHand[0].value + playerHand[1].value
  document.querySelector('.current-score').textContent = score
 
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
  let newLi = document.createElement('li')
  card = playerHand[playerHand.length -1]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)
  // Updates the players current score
  document.querySelector('.current-score').textContent = playerOneScore
  // Ends game if players score goes over 21
  if (playerOneScore > 21 ) {
    document.querySelector('.declare-winner-banner').textContent = 'Bust, Dealer Wins!'
  }

}


const standAndPresent = () => {
  // Ree-establish players score
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
  for (let i = 0; i < dealerHand.length; i ++) {
    const newLi = document.createElement('li')
    card = dealerHand[i]
    newLi.textContent = card.rank + ' of ' + card.suit
    document.querySelector('.dealer-hand').appendChild(newLi)
    document.querySelector('.current-score2').textContent = dealerScore
  }
  // Compares scores and announces winner
  if (dealerScore > 21) {
    document.querySelector('.declare-winner-banner').textContent = 'Dealer Bust, You Win!'
    } else {
      if (dealerScore === playerOneScore) {
        document.querySelector('.declare-winner-banner').textContent = 'Tie, House Rules, Dealer Wins'
      } else if (dealerScore > playerOneScore) {
        document.querySelector('.declare-winner-banner').textContent = 'Dealer Wins'
        } else {
          document.querySelector('.declare-winner-banner').textContent = 'You Win'
        }
      }
    

  }
  
  const playAgain = () => {
    playerHand.length = 0
    dealerHand.length = 0
    deck.length = 0
    createDeckOfCards()
    document.querySelector('.player-hand').textContent = ''
    document.querySelector('.dealer-hand').textContent = ''
    document.querySelector('.current-score').textContent = '0'
    document.querySelector('.current-score2').textContent = '0'
    document.querySelector('.declare-winner-banner').textContent = ''
  }






document.addEventListener('DOMContentLoaded', createDeckOfCards)

document.querySelector('.deal').addEventListener('click', dealCards)

document.querySelector('.hit').addEventListener('click', hitMe)

document.querySelector('.stand').addEventListener('click', standAndPresent)

document.querySelector('.play-again').addEventListener('click', playAgain)