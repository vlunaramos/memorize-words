var listWords = [];
var paragraphText = "";
var totalWords = 0;
var words = [];

function stringToArray(str) {
  // Convertir el string en un array de caracteres utilizando el método split
  let array = str.split("");
  return array;
}

function processedArray(arrayInicial) {
  let nuevoArray = [];
  let palabra = "";
  totalWords = 0;

  for (let i = 0; i < arrayInicial.length; i++) {
    const caracter = arrayInicial[i].toUpperCase();

    if (isNaN(caracter.charCodeAt(0)) || caracter.charCodeAt(0) < 65 || caracter.charCodeAt(0) > 90) {
      if (palabra !== "") {
        nuevoArray.push(palabra);
        palabra = "";
        totalWords++;

      }
      nuevoArray.push(arrayInicial[i]);
    } else {
      palabra += arrayInicial[i];
      if (i === arrayInicial.length - 1) {
        nuevoArray.push(palabra);
        totalWords++;
      }
    }
  }

  return nuevoArray;
}


function getWords() {
  if (words.length == 0) {
    var words2 = stringToArray(document.getElementById("paragraph").value);
    words = processedArray(words2);
  }
  return words;
}

function countWords() {
  return totalWords;
}

function paragraphOnFocusOut() {
  let paragraphCurrentText = document.getElementById("paragraph").value;

  if (paragraphText != paragraphCurrentText) {
    paragraphText = paragraphCurrentText;
    words = [];

    randomWords();
  }
 document.getElementById("totalwords").value = countWords();
}

function randomWords() {
  listWords = [];
  let allWords = getWords();
  numberOfWords = document.getElementById("numWordsToProcess").value;

  if (numberOfWords <= countWords()) {

    while (listWords.length <= numberOfWords - 1) {

      let n = randomIntFromInterval(0, allWords.length - 1)

      if (/^[a-zA-Z]+$/.test(allWords[n]) && allWords[n] != "LL" && allWords[n] != "ll" && allWords[n] != "\n" && allWords[n] != "  ") {
        if (!listWords.some(element => element == n)) {
          listWords.push(n);
        }
      }
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
    toInner += `<span class="rounded-3 p-2 mt-2 mb-2 text-white" style="background-color: rgb(170, 150, 218)" id="span_${listWords[i]}">${allWords[listWords[i]]}</span>`;
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
        let UpperOrNotUpper = "";
        if (allWords[listWords[x]].charAt(0) === allWords[listWords[x]].charAt(0).toUpperCase()) {
          UpperOrNotUpper = "text-capitalize";
        } else {
          UpperOrNotUpper = "text-lowercase";
        }
        arrayForTest.push(`<input id="input_${listWords[x]}" class="input-field ms-1 ${UpperOrNotUpper}" answer="${allWords[listWords[x]]}" onfocusout="selectedWord(${listWords[x]})" autocomplete="off"/>`)
      }
    }

  }
  for (let y in arrayForTest) {
    toInner += arrayForTest[y];
  }
  display.innerHTML = toInner + '</p><button type="button" class="btn text-white" style="background-color: rgb(170, 150, 218)" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="checkAnswer()">Check Answer</button></form>';
}

function selectedWord(id) {
  let spanElement = document.getElementById('span_' + id);
  let inputElement = document.getElementById('input_' + id);
  if (inputElement.value.toLowerCase().trim() == inputElement.getAttribute('answer').toLowerCase()) {
    spanElement.className = "rounded-3 p-2 mt-2 text-black bg-light";
  }
}

function checkAnswer() {
  let score = 0;
  let correctAnswer = 0;
  let div = document.getElementById('testForm');
  let span = div.getElementsByTagName('input');
  const player = document.querySelector("lottie-player");
  //player.stop();
  for (let data of span) {
    if (data.value.toLowerCase().trim() == data.getAttribute('answer').toLowerCase()) {
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
  paragraph.value = "The Hare & the Tortoise\nA Hare was making fun of the Tortoise one day for being so slow.\n\"Do you ever get anywhere?\" he asked with a mocking laugh.\n\n\"Yes,\" replied the Tortoise, \"and I get there sooner than you think. I'll run you a race and prove it.\"\n\nThe Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.\n\nThe Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.";
  paragraphOnFocusOut();
  document.getElementById("formSection").hidden = true;
}

init();