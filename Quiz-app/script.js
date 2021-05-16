// Question & Answers Stored

const quizData = [
  {
    question: "Where did cricket originate?",
    a: "England",
    b: "France",
    c: "Norway",
    d: "Spain",
    correct: "a",
  },
  {
    question: "What does LBW stand for?",
    a: "Long Ball Wide",
    b: "Leg Beyond Width",
    c: "Leg Before Wicket",
    d: "Leg Between Wicket",
    correct: "c",
  },
  {
    question:
      "Who did England beat in the final of the 2019 Cricket World Cup?",
    a: "Australia",
    b: "Sri Lanka",
    c: "West Indies",
    d: "New Zealand",
    correct: "d",
  },
  {
    question: "How long do test cricket matches usually go on for?",
    a: "90 Minutes",
    b: "6 Hours",
    c: "3 to 5 Days",
    d: "Over a week",
    correct: "c",
  },
];

// Select Elements from HTML using DOM
const questionEl = document.getElementById("question");
const quiz = document.getElementById("quiz");
const a_text = document.getElementById("que-a");
const b_text = document.getElementById("que-b");
const c_text = document.getElementById("que-c");
const d_text = document.getElementById("que-d");
const submitBtn = document.getElementById("submit");
const answerE1s = document.querySelectorAll(".answer");

// Global variables
let currentQuiz = 0;
let score = 0;

// Initial Call
loadQuiz();

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let selectedAnswer = undefined;

  answerE1s.forEach((answerE1) => {
    if (answerE1.checked) {
      selectedAnswer = answerE1.id;
    }
  });

  return selectedAnswer;
}

function deselectAnswers() {
  answerE1s.forEach((answerE1) => {
    answerE1.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  console.log(answer);
  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>You answered ${score} out of ${quizData.length} questions correctly</h2><button class="btn btn-success btn-lg" onClick="location.reload()">Reload</button>`;
    }
  }
});
