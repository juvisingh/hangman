
//function to keep track of the time
//Array of words for the game
var words = ['banana', 'rocket', 'guitar', 'planet', 'orange', 'window', 'bridge', 'rabbit', 'hurdle', 'plaque', 'sphere', 'tunnel', 'bucket', 'monkey', 'tomato', 'garden', 'puzzle', 'jacket', 'camera', 'market'];
var seconds = 0;
var minutes = 0;
var playing = true;
var wrongGuess = 1;
//Chose random word using index
var chosenWord = words[Math.floor(Math.random() * words.length)]
var guessedLetters = []
var remainingGuesses = 4
//Display underscores for each letter of the chosen word
for(var i=0; i < chosenWord.length; i++) {
    $('#word-container').append('<div class="hidden-letter" style="font-size:30px;">_</div>')
}

//Function to update the display of the guessed letters
function updateGuesses(){
    $('#guess-container').empty()
    $('#guess-container').text(guessedLetters.join(', '))
}

function textNormal() {
    document.getElementById('title').style.color = 'black'
    document.getElementById('title').innerText = "Hangman"
}
//Function to check if the guess letter is in the chosen word
function checkGuess(letter){
    if(chosenWord.indexOf(letter) === -1){
        remainingGuesses--
        $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
        //updates the hang man picture for the user
        if (wrongGuess == 1) {
            document.getElementById("hangmanImg").src = "full1.png"
            wrongGuess++
        }
        else if (wrongGuess == 2) {
            document.getElementById("hangmanImg").src = "full2.png"
            wrongGuess++
        }
        else if (wrongGuess == 3) {
            document.getElementById("hangmanImg").src = "full3.png"
            wrongGuess++
        }
        else if (wrongGuess == 4) {
            document.getElementById("hangmanImg").src = "full4.png"
        }
        document.getElementById('title').style.color = 'red'
        document.getElementById('title').innerText = "Wrong"
        setInterval(textNormal, 5000)
    }else {
        //Reveal the guessed letter
        $('.hidden-letter').each(function(index){
            if(chosenWord[index] === letter) {
                $(this).text(letter)
            }
        })
        document.getElementById('title').style.color = 'green'
        document.getElementById('title').innerText = "Correct"
        setInterval(textNormal, 5000)
    }
    updateGuesses()
    checkGameStatus()
}

//Function to check if the game has been won or lost
function checkGameStatus() {
    if($('.hidden-letter:contains("_")').length === 0) {
        document.getElementById('title').innerText = "You Won!"
        document.getElementById('remaining-guesses').innerHTML = "<h4>Congratulations</h4>"
        document.getElementById('word-container').style.color = "red"
        document.getElementById('title').style.color = "red"
        playing = false
        clearInterval(timer)
    }else if(remainingGuesses === 0){
        document.getElementById('title').innerText = "You Lost."
        document.getElementById('remaining-guesses').innerHTML = "<h4>The right word was " + chosenWord + "</h4>"
        document.getElementById('remaining-guesses').style.color = "red"
        document.getElementById('title').style.color = "red"
        playing = false
        clearInterval(timer)
    }
}

//Function to reset the game
function resetGame(){
    refreshPage()
    guessedLetters = []
    remainingGuesses = 4
    minutes = 0
    seconds = 0
    count = 0
    wrongGuess = 0
    document.getElementById("workPlace").value = ""
    $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
    $('#word-container').empty()
    chosenWord = words[Math.floor(Math.random() * words.length)]
    for(var i=0; i < chosenWord.length; i++) {
        $('#word-container').append('<div class="hidden-letter">_</div>')
    }
    $('#wordplace').text("")
    updateGuesses()
}
$(document).keypress(function(event){
    var letter = String.fromCharCode(event.which).toLowerCase()
    if (playing == true) {
        if(letter.match(/[a-z]/) && guessedLetters.indexOf(letter) === -1){
            guessedLetters.push(letter)
            checkGuess(letter)
        }
    }
})

//Event handler for the reset button
$('#reset-button').click(function() {
    resetGame()
})

//Initial display of remaining guesses
$('#remaining-guesses').text('Remaining letters: ' + remainingGuesses)
function getTime() {
    seconds++;
    //if the time is 60 seconds, it converts it into a minute
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    //has a little if else statement by checking if the seconds is double digits or not, just for formatting.
    var finalTime = minutes + ':' + (seconds < 10 ? '0' : '')  + seconds;
    document.getElementById('countUp').innerHTML = finalTime;
}

//interval for the timer to start updating every second
var timer = setInterval(getTime,1000)

// Function to stop listening for keypress events
function stopListening() {
    playing = false;
}
// Function to start listening for keypress events
function startListening() {
    playing = true;
}
//Event handler for enter key when the user uses the word bank
var wordBank = []
var count = 0
$("#workPlace").on("keydown",function search(e) {
    if (count != 3) {
        if(e.keyCode == 13) {
            //gets the value from the input box
            wordBank.push($(this).val())
            //places the value on the screen for the user to use when they click enter
            $('#wordplace').append('<h4>' + $(this).val() + '</h4>')
            //increases the count by 1, only allows for max of 3 words in the work place area
            count++
        }
    }
});
//function to refresh the page back to normal, used in the reset button
function refreshPage(){
    window.location.reload();
    document.getElementById("hangmanImg").src = "full (1).png"
} 