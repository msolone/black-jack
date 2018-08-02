// const main = () => {
//   document.querySelector('h1').textContent += '?'
// }

// document.addEventListener('DOMContentLoaded', main)


const deck = []
const suit = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
const rank = ['Ace', '2','3','4','5','6','7','8','9','10','Jack','Queen','King']
const cardValue = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]


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
}