const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];


function randomWord() {
    // getting random onejct from wordList
    let ranObj = wordList[Math.floor(Math.random()* wordList.length)];
    word = ranObj.word; // getting word of random object
    maxGuesses = 8; corrects = []; incorrects = [];
    console.log(word);

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        
    }
    inputs.innerHTML = html;
}
randomWord();


function initGame(e) {
    let key = e.key;
if(key.match(/^[A-Za-z\s]+$/) && !incorrects.includes(` ${key}`)) {
    console.log(key);
    if(word.includes(key)) { // if user letter found in the word
        for (let i = 0; i < word.length; i++) {
            // showing matched letter in the input value
            if(word[i] == key) {
                corrects.push(key)
                inputs.querySelectorAll("input")[i].value = key;
            }
        }
        } else {
            maxGuesses--; // decrement maxGuesses by 1
           incorrects.push(` ${key}`);
        }
    }
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    typingInput.value = "";

    setTimeout(() => {
        if (corrects.length === word.length) { // if user could not found all letters
            alert(`Selamat! Jawaban anda benar ${word.toUpperCase()}`)
            randomWord(); // calling randomWord func, so the game reset
        } else if(maxGuesses < 1) { // if user could not found all letters
            alert("Game over! Sisa tebakanmu telah habis");
            for (let i = 0; i < word.length; i++) {
                // show all the letters in the input
                    inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
document.addEventListener("keydown", initGame);
inputs.addEventListener("click", () => typingInput,focus());
document.addEventListener("keydown", () => typingInput,focus());