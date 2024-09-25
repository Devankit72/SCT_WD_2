let hours = 0, minutes = 0, seconds = 0;
let timerInterval;
let running = false;
let lapCount = 0;

// DOM Elements
const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

// Format the time for display (hh:mm:ss)
function formatTime(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Update the stopwatch display
function updateDisplay() {
    display.innerText = formatTime(hours, minutes, seconds);
}

// Start the stopwatch
function startStopwatch() {
    running = true;
    startPauseBtn.innerText = 'Pause';
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        updateDisplay();
    }, 1000);
}

// Pause the stopwatch
function pauseStopwatch() {
    running = false;
    clearInterval(timerInterval);
    startPauseBtn.innerText = 'Start';
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
    running = false;
    lapCount = 0;
    lapsList.innerHTML = '';  // Clear laps
    startPauseBtn.innerText = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

// Record lap times
function recordLap() {
    lapCount++;
    const lapTime = formatTime(hours, minutes, seconds);
    const lapItem = document.createElement('li');
    lapItem.innerHTML = `Lap ${lapCount} <span>${lapTime}</span>`;
    lapsList.appendChild(lapItem);
}

// Button Listeners
startPauseBtn.addEventListener('click', () => {
    if (running) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

lapBtn.addEventListener('click', () => {
    if (running) {
        recordLap();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
