document.addEventListener("DOMContentLoaded", function () {
  const navIcon = document.querySelector(".nav-icon");
  const nav = document.querySelector(".nav-mobile");
  const bodyEl = document.body;
  const navLinks = document.querySelectorAll("#mobile-nav a");
  const formInputs = document.querySelectorAll(".form-input");
  const backTopBtn = document.querySelector("#backtop");

  /* Вызов анимации AOS */
  AOS.init();

  /* Вызов галереи FancyBox */
  Fancybox.bind("[data-fancybox]", {
    // Your custom options
  });

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

  /****** Переключение категорий карточек ******/
  let containerEl = document.querySelector('#mix-cards');
  let mixer = mixitup(containerEl, {
    classNames: {
        block: ""
    }
  });

  /**** Перемещение названия поля input наверх *****/
  for (let item of formInputs) {
    const thisParent = item.closest(".contact-form__item");
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

   /**** Валидация формы *****/
   $(".contact-form").validate({
    rules: {
        email: {
            required: true,
            email: true
        },

        message: {
            required: true
        }
    },

    messages: {
        email: {
            required: "Необходимо указать электронную почту",
            email: "Неверно указан адрес"
        },

        message: {
            required: "Отсутствует текст сообщения"
        }
    },

    submitHandler: function (form){
        ajaxFormSubmit();
    }
   });

   // Функция AJAX запроса на сервер
   function ajaxFormSubmit(){
    let userData = $(".contact-form").serialize(); // Сохраняем данные из формы в строку

    // Запрос ajax
    $.ajax({
        type: "POST", // тип запроса - POST
        url: "php/mail.php", // адрес для отправки
        data: userData, // какие данные отправляем. Здесь - данные переменной userData

        // Функция, если код выполнен правильно
        success: function (html) {
            $(".contact-form").slideUp(800);
            $("#answer").html(html);
        }
    });
    // Чтобы по Submit больше ничего не выполнялось - делаем возврат false. Прерываем цепочку срабатывания остальных функций
    return false
   };

      /**** Parallax движения за мышкой *****/
      let prxScene = document.querySelector(".contacts");
      let prxItem = document.querySelectorAll(".move-quot");
      prxScene.addEventListener("mousemove", function(e){
        let x = e.clientX / window.innerWidth;
        let y = e.clientY / window.innerHeight;
        for (let item of prxItem) {
            item.style.transform = "translate(-" + x * 50 + "px, -" + y * 50 + "px)";
        }
      });

});
