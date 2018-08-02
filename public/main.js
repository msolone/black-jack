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

// Creates an Array of 52 objects with rank, suits, and card values
const createDeckOfCard = () => { 
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
}












document.querySelector('.deal').addEventListener('click', dealCards)

document.addEventListener('DOMContentLoaded', createDeckOfCard)