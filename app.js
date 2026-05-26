let timer1 = 5 * 60;
let timer2 = 5 * 60;
let active = null; // 'p1' ou 'p2'
let interval = null;
let paused = false;
let initialTime = 5 * 60;

const timerDisplay1 = document.getElementById('timer1');
const timerDisplay2 = document.getElementById('timer2');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const startStopBtn = document.getElementById('startStopBtn');
const startStopIcon = document.getElementById('startStopIcon');
const startTimeInput = document.getElementById('startTime');

function resetTimers() {
    let min = parseInt(startTimeInput.value, 10);
    if (isNaN(min) || min < 1) min = 5;
    initialTime = min * 60;
    timer1 = initialTime;
    timer2 = initialTime;
    updateDisplays();
    active = null;
    paused = false;
    btn1.disabled = true;
    btn2.disabled = true;
    if (interval) clearInterval(interval);
    // Corrige bug do ícone: só mostra play (⏵) ou pause (⏸)
    startStopIcon.textContent = '⏵';
}

function updateDisplays() {
    timerDisplay1.textContent = formatTime(timer1);
    timerDisplay2.textContent = formatTime(timer2);
}

function formatTime(t) {
    const min = String(Math.floor(t / 60)).padStart(2, '0');
    const sec = String(t % 60).padStart(2, '0');
    return `${min}:${sec}`;
}

function switchPlayer() {
    if (paused) return;
    if (interval) clearInterval(interval);
    if (active === 'p1') {
        active = 'p2';
    } else {
        active = 'p1';
    }
    btn1.disabled = active !== 'p1';
    btn2.disabled = active !== 'p2';
    interval = setInterval(() => {
        if (active === 'p1') {
            if (timer1 > 0) {
                timer1--;
                updateDisplays();
            } else {
                clearInterval(interval);
                btn1.disabled = true;
                btn2.disabled = true;
            }
        } else if (active === 'p2') {
            if (timer2 > 0) {
                timer2--;
                updateDisplays();
            } else {
                clearInterval(interval);
                btn1.disabled = true;
                btn2.disabled = true;
            }
        }
    }, 1000);
}


btn1.addEventListener('click', () => {
    if (active !== 'p1' || paused) return;
    const pauseSound = document.getElementById('pauseSound');
    if (pauseSound) {
        pauseSound.currentTime = 0;
        pauseSound.play();
    }
    switchPlayer();
    setTimeout(() => {
        btn1.blur();
    }, 100);
});
btn2.addEventListener('click', () => {
    if (active !== 'p2' || paused) return;
    const pauseSound = document.getElementById('pauseSound');
    if (pauseSound) {
        pauseSound.currentTime = 0;
        pauseSound.play();
    }
    switchPlayer();
    setTimeout(() => {
        btn2.blur();
    }, 100);
});

startStopBtn.addEventListener('click', () => {
    const pauseSound = document.getElementById('pauseSound');
    if (!active) {
        // Iniciar o timer
        resetTimers();
        active = 'p1';
        btn1.disabled = false;
        btn2.disabled = true;
        paused = false;
        startStopIcon.textContent = '⏸';
        interval = setInterval(() => {
            if (active === 'p1') {
                if (timer1 > 0) {
                    timer1--;
                    updateDisplays();
                } else {
                    clearInterval(interval);
                    btn1.disabled = true;
                    btn2.disabled = true;
                }
            } else if (active === 'p2') {
                if (timer2 > 0) {
                    timer2--;
                    updateDisplays();
                } else {
                    clearInterval(interval);
                    btn1.disabled = true;
                    btn2.disabled = true;
                }
            }
        }, 1000);
    } else if (paused) {
        // Retomar
        paused = false;
        startStopIcon.textContent = '⏸';
        interval = setInterval(() => {
            if (active === 'p1') {
                if (timer1 > 0) {
                    timer1--;
                    updateDisplays();
                } else {
                    clearInterval(interval);
                    btn1.disabled = true;
                    btn2.disabled = true;
                }
            } else if (active === 'p2') {
                if (timer2 > 0) {
                    timer2--;
                    updateDisplays();
                } else {
                    clearInterval(interval);
                    btn1.disabled = true;
                    btn2.disabled = true;
                }
            }
        }, 1000);
    } else {
        // Pausar
        paused = true;
        startStopIcon.textContent = '⏵';
        if (interval) clearInterval(interval);
        btn1.disabled = true;
        btn2.disabled = true;
        if (pauseSound) {
            pauseSound.currentTime = 0;
            pauseSound.play();
        }
    }
});

// Atalho: espaço pausa/retoma
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        startStopBtn.click();
    }
});

// Atualiza timers ao mudar o valor do input
startTimeInput.addEventListener('change', () => {
    resetTimers();
});

// Estado inicial: timers prontos, botões desabilitados
resetTimers();
updateDisplays();