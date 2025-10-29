let attempt = " "
const url = "https://words.dev-apis.com/word-of-the-day"
let target = target_word(url)
let user_input = document.querySelectorAll("input")
const maxAttempts = 6
let rowIndex = 0
displayBoard()

let guess = document.getElementById("user-guess")
guess.addEventListener("keyup", function(e) {
  if (!isLetter(e.key)) {
    e.preventDefault();
  }

  displayLetters(guess.value.toUpperCase())

  if (e.key === "Enter"){
    attempt = guess.value.toUpperCase()
    console.log(attempt)
    checkWord(attempt)
    rowIndex++
    e.target.value = ""
  }

  if (rowIndex >= maxAttempts){
    alert("Game Over")
  }

  if (attempt === target){
    alert('You win')
  }
  
})


//api

async function target_word(url) {
    const promise = await fetch(url)
    const processedResponse = await promise.json()
    target = processedResponse.word.toUpperCase()
    console.log("target word: ", target)

    return target
}


//validation 
// 1. minimum of 5 letters
// 2. shouldn't be able to backspace after pressing enter
// 3. handle two letters that are correct if only one is used in the target word 
// 4. check Brian's document for more

function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}


//displaying input

function displayBoard(){
  const board = document.getElementById("game-board")
  board.innerHTML = ""

  for (let i = 0; i < maxAttempts; i++) {
      const row = document.createElement("div")
      row.classList.add("row")
      row.setAttribute("row-num", i);
      board.appendChild(row)
  }
}

function displayLetters(word){
    // let row = board.querySelectorAll(".row")[0]
    const row = document.querySelector(`[row-num='${rowIndex}']`)
    row.innerHTML = ""

    for (let i = 0; i < word.length; i++) {
        const box = document.createElement("div")
        box.classList.add("box")
        box.textContent = word[i]
        row.appendChild(box)
    }

}


//if user presses enter, do the following:
function checkWord(attempt){
  // const boxes = document.querySelectorAll('#game-board .box')
  const row = document.querySelector(`[row-num='${rowIndex}']`)
  const boxes = row.querySelectorAll(".box");

    for (let i = 0; i < target.length;i++){
      const attemptChar = attempt[i]
      const targetChar = target[i]
      const box = boxes[i]

        if (attemptChar === targetChar){
            //change cell to green
            box.classList.add("correct")
        } else if (target.includes(attemptChar)){
            // change cell to orange
            box.classList.add("almost-correct")
        } else {
            // cell colour should be grey
            box.classList.add("incorrect")
        }
    }
}

function initGame(){
  //load API
  //get input word from user
  //validate input
  //when user presses enter, check the word
}


