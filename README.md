# Week 6 Challenge: Code Quiz Using Web APIs

## Description

Build a timed coding quiz with multiple-choice questions. TThis app will run in the browser, and will feature dynamically updated HTML and CSS powered by JavaScript code.

## User Story

```
AS A coding boot camp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

1. The quiz is initiated when the "Start Quiz" button is clicked
   - The 1st question is displayed
   - The timer begins
2. Each question block displays a button for each answer option
3. When an answer is clicked, the next question appears
   - If the answer is incorrect, time is subtracted from the timer
4. The quiz ends when all questions are answered or the timer reaches 0
5. When the game ends
   - The player's score is displayed
   - The player has the ability to register their initials
   - The player's initials and score are saved to localStorage
   - The player's initials and score are displayed on the highscores table

## Usage

Please click on the "Start Quiz" button to begin the quiz. You begin with a time of 10 seconds per question (e.g. 5 questions = 50 seconds). The timer only displays the total time remaining. Each incorrect answer will steal away 5 seconds - be careful! Once complete, your score will be displayed. Please register your initials to be taken to the highscores page where you can compare results.

## Webpage

### Mock-Up

The following animation demonstrates the application functionality:

![Animation of code quiz. Presses button to start quiz. Clicks the button for the answer to each question, displays if answer was correct or incorrect. Quiz finishes and displays high scores. User adds their intials, then clears their intials and starts over.](./assets/08-web-apis-challenge-demo.gif)

### Deployment Link

The following link takes you to the GitHub Pages deployment:

- https://mohseenhamid.github.io/tsbc-challenge-6-mh/

## License

Please refer to the LICENSE in the repo.
