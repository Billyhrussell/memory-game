const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);

function shuffle(items) {

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function createCards(colors) {
  const gameBoard = document.getElementById("game");

  for (let color of colors) {
    const card = document.createElement('div');
    card.classList.add(color);
    card.addEventListener("click",handleCardClick);
    gameBoard.appendChild(card);
  }
}

let amountFlipped = 0;
let hasClicked = false;
let card1 = null;
let card2 = null;

function handleCardClick(evt) {
  if (evt.target.classList.contains("flipped")) return;
  if (hasClicked) return;

  let myCard = evt.target;
  myCard.style.backgroundColor = myCard.classList[0];

  if (!card1 || !card2) {
    myCard.classList.add("flipped");
    card1 = card1 || myCard;
    card2 = myCard === card1 ? null : myCard;
  }

  if (card1 && card2) {
    hasClicked = true;

    let card1class = card1.className;
    let card2class = card2.className;

    //if cards are the same
    if (card1class === card2class) {
      amountFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      hasClicked = false;
    } else {
      //amount of time gameboard keeps the cards up before flipping (1sec)
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        hasClicked = false;
      }, 1000);
    }
  }

  if (amountFlipped === COLORS.length){

    let gameOver = document.createElement('div');
    gameOver.interHTML = "Game Over!";
    gameBoard.appendChild(gameOver);
  }

}
