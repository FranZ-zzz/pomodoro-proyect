let timer = 1500; // 25 minutos en segundos
let timerInterval;
let isRunning = false;
let isWorkTime = true; // True: tiempo de trabajo, False: tiempo de descanso

const timerElement = document.getElementById('timer');
const statusElement = document.getElementById('status');
const statusIcon = document.getElementById('status-icon');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle');

// Formato del tiempo
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Actualizar la pantalla 
function updateDisplay() {
    timerElement.textContent = formatTime(timer);
}

// Cambiar el estado (Trabajo o Descanso)
function toggleWorkRest() {
    isWorkTime = !isWorkTime;
    statusElement.textContent = isWorkTime ? "Tiempo de Trabajo" : "Tiempo de Descanso";
    statusIcon.className = isWorkTime ? "fas fa-briefcase" : "fas fa-coffee"; //iconos para mayor comodidad
    timer = isWorkTime ? 1500 : 300; // 25 minutos para trabajo, 5 minutos para descanso
    updateDisplay();
}

// Iniciar 
startButton.addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        statusElement.textContent = isWorkTime ? "Tiempo de Trabajo" : "Tiempo de Descanso";
        statusIcon.className = isWorkTime ? "fas fa-briefcase" : "fas fa-coffee";
        timerInterval = setInterval(() => {
            if (timer > 0) {
                timer--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                statusElement.textContent = "¡Tiempo terminado!";
                isRunning = false;
            }
        }, 1000);
    }
});

// Pausar
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        statusElement.textContent = "Pausado";
        statusIcon.className = "fas fa-pause-circle";
    }
});

// Reiniciar
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timer = isWorkTime ? 1500 : 300; 
    isRunning = false;
    updateDisplay();
    statusElement.textContent = isWorkTime ? "Tiempo de Trabajo" : "Tiempo de Descanso";
    statusIcon.className = isWorkTime ? "fas fa-briefcase" : "fas fa-coffee";
});

// Cambia entre "Tiempo de Trabajo" y "Tiempo de Descanso"
toggleButton.addEventListener('click', toggleWorkRest);


updateDisplay();
