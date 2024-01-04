function generateQuiz() {
  const container = document.querySelector('.quiz-container');

  quizData.forEach((questionData) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.id = questionData.id;

    questionDiv.innerHTML = `
      <p><strong>${questionData.number}. ${questionData.question}</strong></p>
      <div class="options">
        ${questionData.options.map((option, index) => `
          <label><input type="radio" name="${questionData.id}" value="${String.fromCharCode(97 + index)}">${option}</label>
        `).join('')}
      </div>
    `;

    container.appendChild(questionDiv);
  });

  const submitBtn = document.createElement('button');
  submitBtn.id = 'submit-btn';
  submitBtn.textContent = 'Submit Answers';
  submitBtn.addEventListener('click', checkAnswers);
  container.appendChild(submitBtn);

  const resultDiv = document.createElement('div');
  resultDiv.id = 'result';
  container.appendChild(resultDiv);
}

function checkAnswers() {
  const correctness = Array(quizData.length).fill(null);

  quizData.forEach((questionData, index) => {
    const selectedOption = document.querySelector(`input[name="${questionData.id}"]:checked`);

    if (selectedOption) {
      const userAnswer = selectedOption.value;
      correctness[index] = userAnswer === questionData.correctAnswer;

      document.getElementById(questionData.id).classList.remove('correct', 'incorrect');
      document.getElementById(questionData.id).classList.add(correctness[index] ? 'correct' : 'incorrect');
    }
  });

  const score = correctness.filter((correct) => correct).length;
  document.getElementById('result').innerHTML = `Your score: ${score} / ${quizData.length}`;
}

generateQuiz();
