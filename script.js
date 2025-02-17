let countdownInterval;
let countToDate;
let isRunning = false;

// Initialize all display cards with 0
function resetDisplay() {
    const elements = [
        "[data-days-tens]", "[data-days-ones]",
        "[data-hours-tens]", "[data-hours-ones]",
        "[data-minutes-tens]", "[data-minutes-ones]",
        "[data-seconds-tens]", "[data-seconds-ones]"
    ];

    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.querySelector(".top");
            const bottom = element.querySelector(".bottom");
            if (top) top.textContent = "0";
            if (bottom) bottom.textContent = "0";
        }
    });
}

// Start the countdown
function beginCountdown() {
    if (isRunning) return;

    // Get user input values
    const days = parseInt(document.getElementById('daysInput').value) || 0;
    const hours = parseInt(document.getElementById('hoursInput').value) || 0;
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;

    // Check if all inputs are zero
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
        alert("Please enter time before starting the countdown.");
        return;
    }

    // Calculate total countdown time in milliseconds
    const totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
    countToDate = new Date().getTime() + totalSeconds * 1000;

    isRunning = true;

    countdownInterval = setInterval(() => {
        const currentDate = new Date().getTime();
        const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

        if (timeBetweenDates <= 0) {
            clearInterval(countdownInterval);
            stopCountdown();
            resetDisplay(); // Reset to zeros when done

            window.location.href = "https://www.hatom.com/";

            return;
        }

        else {
            animateAllFlips(timeBetweenDates);

        }

    }, 1000);
}


// Function to reset countdown
function stopCountdown() {
    isRunning = false;
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    resetDisplay();
}

// Function to flip individual cards
function animateFlip(flipCard, newNumber) {
    if (!flipCard) return;
    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf.textContent);
    if (newNumber === startNumber) return;

    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    topFlip.textContent = startNumber;
    bottomHalf.textContent = startNumber;
    topFlip.textContent = startNumber;
    bottomFlip.textContent = newNumber;

    

    topFlip.addEventListener("animationstart", () => {
        topHalf.textContent = newNumber;
    });

    topFlip.addEventListener("animationend", () => {
        topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", () => {
        bottomHalf.textContent = newNumber;
        bottomFlip.remove();
    });

        flipCard.append(topFlip, bottomFlip);
}

// Function to flip all cards
function animateAllFlips(time) {
    if (time < 0) return;

    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    animateFlip(document.querySelector("[data-days-tens]"), Math.floor(days / 10));
    animateFlip(document.querySelector("[data-days-ones]"), days % 10);
    animateFlip(document.querySelector("[data-hours-tens]"), Math.floor(hours / 10));
    animateFlip(document.querySelector("[data-hours-ones]"), hours % 10);
    animateFlip(document.querySelector("[data-minutes-tens]"), Math.floor(minutes / 10));
    animateFlip(document.querySelector("[data-minutes-ones]"), minutes % 10);
    animateFlip(document.querySelector("[data-seconds-tens]"), Math.floor(seconds / 10));
    animateFlip(document.querySelector("[data-seconds-ones]"), seconds % 10);
}

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', () => {
    resetDisplay(); // Reset display before starting
    beginCountdown();
});

// Initialize display with zeros
resetDisplay();