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

	if (document.querySelector('.swiper-cases') && window.innerWidth > 640) {
		new Swiper('.swiper-cases', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 24,
			grabCursor: true,
			//autoHeight: true,
			speed: 1400,

			// Скорость прокрутки
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			lazy: true,
			effect: 'slide',
			transitionTimingFunction: 'ease-in-out',

			navigation: {
				prevEl: '.swiper-cases .navigation__button--prev',
				nextEl: '.swiper-cases .navigation__button--next',
			},
			breakpoints: {
				480: {
					slidesPerView: 1.8,
				},
				992: {
					slidesPerView: 3,
				},
			},
			// Події
			on: {}
		});
	}
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
	// if (window.innerWidth < 560) {

	// 	const colorSwipers = document.querySelectorAll('.swiper-color-section')
	// 	if (colorSwipers.length) {
	// 		colorSwipers.forEach(swiper => {
	// 			// Вказуємо склас потрібного слайдера
	// 			// Створюємо слайдер
	// 			new Swiper(swiper, { // Вказуємо склас потрібного слайдера
	// 				// Підключаємо модулі слайдера
	// 				// для конкретного випадку
	// 				modules: [Navigation, Scrollbar, Pagination],
	// 				// Autoplay
	// 				observer: true,
	// 				observeParents: true,
	// 				slidesPerView: 1.2,
	// 				spaceBetween: 16,
	// 				// autoHeight: true,
	// 				speed: 1400,

	// 				// Скорость прокрутки
	// 				//touchRatio: 0,
	// 				//simulateTouch: false,
	// 				// loop: true,
	// 				//preloadImages: false,
	// 				//lazy: true,

	// 				// Ефекти
	// 				// effect: 'fade',
	// 				effect: 'slide', // Можно использовать fade, cube и другие эффекты
	// 				transitionTimingFunction: 'ease-in-out',
	// 				// autoplay: {
	// 				// 	delay: 4000,      // Минимальная задержка
	// 				// 	disableOnInteraction: false, // Не останавливать при взаимодействии
	// 				// },

	// 				// Пагінація
	// 				// pagination: {
	// 				// 	el: '.swiper-advisory .navigation__pagination',
	// 				// 	clickable: true,
	// 				// },
	// 				pagination: {
	// 					// el: '.swiper-pagination',
	// 					el: '.swiper-color-section .navigation__pagination',
	// 					type: 'fraction', // Используем нумерацию вместо буллетов
	// 					renderFraction: function (currentClass, totalClass) {
	// 						return '<span class="' + currentClass + '"></span>' +
	// 							' / ' +
	// 							'<span class="' + totalClass + '"></span>';
	// 					}
	// 				},
	// 				// Скроллбар
	// 				scrollbar: {
	// 					el: '.swiper-color-section .navigation__scrollbar',
	// 					draggable: true,
	// 				},

	// 				// Кнопки "вліво/вправо"
	// 				navigation: {
	// 					prevEl: '.swiper-color-section .navigation__button--prev',
	// 					nextEl: '.swiper-color-section .navigation__button--next',
	// 				},
	// 				// Брейкпоінти
	// 				breakpoints: {
	// 					550: {
	// 						// slidesPerView: 1.4,
	// 						slidesPerView: 3.1,
	// 					},
	// 					// 768: {
	// 					// 	slidesPerView: 2.2,
	// 					// },
	// 					// 992: {
	// 					// 	slidesPerView: 4,
	// 					// },
	// 					1268: {
	// 						// slidesPerView: 4.8,
	// 						slidesPerView: 5,
	// 					},
	// 				},
	// 				// Події
	// 				on: {
	// 					// slideChange: function () {
	// 					// 	const progressBar = document.querySelector('.navigation__progress');
	// 					// 	const progressBarThumb = progressBar.querySelector('span')
	// 					// 	const progress = (this.realIndex + 1) / this.slides.length; // Прогресс
	// 					// 	progressBarThumb.style.width = `${progress * 100}%`; // Изменение ширины прогресс-бара
	// 					// }
	// 				}
	// 			});
	// 		});
	// 	}

	// }

	if (window.innerWidth < 640) {
		const colorSwipers = document.querySelectorAll('.swiper-color-section');

		if (colorSwipers.length) {
			colorSwipers.forEach((swiperElement, index) => {
				// Проверяем, не инициализирован ли уже этот слайдер
				if (swiperElement.swiper) {
					return; // Пропускаем уже инициализированные
				}

				// Генерируем уникальные классы для каждого слайдера
				const uniqueId = `color-swiper-${index}`;
				swiperElement.setAttribute('data-swiper-id', uniqueId);

				// Находим элементы навигации внутри текущего контейнера
				const pagination = swiperElement.querySelector('.navigation__pagination');
				const scrollbar = swiperElement.querySelector('.navigation__scrollbar');
				// const prevBtn = swiperElement.querySelector('.navigation__button--prev');
				// const nextBtn = swiperElement.querySelector('.navigation__button--next');

				// Создаем слайдер с уникальными селекторами
				new Swiper(swiperElement, {
					// Подключаем модули слайдера
					modules: [Navigation, Scrollbar, Pagination],
					// Основные настройки
					observer: true,
					observeParents: true,
					slidesPerView: 1.2,
					spaceBetween: 16,
					speed: 1400,
					effect: 'slide',
					transitionTimingFunction: 'ease-in-out',
					// autoHeight: false,

					// Пагинация (если элемент существует)
					pagination: pagination ? {
						el: pagination,
						type: 'fraction',
						renderFraction: function (currentClass, totalClass) {
							return '<span class="' + currentClass + '"></span>' +
								' / ' +
								'<span class="' + totalClass + '"></span>';
						}
					} : false,

					// Скроллбар (если элемент существует)
					scrollbar: scrollbar ? {
						el: scrollbar,
						draggable: true,
					} : false,

					// Навигация (если элементы существуют)
					// navigation: (prevBtn && nextBtn) ? {
					// 	prevEl: prevBtn,
					// 	nextEl: nextBtn,
					// } : false,

					// Брейкпоинты
					// breakpoints: {
					// 	550: {
					// 		slidesPerView: 3.1,
					// 	},
					// 	1268: {
					// 		slidesPerView: 5,
					// 	},
					// },

					// События
					on: {
						init: function () {
							console.log(`Swiper ${uniqueId} initialized`);
						},
						slideChange: function () {
							// Код при смене слайда
						}
					}
				});
			});
		}
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