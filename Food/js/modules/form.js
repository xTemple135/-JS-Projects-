import cards from "./cards";
import { postData } from "../services/services";

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
        postData("http://localhost:3000/requests", json)
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

export default forms;
