Quiz app

---GOAL---

1. Start screen
2. Questions with multiple-choice answers
3. Next question button
4. Score tracking
5. Progress indicator
6. Results screen

---PLAN---
First thing to think - What data do I need?

- questions
- options for the answer
- answer
- confirm button
- next button
- score
- progress

Structure
START PAGE
↓
User clicks START
↓
QUESTION + 3 OPTIONS
↓
User selects an option
↓
User clicks CONFIRM
↓
ANSWER IS REVEALED
↓
User clicks NEXT
↓
Next question
↓
After 3 questions:
SHOW SCORE
↓
START AGAIN

What JSX do I need?

- Start button
- Buttons for options
- Confirm button
- Next button
- Start Again button
- Question tag <h2>
- Option tag <ul>

What function do I need?

- render questions
- render answer page
- update score
- update progress

lets break down to parts start with the first thing users see!

++++++++++++++++++++++++++++ FIRST PAGE++++++++++++++++++++++++++++++
--------------------------------|
| |
| |
| (title) |
| |
| [start button] |
| |
|-------------------------------|

this page should...
show title
reset score
reset progress
button to render the first question page

!!!INPORTANT!!!

1. install tailwind
   npm install tailwindcss @tailwindcss/vite
2. change vite.config.ts
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
   plugins: [
   react(),
   tailwindcss(),
   ],
   })

3. change css
   @import "tailwindcss";

4. change index.css
   @import "tailwindcss";

Layout
flex = arrange things
flex-col = vertically
items-center = center horizontally
justify-center = center vertically
gap-8 = space between children

Spacing
p, px, py : padding = space inside
m. mt, mb : margin = space outside
using flex -> gap

effect
hover:bg-blue-700

<<<Render a Quiz function>>>
In React, we usually use state to control what is rendered instead of manually writing functions that change the UI.

state variable
const [quizStarted, setQuizStarted] = useState(false);

- quizStarted (current value): has the quiz started?
- setQuizStarted (setter function): change whether the quiz has started
- useState : React hook that lets React remember a value that can change over time

Initially,quizStarted is false. so React shows Start Screen. When the start button is clicked, setQuizStarted chnages quizStarted state to true. Now it shows quiz page. this is called re-rendeer.

I need to call a function to change quizStarted status to true
onClick={() => setQuizStarted(true)}

- onClick = {...} : when this button is clicked
- () => setQuizStarted(true) : run setQuizStarted(true)
  !! if I wrote onClick = {setQuizStarted(true)}, React would call setQuizStarted(true) immediately when the page loads.

++++++++++++++++++++++++++++Question Page+++++++++++++++++++++++++

---

| |
| 1/3 |
| Q1. What is my name? |
| |
| [A. Sayuri] |
| [B. Mika ] |
| [C. Tonks ] |
| |
| [Confirm] |
| |

---

On this page, I will have...

- progress indicater
  this count what question you are on
  counter
- question
  paragraph and question number that relate to progress indicator
- 3 buttons for answer
  user should able to choose one of three. change the color when it was clicked
- confirm button
  render answer page

const [currentQuestion, setCurrentQuestion] = useState(1);
This state will be progress indicator

const totalQuiz = 3

I can use valuable like this:

<h2>
{currentQuestion} / {totalQuestions}
</h2>

const [selectedAnswer, setSelectedAnswer] = useState("");
this is to store selected answer

<<<Let's make question object>>>
const quiz = {
question: "What colors are the garbage cans in your town?",
answers: ["All blue",
"Green, red and yellow",
"Blue, green and black"
],
correctAnswer: "Blue, green and black",
}

property:Value
question: "What colors are the garbage cans in your town?",

array = []
["All blue", "Green, red and yellow", "Blue, green and black"],

object = {}
{
question: ""
answers: ""
correctAnswer: ""
}

Now, I can use object like this:
<button className="w-60 text-left border-2 border-gray-400 rounded-2xl px-3 py-1 hover:border-blue-500 transition">
A. {quiz.answers[0]}
</button>

<<<make the buttons work!>>>

onClick={()=> setSelectedAnswer(quiz.answers[0])}
This tells React which one is selected.

Once an answer is selected, I need to change the UI, React already knows which one is selectedAnswer.

ternary operator (?:)
condition ? "if true" : "if false"

selectedAnswer === quiz.answers[0]
? "blue" //this is true condition
: "gray" //this is false condition

It means, if selectedAnswer equals quiz.answers[0], use "blue". Otherwise, use "gray".

- {} inJSX
- `` create a string
- ${} Insert JavaScript into that string

!!! debugging !!!
Earlier,
className={`w-60 text-left border-2 border-gray-400 rounded-2xl px-3 py-1 hover:border-blue-500 transition"

This line has default border color as gray-400. It was overwritten when I wanted to change the color to blue-500 on click.

React workflow

User clicks button
↓
onClick runs
↓
setSelectedAnswer(...)
↓
selectedAnswer state changes
↓
React re-renders
↓
The ternary checks selectedAnswer
↓
The selected button gets the blue border

After removing border-gray-400. It started working as I expected.

<<<Confirm button>>>
when user clicked confirm button, I want to render an answer page.
A React component returns different JSX depending on state. I need another return. Before return quiz page, I check showAnswer condition.

const [showAnswer, setShowAnswer] = useState(false);

Inside the button tag,
onClick = {()=> setShowAnswer(true)}

before else return,
if (showAnswer) {
return(

<div>
...
</div>
);
} else {...}

The order is matter because React flow is:
check quizStarted condition
↓
false: return first page
true: continue

check showAnswer condition
↓
false: continue
true: return answer page

return quiz page

+++++++++++++++++++ANSWER PAGE+++++++++++++++++++++++++++++

---

|
| 1/3
| -------
| / \
| | img |
| \ /
| -------
| Answer:~~~~~~~~~~
| comment!
|
| [Next]

---

Answer page has...

- progress indicator
  I need increase currentQuestion on Next button
- tow images for when user correct and incorrect
  need to check if answer is correct
- correct answer
- users answer is showed when user incorrect
- variety of comments for correct and incorrect
- next button to see answer or score page for the last question
  I need to check currentQuestion is the last question

Do I need isComplete function ?
I wouldn't need it just toswitch Next button to See the score. I do this instead,
{currentQuestion === totalQuestions ? "See the Score" : "Next"}
But I would need it for the score page. Now my return statement order is matter because showAnswer and isComplete state is conflict. I need to set showAnswer false on Next button everytime and flow will be:

check quizStarted
↓
check isComplete
↓
check showAnswer
↓
otherwise quiz page

Also I don't need isCorrect state because I can do {userAnswer === quiz.correctAnswer}. I need to be careful about what should be state and what each state is responsible for.

<<<Add img>>>
<img
src={
selectedAnswer === quiz.correctAnswer ? correctFace : incorrectFace
}
alt={
selectedAnswer === quiz.correctAnswer
? "Happy Face"
: "Neutral Face"
}
className="w-30 h-30"
/>

What is self-closing tag?
<img src="photo.png" />
ex.)
<img />
<input />
<br />

<hr />
img is self-closing because an image doesn't contain anything inside it.

+++++++++++++++++++++++++++++ SCORE PAGE ++++++++++++++++++++++++

---

Congratulations!
img of trophy
your score
total quiz: 3 correct: 3 wrong: 0

[Go back]

---

Score page has ...

- Congratulaton! comment
- img of a trophy
- score culcurated
- go back button to return to start page

!!! HTML collapses consecuitive whitespace !!!
Use <span> to solve the problem
<span> is an inline element that lets you treat each piece separately without creating a new line.

<h2 className="flex gap-8">
  <span>Total Questions: {totalQuestions}</span>
  <span>Correct: {score}</span>
  <span>Wrong: {totalQuestions - score}</span>
</h2>

I could do:
Total Questions: {totalQuestions}{" "}
Correct: {score}{" "}
Wrong: {totalQuestions - score}

<strong></strong>
strong makes a part of string bold
Total Questions: <strong>{totalQuestions}</strong>

className="-mt-3"
-mt-3 means negative margin-top

+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
I want to give an error when user didn't choose one option.

{showError && <p>Please choose one option!</p>}

onClick={() => {
if (selectedAnswer === "") {
setShowError(true);
return;
}

I need a new state to tell React the infomation when to change the UI

JavaScript's && works like this:
true && something → something
false && something → false

When I call setShowError(true); React goes, "The information my component is using changed. I need to render the component again."
Then, React runs App() again and since showError became true, React shows "Please choose one option!" on the question page.

Normal element takes up space. So...
className="absolute bottom-full..."
Put this message on top of the page without letting it take up space.
But we need to tell it where to go. So put it in a relative container

<div className="relative">

relative says:
"This is the area the message should be positioned around."

absolute says:
"Don't take up normal space. Position me instead."

bottom-full says:
"Put me directly above my container."

the error message floats above the Confirm button without pushing anything around.

---

Showing comments randomly

correctComments[Math.floor(Math.random() * correctComments.length)]
