/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {

    
    
      (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)("http://localhost:3000/menu").then((data) => createCard(data));
    
      function createCard(data) {
        data.forEach(({ img, title, altimg, descr, price }) => {
          const element = document.createElement("div");
          element.classList.add("menu__item");
          element.innerHTML = `
            <img src=${img} alt="${altimg}">
            <h3 class="menu__item-subtitle">${title}</h3>
            <div class="menu__item-descr">${descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${
                  price * 17
                }</span>грн/день</div>
            </div>
        </div>
            `;
          document.querySelector(".menu__field .container").append(element);
        });
      }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./js/modules/cards.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector) {
    const form = document.querySelectorAll(formSelector);

    const message = {
      loading: "../img/form/spinner.svg",
      succes: "Успех",
      error: "Ошибка",
    };
  
    form.forEach((item) => {
      bindPostData(item);
    });
  

  
    function bindPostData(form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const statusMessage = document.createElement("img");
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.append(statusMessage);
        const formData = new FormData(form);
  
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json)
          .then((data) => {
            console.log(data);
            showThanksModal(message.succes);
            statusMessage.remove();
          })
          .catch(() => {
            showThanksModal(message.error);
          })
          .finally(() => {
            form.reset();
          });
      });
    }
  
    function showThanksModal(message) {
      const modal = document.querySelector(".modal__dialog");
      modal.classList.add("hide");
      const thanksModal = document.createElement("div");
      thanksModal.classList.add("modal__dialog");
      thanksModal.innerHTML = `
      <div class="modal__content">
      <div class="modal__close" data-close>×</div
      <div class= "modal__title">${message}</div>
      </div>
      `;
      document.querySelector(".modal").append(thanksModal);
  
      const closeBtn = thanksModal.querySelector(".modal__close");
      closeBtn.addEventListener("click", () => {
        thanksModal.remove();
        modal.classList.remove("hide");
      });
      setTimeout(() => {
        thanksModal.remove();
        modal.classList.add("show");
        modal.classList.remove("hide");
      }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal(trigerSelector, modalSelector) {
    
  const btnModal = document.querySelectorAll(trigerSelector);
  const modal = document.querySelector(modalSelector);

  btnModal.forEach((btnModal) => {
    btnModal.addEventListener("click", showAndHide);
  });
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      showAndHide();
    }
  });
  function showAndHide() {
    toggleModal();
  }

  function toggleModal(modalTimer) {
    modal.classList.toggle("show");
    modal.classList.toggle("hide");
    if(modalTimer) {
      clearInterval(modalTimer);
    }
    document.body.style.overflow = modal.classList.contains("show")
      ? "hidden"
      : "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      toggleModal();
    }
  });

  const modalTimer = setTimeout(showAndHide, 2000);
  function handleScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      showAndHide();
      window.removeEventListener("scroll", handleScroll);
    }
  }
  window.removeEventListener("scroll", handleScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sliders({container,slide, backSide,nextSide, totalCurrent, currentCounter, wrapper, field }) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container)
    const backSlide = document.querySelector(backSide);
    const nextSlide = document.querySelector(nextSide);
    const total = document.querySelector(totalCurrent);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const slidesField = document.querySelector(field);
    const carousel = document.querySelectorAll('.carousel-indicators');
    const width = window.getComputedStyle(slidesWrapper).width;
    let slideIndex = 1;
    let offset = 0;
  
    if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
      current.textContent = `0${slideIndex}`;
    } else {
      total.textContent = slides.length;
      current.textContent = slideIndex;
    }
  
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = "flex";
    slidesField.style.transition = "0.5s all";
    slidesWrapper.style.overflow = "hidden";
    slides.forEach((item) => {
      item.style.width = width;
    });
  
     
  
    slider.style.position = "relative";
    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);
  
    for(let i = 0; i <slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i+1);
      dot.classList.add('dot');
      if(i == 0) {
        dot.style.opacity =1;
      }
      indicators.append(dot);
      dots.push(dot)
    };
  
  
  
  
  
    nextSlide.addEventListener("click", () => {
      if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
        offset = 0;
      } else {
        offset += +width.replace(/\D/g, '');
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex === slides.length) {
        slideIndex = 1;
      } else {
        slideIndex++;
      }
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
      dots.forEach(dot => {
        dot.style.opacity = '.5';
      })
      dots[slideIndex -1].style.opacity = 1;
    });
  
    backSlide.addEventListener("click", () => {
      if (offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
      } else {
        offset -= +width.replace(/\D/g, '');
      }
      slidesField.style.transform = `translateX(-${offset}px)`;
      if (slideIndex == 1) {
        slideIndex = slides.length;
      } else {
        slideIndex--;
      }
      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
      dots.forEach(dot => {
        dot.style.opacity = '.5';
      })
      dots[slideIndex -1].style.opacity = 1;
      
    });
   
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');
        slideIndex = slideTo;
        offset = +width.replace(/\D/g, '') * (slideTo - 1)
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
          current.textContent = slideIndex;
        }
        dots.forEach(dot => {
          dot.style.opacity = '.5';
        })
        dots[slideIndex -1].style.opacity = 1;
  
      })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelecotr, tabsItem, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector);
  const tabContent = document.querySelectorAll(tabsContentSelecotr);
  const tabItems = document.querySelector(tabsItem);

  function hiddeTabContent() {
    tabContent.forEach((tab) => {
      tab.style.display = "none";
    });

    tabs.forEach((tabs) => {
      tabs.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }
  hiddeTabContent();
  showTabContent();

  tabItems.addEventListener("click", (event) => {
    let e = event.target;
    if (e && e.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (e == item) {
          hiddeTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResources: () => (/* binding */ getResources),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  const getResources = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return res.json();
  };

  
  



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");








window.addEventListener("DOMContentLoaded", () => {
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal");
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2023-12-25");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_form__WEBPACK_IMPORTED_MODULE_4__["default"])("form");
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: ".offer__slider",
    backSide : ".offer__slider-prev",
    nextSide: ".offer__slider-next",
    totalCurrent: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner" ,
    slide: ".offer__slide",
  });
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map