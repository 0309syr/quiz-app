import { useState } from "react";
import correctFace from "./assets/correct.png";
import incorrectFace from "./assets/incorrect.png";
import trophy from "./assets/winner.png";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const totalQuestions = 3;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const correctComments = ["Great job!", "Excellent!", "Amazing!"];
  const incorrectComments = ["Keep going!", "Don't give up!", "Good try!"];
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showError, setShowError] = useState(false);

  const quiz = [
    {
      question: "What colors are the garbage cans?",
      answers: ["All blue", "Green, red and yellow", "Blue, green and black"],
      correctAnswer: "Blue, green and black",
    },
    {
      question: "What day is the garbage day?",
      answers: ["Thursday", "Friday", "Everyday"],
      correctAnswer: "Friday",
    },
    {
      question: "How many garbage trucks does Republic Services have?",
      answers: ["11000", "17000", "24000"],
      correctAnswer: "17000",
    },
  ];

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-6xl font-bold">QUIZ!</h1>
        <button
          onClick={() => setQuizStarted(true)}
          className="bg-blue-300 text-white px-6 py-2 rounded-xl text-xl font-semibold hover:bg-blue-500 transition"
        >
          Start
        </button>
      </div>
    );
  }
  if (isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-10">
        <img src={trophy} alt="Trophy" className="w-55 h-55" />
        <h1 className="text-5xl font-extrabold">Congratulations!</h1>
        <p>⭐Your score⭐</p>
        <h2 className="flex gap-8 -mt-3">
          <span>
            Total Questions: <strong>{totalQuestions}</strong>
          </span>
          <span>
            Correct: <strong>{score}</strong>
          </span>
          <span>
            Wrong: <strong>{totalQuestions - score}</strong>
          </span>
        </h2>
        <button
          className="mt-6 text-white font-semibold bg-blue-400 px-3 py-1 rounded-xl hover:bg-blue-500 transition"
          onClick={() => {
            setQuizStarted(false);
            setScore(0);
            setCurrentQuestion(0);
            setIsComplete(false);
            setShowAnswer(false);
          }}
        >
          Go back to start
        </button>
      </div>
    );
  }
  if (showAnswer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-10">
        <h2>
          {currentQuestion + 1} / {totalQuestions}
        </h2>
        <img
          src={
            selectedAnswer === quiz[currentQuestion].correctAnswer
              ? correctFace
              : incorrectFace
          }
          alt={
            selectedAnswer === quiz[currentQuestion].correctAnswer
              ? "Happy Face"
              : "Neutral Face"
          }
          className="w-30 h-30"
        />
        <h1 className="text-3xl font-bold">
          Answer: {quiz[currentQuestion].correctAnswer}
        </h1>
        <p>
          {selectedAnswer === quiz[currentQuestion].correctAnswer
            ? null
            : `Your answer: ${selectedAnswer}`}
        </p>
        <h2>
          {selectedAnswer === quiz[currentQuestion].correctAnswer
            ? correctComments[
                Math.floor(Math.random() * correctComments.length)
              ]
            : incorrectComments[
                Math.floor(Math.random() * incorrectComments.length)
              ]}
        </h2>
        <button
          className="mt-6 text-white font-semibold bg-blue-400 px-3 py-1 rounded-xl hover:bg-blue-500 transition"
          onClick={() => {
            setSelectedAnswer("");
            if (currentQuestion === totalQuestions - 1) {
              setIsComplete(true);
            } else {
              setCurrentQuestion(currentQuestion + 1);
              setShowAnswer(false);
            }
          }}
        >
          {currentQuestion === totalQuestions - 1 ? "See the Score" : "Next"}
        </button>
      </div>
    );
  } else if (quizStarted && !isComplete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-12">
        <h2>
          {currentQuestion + 1} / {totalQuestions}
        </h2>
        <p className="text-2xl font-semibold">
          Q{currentQuestion + 1}. {quiz[currentQuestion].question}
        </p>
        <div className="flex flex-col gap-4">
          <button
            className={`w-60 text-left border-2 rounded-2xl px-3 py-1 hover:border-blue-500 transition
            ${
              selectedAnswer === quiz[currentQuestion].answers[0]
                ? "border-blue-500"
                : "border-gray-400"
            }`}
            onClick={() => setSelectedAnswer(quiz[currentQuestion].answers[0])}
          >
            A. {quiz[currentQuestion].answers[0]}
          </button>
          <button
            className={`w-60 text-left border-2 rounded-2xl px-3 py-1 hover:border-blue-500 transition"
            ${
              selectedAnswer === quiz[currentQuestion].answers[1]
                ? "border-blue-500"
                : "border-gray-400"
            }`}
            onClick={() => setSelectedAnswer(quiz[currentQuestion].answers[1])}
          >
            B. {quiz[currentQuestion].answers[1]}
          </button>
          <button
            className={`w-60 text-left border-2 rounded-2xl px-3 py-1 hover:border-blue-500 transition"
            ${
              selectedAnswer === quiz[currentQuestion].answers[2]
                ? "border-blue-500"
                : "border-gray-400"
            }`}
            onClick={() => setSelectedAnswer(quiz[currentQuestion].answers[2])}
          >
            C. {quiz[currentQuestion].answers[2]}
          </button>
        </div>

        <div className="relative">
          {showError && (
            <p className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-2 whitespace-nowrap text-red-500">
              Please choose one option!
            </p>
          )}

          <button
            className={`mt-6 text-white font-semibold bg-blue-400 px-3 py-1 rounded-xl hover:bg-blue-500 transition `}
            onClick={() => {
              if (selectedAnswer === "") {
                setShowError(true);
                return;
              }
              setShowError(false);
              if (selectedAnswer === quiz[currentQuestion].correctAnswer) {
                setScore(score + 1);
              }
              setShowAnswer(true);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }
}

export default App;
