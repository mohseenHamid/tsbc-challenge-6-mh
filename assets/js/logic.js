/*
Pseudocode 

- Init function that sets the board to default
    - All questions are hidden and deselected
    - Timer is reset
    - Highscores are stored
    - Reset the questions array
    - Sound toggle to default (on)
- Click the start quiz button
- Display an alert informing the user: 
    - There are x questions
    - 15 seconds per question (timer gives the total running time)
    - The timer is in the top right corner
    - As soon as user selects begin the timer will start
    - View highscores at the end by selecting "view highscores" in the top left corner
- Display the first multiple choice quiz question at random
    - Arrange questions as an array of objects
        - answers -> array of responses
        questions = [
            {
                question: TEXT
                answers: [
                    {
                        response: TEXT, correct: true
                        response: TEXT, correct: false
                        response: TEXT, correct: false
                        response: TEXT, correct: false
                    }
                ]
            }
        ]
    - Filter/splice the question array to remove the used question 
    - Display the question options at random
    - The HTML will have one question code block that JS cycles the question array through via show and hide
- If answered correctly, display correct
- If answered incorrectly, display incorrect
- If answered incorrectly, reduce 5 seconds from the timer
- Cycle through the questions by clicking next
- Upon completion display message:
    - Informing user of score
    - Option to register their name
    - Display the highscore board upon submission (toggle to highscore page)
- Allow option to clear highscore board

Functions:
- gameInit()
- setQuestion()
- chooseAnswer()
- enterDetails()
- getHighscores()
*/

// DOM variables
let highscoresBtn = document.getElementsByClassName("scores");
let timerCount = document.getElementById("time");
let startScreen = document.getElementById("start-screen");
let questionsBlock = document.getElementById("questions");
let qTitle = document.getElementById("question-title");
let qChoicesBlock = document.getElementById("choices");
let startQuizBtn = document.getElementById("start");
let endScreen = document.getElementById("end-screen");
let feedback = document.getElementById("feedback");
let finalScore = document.getElementById("final-score");
let choiceMessage = document.getElementById("response-message");
let regSbmtBtn = document.getElementById("submit");
let regInput = document.getElementById("initials");
let regErrorDisplay = document.getElementById("msg-alert");
const correctAudio = new Audio("./assets/sfx/correct.wav");
const incorrectAudio = new Audio("./assets/sfx/incorrect.wav");

// Global variables
let shuffledQsArray = shuffle(questions);
// Keeps track of the question number + index of the shuffled questions array
let count = 0;
// Stores the player's points tally
let score = 0;
let correctAnswer = "";
const timeTotal = questions.length * 10;
let secondsLeft = timeTotal;

// Set game conditions
gameInit();

// Function to initialise game conditions
function gameInit() {
	startScreen.classList.remove("hide");
	questionsBlock.classList.add("hide");

	shuffledQsArray = shuffle(questions);
	count = 0;
	score = 0;
	correctAnswer = "";
	secondsLeft = timeTotal;
	timerCount.textContent = timeTotal;
}

// Auxiliary function for getting a random element's value from an array (taken from challenge 5)
function getRandom(arr) {
	let arrIndex = Math.floor(Math.random() * arr.length);
	return arr[arrIndex];
}

// Auxiliary function for shuffling an array (inspired by stack)
// src: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
	// Initialise random index variable
	let random = "";

	// Loop through the array length
	for (let currentIndex = 0; currentIndex < array.length; currentIndex++) {
		// Pick a random element
		random = Math.floor(Math.random() * currentIndex);

		// Swap it with the current element
		[array[currentIndex], array[random]] = [array[random], array[currentIndex]];
	}
	return array;
}

function registerScore() {
	let initials = regInput.value;

	// Array to store all player results that's then pushed to localStorage
	let resultsArray = [];

	// Checking if localStorage is populated and retrieving if so
	if (localStorage.getItem("result") !== null) {
		resultsArray = JSON.parse(localStorage.getItem("result"));
	}

	if (initials.trim() === "") {
		regErrorDisplay.textContent = "Please enter your initials";
	} else if (initials.trim().length > 3) {
		regErrorDisplay.textContent = "Maximum of 3 characters";
	} else {
		regErrorDisplay.textContent = "Registered Successfully!";
		regErrorDisplay.style.color = "green";
		regInput.readOnly = true;

		// Push result to resultsArray and submit updated resultsArray to localStorage as string
		let result = initials + ": " + score;

		resultsArray.push(result);
		localStorage.setItem("result", JSON.stringify(resultsArray));

		console.log(resultsArray);
	}
}

// Stops the game
function endGame() {
	questionsBlock.classList.add("hide");
	endScreen.classList.remove("hide");

	finalScore.textContent = score;
	finalScore.style.fontWeight = "bold";

	// Calls the function that handles the player submission
	regSbmtBtn.addEventListener("click", registerScore);
}

// Function that sets the timer and stops it upon game completion
function setTime() {
	// Sets interval in variable
	let timerInterval = setInterval(function () {
		secondsLeft--;
		timerCount.textContent = secondsLeft;

		// Endgame conditions to stop the timer
		if (secondsLeft == 0 || count == questions.length) {
			// Stops execution of action at set interval
			clearInterval(timerInterval);
			// Stops the game
			endGame();
		}
	}, 1000);
}

// Function to validate user's quiz question responses
function choiceSelection(e) {
	if (count < questions.length) {
		// Determining the correct answer from the options and assigning to variable
		shuffledQsArray[count].responses.forEach(function (item) {
			if (item.correct == true) {
				correctAnswer = item.answer;
			}
		});

		// Tracking score + displaying relevant response message
		if (e.target.textContent == correctAnswer) {
			score += 5;
			choiceMessage.textContent = "Correct!";
			correctAudio.play();
		} else {
			incorrectAudio.play();

			// Evalutaing an incorrect answer
			if (secondsLeft >= 5) {
				// Only reduce timer if enough seconds remain
				secondsLeft -= 5;
				choiceMessage.textContent = "That's so wrong!";
				timerCount.style = "font-weight: bold; font-size: 200%; color: purple";
				timerCount.style.transition = "all 1.5s";
				setTimeout(function () {
					timerCount.style =
						"font-weight: normal; font-size: 120%; color: black";
					timerCount.style.transition = "all 1.5s";
				}, 1000);
				// End the game if not enough time remaining
			} else {
				endGame();
			}
		}

		// Only display the response message for a set amount of time
		setTimeout(function () {
			choiceMessage.textContent = "";
		}, 1000);

		count++;

		if (count <= 4) {
			displayQ();
		} else if (count === 5) {
			// End the game if final question is answered
			setTimeout(function () {
				endGame();
			}, 2000);
		}
	}
}

// Function to display the next question
function displayQ() {
	qTitle.textContent = shuffledQsArray[count].question;
	qChoicesBlock.textContent = "";

	let qNum = document.createElement("span");
	qNum.textContent = `${count + 1}/${questions.length}: `;
	qTitle.prepend(qNum);

	let shuffledChoicesArray = shuffle(shuffledQsArray[count].responses);
	for (let i = 0; i < 4; i++) {
		let choice = document.createElement("button");
		choice.className = "choiceBtn";
		choice.textContent = shuffledChoicesArray[i].answer;
		qChoicesBlock.appendChild(choice);

		// Calls function that evaluates player's selection
		choice.addEventListener("click", choiceSelection);
	}
}

// Function to initialise game settings
function gameConditions() {
	// Hides the landing page
	startScreen.classList.add("hide");
	// Displays the empty questions div
	questionsBlock.classList.remove("hide");

	// Calls the timer function
	setTime();
	// Calls the function which populates the questions div
	displayQ();
}

// Event listener for the start quiz btn set to game initialisation function
startQuizBtn.addEventListener("click", gameConditions);
