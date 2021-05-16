const minDays = document.getElementById("days");
const minHours = document.getElementById("hours");
const minMinutes = document.getElementById("minutes");
const minSeconds = document.getElementById("seconds");

const newYears = "1 Jan 2022";

function countDown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = (newYearsDate - currentDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  console.log(days, hours, minutes, seconds);

  minDays.innerHTML = days;
  minHours.innerHTML = formatTime(hours);
  minMinutes.innerHTML = formatTime(minutes);
  minSeconds.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Initial Call
countDown();

setInterval(countDown, 1000);
