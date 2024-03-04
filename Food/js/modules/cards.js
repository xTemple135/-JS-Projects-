import { getResources } from "../services/services";
function cards() {

    
    
      getResources("http://localhost:3000/menu").then((data) => createCard(data));
    
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

export default cards;