// npm i gsap
// import "../files/gsap-animations.js";

// import "../custom/media-action.js";
import ArticleNavigation from "../custom/article-navigation.js";

// import Dropdown from '../libs/dropdown.js';



function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Получение значения куки
function getCookie(name) {
	const cookies = document.cookie.split('; ');
	for (let i = 0; i < cookies.length; i++) {
		const [key, value] = cookies[i].split('=');
		if (key === name) {
			return value;
		}
	}
	return null;
}

function cookiesActions() {
	const notification = document.querySelector('.cookie');
	const closeButton = document.querySelector('.cookie__button ');

	if (!notification) return

	//! Проверяем, есть ли куки для уведомления
	if (getCookie('notification_hidden') === 'true') {
		notification.classList.add('hidden');
	}

	// Событие нажатия на кнопку
	closeButton.addEventListener('click', () => {
		notification.classList.add('hidden');
		setCookie('notification_hidden', 'true', 365); // Устанавливаем куки на 365 дней
	});
}
function topActions() {

	const infoBlock = document.querySelector('.info');

	if (!infoBlock) return
	// !	// Проверяем, есть ли состояние 'hidden' в sessionStorage
	// При загрузке страницы
	if (sessionStorage.getItem('infoBlockState') === 'hidden') {
		infoBlock.style.display = 'none';
		return
	}

	const infoHeight = infoBlock.offsetHeight
	const header = document.querySelector('header.header')
	const headerHeight = header.offsetHeight
	header.style.height = headerHeight + infoHeight + 'px';
	const menu = header.querySelector('.menu__body')
	if (window.innerWidth < 991) {
		menu.style.paddingTop = headerHeight + infoHeight + 'px'
	}

	const close = infoBlock.querySelector('.info__close');
	close.addEventListener('click', () => {
		// Сохраняем состояние 'hidden' в sessionStorage
		sessionStorage.setItem('infoBlockState', 'hidden');
		header.style.height = headerHeight + 'px';
		if (window.innerWidth < 991) {
			menu.style.paddingTop = headerHeight + 'px'
		}
		// Добавляем класс для плавного исчезновения
		infoBlock.classList.add('info--fade-out');

		// Скрываем элемент после завершения анимации
		infoBlock.addEventListener('transitionend', () => {
			infoBlock.style.display = 'none';
		}, { once: true });
	});
}

window.onload = () => {
	topActions()
	cookiesActions()

	// const infoBlock = document.querySelector('.info')
	// if (infoBlock) {
	// 	const close = infoBlock.querySelector('.info__close')
	// 	close.addEventListener('click', () => {
	// 		infoBlock.style.display = 'none';
	// 	})
	// }



	const article = document.querySelectorAll('.article__container')
	if (article) {
		new ArticleNavigation
	}


	const sectionsLists = document.querySelectorAll('.section-about__list')

	if (!sectionsLists.length) return

	sectionsLists.forEach(list => {
		const items = list.querySelectorAll('.section-about__item')
		if (items.length < 5) return
		list.classList.add('section-about__list--accent')
	});

	// dropdowns
	// document.querySelectorAll('[data-js-dropdown=""]').forEach((element) => {
	// 	new Dropdown(element);
	// });

}