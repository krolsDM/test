import questions from "./question.js";
document.addEventListener('DOMContentLoaded', function () {
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
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    document.getElementById("next-btn").disabled = false;
    optionButtons.forEach(button => {
      button.disabled = true;
    });
    optionButtons.forEach((button, index) =>{
      const correct = correctAnswer.includes(index + 1);
      if(correct){
        button.style.backgroundColor = '#32CD32';
      }else{
        button.style.backgroundColor = '#8B0000';
      }
    })

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