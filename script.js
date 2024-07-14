// Mock quizzes array (for demo purposes)
let quizzes = [];

// Function to handle quiz creation form submission
function handleCreateQuiz(event) {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const option1 = document.getElementById('option1').value;
  const option2 = document.getElementById('option2').value;
  const option3 = document.getElementById('option3').value;
  const option4 = document.getElementById('option4').value;
  const correctAnswer = parseInt(document.getElementById('correct-answer').value);

  // Validate correct answer option number (1-4)
  if (correctAnswer < 1 || correctAnswer > 4) {
    alert('Correct answer must be between 1 and 4');
    return;
  }

  // Create quiz object
  const quiz = {
    question: question,
    options: [option1, option2, option3, option4],
    correctAnswer: correctAnswer - 1 // Adjust index (0-3)
  };

  // Add quiz to quizzes array
  quizzes.push(quiz);

  // Clear form inputs
  document.getElementById('create-quiz-form').reset();

  // Update quiz list
  updateQuizList();
}

// Function to update the quiz list display
function updateQuizList() {
  const quizList = document.getElementById('quizzes');
  quizList.innerHTML = '';

  quizzes.forEach((quiz, index) => {
    const li = document.createElement('li');
    li.textContent = quiz.question;
    li.addEventListener('click', () => {
      startQuiz(index);
    });
    quizList.appendChild(li);
  });
}

// Function to start quiz
function startQuiz(index) {
  const selectedQuiz = quizzes[index];

  // Display quiz question and options
  document.getElementById('quiz-question').textContent = selectedQuiz.question;
  const quizOptions = document.getElementById('quiz-options');
  quizOptions.innerHTML = '';

  selectedQuiz.options.forEach((option, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="radio" name="quiz-option" value="${idx}"> ${option}`;
    quizOptions.appendChild(li);
  });

  // Show quiz section and hide others
  document.getElementById('quiz-list').style.display = 'none';
  document.getElementById('quiz').style.display = 'block';
}

// Function to handle quiz form submission
function handleQuizSubmit(event) {
  event.preventDefault();

  const selectedOption = document.querySelector('input[name="quiz-option"]:checked');

  if (!selectedOption) {
    alert('Please select an answer.');
    return;
  }

  const selectedAnswer = parseInt(selectedOption.value);
  const currentQuiz = quizzes.find(quiz => quiz.question === document.getElementById('quiz-question').textContent);

  // Check if answer is correct
  if (selectedAnswer === currentQuiz.correctAnswer) {
    document.getElementById('quiz-feedback').textContent = 'Correct!';
  } else {
    document.getElementById('quiz-feedback').textContent = 'Incorrect!';
  }

  // Reset quiz section
  document.getElementById('quiz-options').innerHTML = '';
  document.getElementById('quiz-feedback').style.display = 'block';

  setTimeout(() => {
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('quiz-list').style.display = 'block';
  }, 2000); // Display feedback for 2 seconds
}

// Event listeners
document.getElementById('create-quiz-form').addEventListener('submit', handleCreateQuiz);
document.getElementById('quiz-form').addEventListener('submit', handleQuizSubmit);

// Initial update of quiz list
updateQuizList();