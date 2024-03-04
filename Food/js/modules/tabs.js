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

export default tabs