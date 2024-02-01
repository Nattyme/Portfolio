const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.nav-mobile');

navIcon.addEventListener('click', function () {
	this.classList.toggle('nav-icon--active');
	nav.classList.toggle('nav-mobile--active');
});

// Находим ссылки внутри мобильной навигации
const navLinks = document.querySelectorAll('.nav-mobile a');

// Обходим ссылки методом forEach
navLinks.forEach(function (item) {
	// Для каждой ссылки добавляем прослушку по событию "Клик"
	item.addEventListener('click', function () {
		navIcon.classList.remove('nav-icon--active'); // Убираем активный класс у иконки моб. навигации
		nav.classList.remove('.nav-mobile--active'); // Убираем активный класс у блока моб. навигации
	})
})
