document.addEventListener('DOMContentLoaded', function () {
    const questions = [
    {
      question: "What are the primary colors in additive color mixing?",
      options: ["Red, Green, Blue", "Yellow, Magenta, Cyan", "Red, Yellow, Blue", "Green, Orange, Purple"],
      correctAnswer: [1]
    },
    {
      question: "Which of the following are programming languages?",
      options: ["HTML", "CSS", "JavaScript", "Java"],
      correctAnswer: [3, 4]
    },
    {
      question: "Which countries are part of the European Union?",
      options: ["France", "Germany", "Italy", "Spain"],
      correctAnswer: [1, 2, 4]
    },
    {
      question: "Who are characters in the Harry Potter series?",
      options: ["Frodo Baggins", "Hermione Granger", "Aragorn", "Katniss Everdeen"],
      correctAnswer: [2]
    },
    {
      question: "Which of the following are types of mammals?",
      options: ["Fish", "Elephant", "Lizard", "Dolphin"],
      correctAnswer: [2, 4]
    },
    {
      question: "What are the benefits of regular exercise?",
      options: ["Improved cardiovascular health", "Enhanced flexibility", "Increased intelligence", "Better sleep"],
      correctAnswer: [1, 2, 4]
    },
    {
      question: "Which programming languages are known for web development?",
      options: ["Java", "Python", "HTML", "JavaScript"],
      correctAnswer: [3, 4]
    },
    {
      question: "What are the components of the water cycle?",
      options: ["Evaporation", "Condensation", "Precipitation", "Transpiration"],
      correctAnswer: [1, 2, 3]
    },
    {
      question: "Which of the following are renewable energy sources?",
      options: ["Solar", "Coal", "Wind", "Nuclear"],
      correctAnswer: [1, 3]
    },
    {
      question: "Who are famous painters from the Renaissance period?",
      options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
      correctAnswer: [1]
    }
  ];
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let selectedAnswers = [];

  function updateQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const resultElement = document.getElementById("result");
    const counterElement = document.getElementById("counter");
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;



    questionElement.textContent = `Вопрос ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
    optionsContainer.innerHTML = "";
    resultElement.textContent = "";
    counterElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;


    currentQuestion.options.forEach((option, optionNumber) => {
      const optionElement = document.createElement("button");
      optionElement.textContent = option;
      optionElement.addEventListener("click", () => selectAnswer(optionElement, optionNumber + 1));
      optionsContainer.appendChild(optionElement);
    });

    if(correctAnswer.length > 1 ){
      resultElement.textContent = "This question has multiple answer options";
    }
  }

  function selectAnswer(optionElement, userAnswer) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    if (correctAnswer.length > 1) {
      const index = selectedAnswers.indexOf(userAnswer);
      if (index === -1) {
        selectedAnswers.push(userAnswer);
        optionElement.style.backgroundColor = "#535a53"
      } else {
        selectedAnswers.splice(index, 1);
        optionElement.style.backgroundColor = "#d8e8d8"
      }

      if(selectedAnswers.length === correctAnswer.length){
        IsCorrect(selectedAnswers);
        endTurn();
      }

    } else {
      selectedAnswers = [userAnswer];
      optionElement.style.backgroundColor = "#535a53"
      IsCorrect(selectedAnswers);
      endTurn();
    }
  }

  function IsCorrect(selectedAnswers){
    let correct;
    const resultElement = document.getElementById("result");
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if(correct = correctAnswer.every((value, index) => value === selectedAnswers[index])){
      resultElement.textContent  = "Correct";
      resultElement.style.color = "#8aff8a";
      correctAnswers++
    }else{
      resultElement.textContent  = "incorrect";
      resultElement.style.color = "#ff8a8a";
    }
  }

  function endTurn() {
    const optionButtons = document.querySelectorAll('#options button');
    document.getElementById("next-btn").disabled = false;
    optionButtons.forEach(button => {
      button.disabled = true;
    });
  }



  function nextQuestion() {
    currentQuestionIndex++;
    selectedAnswers = []
    const resultElement = document.getElementById("result");
    resultElement.style.color = "#000000";
    if (currentQuestionIndex < questions.length) {
      updateQuestion();
      document.getElementById("next-btn").disabled = true;
      
    } else {
      showResults();
    }
  }


  function showResults() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Правильных ответов: ${correctAnswers} из ${questions.length} `;
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("restart-btn").style.display = "block";
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    selectedAnswers = [];
    updateQuestion();
    document.getElementById("next-btn").style.display = "block";
    document.getElementById("restart-btn").style.display = "none";
  }

  updateQuestion();
  document.getElementById("next-btn").addEventListener("click", nextQuestion);
  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
});