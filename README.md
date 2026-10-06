# Quiz App

A simple interactive quiz application built with React and TypeScript. Users can answer multiple-choice questions, receive immediate feedback, and see their final score at the end of the quiz.

## Demo

**Live Demo:** Coming soon

**GitHub:** https://github.com/0309syr/quiz-app

## Features

- Start a quiz from the welcome screen
- Multiple-choice questions
- Select and confirm an answer
- Prevents submitting without selecting an answer
- Shows the correct answer after each question
- Provides different feedback for correct and incorrect answers
- Tracks the user's score
- Displays the final score and number of correct/incorrect answers
- Allows the user to restart the quiz

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

## What I Learned

This project helped me practice building an interactive React application using state and conditional rendering.

### React state management

I used `useState` to manage:

- Whether the quiz has started
- The current question
- The selected answer
- Whether the answer should be displayed
- The user's score
- Whether the quiz is complete
- Validation messages

### Conditional rendering

The application displays different screens depending on the current state:

1. Start screen
2. Question screen
3. Answer feedback screen
4. Final score screen

This helped me understand how React can use state to control what the user sees.

### User interaction

I also practiced handling user actions such as:

- Selecting an answer
- Confirming an answer
- Moving to the next question
- Restarting the quiz

## Running Locally

Clone the repository and install the dependencies:

```bash
git clone https://github.com/0309syr/quiz-app.git
cd quiz-app
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Future Improvements

Possible improvements for future versions include:

- Add more questions
- Make the questions reusable through external data
- Add a progress bar
- Add different quiz categories
- Add a timer
- Improve accessibility
- Add responsive design improvements
- Store high scores

## Project Purpose

This project was created as a hands-on React project to practice state management, conditional rendering, event handling, and TypeScript while building a complete interactive application.
