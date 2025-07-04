import { quotes } from './quotes.js';
import { words } from './words.js'
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
let isQuoteChoosed = true;
let difficullty = 'medium';
let mistakeMap = [];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const scoreDisplay = document.getElementById('scoreDisplay');
const feedbackText = document.getElementById('feedback');
const quotesBtn = document.getElementById('choseQuotes');
const wordsBtn = document.getElementById('choseWords');
const easyBtn = document.getElementById('easy');
const mediumBtn = document.getElementById('medium');
const hardBtn = document.getElementById('hard');
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
    quoteElement.innerHTML = "";
    
    if (isQuoteChoosed){
        const pool = quotes[difficullty];
        currentQuote = pool[Math.floor(Math.random() * pool.length)];
    } else {
        const pool = words[difficullty];
        currentQuote = pool[Math.floor(Math.random() * pool.length)];
    }

    mistakeMap = new Array(currentQuote.length).fill(false);
    letters = currentQuote.length;

    clearInterval(timerId);
    timerId = null; 
    timer = 0;
    mistake = 0;
    right = 0;

    for (let i = 0; i < currentQuote.length; i++){
        const span = document.createElement('span');
        span.textContent = currentQuote[i];
        span.classList.add("pending");
        quoteElement.appendChild(span);
    }

    inputElement.value = "";
    inputElement.focus();
}

quotesBtn.addEventListener('click', () => {
    if (isQuoteChoosed){
        isQuoteChoosed = false;
        quotesBtn.style.backgroundColor = '#222';
        quotesBtn.style.color = '#eeeeee7e';
        quotesBtn.style.border = '1px solid #444';

        wordsBtn.style.backgroundColor = '#888';
        wordsBtn.style.color = '#000000bb';
        wordsBtn.style.border = '1px solid #222';
    }
    else {
        isQuoteChoosed = true;
        quotesBtn.style.backgroundColor = '#888';
        quotesBtn.style.color = '#000000bb';
        quotesBtn.style.border = '1px solid #222';

        wordsBtn.style.backgroundColor = '#222';
        wordsBtn.style.color = '#eeeeee7e';
        wordsBtn.style.border = '1px solid #444';
    }
    randomQuote()
})
wordsBtn.addEventListener('click', () => {
    if (isQuoteChoosed){
        isQuoteChoosed = false;
        quotesBtn.style.backgroundColor = '#222';
        quotesBtn.style.color = '#eeeeee7e';
        quotesBtn.style.border = '1px solid #444';

        wordsBtn.style.backgroundColor = '#888';
        wordsBtn.style.color = '#000000bb';
        wordsBtn.style.border = '1px solid #222';
    }
    else {
        isQuoteChoosed = true;
        quotesBtn.style.backgroundColor = '#888';
        quotesBtn.style.color = '#000000bb';
        quotesBtn.style.border = '1px solid #222';

        wordsBtn.style.backgroundColor = '#222';
        wordsBtn.style.color = '#eeeeee7e';
        wordsBtn.style.border = '1px solid #444';
    }
    randomQuote()
})

easyBtn.addEventListener('click', () => {
    difficullty = 'easy';

    easyBtn.style.backgroundColor = '#888';
    easyBtn.style.color = '#000000bb';
    easyBtn.style.border = '1px solid #222';

    mediumBtn.style.backgroundColor = '#222';
    mediumBtn.style.color = '#eeeeee7e';
    mediumBtn.style.border = '1px solid #444';

    hardBtn.style.backgroundColor = '#222';
    hardBtn.style.color = '#eeeeee7e';
    hardBtn.style.border = '1px solid #444';
    randomQuote()
})
mediumBtn.addEventListener('click', () => {
    difficullty = 'medium';

    easyBtn.style.backgroundColor = '#222';
    easyBtn.style.color = '#eeeeee7e';
    easyBtn.style.border = '1px solid #444';

    mediumBtn.style.backgroundColor = '#888';
    mediumBtn.style.color = '#000000bb';
    mediumBtn.style.border = '1px solid #222';

    hardBtn.style.backgroundColor = '#222';
    hardBtn.style.color = '#eeeeee7e';
    hardBtn.style.border = '1px solid #444';
    randomQuote()
})
hardBtn.addEventListener('click', () => {
    difficullty = 'hard';

    easyBtn.style.backgroundColor = '#222';
    easyBtn.style.color = '#eeeeee7e';
    easyBtn.style.border = '1px solid #444';

    mediumBtn.style.backgroundColor = '#222';
    mediumBtn.style.color = '#eeeeee7e';
    mediumBtn.style.border = '1px solid #444';

    hardBtn.style.backgroundColor = '#888';
    hardBtn.style.color = '#000000bb';
    hardBtn.style.border = '1px solid #222';
    randomQuote()
})

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
            <p>Best points: ${scores["high-score"]} points</p>
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
    scores['shortest-time'] = Number.POSITIVE_INFINITY;
    scores['high-score'] = 0;

    localStorage.setItem('scores', JSON.stringify(scores));
    loadScores();
}

document.getElementById('Scores').addEventListener('click', () => loadScores());
document.getElementById('newQuote').addEventListener('click', () => randomQuote());

document.addEventListener('input', () => {
    start();

    const quoteSpans = quoteElement.querySelectorAll('span');
    const userInput = inputElement.value;
    const currentIndex = userInput.length;

    right = 0;

    for (let i = 0; i < quoteSpans.length; i++){
        const letter = userInput[i];
        const span = quoteSpans[i];

        if (i === currentIndex) {
            quoteSpans[i].style.fontSize = "32px";
            quoteSpans[i].style.opacity = "100%";
        }

        if (letter == null){
            span.className = "normal";
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
            quoteSpans[i].style.fontSize = "22px";

            if (i > 2) {
                quoteSpans[i - 2].style.opacity = "5%";
                quoteSpans[i - 1].style.opacity = "25%";
            }
            if(i == 2){
                quoteSpans[i - 2].style.opacity = "5%";
            }
        }
        else {
            quoteSpans[i].style.fontSize = "22px";
            span.className = "wrong";
            span.style.opacity = "100%";
            if (!mistakeMap[i]){
                mistake += 1;
                mistakeMap[i] = true;
            }
        }
    }

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
    let points = calculateScore();
    let highestTime = Infinity;
    if (scores['most-right'] === undefined) scores['most-right'] = 0;
    if (scores['least-right'] === undefined) scores['least-right'] = Infinity;
    if (scores['best-right'] === undefined) scores['best-right'] = 0;
    if (scores['most-mistakes'] === undefined) scores['most-mistakes'] = 0;
    if (scores['least-mistakes'] === undefined) scores['least-mistakes'] = Infinity;
    if (scores['best-mistakes'] === undefined) scores['best-mistakes'] = Infinity;
    if (scores['longest-time'] === undefined) scores['longest-time'] = 0;
    if (scores['shortest-time'] === undefined) scores['shortest-time'] = Infinity;
    if (scores['high-score'] === undefined) scores['high-score'] = 0;

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
    if (timer < highestTime) {
        scores['shortest-time'] = timer;
        highestTime = timer;
    }

    if(points > scores['high-score']){
        scores['high-score'] = points;
    }

    localStorage.setItem('scores', JSON.stringify(scores));
}

function calculateScore() {
    let points = 0;
    if (letters > 0) points += timer / letters;
    if (mistake > 0) points += timer / mistake;
    if (right > 0) {
        points += timer / right;
        points += mistake / right;
    }
    if (Math.round(points) === 0){
        points = 100;
    }

    return Math.round(points) * 100;;
}

function showFeedback(){
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

    feedbackText.classList.add('feedbackText');

    if (timer < 10){
        showTime.innerHTML = `You took <span style="color: green">${timer}</span> seconds.`;
    }
    else if (timer >= 10 && timer < 15){
        showTime.innerHTML = `You took <span style="color: yellow">${timer}</span> seconds.`;
    }
    else{
        showTime.innerHTML = `You took <span style="color: red">${timer}</span> seconds.`;
    }

    let misakeWord;

    if(mistake === 1 ? misakeWord = "mistake" : misakeWord = "mistakes"){
        if(mistake <= 1){
            showMistakes.innerHTML = `You had <span style="color: green">${mistake}</span> ${misakeWord} out of ${letters} letters`;
        }
        else if(mistake > 1 && mistake <= 5){
            showMistakes.innerHTML = `You had <span style="color: yellow">${mistake}</span> ${misakeWord} out of ${letters} letters`;
        }
        else{
            showMistakes.innerHTML = `You had <span style="color: red">${mistake}</span> ${misakeWord} out of ${letters} letters`;
        } 
    }
    if (right <= currentQuote.length / 3) {
        showRight.innerHTML = `You had <span style="color: red">${right}</span> right out of ${letters} letters`;
    } 
    else if (right > currentQuote.length / 1.5 && right <= currentQuote.length / 3) {
        showRight.innerHTML = `You had <span style="color: yellow">${right}</span> right out of ${letters} letters`;
    } 
    else {
        showRight.innerHTML = `You had <span style="color: green">${right}</span> right out of ${letters} letters`;
    }

    let points = calculateScore();

    console.log(points)

    if(points <= 300){
        feedbackText.innerHTML = `<span style="color: red">That was trash ngl. You had ${points} points</span>`;
    }
    else if(points > 300 && points < 600){
        feedbackText.innerHTML = `<span style="color: orange">Not bad, but still trash. You had ${points} points</span>`;
    }
    else if(points >= 600 && points < 900){
        feedbackText.innerHTML = `<span style="color: yellow">Okay, it's alright. You had ${points} points</span>`;
    }
    else if(points >= 900){
        feedbackText.innerHTML = `<span style="color: green">Yayyy, you got it. You had ${points} points</span>`;
    }
    randomQuote();
}

function end(){
    updateScores();

    clearInterval(timerId);
    timerId = null; 

    right = right - mistake;

    if(right < 0){
        right = 0;
    }
    if (mistake > letters){
        mistake = letters;
    }

    showFeedback();

    timer = 0;
    isTyping = true;
    mistake = 0;
    right = 0;
}