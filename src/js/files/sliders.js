/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Scrollbar, Pagination } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			//autoHeight: true,
			speed: 800,

			//touchRatio: 0,
			//simulateTouch: false,
			//loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
				effect: "fade",
				fadeEffect: {
					crossFade: true
				},
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next',
			},
			/*
			// Брейкпоінти
			breakpoints: {
				640: {
					slidesPerView: 1,
					spaceBetween: 0,
					autoHeight: true,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1268: {
					slidesPerView: 4,
					spaceBetween: 30,
				},
			},
			*/
			// Події
			on: {

			}
		});
	}
	if (document.querySelector('.swiper-monetization')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.swiper-monetization', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Scrollbar, Pagination],
			// Autoplay
			observer: true,
			observeParents: true,
			// slidesPerView: 1.1,
			slidesPerView: 1.3,
			spaceBetween: 16,
			autoHeight: true,
			speed: 1400,

			// Скорость прокрутки
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,

			// Ефекти
			// effect: 'fade',
			effect: 'slide', // Можно использовать fade, cube и другие эффекты
			transitionTimingFunction: 'ease-in-out',
			// autoplay: {
			// 	delay: 4000,      // Минимальная задержка
			// 	disableOnInteraction: false, // Не останавливать при взаимодействии
			// },

			// Пагінація
			// pagination: {
			// 	el: '.swiper-advisory .navigation__pagination',
			// 	clickable: true,
			// },
			pagination: {
				// el: '.swiper-pagination',
				el: '.swiper-monetization .navigation__pagination',
				type: 'fraction', // Используем нумерацию вместо буллетов
				renderFraction: function (currentClass, totalClass) {
					return '<span class="' + currentClass + '"></span>' +
						' / ' +
						'<span class="' + totalClass + '"></span>';
				}
			},
			// Скроллбар
			scrollbar: {
				el: '.swiper-monetization .navigation__scrollbar',
				draggable: true,
			},

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.swiper-monetization .navigation__button--prev',
				nextEl: '.swiper-monetization .navigation__button--next',
			},
			// Брейкпоінти
			breakpoints: {
				550: {
					// slidesPerView: 1.4,
					slidesPerView: 3.1,
				},
				// 768: {
				// 	slidesPerView: 2.2,
				// },
				// 992: {
				// 	slidesPerView: 4,
				// },
				1268: {
					// slidesPerView: 4.8,
					slidesPerView: 5,
				},
			},
			// Події
			on: {
				// slideChange: function () {
				// 	const progressBar = document.querySelector('.navigation__progress');
				// 	const progressBarThumb = progressBar.querySelector('span')
				// 	const progress = (this.realIndex + 1) / this.slides.length; // Прогресс
				// 	progressBarThumb.style.width = `${progress * 100}%`; // Изменение ширины прогресс-бара
				// }
			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});