
let timesPlayed = 0;
let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let computerTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const btnPartners = document.getElementById('btn-partners')
const btnRules = document.getElementById('btn-rules')
const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// Conocer las reglas
btnRules.addEventListener('click', (e) => {
    fetch('../json/rules.json')
        .then((res) => res.json())
        .then((data) => {
            let content = "<div> SIMON RULES: </div>"
            content += `<div> ${data.rules}</div>`
            document.getElementsByClassName('rules')[0].innerHTML = content
        })
})

// Conocer a las personas que contribuyeron al proyecto:
btnPartners.addEventListener('click', (e) => {
    fetch('../json/partners.json')
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            let content = "<div> THE TEAM: </div>"
            for (const element of data) {
                content += `<div> ${element.name} is the ${element.position} </div>`
            }
            console.log(content);
            document.getElementsByClassName('partners')[0].innerHTML = content
        })
})

// Verificar si el juego está en STRICT mode
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
    if (onButton.checked) {
        const { value } = await Swal.fire({
            title: 'Enter your name',
            input: 'text',
            inputPlaceholder: 'Name'
        })
        //Guardo el nombre del jugador y no se borra al cerrar el navegador
        sessionStorage.setItem('name', value)
        if (on || win) {
            play();
        }
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
    computerTurn = true;

    intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
    on = false;

    if (flash == turn) {
        clearInterval(intervalId);
        computerTurn = false;
        clearColor();
        on = true;
    }

    if (computerTurn) {
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) greenColor();
            if (order[flash] == 2) redColor();
            if (order[flash] == 3) yellowColor();
            if (order[flash] == 4) blueColor();
            flash++;
        }, 200);
    }
}

// Color verde activo
function greenColor() {
    if (noise) {
        let audio = document.getElementById("clip1");
        audio.play();
    }
    noise = true;
    topLeft.style.backgroundColor = "lightgreen";
}

// Color rojo activo
function redColor() {
    if (noise) {
        let audio = document.getElementById("clip2");
        audio.play();
    }
    noise = true;
    topRight.style.backgroundColor = "tomato";
}

// Color amarillo activo
function yellowColor() {
    if (noise) {
        let audio = document.getElementById("clip3");
        audio.play();
    }
    noise = true;
    bottomLeft.style.backgroundColor = "yellow";
}

// Color azul activo
function blueColor() {
    if (noise) {
        let audio = document.getElementById("clip4");
        audio.play();
    }
    noise = true;
    bottomRight.style.backgroundColor = "lightskyblue";
}

// "apagar" el flash del color
function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

// "encender" el flash del color
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
        greenColor();
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
        redColor();
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
        yellowColor();
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
        blueColor();
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
                computerTurn = true;
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
        computerTurn = true;
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