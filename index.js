let countdown;
const timeLeft = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds); // display 1st value
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // need to STOP?
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft); // display time remaining
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainderMinutes = minutes % 60;
  const remainderSeconds = seconds % 60;
  const display = `${hours >= 1 ? hours : ""}${hours >= 1 ? ":" : ""}${
    remainderMinutes < 10 ? "0" : ""
  }${remainderMinutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;

  timeLeft.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  endTime.textContent = `Back at ${hour > 12 ? hour - 12 : hour}:${
    mins < 10 ? "0" : ""
  }${mins}${hour < 12 ? "am" : "pm"}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
