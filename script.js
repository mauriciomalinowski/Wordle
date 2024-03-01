let intentos = 6;
let palabra = "";

window.addEventListener('load', init);

function init() {
    palabra = obtenerPalabraAleatoria();
    mostrarPalabra();
    const button = document.getElementById('guess-button');
    const input = document.getElementById('guess-input');
    
    button.addEventListener('click', intentar);
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            intentar();
        }
    });
}

function obtenerPalabraAleatoria() {
    const diccionario = ["WHITE", "GREEN", "BLACK", "BROWN", "LILAC", "APPLE", "LEMON", "GUAVA", "PEACH", "GRAPE"];
    return diccionario[Math.floor(Math.random() * diccionario.length)];
}

function mostrarPalabra() {
    const wordDisplay = document.getElementById('word-display');
    const letras = palabra.split('');
    letras.forEach(letra => {
        const span = document.createElement('span');
        span.textContent = '_';
        wordDisplay.appendChild(span);
    });
}

function intentar() {
    const intento = leerIntento();
    const feedback = document.getElementById('feedback');
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (intento[i] === palabra[i]) { 
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'green';
        } else if( palabra.includes(intento[i]) ) { 
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {     
            SPAN.innerHTML = intento[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    intentos--;
    actualizarIntentos();
    if (intentos === 0) {
        terminar("<h1>¡PERDISTE!😖</h1> La palabra correcta era: " + palabra);
    }
    if (intento === palabra ) {
        terminar("<h1>¡GANASTE!😀</h1>");
    }
    limpiarInput();
}

function leerIntento() {
    return document.getElementById('guess-input').value.toUpperCase();
}

function actualizarIntentos() {
    document.getElementById('attempts').textContent = "Intentos restantes: " + intentos;
}

function limpiarInput() {
    document.getElementById('guess-input').value = '';
}

function terminar(mensaje) {
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = mensaje;
    deshabilitarControles();
}

function deshabilitarControles() {
    document.getElementById('guess-button').disabled = true;
    document.getElementById('guess-input').disabled = true;
}
