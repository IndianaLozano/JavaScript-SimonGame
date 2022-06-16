// El juego consiste en repetir los colores que aparecen por pantalla. Por el momento, crearé una simulación del mismo utilizando lo visto en el curso de JavaScript hasta la cuarta clase, pero con algunas modificaciones, dado que todavía no sé bien cómo incorporar la lógica completa del juego. Este desarrollo seguramente cambiará a futuro.

let rules = "Simon will give the first signal. Repeat the signal by pressing the same color lens. Then, Simon will duplicate this first signal and add one. Continue playing as long as you can repeat each sequence of signals correctly."

let players = [
    { name: "John", higherScore: 6 },
    { name: "Kathy", higherScore: 15 },
    { name: "Julia", higherScore: 7 },
    { name: "Mike", higherScore: 8 }
];
players.push({ name: "Emily", higherScore: 9 });

welcome();

// Ingreso al juego:

function welcome() {
    alert("Let's play Simon!");
    let knowTheRules = prompt("Do you know the rules?");

    console.log(knowTheRules)

    if (knowTheRules === "yes") {
        startGame();
    } else if (knowTheRules === "no") {
        getRules();
    } else {
        showPlayersByHigherScore(players);
    }
}

// Jugar: 

function startGame() {
    console.log("Starting game");
    alert("Write the color that apears")
    let colorDisplayed = "";
    let seenColor = "";

    while (colorDisplayed == seenColor) {
        colorDisplayed = (randomColor());
        alert(colorDisplayed);
        seenColor = prompt("Enter the color seen: ");
        console.log(colorDisplayed, seenColor);
    }

    let playAgain = prompt("You failed. Do you want to play again?");

    if (playAgain == "yes") {
        startGame();
    } else {
        alert("Bye!");
    }
}

// Obtener reglas: 

function getRules() {
    return alert(rules);
}

function randomColor() {
    let values = ["red", "green", "yellow", "blue"];
    let valueToUse = values[Math.floor(Math.random() * values.length)];
    return valueToUse;
}

// Imprimir jugadores:
function printPlayers(players) {

    for (let i = 0; i < players.length; i++) {
        alert("Player: " + JSON.stringify(players[i]));
    }

}

// Ordenar jugadores según el puntaje más alto e imprimirlos por pantalla
function showPlayersByHigherScore(players) {

    const playersByHigherScore = players.sort((a, b) => { return b.higherScore - a.higherScore });

    return printPlayers(playersByHigherScore);

}
