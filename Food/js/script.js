import tabs from "./modules/tabs";
import modal from "./modules/modal";
import timer from "./modules/timer";
import calc from "./modules/calc";
import form from "./modules/form";
import slider from "./modules/slider";
import cards from "./modules/cards";

window.addEventListener("DOMContentLoaded", () => {
  tabs(
    ".tabheader__item",
    ".tabcontent",
    ".tabheader__items",
    "tabheader__item_active"
  );
  modal("[data-modal]", ".modal");
  timer(".timer", "2023-12-25");
  cards();
  calc();
  form("form");
  slider({
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
