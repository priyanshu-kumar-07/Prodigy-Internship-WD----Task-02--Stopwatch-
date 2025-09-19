let timer;
let isRunning = false;
let milliseconds = 0, seconds = 0, minutes = 0, hours = 0;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const clearLapsBtn = document.getElementById("clearLaps");
const laps = document.getElementById("laps");

function updateDisplay() {
  let h = hours < 10 ? "0" + hours : hours;
  let m = minutes < 10 ? "0" + minutes : minutes;
  let s = seconds < 10 ? "0" + seconds : seconds;
  let ms = milliseconds < 100 ? (milliseconds < 10 ? "00" + milliseconds : "0" + milliseconds) : milliseconds;
  display.textContent = `${h}:${m}:${s}:${ms}`;
}

function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startStopBtn.textContent = "Pause";
    startStopBtn.style.backgroundColor = "#ffc107"; // yellow
    timer = setInterval(() => {
      milliseconds += 10; // count in 10ms steps
      if (milliseconds >= 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
          if (minutes === 60) {
            minutes = 0;
            hours++;
          }
        }
      }
      updateDisplay();
    }, 10); // update every 10ms
  } else {
    isRunning = false;
    startStopBtn.textContent = "Start";
    startStopBtn.style.backgroundColor = "#28a745"; // green
    clearInterval(timer);
  }
}

function resetStopwatch() {
  clearInterval(timer);
  isRunning = false;
  milliseconds = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  updateDisplay();
  startStopBtn.textContent = "Start";
  startStopBtn.style.backgroundColor = "#28a745";
}

function addLap() {
  if (isRunning) {
    let lapTime = display.textContent;
    let li = document.createElement("li");
    li.textContent = `Lap ${laps.childElementCount + 1}: ${lapTime}`;
    laps.appendChild(li);
  }
}

function clearLaps() {
  laps.innerHTML = "";
}

startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
clearLapsBtn.addEventListener("click", clearLaps);

// Initialize display
updateDisplay();
