const btnAge = document.getElementById("btn-age")

btnAge.addEventListener('click', function () {
    const labelAge = document.createElement("label");
    const personAge = document.createElement("input");
    const inputSubmit = document.createElement("input");
    labelAge.innerHTML = "How old are you? ";
    personAge.type = "text";
    personAge.id = "input-age"
    inputSubmit.type = "submit";
    inputSubmit.value = "Send";

    document.body.append(labelAge);
    document.body.append(personAge);
    document.body.append(inputSubmit);

    inputSubmit.addEventListener('click', function () {
        const welcome = document.createElement("h3");
        welcome.innerHTML = "ENJOY THIS SITE!";
        document.body.append(welcome);
    })
})

/* Cosas que fui probando en el transcurso de la realización de este desafío:

// Obtener el h1 del HTML byId y cambiarlo:
const titulo = document.getElementById('game-name');
console.log(titulo.innerHTML);
titulo.innerHTML = "<h1>Simon Game</h1>";
console.log(titulo.innerHTML);

// Obtener el h2 del HTML byId y cambiarlo:
const rules = document.getElementById('game-description');
console.log(rules.innerHTML);
rules.innerHTML = "<h2>Repeat the sequence of colors that appears on the screen.</h2>";
console.log(rules.innerHTML);

const personName = prompt('Enter your name:');
let bienvenida = document.createElement('h3');
bienvenida.innerHTML = `¡Hello, ${personName}!`
document.body.append(bienvenida);

//CREANDO EL BOTÓN DESDE JS
const btnNucleo = document.createElement("button");
//ASIGNAR ID AL BOTÓN
btnNucleo.id = 'btnNucleo';
//ASIGNAR EL INTERIOR DEL BOTÓN
btnNucleo.innerHTML = 'Click here to tell me your age';
//ESCUCHAR EL EVENTO CLICK
btnNucleo.addEventListener('click', function () {
    const personAge = prompt('Enter your age:');
    let age = document.createElement('h4');
    age.innerHTML = `¡YOU ARE ${personAge} YEARS OLD!`
    document.body.append(age);
})
//AGREGAR EL BOTON AL DOM
document.body.appendChild(btnNucleo);

// const personAge = prompt('Enter your age:');
// let age = document.getElementById('h4');
// age.innerText = `You are ${personAge} years old`;

const players = [{ id: 1, playerName: "John", higherScore: 125 },
{ id: 2, playerName: "Sarah", higherScore: 70 },
{ id: 3, playerName: "Julia", higherScore: 50 },
{ id: 4, playerName: "Noah", higherScore: 100 }];

for (const player of players) {
    let content = document.createElement("div");
    //Definimos el innerHTML del elemento con una plantilla de texto
    content.innerHTML = `<h3> ID: ${player.id}</h3>
                            <p>  Player: ${player.playerName}</p>
                            <b> Higher Score: ${player.higherScore}</b>`;
    document.body.appendChild(content);
}

const nombre = document.querySelector('#game-name');
const btnAge = document.getElementById('age');

nombre.innerHTML = 'S I M O N      G A M E'

btnAge.onclick = (e) => {
    adult.innerHTML = 'You can contact me to talk about JavaScript. Send me an email to indilozano19@gmail.com'
} */