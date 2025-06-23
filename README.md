# Typing Trainer

This is a simple typing trainer implemented in JavaScript. It displays random quotes for the user to type, tracks typing time, counts correct and incorrect characters, and provides feedback with color-coded results.

## Features

- Displays a random quote from a predefined list
- Real-time character-by-character correctness checking
- Timer starts on first input and tracks typing duration in seconds
- Counts and displays number of correct and incorrect characters
- Color-coded result display based on performance
- Automatically resets with a new quote after completion

## Usage

1. Open the HTML file containing the required elements and linked JavaScript in a modern web browser.
2. A random quote will appear.
3. Start typing in the input field; the timer will start automatically.
4. Upon correctly typing the entire quote, results will be displayed.
5. A new quote will be loaded and the input reset for the next round.
6. Or test it on [this website](https://httpzeni.github.io/Typing-Game/)

## Required HTML structure

```html
<div id="quote"></div>
<input type="text" id="input" />
<div id="result"></div>
