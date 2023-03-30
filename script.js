var listWords = [];
var paragraphText = "";

function getWords() {
  return document.getElementById("paragraph").value.trim().split(/\s+/);
}

function countWords() {
  return getWords().length;
}

function paragraphOnFocusOut() {
  document.getElementById("totalwords").value = countWords();
  let paragraphCurrentText = document.getElementById("paragraph").value;

  if (paragraphText != paragraphCurrentText && paragraphCurrentText != "") {
    console.log("entrando a condicion");
    paragraphText = paragraphCurrentText;
    randomWords();
  }

}

function randomWords() {
  listWords = [];
  numberOfWords = document.getElementById("numWordsToProcess").value;
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

function displayWords() {
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
  const headerInstruction = document.getElementById('headerInstruction');
  headerInstruction.className = '';
  headerInstruction.innerText = 'Press "Show Text" to display the text';

  let display = document.getElementById('formSection');
  display.hidden = false;
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
  display.innerHTML = toInner + '</p><button type="button" class="btn text-white" style="background-color: rgb(170, 150, 218)" data-bs-toggle="modal" data-bs-target="#myModal" onclick="checkAnswer()">Check Answer</button></form>';
}

function selectedWord(id) {
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
  const player = document.querySelector("lottie-player");
  player.stop();
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
  if (score >= 8) {
    player.play();
  }
}

function paragraphHide() {
  let paragraph = document.getElementById('paragraph');
  const headerInstruction = document.getElementById('headerInstruction');


  if (paragraph.hidden === false) {
    paragraph.hidden = true;
    headerInstruction.className = '';
    headerInstruction.innerText = 'Press "Show Text" to display the text';
  } else {
    paragraph.hidden = false;
    headerInstruction.className = 'h4';
    headerInstruction.innerText = 'Paste your text and generate the gaps';
  }
}

function init() {
  paragraphOnFocusOut();
  let paragraph = document.getElementById('paragraph');
  paragraph.value = "The Hare & the Tortoise\nA Hare was making fun of the Tortoise one day for being so slow.\n\"Do you ever get anywhere?\"he asked with a mocking laugh.\n\n\"Yes,\" replied the Tortoise, \"and I get there sooner than you think. I'll run you a race and prove it.\"\n\nThe Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.\n\nThe Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.";
  paragraphOnFocusOut();
  document.getElementById("formSection").hidden = true;
}

init();