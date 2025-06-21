import { quotes } from './quotes.js';
import { scores } from './Scores.js';

let timer = 0;
let isTyping = true;
let createdElems = false;
let mistake = 0;
let right = 0; 
let letters = 0;
let result = undefined;
let showTime = undefined;
let showRight = undefined;
let showMistakes = undefined;
let showedScores = false;
let timerId = null;
let mistakeMap = [];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const scoreDisplay = document.getElementById('scoreDisplay');
const feedbackText = document.getElementById('feedback');
let currentQuote;

const savedScores = localStorage.getItem('scores');
if (savedScores) {
    Object.assign(scores, JSON.parse(savedScores));
}

document.addEventListener('DOMContentLoaded', () => {

    inputElement.value = "";
})

randomQuote();

function randomQuote(){
    console.log('Random quote');
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerHTML = "";

    mistakeMap = new Array(currentQuote.length).fill(false);
    letters = currentQuote.length;

    clearInterval(timerId);
    timerId = null; 
    timer = 0;

    for (let i = 0; i < currentQuote.length; i++){
        const span = document.createElement('span');
        span.textContent = currentQuote[i];
        span.classList.add("pending");
        quoteElement.appendChild(span);
    }

    inputElement.value = "";
    inputElement.focus();
}

function loadScores() {
    const savedScores = localStorage.getItem('scores');
    const container = document.querySelector('.container');

    if (savedScores) {
        const scores = JSON.parse(savedScores);
        scoreDisplay.innerHTML = `
            <p>Most right: ${scores["most-right"]}</p>
            <p>Least right: ${scores["least-right"]}</p>
            <p>Best right percentage: ${scores["best-right"]}%</p>
            <p>Most mistakes: ${scores["most-mistakes"]}</p>
            <p>Least mistakes: ${scores["least-mistakes"]}</p>
            <p>Best mistakes percentage: ${scores["best-mistakes"]}%</p>
            <p>Longest time: ${scores["longest-time"]} seconds</p>
            <p>Shortest time: ${scores["shortest-time"]} seconds</p>
            <button id="resetScores">Reset</button>
        `;
    } else {
        scoreDisplay.innerHTML = "<p>No scores saved yet!</p>";
    }
    if (!showedScores) {
        scoreDisplay.classList.add('show');
        container.style.filter = "blur(5px)";
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetScores';
        document.getElementById('resetScores').addEventListener('click', () => resetScore());
    } else {
        scoreDisplay.classList.remove('show');
        container.style.filter = "blur(0px)";
    }
    showedScores = !showedScores;
}

function resetScore(){
    console.log("Setting back to default");

    scores['most-right'] = 0;
    scores['least-right'] = Infinity;
    scores['best-right'] = 0;
    scores['most-mistakes'] = 0;
    scores['least-mistakes'] = Infinity;
    scores['best-mistakes'] = Infinity;
    scores['longest-time'] = 0;
    scores['shortest-time'] = Infinity;

    localStorage.setItem('scores', JSON.stringify(scores));
    loadScores();
}

document.getElementById('Scores').addEventListener('click', () => loadScores());
document.getElementById('newQuote').addEventListener('click', () => randomQuote());

document.addEventListener('input', () => {
    start();

    const quoteSpans = quoteElement.querySelectorAll('span');
    const userInput = inputElement.value;

    right = 0;

    for (let i = 0; i < quoteSpans.length; i++){
        const letter = userInput[i];
        const span = quoteSpans[i];

        if (letter == null){
            span.className = 'normal';
            mistakeMap[i] = false;
        }
        else if (letter === currentQuote[i]){
            if (mistakeMap[i]){
                mistake -= 1;
                mistakeMap[i] = false;
            }
            span.className = "correct";
            right += 1;
            mistakeMap[i] = false;
        }
        else {
            span.className = "wrong";
            if (!mistakeMap[i]){
                mistake += 1;
                mistakeMap[i] = true;
            }
        }
    }
    console.log(`Right: ${right}, Mistake: ${mistake}`);

    if(userInput === currentQuote){
        end();
    }
});

function start(){
    if(isTyping){
        timerId = setInterval(updateTimer, 1000);
        isTyping = false;
    }
}

function updateTimer(){
    timer += 1;
}

function updateScores() {
    if (scores['most-right'] === undefined) scores['most-right'] = 0;
    if (scores['least-right'] === undefined) scores['least-right'] = Infinity;
    if (scores['best-right'] === undefined) scores['best-right'] = 0;
    if (scores['most-mistakes'] === undefined) scores['most-mistakes'] = 0;
    if (scores['least-mistakes'] === undefined) scores['least-mistakes'] = Infinity;
    if (scores['best-mistakes'] === undefined) scores['best-mistakes'] = Infinity;
    if (scores['longest-time'] === undefined) scores['longest-time'] = 0;
    if (scores['shortest-time'] === undefined) scores['shortest-time'] = Infinity;

    if (right > scores['most-right']) {
        scores['most-right'] = right;
    }
    if (right < scores['least-right']) {
        scores['least-right'] = right;
    }

    const correctLetters = letters - mistake;
    const currentRightRatio = correctLetters / letters;
    const roundedRightRatio = Math.round(currentRightRatio * 100);

    if (roundedRightRatio > scores['best-right']) {
        scores['best-right'] = roundedRightRatio;
    }

    if (mistake > scores['most-mistakes']) {
        scores['most-mistakes'] = mistake;
    }
    if (mistake < scores['least-mistakes']) {
        scores['least-mistakes'] = mistake;
    }

    const currentMistakeRatio = mistake / letters;
    const roundedMistakeRatio = Math.round(currentMistakeRatio * 100);

    if (roundedMistakeRatio < scores['best-mistakes']) {
        scores['best-mistakes'] = roundedMistakeRatio;
    }

    if (timer > scores['longest-time']) {
        scores['longest-time'] = timer;
    }
    if (timer < scores['shortest-time']) {
        scores['shortest-time'] = timer;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

function end(){
    clearInterval(timerId);
    timerId = null; 

    right = right - mistake;

    let isItGood = 0;

    if(right < 0){
        right = 0;
    }
    if (mistake > letters){
        mistake = letters;
    }
    
    if (!createdElems){
        console.log('Creating elements');
        result = document.getElementById('result');
        showTime = document.createElement("h1");
        showRight = document.createElement("h1");
        showMistakes = document.createElement("h1");

        result.classList.add("resultContainer");
        showTime.classList.add("resultText");
        showRight.classList.add("resultText");
        showMistakes.classList.add("resultText");
        
        result.appendChild(showTime);
        result.appendChild(showMistakes);
        result.appendChild(showRight);

        createdElems = true;
    }

    if (timer < 10){
        showTime.innerHTML = `You took <span style="color: green">${timer}</span> seconds.`;
        isItGood += 3;
    }
    else if (timer >= 10 && timer < 15){
        showTime.innerHTML = `You took <span style="color: yellow">${timer}</span> seconds.`;
        isItGood += 2;
    }
    else{
        showTime.innerHTML = `You took <span style="color: red">${timer}</span> seconds.`;
        isItGood++;
    }

    if(mistake === 1){
        if(mistake <= 1){
            showMistakes.innerHTML = `You had <span style="color: green">${mistake}</span> mistake out of ${letters} letters`;
            isItGood += 3;
        }
        else if(mistake > 1 && mistake <= 5){
            showMistakes.innerHTML = `You had <span style="color: yellow">${mistake}</span> mistake out of ${letters} letters`;
            isItGood += 2;
        }
        else{
            showMistakes.innerHTML = `You had <span style="color: red">${mistake}</span> mistake out of ${letters} letters`;
            isItGood++;
        } 
    }
    else{
        if(mistake <= 1){
            showMistakes.innerHTML = `You had <span style="color: green">${mistake}</span> mistakes out of ${letters} letters`;
            isItGood += 3;
        }
        else if(mistake > 1 && mistake <= 5){
            showMistakes.innerHTML = `You had <span style="color: yellow">${mistake}</span> mistakes out of ${letters} letters`;
            isItGood += 2;
        }
        else{
            showMistakes.innerHTML = `You had <span style="color: red">${mistake}</span> mistakes out of ${letters} letters`;
            isItGood++;
        } 
    }
    if (right <= currentQuote.length / 3) {
        showRight.innerHTML = `You had <span style="color: red">${right}</span> right out of ${letters} letters`;
        isItGood++;
    } 
    else if (right > currentQuote.length / 1.5 && right <= currentQuote.length / 3) {
        showRight.innerHTML = `You had <span style="color: yellow">${right}</span> right out of ${letters} letters`;
        isItGood += 2;
    } 
    else {
        showRight.innerHTML = `You had <span style="color: green">${right}</span> right out of ${letters} letters`;
        isItGood += 3;
    }

    if(isItGood === 3){
        feedbackText.innerHTML = `<span style="color: red">That was trash ngl.</span>`;
    }
    else if(isItGood > 3 && isItGood < 6){
        feedbackText.innerHTML = `<span style="color: orange">Not bad, but still trash.</span>`;
    }
    else if(isItGood >= 6 && isItGood < 9){
        feedbackText.innerHTML = `<span style="color: yellow">Okay, it's alright.</span>`;
    }
    else if(isItGood === 9){
        feedbackText.innerHTML = `<span style="color: green">Yayyy, you got it.</span>`;
    }

    randomQuote();

    updateScores();

    timer = 0;
    isTyping = true;
    pressed = false;
    mistake = 0;
    right = 0;
}