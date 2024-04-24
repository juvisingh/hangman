
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

//Function to check if the guess letter is in the chosen word
function checkGuess(letter){
    if(chosenWord.indexOf(letter) === -1){
        remainingGuesses--
        $('#remaining-guesses').text("Remaining Guesses: " + remainingGuesses)
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
    }else {
        //Reveal the guessed letter
        $('.hidden-letter').each(function(index){
            if(chosenWord[index] === letter) {
                $(this).text(letter)
            }
        })
    }
    updateGuesses()
    checkGameStatus()
}

//Function to check if the game has been won or lost
function checkGameStatus() {
    if($('.hidden-letter:contains("_")').length === 0) {
        alert('Congratulations, You Won')
        resetGame()
    }else if(remainingGuesses === 0){
        alert('You suck, the world was: ' + chosenWord)
        resetGame()
    }
}

//Function to reset the game
function resetGame(){
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
var timer = setInterval(getTime,1000)

function stopListening() {
    playing = false;
}
// Function to start listening for keypress events
function startListening() {
    playing = true;
}
//Event handler for key presses
var wordBank = []
var count = 0
$("#workPlace").on("keydown",function search(e) {
    if (count != 3) {
        if(e.keyCode == 13) {
            wordBank.push($(this).val())
            $('#wordplace').append('<h4>' + $(this).val() + '</h4>')
            count++
        }
    }
});
function refreshPage(){
    window.location.reload();
    document.getElementById("hangmanImg").src = "full (1).png"
} 