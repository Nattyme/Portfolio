document.addEventListener("DOMContentLoaded", function () {
  const navIcon = document.querySelector(".nav-icon");
  const nav = document.querySelector(".nav-mobile");
  const bodyEl = document.body;
  const navLinks = document.querySelectorAll("#mobile-nav a");
  const formInputs = document.querySelectorAll(".form-input");
  const backTopBtn = document.querySelector("#backtop");

  /* Вызов анимации AOS */
  AOS.init();

  /****** Мобильная навигация и кнопка ******/
  navIcon.addEventListener("click", function () {
    this.classList.toggle("nav-icon--active");
    nav.classList.toggle("nav-mobile--active");
    bodyEl.classList.toggle("lock");
  });
  navLinks.forEach(function (item) {
    // Для каждой ссылки добавляем прослушку по событию "Клик"
    item.addEventListener("click", function () {
      navIcon.classList.remove("nav-icon--active"); // Убираем активный класс у иконки моб. навигации
      nav.classList.remove("nav-mobile--active"); // Убираем активный класс у блока моб. навигации
      bodyEl.classList.remove("lock");
    });
  });

  /**** Перемещение названия поля input наверх *****/
  for (let item of formInputs) {
    const thisParent = item.closest(".form-item");
    const thisPlaceHolder = thisParent.querySelector(".fake-placeholder");

    // Когда input находится в фокусе
    item.addEventListener("focus", function () {
      thisPlaceHolder.classList.add("fake-placeholder--active");
    });

    // Когда выходит из фокуса
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
      } else {
        thisPlaceHolder.classList.remove("fake-placeholder--active");
      }
    });
  }

  /**** Кнопка перемещения наверх страницы *****/
  backTopBtn.style.opacity = 0;

  document.addEventListener('scroll', function(){
    if(window.pageYOffset > 500) {
        backTopBtn.style.opacity = 1;
    } else {
        backTopBtn.style.opacity = 0;
    }
  });
});
