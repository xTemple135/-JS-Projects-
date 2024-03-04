function formatNumbers(number) {
    if (number < 10) {
        return  '0' + number;
    }
    else {
        return number.toString();
    }
}


let hourse = document.querySelector('#hrs');
let min = document.querySelector('#min');
let second = document.querySelector('#sec');
let colon = document.querySelectorAll("#colon")

function toggleAnimation() {
    colon.forEach((colon) => colon.classList.toggle('blink'));
}

function updateTime() {
let currentTime = new Date();
hourse.innerHTML = formatNumbers(currentTime.getHours());
min.innerHTML = formatNumbers(currentTime.getMinutes());
second.innerHTML = formatNumbers(currentTime.getSeconds());
toggleAnimation()
}

setInterval(updateTime, 1000);
updateTime();