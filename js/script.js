// El juego consiste en repetir los colores que aparecen por pantalla. Por el momento, crearé una simulación del mismo utilizando lo visto en el curso de JavaScript hasta la cuarta clase, pero con algunas modificaciones, dado que todavía no sé bien cómo incorporar la lógica completa del juego. Este desarrollo seguramente cambiará a futuro.

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

const personAge = prompt('Enter your age:');
let age = document.createElement('h4');
age.innerHTML = `You are ${personAge} years old.`
document.body.append(age);

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
