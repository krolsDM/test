document.addEventListener("DOMContentLoaded", function () {
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
          correctAnswer: [1, 2, 3, 4]
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
  
      questionElement.textContent = `Вопрос ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
      optionsContainer.innerHTML = "";
      resultElement.textContent = "";
      counterElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${questions.length}`;
  
      const isMultipleChoice = Array.isArray(currentQuestion.correctAnswer);
  
      if (isMultipleChoice) {
        resultElement.textContent = "Этот вопрос имеет несколько вариантов ответа. Выберите все правильные варианты.";
      }
  
      currentQuestion.options.forEach((option, index) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => selectAnswer(index + 1));
        optionsContainer.appendChild(optionElement);
      });
    }
  
    function selectAnswer(userAnswer) {
      const currentQuestion = questions[currentQuestionIndex];
  
      if (Array.isArray(currentQuestion.correctAnswer)) {
        // Если ответ множественный, добавляем или убираем выбранный вариант
        const index = selectedAnswers.indexOf(userAnswer);
        if (index === -1) {
          selectedAnswers.push(userAnswer);
        } else {
          selectedAnswers.splice(index, 1);
        }
      } else {
        // Если ответ одиночный, просто присваиваем выбранный вариант
        selectedAnswers = [userAnswer];
      }
  
      // Проверяем, можно ли перейти к следующему вопросу
      const canProceed = Array.isArray(currentQuestion.correctAnswer)
        ? selectedAnswers.length === currentQuestion.correctAnswer.length
        : selectedAnswers.length === 1;
  
      document.getElementById("next-btn").disabled = !canProceed;
    }
  
    function nextQuestion() {
      const options = document.querySelectorAll('#options button');
      options.forEach(option => option.disabled = false);
  
      const currentQuestion = questions[currentQuestionIndex];
  
      // Проверяем ответы в зависимости от типа вопроса
      if (Array.isArray(currentQuestion.correctAnswer)) {
        const correct = arraysEqual(selectedAnswers, currentQuestion.correctAnswer);
        displayResult(correct);
      } else {
        const correct = selectedAnswers[0] === currentQuestion.correctAnswer;
        displayResult(correct);
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        updateQuestion();
        document.getElementById("next-btn").disabled = true;
      } else {
        showResults();
      }
    }
  
    function displayResult(correct) {
      const resultElement = document.getElementById("result");
  
      if (correct) {
        resultElement.textContent = "Правильно!";
        resultElement.style.color = "#8aff8a";
        correctAnswers++;
      } else {
        resultElement.textContent = "Неправильно!";
        resultElement.style.color = "#ff8a8a";
      }
  
      selectedAnswers = [];
    }
  
    function arraysEqual(arr1, arr2) {
      if (arr1.length !== arr2.length) return false;
  
      for (let i = 0; i < arr1.length; i++) {
        if (!arr2.includes(arr1[i])) return false;
      }
  
      return true;
    }
  
    function showResults() {
      const resultElement = document.getElementById("result");
      resultElement.textContent = `Правильных ответов: ${correctAnswers} из ${questions.length}`;
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
  