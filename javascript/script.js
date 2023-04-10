
  var listWords = [];
  var paragraphText = "";
  var totalWords = 0;
  var words = [];
  var incorrectRowWordsColumn = [];
  var incorrectWordsofWordColumn = [];

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
      toInner += `<span class="rounded-3 p-2 mt-2 mb-2 me-2 text-white grow-shake-slow-button" draggable="true" style="background-color: rgb(170, 150, 218)" id="span_${listWords[i]}">${allWords[listWords[i]]}</span>`;
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
          arrayForTest.push(`<input id="input_${listWords[x]}" class="input-field ms-1 ${UpperOrNotUpper}" answer="${allWords[listWords[x]]}" onfocusout="selectedWord(${listWords[x]})" ondragenter="dragEnter(event)" autocomplete="off"/>`)
        }
      }

    }
    for (let y in arrayForTest) {
      toInner += arrayForTest[y];
    }
    display.innerHTML = toInner + '</p><button type="button" class="btn text-white" style="background-color: rgb(170, 150, 218)" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="checkAnswer()">Check Answer</button></form>';
    addEventListenerDropToInput();
  }

  function selectedWord(id) {
    let spanElement = document.getElementById('span_' + id);
    let inputElement = document.getElementById('input_' + id);
    if (inputElement.value.toLowerCase().trim() == inputElement.getAttribute('answer').toLowerCase()) {
      spanElement.className = "rounded-3 p-2 mt-2 mb-2 me-2 text-black bg-light";
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
      const audio = new Audio('correct-answer-sound.mp3');
      audio.play();
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

  function draggable(input_id) {
    var input = document.getElementById(input_id);

    // Agregar un event listener para el evento 'dragover'
    input.addEventListener("dragover", function (event) {
      // Evitar el comportamiento predeterminado del navegador al arrastrar y soltar
      event.preventDefault();
    });

    // Agregar un event listener para el evento 'drop'
    input.addEventListener("drop", function (event) {
      // Evitar el comportamiento predeterminado del navegador al arrastrar y soltar
      event.preventDefault();

      // Obtener el valor del elemento arrastrado
      var value = event.dataTransfer.getData("text");
      this.value = value
    })

  }

  function addEventListenerDropToInput() {
    let element = document.getElementById("testForm");
    let arrayInput = element.getElementsByTagName("input");

    for (let input of arrayInput) {
      draggable(input.id);
    }

  }

  function startIrregularVerbs() {
    incorrectWordsofWordColumn = [];
    displayIncorrectWords();
    let tableRow = document.getElementById("word-colum");
    let bodyTable = tableRow.getElementsByTagName('tbody')
    bodyTable = bodyTable[0]

    fetch('./jsons/irregular-verbs.json')
      .then(response => response.json())
      .then(data => {
        bodyTable.innerHTML = "";
        data.verbs.forEach(function (verb, index) {
          let row = document.createElement("tr");
          row.id = "word-row_" + index;
          let cell1 = document.createElement("td");
          cell1.setAttribute("id", "infinitive_" + index);
          let cell2 = document.createElement("td");
          cell2.setAttribute("id", "past-simple_" + index);
          let cell3 = document.createElement("td");
          cell3.setAttribute("id", "past-participle_" + index);

          cell1.innerHTML = verb.Base
          cell2.innerHTML = verb['Past-simple'];
          cell3.innerHTML = verb['Past-Participle'];
          row.appendChild(cell1);
          row.appendChild(cell2);
          row.appendChild(cell3);
          bodyTable.appendChild(row);
        });
      }
      )
      .catch(error => console.log(error));

  }

  function testWordColums() {
    let table = document.getElementById("word-colum");
    let rows = table.getElementsByTagName('tr')

    for (let arr of rows) {
      if (arr.id != "row-header")
        for (let i = 1; i < rows[0].children.length; i++) {
          arr.children[i].innerHTML = `<div class="input-container">
                                    <input class="text-lowercase" id='${arr.children[i].id}' style="width:100px" type="text" answer='${arr.children[i].innerHTML}' onfocusout="answerWordColumns(this)" placeholder="${arr.children[i].innerHTML.substring(0, 3)}">
                                    <div class="icon-container">
                                      <i id='${arr.children[i].id}_result' class=""></i>
                                    </div>
                                  </div>`
        }
    }
  }

  function answerWordColumns(obj) {
    let answer = document.getElementById(obj.id + '_result');
    if (obj.getAttribute('answer').toLowerCase().trim() == obj.value.toLowerCase().trim() && obj.value != "") {
      answer.className = 'correct';
      checkRowCorrect(obj.parentNode.parentNode.parentNode)
      reproduceVoice(obj.getAttribute("answer"));
    } else {
      if (obj.value && obj.value != "") {
        answer.className = 'incorrect';
        document.getElementById("list-incorrect-words").hidden = false;
        saveIncorrectRows(obj.parentNode.parentNode.parentNode);
        saveIncorrectWordColumn(obj.parentNode.parentNode);
        reproduceVoice(obj.getAttribute("answer"));
      }

    }
  }

  function saveIncorrectRows(row) {
    incorrectRowWordsColumn.push(row);

    for (let i = 0; i < incorrectRowWordsColumn[0].children.length; i++) {

    }
  }

  function checkRowCorrect(row) {

    let arrayInputs = row.getElementsByTagName('input');
    let result = null;
    for (let i = 0; i < arrayInputs.length; i++) {
      if (arrayInputs[i].getAttribute('answer').toLowerCase().trim() == arrayInputs[i].value.toLowerCase().trim()) {
        result = true;
      } else {
        result = false;

        break;
      }
    }

    if (result) {
      const audio = new Audio('correct-answer-sound.mp3');
      audio.play();
      row.className = "table-success disappearing";
      setTimeout(function () {
        row.hidden = true;
      }, 1500);
    }

  }

  function saveIncorrectWordColumn(td) {

    if (!incorrectWordsofWordColumn.some(element => element == td)) {
      incorrectWordsofWordColumn.push(td);
    }

    displayIncorrectWords();
  }

  function displayIncorrectWords() {
    let display = document.getElementById('displayIncorrectWords');
    let toInner = "";
    for (let i = 0; i < incorrectWordsofWordColumn.length; i++) {
      let input = incorrectWordsofWordColumn[i].getElementsByTagName('input')
      toInner += `<span onclick="reproduceVoice(this.innerHTML)" class="rounded-3 p-2 mt-2 mb-2 me-2 text-white grow-shake-slow-button" draggable="true" style="background-color: rgb(170, 150, 218)" id="span_${i}">${input[0].getAttribute('answer')}</span>`;
    }
    display.innerHTML = toInner;
  }

  function reproduceVoice(string) {
    if ('speechSynthesis' in window) {
      let utterance = new SpeechSynthesisUtterance(string);
      utterance.pitch = 0.97;
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    } else {
      //El navegador es antiguo. Camino alternativo
      // Tal vez mostrar una versión reducida o un cartel de información
      alert('Actualízate!');
    }
  }

  function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain attribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) { elmnt.innerHTML = this.responseText; }
            if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };

  function init() {

    let paragraph = document.getElementById('paragraph');
    paragraph.value = "The Hare & the Tortoise\nA Hare was making fun of the Tortoise one day for being so slow.\n\"Do you ever get anywhere?\" he asked with a mocking laugh.\n\n\"Yes,\" replied the Tortoise, \"and I get there sooner than you think. I'll run you a race and prove it.\"\n\nThe Hare was much amused at the idea of running a race with the Tortoise, but for the fun of the thing he agreed. So the Fox, who had consented to act as judge, marked the distance and started the runners off.\n\nThe Hare was soon far out of sight, and to make the Tortoise feel very deeply how ridiculous it was for him to try a race with a Hare, he lay down beside the course to take a nap until the Tortoise should catch up.";

    paragraphOnFocusOut();
    document.getElementById("formSection").hidden = true;
    startIrregularVerbs();
    // Agregar un event listener para el evento 'dragstart'
    document.addEventListener("dragstart", function (event) {
      // Establecer el elemento arrastrado como el elemento 'span' que se ha iniciado el arrastre
      event.dataTransfer.setData("text", event.target.innerText);
    });

  }

  includeHTML();
  init();
