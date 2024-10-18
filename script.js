const pythonQuestions = [
  {
    question: "What is the correct way to create a function in Python?",
    options: ["function myFunction()", "def myFunction()", "create myFunction()", "make myFunction()"],
    answer: 1
  },
  {
    question: "Which of the following is used for comments in Python?",
    options: ["// Comment", "/* Comment */", "# Comment", "-- Comment"],
    answer: 2
  }
  // Add more Python questions here
];

const sqlQuestions = [
  {
    question: "Which SQL statement is used to extract data from a database?",
    options: ["SELECT", "EXTRACT", "GET", "RETRIEVE"],
    answer: 0
  },
  {
    question: "Which SQL keyword is used to sort the result-set?",
    options: ["SORT BY", "ORDER BY", "GROUP BY", "ALIGN BY"],
    answer: 1
  }
  // Add more SQL questions here
];

let currentQuestionIndex = 0;
let selectedQuestions = [];
let timer;
let timeLeft = 10;

function startQuizSelection() {
  const name = document.getElementById('name').value;
  if (name) {
    document.getElementById('name-input').style.display = 'none';
    document.getElementById('quiz-selection').style.display = 'block';
    document.getElementById('userName').innerText = name;
  } else {
    alert('Please enter your name.');
  }
}

function startQuiz(type) {
  document.getElementById('quiz-selection').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';

  selectedQuestions = type === 'python' ? pythonQuestions : sqlQuestions;
  currentQuestionIndex = 0;
  showQuestion();
}

function showQuestion() {
  clearTimeout(timer);
  timeLeft = 10;

  if (currentQuestionIndex < selectedQuestions.length) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const options = document.getElementById('options');
    options.innerHTML = '';
    
    currentQuestion.options.forEach((option, index) => {
      const li = document.createElement('li');
      li.innerText = option;
      li.onclick = () => checkAnswer(index);
      options.appendChild(li);
    });

    startTimer();
  } else {
    endQuiz();
  }
}

function checkAnswer(selectedIndex) {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;
  const options = document.getElementById('options').children;
  
  if (selectedIndex === correctIndex) {
    options[selectedIndex].classList.add('correct');
  } else {
    options[selectedIndex].classList.add('incorrect');
    options[correctIndex].classList.add('correct');
  }

  currentQuestionIndex++;
  setTimeout(showQuestion, 2000); // 2 second gap after each question
}

function startTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.innerText = `Time left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(-1);  // If no answer is selected, mark as incorrect
    }
  }, 1000);
}

function endQuiz() {
  document.getElementById('quiz-container').innerHTML = `<h2>Quiz Complete!</h2>`;
}
