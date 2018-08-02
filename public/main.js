// const main = () => {
//   document.querySelector('h1').textContent += '?'
// }

// document.addEventListener('DOMContentLoaded', main)


const deck = []
const suit = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const rank = ['Ace', '2','3','4','5','6','7','8','9','10','Jack','Queen','King']
const cardValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
playerHand = []
dealerHand = []
playerOneScore = 0
dealerScore = 0

// Creates an Array of 52 shuffled objects with rank, suits, and card values 
const createDeckOfCard = () => { 
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
  let newLi = document.createElement('li')
  card = playerHand[0]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)
  newLi = document.createElement('li')
  card = playerHand[1]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)
  let score = playerHand[0].value + playerHand[1].value
  document.querySelector('.current-score').textContent = score
 
}

// const calculateScore = () => {
//   for (i = 0; i < playerHand.length; i++) {
//     playerOneScore += playerHand[i].value 
//   }
//   console.log(playerOneScore)   
// }

// // dealers score 
// dealerScore = dealerHand[0].value + dealerHand[1].value


const hitMe = () => {
  playerHand.push(deck[deck.length - 1])
  deck.pop()
  playerOneScore = 0
  for (i = 0; i < playerHand.length; i++) {
    playerOneScore += playerHand[i].value 
  }
  console.log(playerOneScore) 

  let newLi = document.createElement('li')
  card = playerHand[playerHand.length -1]
  newLi.textContent = card.rank + ' of ' + card.suit
  document.querySelector('.player-hand').appendChild(newLi)

  document.querySelector('.current-score').textContent = playerOneScore
  

}









document.addEventListener('DOMContentLoaded', createDeckOfCard)

document.querySelector('.deal').addEventListener('click', dealCards)

document.querySelector('.hit').addEventListener('click', hitMe)

document.querySelector('.stand').addEventListener('click', standAndPresent)