// El juego consiste en repetir los colores que aparecen por pantalla. Por el momento, crearé una simulación del mismo utilizando lo visto en el curso de JavaScript hasta la cuarta clase.

let green = "green";
let red = "red";
let yellow = "yellow";
let blue = "blue";

let rules = "Simon will give the first signal. Repeat the signal by pressing the same color lens. Then, Simon will duplicate this first signal and add one. Continue playing as long as you can repeat each sequence of signals correctly."
welcome();

function welcome() {
    alert("Let's play Simon!");
    let knowTheRules = prompt("Do you know the rules?");

    console.log(knowTheRules)

    if (knowTheRules === "si") {
        startGame();
    } else {
        getRules();
    }
}

function startGame() {
    console.log("Starting game");
    alert("Write the color that apears")
    let colorDisplayed = "";
    let seenColor = "";

    while (colorDisplayed == seenColor) {
        colorDisplayed = (randomColor());
        alert(colorDisplayed);
        seenColor = prompt("Ingrese el color visto:");
        console.log(colorDisplayed, seenColor);
    }

    let playAgain = prompt("You failed. Do you want to play again?");

    if (playAgain == "si") {
        startGame();
    } else {
        alert("Bye!");
    }
}

function getRules() {
    return alert(rules);
}

function randomColor() {
    let values = ["red", "green", "yellow", "blue"];
    let valueToUse = values[Math.floor(Math.random() * values.length)];
    return valueToUse;
}