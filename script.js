var listWords = [];

function getWords() {
  return document.getElementById("paragraph").value.trim().split(/\s+/);
}

function countWords() {
  return getWords().length;
}

function randomWords() {
  listWords = [];
  numberOfWords = document.getElementById("numWordsToProcess").value;
  console.log("Number of words:", numberOfWords, 'total array length:', getWords().length);
  if (numberOfWords < getWords().length) {
    while (listWords.length < numberOfWords) {
      let n = randomIntFromInterval(1, countWords() - 1)
      if (!listWords.some(element => element == n)) {
        listWords.push(n);
      }
    }
  } else
    if (numberOfWords == getWords().length) {
      for (let w = 0; w <= getWords().length; w++) {
        listWords.push(w);
      }
    } else alert("Don't exceed the maximum number of words");
  displayWords()
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function displayWords(words = "testing") {
  let display = document.getElementById('displayWords');
  let toInner = "";
  let allWords = getWords();
  for (let i = 0; i < listWords.length; i++) {
    toInner += `<span class="rounded-3 p-2 mt-2 text-white" style="background-color: rgb(170, 150, 218)" id="span_${listWords[i]}">${allWords[listWords[i]]}</span>`;
  }
  display.innerHTML = toInner;
}

function generateTest() {
  document.getElementById('paragraph').hidden = true;
  let display = document.getElementById('formSeccion');
  display.innerHTML = "";
  let toInner = "<form id='testForm'><p>";
  let allWords = getWords();
  let arrayForTest = new Array();

  for (let i = 0; i < allWords.length; i++) {
    arrayForTest.push(`<label>${allWords[i]}</label>`);
    for (let x = 0; x < listWords.length; x++) {
      if (i == listWords[x]) {
        arrayForTest.pop();
        arrayForTest.push(`<input id="input_${listWords[x]}" class="input-field ms-1" answer="${allWords[listWords[x]]}" onfocusout="selectedWord(${listWords[x]})" autocomplete="off"/>`)
      }
    }

  }
  for (let y in arrayForTest) {
    toInner += arrayForTest[y];
  }
  display.innerHTML = toInner + '</p><button type="button" class="btn text-white" style="background-color: rgb(170, 150, 218)" onclick="checkAnswer()">Check Answer</button></form>';
}

function selectedWord(id) {
  console.log('selectedWord', id);
  let spanElement = document.getElementById('span_' + id);
  let inputElement = document.getElementById('input_' + id);
  if (inputElement.value == inputElement.getAttribute('answer')) {
    spanElement.className = "rounded-3 p-2 mt-2 text-black bg-light";
  }
}

function checkAnswer() {
  let score = 0;
  let correctAnswer = 0;
  let div = document.getElementById('testForm');
  let span = div.getElementsByTagName('input');

  for (let data of span) {
    if (data.value == data.getAttribute('answer')) {
      document.getElementById(data.id).style.color = "#008000";
      correctAnswer++;
    } else {
      document.getElementById(data.id).style.color = "#ff0000";
    }
  }
  score = (correctAnswer / span.length) * 10;
  document.getElementById('totalScore').innerHTML = 'Your score was ' + score;
}

function paragraphHide() {
  let paragraph = document.getElementById('paragraph');

  if (paragraph.hidden === false) {
    paragraph.hidden = true;
  } else {
    paragraph.hidden = false;

  }
}

function init() {
  document.getElementById("totalwords").value = countWords();
  randomWords();
  displayWords("testing");
}

init();