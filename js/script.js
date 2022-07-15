/* // El juego consiste en repetir los colores que aparecen por pantalla. Por el momento, crearé una simulación del mismo utilizando lo visto en el curso de JavaScript hasta la cuarta clase, pero con algunas modificaciones, dado que todavía no sé bien cómo incorporar la lógica completa del juego. Este desarrollo seguramente cambiará a futuro.

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
 */

let timesPlayed = 0;
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const btnPartners = document.getElementById('btn-partners')
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// Conocer a las personas que contribuyeron al proyecto:
btnPartners.addEventListener('click', (e) => {
    fetch('../json/partners.json')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        let content = "<div> THE TEAM: </div>"
        for (const element of data){
            content += `<div> ${element.name} is the ${element.position} </div>`
        }
        console.log(content);
        document.getElementsByClassName('partners')[0].innerHTML = content
    })
})

// Verificar si el juego está en strict mode
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strict = true;
    } else {
        strict = false;
    }
});

// Verificar si el botón POWER está seleccionado 
onButton.addEventListener('click', (event) => {
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else {
        on = false;
        turnCounter.innerHTML = "";
        clearColor();
        clearInterval(intervalId);
    }
});

// Si se clickea START, se verifica si el POWER está seleccionado o si se ha ganado el juego. 
startButton.addEventListener('click', async () => {
    const { value } = await Swal.fire({
        title: 'Enter your name',
        input: 'text',
        inputPlaceholder: 'Name'
    })
    //Guardo el nombre del jugador y no se borra al cerrar el navegador
    localStorage.setItem('name', value)
    if (on || win) {
        play();
    }
});

function play() {
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    turnCounter.innerHTML = 1;
    good = true;
    for (var i = 0; i < 20; i++) {
        order.push(Math.floor(Math.random() * 4) + 1);
    }
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}

// Color verde activo
function one() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

// Color rojo activo
function two() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

// Color amarillo activo
function three() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

// Color azul activo
function four() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

topLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

topRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomLeft.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

bottomRight.addEventListener('click', (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
})

function check() {
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
        good = false;

    if (playerOrder.length == 20 && good) {
        winGame();
    }

    if (good == false) {
        flashColor();
        turnCounter.innerHTML = "NO!";
        setTimeout(() => {
            turnCounter.innerHTML = turn;
            clearColor();

            if (strict) {
                play();
            } else {
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);

        noise = false;
    }

    if (turn == playerOrder.length && good && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }

}

function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
    let timesPlayed = sessionStorage.set('timesPlayed', timesPlayed++);
    console.log("Times played: " + sessionStorage.getItem('timesPlayed'));
}