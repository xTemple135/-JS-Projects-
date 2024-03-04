function calc() {
    const result = document.querySelector('.calculating__result span');


    let sex, height, weight, age, ratio;
    if(localStorage.getItem('sex') ) {
       sex = localStorage.getItem('sex')
    }
    else {
      sex = 'female';
      localStorage.setItem('sex','female')
    }
  
    if(localStorage.getItem('ratio') ) {
       ratio = localStorage.getItem('ratio')
    }
    else {
      ratio = 1.55;
      localStorage.setItem('ratio','1.55')
    }
  
    function initLocalSetting(selecor, activeClass) {
      const elements = document.querySelectorAll(selecor);
      elements.forEach(el => {
        el.classList.remove(activeClass);
        if(el.getAttribute('id') === localStorage.getItem('sex')){
          el.classList.add(activeClass);
        }
        if(el.getAttribute('data-ratio')===localStorage.getItem('ratio')) {
          el.classList.add(activeClass);
        }
      })
    }
  
    
    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active')
  
    function calcTotal() {
      if(!sex || !height || !weight || !age || !ratio) {
        result.textContent = '--';
        return;
      }
      if(sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) *ratio)
      }
      else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
      }
    }
  
  
    function getStaticInformation(Selector, activeClass) {
      const elements = document.querySelectorAll(Selector)
      elements.forEach(elem => {
        elem.addEventListener('click', (e)=> {
          if(e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio' ));
          }
          else {
            sex = e.target.getAttribute('id');
            localStorage.setItem('sex',e.target.getAttribute('id') )
          }
          console.log(sex,ratio);
          elements.forEach(element => {
            element.classList.remove(activeClass);
          });
          
          e.target.classList.add(activeClass);
          calcTotal() 
        })
      })
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active')
  
    function getDinamycInfromation(selector) {
      const input = document.querySelector(selector);
      input.addEventListener('input', () => {
        if(input.value.match(/\D/g)){
          input.style.border = '1px solid red';
        }
        else {
          input.style.border = 'none';
        }
        switch(input.getAttribute('id')) {
          case 'height' : height = +input.value;
          break;
          case "weight": weight = +input.value;
          break;
          case 'age': age = +input.value;
          break;
        }
        calcTotal() 
      })
  
    }
    getDinamycInfromation('#height')
    getDinamycInfromation('#weight')
    getDinamycInfromation('#age')
}

export default calc;