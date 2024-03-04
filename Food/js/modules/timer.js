function timer(id, deadLine) {
    function timer(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date());
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const minute = Math.floor((t / 1000 / 60) % 60);
      const second = Math.floor((t / 1000) % 60);
      return {
        total: t,
        days: days,
        hours: hours,
        minute: minute,
        second: second,
      };
    }
  
    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }
  
    function setClock(selector, endtime) {
      const timers = document.querySelector(selector);
      const days = timers.querySelector("#days");
      const hours = timers.querySelector("#hours");
      const minutes = timers.querySelector("#minutes");
      const seconds = timers.querySelector("#seconds");
      const timeInerval = setInterval(uppdateClock, 1000);
      uppdateClock();
  
      function uppdateClock() {
        const t = timer(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minute);
        seconds.innerHTML = getZero(t.second);
  
        if (t.total <= 0) {
          clearInterval(timeInerval);
        }
      }
    }
    setClock(".timer", deadLine);
}

export default timer;