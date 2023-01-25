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

let shuffledQsArray = shuffle(questions);
let count = 0;
let score = 0;
let correctAnswer = "";
const timeTotal = questions.length * 10;
let secondsLeft = timeTotal;

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

// Function for getting a random element's value from an array (taken from challenge 5)
function getRandom(arr) {
	let arrIndex = Math.floor(Math.random() * arr.length);
	return arr[arrIndex];
}

// Shuffle array (inspired by stack)
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

function choiceSelection(e) {
	if (count < questions.length) {
		shuffledQsArray[count].responses.forEach(function (item) {
			if (item.correct == true) {
				correctAnswer = item.answer;
			}
		});

		if (e.target.textContent == correctAnswer) {
			score += 5;
			choiceMessage.textContent = "Correct!";
		} else {
			if (secondsLeft >= 5) {
				secondsLeft -= 5;
				choiceMessage.textContent = "That's so wrong!";
				timerCount.style = "font-weight: bold; font-size: 200%; color: purple";
				timerCount.style.transition = "all 1.5s";
				setTimeout(function () {
					timerCount.style =
						"font-weight: normal; font-size: 120%; color: black";
					timerCount.style.transition = "all 1.5s";
				}, 1000);
			} else {
				endGame();
			}
		}

		setTimeout(function () {
			choiceMessage.textContent = "";
		}, 1000);

		count++;
		if (count <= 4) {
			displayQ();
		} else if (count === 5) {
			setTimeout(function () {
				endGame();
			}, 2000);
		}
	}
}

// function registerScore() {
// if (regInput )
// }

function endGame() {
	questionsBlock.classList.add("hide");
	endScreen.classList.remove("hide");

	finalScore.textContent = score;
	finalScore.style.fontWeight = "bold";

	regSbmtBtn.addEventListener("click", registerScore);
}

function setTime() {
	// Sets interval in variable
	let timerInterval = setInterval(function () {
		secondsLeft--;
		timerCount.textContent = secondsLeft;

		if (secondsLeft == 0 || count == questions.length) {
			// Stops execution of action at set interval
			clearInterval(timerInterval);
			// Calls function to create and append image
			endGame();
		}
	}, 1000);
}

function gameConditions() {
	startScreen.classList.add("hide");
	questionsBlock.classList.remove("hide");

	setTime();
	displayQ();
}

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

		choice.addEventListener("click", choiceSelection);
	}
}

startQuizBtn.addEventListener("click", gameConditions);

gameInit();
