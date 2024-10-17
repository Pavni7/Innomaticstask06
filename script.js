let countdown;
let startTimerBtn = document.getElementById("start-timer");
let datePicker = document.getElementById("date-picker");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

 
const startCountdown = () => {
    const endDate = new Date(datePicker.value).getTime();

    if (!datePicker.value) {
        alert("Please select a date and time.");
        return;
    }

    
    localStorage.setItem("countdownEnd", endDate);

    countdown = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            notifyEnd();
            resetDisplay();
        } else {
            updateDisplay(timeLeft);
        }
    }, 1000);
};

 
const updateDisplay = (timeLeft) => {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysEl.textContent = formatTime(days);
    hoursEl.textContent = formatTime(hours);
    minutesEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);
};

 
const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
};
 
const notifyEnd = () => {
    alert("The countdown has ended!");
};
 
const resetDisplay = () => {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
};
 
const loadCountdown = () => {
    const savedEndDate = localStorage.getItem("countdownEnd");

    if (savedEndDate) {
        const endDate = parseInt(savedEndDate);
        const now = new Date().getTime();
        const timeLeft = endDate - now;

        if (timeLeft > 0) {
            countdown = setInterval(() => {
                const timeLeft = endDate - new Date().getTime();
                
                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    notifyEnd();
                    resetDisplay();
                } else {
                    updateDisplay(timeLeft);
                }
            }, 1000);
        }
    }
};

startTimerBtn.addEventListener("click", startCountdown);
window.addEventListener("load", loadCountdown);
