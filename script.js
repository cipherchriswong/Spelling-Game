let words = [
  { word: "yellow", meaning: "黃色" },
  { word: "banana", meaning: "香蕉" },
  { word: "school", meaning: "學校" },
  { word: "friend", meaning: "朋友" },
  { word: "family", meaning: "家庭" },
  { word: "animal", meaning: "動物" },
  { word: "grapes", meaning: "提子" },
  { word: "pencil", meaning: "鉛筆" },
  { word: "window", meaning: "窗" },
  { word: "orange", meaning: "橙" }
];

let current = 0;
let score = 0;

function loadQuestion() {
  const q = words[current];
  document.getElementById("question").textContent = q.meaning;
  const inputs = document.getElementById("inputs");
  inputs.innerHTML = '';
  for (let i = 0; i < q.word.length; i++) {
    const input = document.createElement("input");
    input.setAttribute("maxlength", 1);
    input.dataset.index = i;
    inputs.appendChild(input);
  }
}

function checkAnswer() {
  const q = words[current];
  const inputs = document.querySelectorAll("#inputs input");
  let answer = "";
  inputs.forEach(input => answer += input.value.toLowerCase());
  const feedback = document.getElementById("feedback");

  if (answer === q.word.toLowerCase()) {
    feedback.textContent = "正確！";
    score++;
    document.getElementById("score").textContent = "分數：" + score;
    inputs.forEach(input => input.classList.add("correct"));
    speak(q.word);
  } else {
    feedback.textContent = "錯喇！答案係：" + q.word;
    inputs.forEach(input => input.classList.add("incorrect"));
  }

  setTimeout(() => {
    current++;
    if (current < words.length) {
      loadQuestion();
      feedback.textContent = '';
    } else {
      feedback.textContent = "遊戲結束！你總共攞到 " + score + " 分。";
      document.getElementById("inputs").innerHTML = '';
    }
  }, 1500);
}

function showHint() {
  const q = words[current];
  const inputs = document.querySelectorAll("#inputs input");
  if (inputs.length > 0) {
    inputs[0].value = q.word[0].toUpperCase();
  }
}

function speak(word) {
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
}

window.onload = loadQuestion;
