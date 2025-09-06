// npm i gsap
// import "../files/gsap-animations.js";

// import "../custom/media-action.js";
import ArticleNavigation from "./article-navigation.js";

// import Dropdown from '../libs/dropdown.js';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";


// SplitType
import SplitType from "split-type";

// Lenis
import Lenis from "@studio-freight/lenis";

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
		notification.style.display = 'none';
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


// animations
// 1. Функционал активной навигации
function initActiveNavigation() {
	const menuLinks = document.querySelectorAll('.menu-about__link');
	const sections = document.querySelectorAll('.sticky-about__section');

	// Intersection Observer для отслеживания активных секций
	const observerOptions = {
		root: null,
		rootMargin: '-20% 0px -20% 0px',
		threshold: 0.3
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.querySelector('.section-about__body').id;

				// Убираем активный класс у всех ссылок
				menuLinks.forEach(link => link.classList.remove('active'));

				// Добавляем активный класс соответствующей ссылке
				const activeLink = document.querySelector(`.menu-about__link[href="#${sectionId}"]`);
				if (activeLink) {
					activeLink.classList.add('active');
				}
			}
		});
	}, observerOptions);

	// Наблюдаем за секциями
	sections.forEach(section => {
		observer.observe(section);
	});

	// Обработчики кликов по навигации (плавная прокрутка уже работает на CSS)
	menuLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const targetId = link.getAttribute('href').substring(1);
			const targetSection = document.getElementById(targetId);

			if (targetSection) {
				const rect = targetSection.getBoundingClientRect();
				const currentScroll = window.pageYOffset;
				const targetTop = currentScroll + rect.top;

				// Определяем направление прокрутки
				const scrollingDown = targetTop > currentScroll;
				const offset = scrollingDown ? 1000 : -400; // +1000 вниз, -1000 вверх

				const targetPosition = targetTop + offset;

				window.scrollTo({
					top: Math.max(0, targetPosition), // не даем уйти в минус
					behavior: 'smooth'
				});
			}
		});
	});
}

function splitTitle() {
	// Анимация текста
	const splitTypes = document.querySelectorAll('.reveal-type, .title-display')

	splitTypes.forEach((char) => {
		const bg = char.dataset.bgColor
		const fg = char.dataset.fgColor

		const text = new SplitType(char, { types: 'chars' })

		gsap.fromTo(
			text.chars,
			{ color: bg },
			{
				color: fg,
				duration: 0.3,
				stagger: 0.02,
				scrollTrigger: {
					trigger: char,
					start: 'top 80%',
					end: 'top 20%',
					scrub: 0.5,
					markers: false
				}
			}
		)
	})
}
// test
function initSVGLineAnimations() {
	// gsap.registerPlugin(ScrollTrigger);

	document.querySelectorAll(".section-about").forEach(section => {
		const svg = section.querySelector(".section-about__bg");
		const fillPath = svg?.querySelector("path");
		if (!fillPath) return;

		// Убираем старые stroke, чтобы не плодились
		svg.querySelector(".js-stroke-path")?.remove();

		// Копия пути для stroke
		const strokePath = fillPath.cloneNode(true);
		strokePath.classList.add("js-stroke-path");
		strokePath.removeAttribute("fill");
		strokePath.setAttribute("stroke", "#F9F4E6");
		strokePath.setAttribute("stroke-width", "3");
		svg.appendChild(strokePath);

		const length = strokePath.getTotalLength();

		strokePath.setAttribute("stroke-dasharray", length);
		strokePath.setAttribute("stroke-dashoffset", length);

		const content = section.querySelectorAll('.section-about__header, .section-about__slider');
		// gsap.set(content, { opacity: 0, y: 40 });
		gsap.set(content, { opacity: 0, y: 150 });

		// === Timeline: сначала линия, потом контент ===
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: section,
				start: "top 10%",
				end: "+=200%",     // длина всей анимации
				scrub: true,
				pin: true,
				// markers: true,
			}
		});

		// 1. Прорисовка линии до 50%
		tl.to(strokePath, {
			strokeDashoffset: length * 0.5,
			ease: "none",
			duration: 2,
		});

		// 2. Появление контента (после снятия пина)
		tl.to(content, {
			opacity: 1,
			y: 0,
			duration: 2,
		});


	});
}

function changeBackground() {
	// Анимация фона body (или полосы wrapper-а)
	// Проходимся по секциям
	document.querySelectorAll('.change-color').forEach((section) => {
		const bg = section.dataset.bg
		const fg = section.dataset.fg
		// Анимируем фон самой секции
		gsap.to(section, {
			backgroundColor: bg,
			color: fg, // поменяет базовый цвет текста
			ease: "none",
			scrollTrigger: {
				trigger: section,
				// start: "top center",
				// end: "bottom center",
				start: 'top 60%',
				end: 'top 20%',
				scrub: true
			}
		})

		// Дополнительно — плавно меняем цвет у вложенного текста/иконок
		gsap.to(section.querySelectorAll("h2, h3, h4, p, span, .color-section__text"), {
			color: fg,

			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top center",
				end: "bottom center",
				scrub: true
			}
		})
	})

}
function initialiseLenisScroll() {

	const lenis = new Lenis({
		smoothWheel: true,
		// duration: 1.2,
		duration: 0.5,
		lerp: 0.8,
		smooth: true,
		smoothTouch: false,
		normalizeWheel: true
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
}

window.onload = () => {

	cookiesActions()
	topActions()
	initActiveNavigation();
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


	gsap.registerPlugin(ScrollTrigger);
	splitTitle()
	initSVGLineAnimations();
	changeBackground();
	// initialiseLenisScroll()


}

// const lenis = new Lenis({
// 	duration: 0.2,
// 	lerp: 0.6,
// 	smooth: true,
// 	smoothTouch: false,
// 	normalizeWheel: true
// })

// lenis.on('scroll', ScrollTrigger.update);
// gsap.ticker.add((time) => {
// 	lenis.raf(time * 1000)
// })

// gsap.ticker.lagSmoothing(0)


//! primary
// // 1. Анимация SVG линий (рисуется один раз и остаётся)
// function initSVGLineAnimations() {
// 	gsap.registerPlugin(ScrollTrigger);

// 	document.querySelectorAll(".section-about").forEach(section => {
// 		const svg = section.querySelector(".section-about__bg");
// 		const fillPath = svg?.querySelector("path");
// 		if (!fillPath) return;

// 		// Удаляем старый stroke (чтобы не дублировался)
// 		svg.querySelector(".js-stroke-path")?.remove();

// 		// Копия пути для stroke
// 		const strokePath = fillPath.cloneNode(true);
// 		strokePath.classList.add("js-stroke-path");
// 		strokePath.removeAttribute("fill");
// 		strokePath.setAttribute("stroke", "#F9F4E6"); // 🔴 временно ярко-красный для проверки
// 		strokePath.setAttribute("stroke-width", "3");
// 		svg.appendChild(strokePath);

// 		// Длина пути
// 		const length = strokePath.getTotalLength();

// 		// Начальные параметры
// 		strokePath.setAttribute("stroke-dasharray", length);
// 		strokePath.setAttribute("stroke-dashoffset", length);

// 		// Анимация прорисовки
// 		gsap.to(strokePath, {
// 			attr: { "stroke-dashoffset": 0 },
// 			ease: "none",
// 			scrollTrigger: {
// 				trigger: section,
// 				start: "top bottom",
// 				end: "bottom top",
// 				scrub: true,
// 				// markers: true, // включи для отладки
// 			}
// 		});
// 	});
// }
// // 2. Анимация появления контента внутри секций
// function initSectionAnimations() {
// 	document.querySelectorAll('.section-about').forEach(section => {
// 		const content = section.querySelectorAll('.section-about__header, .section-about__slider');

// 		// Начальное состояние
// 		gsap.set(content, { opacity: 0, y: 40 });

// 		// Анимация появления (после 40% линии)
// 		gsap.to(content, {
// 			opacity: 1,
// 			y: 0,
// 			duration: 1,
// 			scrollTrigger: {
// 				trigger: section,
// 				// start: "top 90%",
// 				start: "top 40%",   // появление с задержкой относительно линии
// 				toggleActions: "play play none reverse"
// 				// toggleActions: "play reverse play reverse "
// 				// toggleActions: "play complete complete complete",
// 				// toggleClass: "card-animate",
// 			}
// 		});
// 	});
// }



//! draft

// .section-about animations
// Регистрируем плагин ScrollTrigger



// // Инициализация всех функций
// function initSectionAboutFunctionality() {
// 	// Ждем загрузки DOM
// 	document.addEventListener('DOMContentLoaded', () => {
// 		// Небольшая задержка для корректной работы с другими скриптами
// 		setTimeout(() => {
// 			initActiveNavigation();
// 			initSectionAnimations();
// 			initSVGLineAnimations(); // Или initSVGAlternativeAnimation() для альтернативного эффекта
// 		}, 100);
// 	});
// }

// // Запускаем инициализацию
// initSectionAboutFunctionality();


// Дополнительная функция для обновления ScrollTrigger при изменении размера окна
// window.addEventListener('resize', () => {
// 	ScrollTrigger.refresh();
// });

// Экспорт функций для возможного использования в других модулях
// if (typeof module !== 'undefined' && module.exports) {
// 	module.exports = {
// 		initActiveNavigation,
// 		initSectionAnimations,
// 		initSVGLineAnimations,
// 		// initSVGAlternativeAnimation
// 	};
// }



// !!
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
// const lenis = new Lenis({
// 	duration: 0.2,        // меньшее время анимации → быстрее отклик
// 	lerp: 0.3,           // чуть больше интерполяции → меньше "вязкости"
// 	smooth: true,
// 	smoothTouch: false,
// 	direction: 'vertical',
// 	gestureDirection: 'vertical',
// 	wheelMultiplier: 1.3, // множитель скорости колёсика
// 	touchMultiplier: 1.5, // множитель скорости свайпа
// 	normalizeWheel: true  // нормализация колеса мыши
// })

// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time) => {
// 	lenis.raf(time * 1000)
// })

// gsap.ticker.lagSmoothing(0)
//! test2
// const lenis = new Lenis({
// 	duration: 300,   // длительность прокрутки (чем меньше, тем быстрее)
// 	easing: (t) => t, // функция сглаживания (по умолчанию easeOutExpo)
// 	lerp: 0.1,      // интерполяция (0.0–1.0), меньше = более "реально"
// 	smooth: true,    // включает плавность
// 	smoothTouch: true // отключить "тормоза" на тач-устройствах
// })

// // requestAnimationFrame(raf)
// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time) => {
// 	lenis.raf(time * 1000) // gsap time в секундах, lenis ждёт миллисекунды
// })

// gsap.ticker.lagSmoothing(0) // отключает авто-паузу GSAP при лагах




//! test3
// gsap.registerPlugin(ScrollTrigger)

// const splitTypes = document.querySelectorAll('.reveal-type, .title-display')

// splitTypes.forEach((char) => {
// 	const bg = char.dataset.bgColor
// 	const fg = char.dataset.fgColor

// 	const text = new SplitType(char, { types: 'chars' })

// 	gsap.fromTo(
// 		text.chars,
// 		{ color: bg },
// 		{
// 			color: fg,
// 			duration: 0.3,
// 			stagger: 0.02,
// 			scrollTrigger: {
// 				trigger: char,
// 				start: 'top 80%',
// 				end: 'top 20%',
// 				scrub: 0.5, // 👈 вместо true
// 				markers: false
// 			}
// 		}
// 	)
// })

// // Lenis конфиг под нативный скролл
// const lenis = new Lenis({
// 	duration: 0,
// 	lerp: 1,
// 	// duration: 0.2,
// 	// lerp: 0.4,
// 	smooth: true,
// 	smoothTouch: false,
// 	normalizeWheel: true
// })

// lenis.on('scroll', ScrollTrigger.update)

// gsap.ticker.add((time) => {
// 	lenis.raf(time * 1000)
// })

// gsap.ticker.lagSmoothing(0)