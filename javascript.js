// script.js
document.addEventListener('DOMContentLoaded', function() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const startButton = document.getElementById('startButton');
    const surveyContainer = document.getElementById('surveyContainer');
    const questionNumber = document.getElementById('questionNumber');
    const questionText = document.getElementById('questionText');
    const answerContainer = document.getElementById('answerContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const skipButton = document.getElementById('skipButton');
  
    const questions = [
      {
        id: 1,
        text: 'How satisfied are you with our products?',
        type: 'rating',
        options: [1, 2, 3, 4, 5]
      },
      {
        id: 2,
        text: 'How fair are the prices compared to similar retailers?',
        type: 'rating',
        options: [1, 2, 3, 4, 5]
      },
      {
        id: 3,
        text: 'How satisfied are you with the value for money of your purchase?',
        type: 'rating',
        options: [1, 2, 3, 4, 5]
      },
      {
        id: 4,
        text: 'On a scale of 1-10, how would you recommend us to your friends and family?',
        type: 'rating',
        options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      {
        id: 5,
        text: 'What could we do to improve our service?',
        type: 'text'
      }
    ];
  
    let currentQuestionIndex = 0;
    let answers = [];
  
    function showWelcomeScreen() 
    {
      welcomeScreen.style.display = 'block';
      surveyContainer.style.display = 'none';
    }
  
    function startSurvey() 
    {
      welcomeScreen.style.display = 'none';
      surveyContainer.style.display = 'block';
      renderQuestion();
    }
  
    function renderQuestion() 
    {
      const currentQuestion = questions[currentQuestionIndex];
      questionNumber.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
      questionText.textContent = currentQuestion.text;
      answerContainer.innerHTML = '';
  
    if (currentQuestion.type === 'rating') 
    {
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('rating-container');
  
        currentQuestion.options.forEach(option => 
            {
                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'rating';
                radioInput.value = option;
                radioInput.id = `option${option}`;
            
                const label = document.createElement('label');
                label.textContent = option;
                label.htmlFor = `option${option}`;
  
                ratingContainer.appendChild(radioInput);
                ratingContainer.appendChild(label);
            });
  
        answerContainer.appendChild(ratingContainer);
    } 
    else if (currentQuestion.type === 'text') 
    {
        const textInput = document.createElement('textarea');
        textInput.name = 'text';
        textInput.rows = 4;
  
        answerContainer.appendChild(textInput);
      }
    }
  
    function saveAnswer() {
      const currentQuestion = questions[currentQuestionIndex];
      let answer;
  
      if (currentQuestion.type === 'rating') {
        const ratingInputs = document.querySelectorAll('input[name=rating]');
        answer = Array.from(ratingInputs).find(input => input.checked).value;
      } else if (currentQuestion.type === 'text') {
        answer = document.querySelector('textarea[name=text]').value;
      }
  
      answers.push({ questionId: currentQuestion.id, answer });
    }
  
    function goToNextQuestion() {
      if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
      } else {
        submitSurvey();
      }
    }
  
    function goToPreviousQuestion() {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
      }
    }
  
    function skipQuestion() {
      goToNextQuestion();
    }
  
    function submitSurvey() {
      // Save answers to localStorage
      const surveyData = {
        sessionId: generateSessionId(),
        answers: answers
      };
  
      const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
      surveys.push(surveyData);
      localStorage.setItem('surveys', JSON.stringify(surveys));
  
      // Display a thank you message or redirect to a thank you page
      surveyContainer.innerHTML = '<h1>Thank you for completing the survey!</h1>';
    }
  
    function generateSessionId() {
      // Generate a unique session ID (you can use a library or implement your own logic)
      // For simplicity, we'll use a timestamp-based ID
      return Date.now().toString();
    }
  
    startButton.addEventListener('click', startSurvey);
    prevButton.addEventListener('click', goToPreviousQuestion);
    nextButton.addEventListener('click', saveAnswer);
    nextButton.addEventListener('click', goToNextQuestion);
    skipButton.addEventListener('click', skipQuestion);
  
    showWelcomeScreen();
  });
  