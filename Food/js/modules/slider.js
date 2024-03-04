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

export default sliders;