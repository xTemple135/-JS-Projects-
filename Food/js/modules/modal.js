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

export default modal;

