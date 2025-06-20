let timer = 0; // Tracks how many seconds the user is typing
let isTyping = true; // Flag to check if typing just started
let pressed = false; // Prevents multiple counts per key press
let createdElems = false; // Check if the end elemts are created or not

let mistake = 0; // Counts incorrect characters
let right = 0;   // Counts correct characters

let result = undefined;
let showTime = undefined;
let showRight = undefined;
let showMistakes = undefined;

// Array of random quotes to type
const quotes = [
    "Keep calm and code on.",
    "Bugs are just misunderstood features.",
    "The cake is a lie.",
    "Eat, sleep, code, repeat.",
    "Coding is my cardio.",
    "Trust me, I'm a developer.",
    "To code or not to code.",
    "I turn coffee into code.",
    "Hello World, meet my keyboard.",
    "I write code. What's your superpower?",
    "First, solve the problem. Then, write the code.",
    "Programs must be written for people to read.",
    "It works on my machine."
];

// DOM elements
const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const resultElement = document.getElementById("result");

let currentQuote; // The current quote being typed

randomQuote(); // Initialize with a random quote

// Picks a random quote and shows it
function randomQuote(){
    console.log('Random quote');
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerHTML = "";

    for (let i = 0; i < currentQuote.length; i++){
        const span = document.createElement('span');
        span.textContent = currentQuote[i];
        span.classList.add("pending");
        quoteElement.appendChild(span);
    }
}

// Starts everything when a new input is detected
document.addEventListener('input', () => {
    start();

    const quoteSpans = quoteElement.querySelectorAll('span');
    const userInput = inputElement.value;

    right = 0;

    for (let i = 0; i < quoteSpans.length; i++){
        const letter = userInput[i];
        const span = quoteSpans[i];

        if (letter == null){
            console.log(`Index ${i}: fehlender Buchstabe`);
            span.className = 'normal';
        }
        else if (letter === currentQuote[i]){
            console.log(`Index ${i}: richtig`);
            span.className = "correct";
            right += 1;
        }
        else {
            console.log(`Index ${i}: falsch (letter: ${letter}, expected: ${currentQuote[i]})`);
            span.className = "wrong";
            mistake += 1;
        }
    }
    console.log(`Right: ${right}, Mistake: ${mistake}`);

    if(userInput === currentQuote){
        end();
    }
});

// Reset "pressed" flag when key is released
document.addEventListener('keyup', () => {
    pressed = false;
})

// Starts the timer once when typing begins
function start(){
    if(isTyping){
        setInterval(updateTimer, 1000); // Call updateTimer every second
        isTyping = false;
    }
}

// Increments the timer by 1 every second
function updateTimer(){
    timer += 1;
}

// Ends the typing session and shows results
function end(){
    console.log('end');
    
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
    }
    else if (timer >= 10 && timer < 15){
        showTime.innerHTML = `You took <span style="color: yellow">${timer}</span> seconds.`;
    }
    else{
        showTime.innerHTML = `You took <span style="color: red">${timer}</span> seconds.`;
    }

    if(mistake <= 1){
        showMistakes.innerHTML = `You had <span style="color: green">${mistake}</span> mistake(s).`;
    }
    else if(mistake > 1 && mistake <= 5){
        showMistakes.innerHTML = `You had <span style="color: yellow">${mistake}</span> mistake(s).`;
    }
    else{
        showMistakes.innerHTML = `You had <span style="color: red">${mistake}</span> mistake(s).`;
    }
    if (right <= currentQuote.length / 3) {
        showRight.innerHTML = `You had <span style="color: red">${right}</span> right.`;
    } 
    else if (right > currentQuote.length / 3 && right <= currentQuote.length / 1.5) {
        showRight.innerHTML = `You had <span style="color: yellow">${right}</span> right.`;
    } 
    else {
        showRight.innerHTML = `You had <span style="color: green">${right}</span> right.`;
    }

    randomQuote();
    inputElement.value = "";

    timer = 0;
    isTyping = true;
    pressed = false;
    mistake = 0;
    right = 0;
}