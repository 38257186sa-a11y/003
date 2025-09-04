/* Main quiz logic. Uses window.QUESTION_BANK loaded from questions.js
   Works when opened locally (file://) as well as hosted (GitHub Pages).
*/

(() => {
  // UI elements
  const homeEl = document.getElementById('home');
  const topicsEl = document.getElementById('topics');
  const quizEl = document.getElementById('quiz');
  const resultEl = document.getElementById('result');

  const topicTitleEl = document.getElementById('topic-title');
  const progressEl = document.getElementById('progress');
  const scoreEl = document.getElementById('score');
  const questionTextEl = document.getElementById('question-text');
  const optionsListEl = document.getElementById('options');
  const submitBtn = document.getElementById('submit-btn');
  const nextBtn = document.getElementById('next-btn');
  const finishBtn = document.getElementById('finish-btn');
  const feedbackEl = document.getElementById('feedback');
  const explanationEl = document.getElementById('explanation');

  const finalScoreEl = document.getElementById('final-score');
  const retryBtn = document.getElementById('retry-btn');
  const reviewBtn = document.getElementById('review-btn');
  const backBtn = document.getElementById('back-btn');
  const reviewArea = document.getElementById('review-area');

  // State
  let topics = {}; // will be filled from QUESTION_BANK
  let currentTopic = null;
  let questions = [];
  let index = 0;
  let score = 0;
  let lastSelected = null;
  let answersGiven = []; // store chosen index for review

  // Initialize (use QUESTION_BANK)
  function init() {
    topics = window.QUESTION_BANK || {};
    renderTopics();
  }

  // Render topic buttons
  function renderTopics() {
    topicsEl.innerHTML = "";
    const keys = Object.keys(topics);
    if (keys.length === 0) {
      topicsEl.innerHTML = '<div class="note">No topics found. Edit <code>questions.js</code> to add topics.</div>';
      return;
    }
    keys.forEach((t) => {
      const btn = document.createElement('button');
      btn.className = 'topic-btn';
      btn.textContent = t;
      btn.onclick = () => startTopic(t);
      topicsEl.appendChild(btn);
    });
  }

  // Start a quiz
  function startTopic(topic) {
    currentTopic = topic;
    questions = (topics[topic] || []).slice(); // copy
    if (!Array.isArray(questions) || questions.length === 0) {
      alert('No questions in this topic. Add questions first (questions.js).');
      return;
    }
    index = 0;
    score = 0;
    answersGiven = new Array(questions.length).fill(null);
    homeEl.classList.add('hidden');
    resultEl.classList.add('hidden');
    quizEl.classList.remove('hidden');
    renderQuestion();
  }

  // Render current question
  function renderQuestion() {
    const q = questions[index];
    topicTitleEl.textContent = currentTopic;
    progressEl.textContent = `Question ${index + 1} / ${questions.length}`;
    scoreEl.textContent = `Score: ${score}`;
    questionTextEl.textContent = q.q || 'Untitled question';
    optionsListEl.innerHTML = '';
    feedbackEl.textContent = '';
    explanationEl.classList.add('hidden');
    explanationEl.textContent = '';
    lastSelected = null;

    q.opts.forEach((opt, i) => {
      const li = document.createElement('li');
      li.textContent = opt;
      li.dataset.idx = i;
      li.onclick = () => selectOption(i, li);
      optionsListEl.appendChild(li);
    });

    submitBtn.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    finishBtn.classList.add('hidden');
  }

  // Option selection
  function selectOption(i, li) {
    lastSelected = i;
    // clear selection visuals
    Array.from(optionsListEl.children).forEach(el => {
      el.classList.remove('selected');
    });
    li.classList.add('selected');
    feedbackEl.textContent = '';
  }

  // Submit answer
  function submitAnswer() {
    if (lastSelected === null) {
      feedbackEl.textContent = '⚠️ Please select an option first.';
      feedbackEl.style.color = 'crimson';
      return;
    }
    const q = questions[index];
    const correct = q.ans;
    answersGiven[index] = lastSelected;

    Array.from(optionsListEl.children).forEach((el, i) => {
      el.querySelector && el.querySelector('label');
      if (i === correct) el.classList.add('correct');
      if (i === lastSelected && i !== correct) el.classList.add('wrong');
      // disable pointer
      el.onclick = null;
    });

    if (lastSelected === correct) {
      score++;
      feedbackEl.textContent = '✅ Correct!';
      feedbackEl.style.color = 'green';
    } else {
      feedbackEl.textContent = '❌ Wrong — correct answer highlighted.';
      feedbackEl.style.color = 'crimson';
    }

    if (q.explanation) {
      explanationEl.textContent = q.explanation;
      explanationEl.classList.remove('hidden');
    }

    scoreEl.textContent = `Score: ${score}`;
    submitBtn.classList.add('hidden');
    // If last question show Finish else Next
    if (index === questions.length - 1) {
      finishBtn.classList.remove('hidden');
    } else {
      nextBtn.classList.remove('hidden');
    }
  }

  // Next question
  function nextQuestion() {
    index++;
    if (index < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  // Finish
  function finishQuiz() {
    showResult();
  }

  // Show result screen
  function showResult() {
    quizEl.classList.add('hidden');
    resultEl.classList.remove('hidden');
    finalScoreEl.textContent = `You scored ${score} / ${questions.length}`;
    reviewArea.classList.add('hidden');
    reviewArea.innerHTML = '';
  }

  // Retry same topic
  function retry() {
    startTopic(currentTopic);
  }

  // Back to topic list
  function backToTopics() {
    resultEl.classList.add('hidden');
    quizEl.classList.add('hidden');
    reviewArea.classList.add('hidden');
    homeEl.classList.remove('hidden');
  }

  // Build review area (shows questions + correct answer)
  function buildReview() {
    reviewArea.classList.remove('hidden');
    reviewArea.innerHTML = '';
    const wrap = document.createElement('div');
    questions.forEach((q, i) => {
      const box = document.createElement('div');
      box.style.padding = '12px';
      box.style.marginBottom = '8px';
      box.style.background = '#fbfcfe';
      box.style.borderRadius = '8px';
      const h = document.createElement('div');
      h.style.fontWeight = '700';
      h.textContent = `${i + 1}. ${q.q}`;
      box.appendChild(h);
      const ul = document.createElement('ul');
      ul.style.marginTop = '8px';
      q.opts.forEach((opt, oi) => {
        const li = document.createElement('li');
        li.textContent = opt + (oi === q.ans ? '  ✔ (correct)' : '');
        if (answersGiven[i] === oi && oi !== q.ans) li.textContent += '  — your answer';
        ul.appendChild(li);
      });
      box.appendChild(ul);
      if (q.explanation) {
        const expl = document.createElement('div');
        expl.style.marginTop = '6px';
        expl.style.color = '#333';
        expl.textContent = 'Explanation: ' + q.explanation;
        box.appendChild(expl);
      }
      wrap.appendChild(box);
    });
    reviewArea.appendChild(wrap);
    // hide result actions to show review scroll
  }

  // Event listeners
  submitBtn.addEventListener('click', submitAnswer);
  nextBtn.addEventListener('click', nextQuestion);
  finishBtn.addEventListener('click', finishQuiz);
  retryBtn && retryBtn.addEventListener('click', retry);
  reviewBtn && reviewBtn.addEventListener('click', buildReview);
  backBtn && backBtn.addEventListener('click', backToTopics);

  // Initialize on load
  init();
})();
