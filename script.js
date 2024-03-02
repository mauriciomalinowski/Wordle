let intentos = 6;
let palabra = "";

window.addEventListener('load', init);

function init() {
  obtenerPalabraAleatoria()
    .then(palabraAleatoria => {
      if (palabraAleatoria) {
        palabra = palabraAleatoria;
        console.log('Palabra aleatoria:', palabra);
        mostrarPalabra();
        configurarEventListeners(); 
      } else {
        console.error('La palabra aleatoria es undefined');
        palabra = "ERROR"; 
        mostrarPalabra();
      }
    })
    .catch(error => {
      console.error('Error al inicializar la palabra aleatoria:', error);
      palabra = "ERROR";
      mostrarPalabra();
    });
}

async function obtenerPalabraAleatoria() {
  try {
    const response = await fetch('https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase');
    if (!response.ok) {
      throw new Error('No se pudo obtener la palabra aleatoria');
    }
    const data = await response.json();
    if (data && data.length > 0) {
      const index = Math.floor(Math.random() * data.length);
      return data[index].toUpperCase();
    } else {
      throw new Error('El diccionario no contiene palabras');
    }
  } catch (error) {
    console.error('Error al obtener la palabra aleatoria:', error);
    return null;
  }
}
  
function mostrarPalabra() {
  const wordDisplay = document.getElementById('word-display');
  if (!wordDisplay) {
    console.error('Elemento "word-display" no encontrado en el DOM');
    return;
  }
  wordDisplay.innerHTML = '';
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
  
  if (intento.includes(' ')) {
    feedback.textContent = "¡Tienes espacios en blanco! Vuelve a intentar.";
    setTimeout(() => {
      feedback.textContent = "";
      habilitarEntrada();
    }, 3000);
    return;
  }
  
  if (intento.length !== palabra.length) {
    feedback.textContent = "¡La palabra debe tener " + palabra.length + " letras!";
    setTimeout(() => {
      feedback.textContent = "";
      habilitarEntrada();
    }, 3000);
    return;
  }

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

function configurarEventListeners() {
  const button = document.getElementById('guess-button');
  const input = document.getElementById('guess-input');

  if (button && input) {
    button.addEventListener('click', intentar);
    input.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        intentar();
      }
    });
  } else {
    console.error('No se encontraron los elementos del botón y el input');
  }
}

function habilitarEntrada() {
  document.getElementById('guess-input').disabled = false;
}
