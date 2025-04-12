let words = [];
let current = 0;
let score = 0;

fetch('words.json')
  .then(res => res.json())
  .then(data => {
    words = shuffle(data).slice(0, 10);
    nextQuestion();
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function speak(word) {
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
}

function displayWord(word) {
  const container = document.getElementById("letters");
  container.innerHTML = '';
  const shuffled = shuffle(word.split(''));
  shuffled.forEach(letter => {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.onclick = () => {
      document.getElementById("answer").value += letter;
      btn.disabled = true;
    };
    container.appendChild(btn);
  });
}

function checkAnswer() {
  const input = document.getElementById("answer").value;
  const correct = words[current].word;
  const feedback = document.getElementById("feedback");
  if (input.toLowerCase() === correct.toLowerCase()) {
    feedback.textContent = "正確！";
    score += 1;
    speak(correct);
  } else {
    feedback.textContent = "錯咗，正確答案係：" + correct;
  }
  document.getElementById("score").textContent = "分數：" + score;
}

function nextQuestion() {
  if (current >= words.length) {
    document.getElementById("question").textContent = "遊戲結束！";
    document.getElementById("letters").innerHTML = '';
    document.getElementById("controls").style.display = 'none';
    return;
  }
  document.getElementById("answer").value = '';
  document.getElementById("feedback").textContent = '';
  document.getElementById("question").textContent = words[current].meaning;
  displayWord(words[current].word);
  current++;
}
