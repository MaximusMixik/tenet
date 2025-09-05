// npm i gsap
// import "../files/gsap-animations.js";

// import "../custom/media-action.js";
import ArticleNavigation from "./article-navigation.js";

// import Dropdown from '../libs/dropdown.js';

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// gsap.registerPlugin(ScrollTrigger);

// // SplitType
// import SplitType from "split-type";

// // Lenis
// import Lenis from "@studio-freight/lenis";
// // import Lenis from 'lenis'

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
		infoBlock.classList.add('info--fade-out');

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


	const sectionsLists = document.querySelectorAll('.section-about__wrapper')

	if (!sectionsLists.length) return

	sectionsLists.forEach(list => {
		const items = list.querySelectorAll('.section-about__slide')
		if (items.length < 5) return
		list.classList.add('section-about__wrapper--accent')
	});

	// dropdowns
	// document.querySelectorAll('[data-js-dropdown=""]').forEach((element) => {
	// 	new Dropdown(element);
	// });


	// gsap animations
	// GSAP + ScrollTrigger


	// ---- твой код ----
	// const splitTypes = document.querySelectorAll('.reveal-type')

	// splitTypes.forEach((char) => {
	// 	const bg = char.dataset.bgColor
	// 	const fg = char.dataset.fgColor

	// 	const text = new SplitType(char, { types: 'chars' })

	// 	gsap.fromTo(text.chars,
	// 		{ color: bg },
	// 		{
	// 			color: fg,
	// 			duration: 0.3,
	// 			stagger: 0.02,
	// 			scrollTrigger: {
	// 				trigger: char,
	// 				start: 'top 80%',
	// 				end: 'top 20%',
	// 				scrub: true,
	// 				markers: false,
	// 				toggleActions: 'play play reverse reverse'
	// 			}
	// 		}
	// 	)
	// })

	//!! draft
	// // Initialize Lenis
	// // Initialize a new Lenis instance for smooth scrolling
	// const lenis = new Lenis();
	// // {easing:()=>()}

	// // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
	// lenis.on('scroll', ScrollTrigger.update);

	// // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
	// // This ensures Lenis's smooth scroll animation updates on each GSAP tick
	// gsap.ticker.add((time) => {
	// 	lenis.raf(time * 1000); // Convert time from seconds to milliseconds
	// });

	// // Disable lag smoothing in GSAP to prevent any delay in scroll animations
	// gsap.ticker.lagSmoothing(0);
	// // // Lenis init
	// // const lenis = new Lenis()

	// // function raf(time) {
	// // 	lenis.raf(time)
	// // 	requestAnimationFrame(raf)
	// // }

	// // requestAnimationFrame(raf)

	//! need add animations
	// gsap.registerPlugin(ScrollTrigger)

	// const splitTypes = document.querySelectorAll('.reveal-type')

	// splitTypes.forEach((char, i) => {

	// 	const bg = char.dataset.bgColor
	// 	const fg = char.dataset.fgColor

	// 	const text = new SplitType(char, { types: 'chars' })

	// 	gsap.fromTo(text.chars,
	// 		{
	// 			color: bg,
	// 		},
	// 		{
	// 			color: fg,
	// 			duration: 0.3,
	// 			stagger: 0.02,
	// 			scrollTrigger: {
	// 				trigger: char,
	// 				start: 'top 80%',
	// 				end: 'top 20%',
	// 				scrub: true,
	// 				markers: false,
	// 				toggleActions: 'play play reverse reverse'
	// 			}
	// 		})
	// })


	// const lenis = new Lenis()

	// lenis.on('scroll', (e) => {
	// 	console.log(e)
	// })

	// function raf(time) {
	// 	lenis.raf(time)
	// 	requestAnimationFrame(raf)
	// }

	// requestAnimationFrame(raf)


}