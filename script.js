const gameContainer = document.getElementById("game");


const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let idIdx = 0;


// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    //also, give it an ID num
    newDiv.classList.add(color);
    newDiv.id = idIdx;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game

      gameContainer.append(newDiv);
      idIdx++;
    }
  }


let colorArr = [];
let cardArr = [];

const reset = document.querySelector('button');
const score = document.querySelector('.score p');
let scoreNum = parseInt(score.innerHTML);



// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  event.target.style.backgroundColor = event.target.classList.value;
  //reset button
  reset.addEventListener('click', function()  {
    event.target.style.backgroundColor = '';
    score.innerHTML = 0;
  })

  //game logic
  colorArr.push(event.target.style.backgroundColor);
  cardArr.push(event.target.id);
  if(cardArr.length === 2 && cardArr[0] === cardArr[1] || cardArr.length === 2 && colorArr[0] !== colorArr[1]) {
    gameContainer.classList.add('freeze');
    setTimeout(function() {
      for(let i in cardArr) {
        gameContainer.classList.remove('freeze');
        document.getElementById(cardArr[i]).style.backgroundColor = "";
      }
      cardArr = [];
      colorArr = [];
    }, 1000);
  } else if(cardArr.length === 2 && colorArr[0] === colorArr[1] || cardArr.length === 2 && cardArr[0] !== cardArr[1]) {
    gameContainer.classList.add('freeze');
    setTimeout(function() {
      for(let i in cardArr) {
        gameContainer.classList.remove('freeze');
      }
      cardArr = [];
      colorArr = [];
    }, 1000);
  }

  //score logic
  if(gameContainer.classList.value === 'freeze') {
    scoreNum++;
    score.innerHTML = scoreNum;
  }
}




// when the DOM loads
createDivsForColors(shuffledColors);