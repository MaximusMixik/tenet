function mediaAction() {
	const blocks = document.querySelectorAll('.media-block');
	const popup = document.querySelector('.media-popup');
	if (!blocks.length || !popup) return;

	// Initialize popup actions only once
	initPopupActions(popup);

	// Initialize each block separately
	blocks.forEach(block => {
		initBlock(block, popup);
	});
}

function initBlock(block, popup) {
	const button = block.querySelector('.media-block__action');
	const imagesList = block.querySelectorAll('.media-block__image img');
	if (!button || !imagesList.length) return;

	// Open popup when action button is clicked
	button.addEventListener('click', () => {
		openPopupWithImages(popup, imagesList, 0);
	});

	// Click on any image to open popup
	imagesList.forEach((img, index) => {
		img.parentElement.addEventListener('click', () => {
			openPopupWithImages(popup, imagesList, index);
		});
	});
}

function openPopupWithImages(popup, imagesList, startIndex) {
	// Store reference to current image list and index
	popup.currentImagesList = Array.from(imagesList);
	popup.currentImageIndex = startIndex;

	// Update popup with the selected image
	updatePopupImage(popup);

	// Open the popup
	togglePopup(true);
}

function togglePopup(isOpen = null) {
	if (isOpen === null) {
		document.body.classList.toggle('open-media-popup');
	} else if (isOpen) {
		document.body.classList.add('open-media-popup');
	} else {
		document.body.classList.remove('open-media-popup');
		resetZoom();
	}
}

function resetZoom() {
	const popup = document.querySelector('.media-popup');
	if (!popup) return;

	const popupImage = popup.querySelector('.media-popup__image');
	const miniMap = popup.querySelector('.media-popup__mini-map');

	if (popupImage) {
		popupImage.classList.remove('zoomed');

		// Reset transform
		const img = popupImage.querySelector('img');
		if (img) {
			img.style.transform = 'translate(-50%, -50%)';
			img.style.width = '100%';
			img.style.height = '100%';
			img.style.maxWidth = 'none';
			img.style.maxHeight = 'none';
			img.style.cursor = 'pointer';
		}
	}

	if (miniMap) {
		miniMap.style.display = 'none';
	}

	// Reset mini map position
	const miniMapViewer = popup.querySelector('.mini-map__position');
	if (miniMapViewer) {
		miniMapViewer.style.top = '30%';
		miniMapViewer.style.left = '20%';
	}

	// Reset scale button
	const scaleButton = popup.querySelector('.media-popup__scale');
	if (scaleButton) {
		scaleButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M17.5 28.3a10.8 10.8 0 1 1 0-21.7 10.8 10.8 0 0 1 0 21.7Zm17 3.9-5.9-6a14.2 14.2 0 1 0-2.4 2.4l7 7 1.1 1h2.4v-2.3l-2.2-2.1Z"
          fill="#002F34" />
        <path fill="#002F34" d="M16.3 12.4h2.5v10h-2.5z" />
        <path fill="#002F34" d="M22.5 16.2v2.5h-10v-2.5z" />
      </svg>
    `;
	}
}

function updatePopupImage(popup) {
	if (!popup || !popup.currentImagesList || popup.currentImageIndex === undefined) return;

	const popupImageContainer = popup.querySelector('.media-popup__image');
	const miniMapImageContainer = popup.querySelector('.mini-map__image');

	if (!popupImageContainer || !miniMapImageContainer) return;

	// Get current image
	const currentImage = popup.currentImagesList[popup.currentImageIndex];
	if (!currentImage) return;

	// Clear previous images
	popupImageContainer.innerHTML = '';
	miniMapImageContainer.innerHTML = '';

	// Clone the selected image
	const imageClone = currentImage.cloneNode(true);
	const miniMapImageClone = currentImage.cloneNode(true);

	// Add images to containers
	popupImageContainer.appendChild(imageClone);
	miniMapImageContainer.appendChild(miniMapImageClone);

	// Reset zoom state
	resetZoom();

	// Update navigation buttons visibility
	updateNavigationVisibility(popup);
}

function updateNavigationVisibility(popup) {
	const prevButton = popup.querySelector('.navigation-popup-media__button--prev');
	const nextButton = popup.querySelector('.navigation-popup-media__button--next');

	if (!prevButton || !nextButton) return;

	// Show navigation only if there are multiple images
	const hasMultipleImages = popup.currentImagesList && popup.currentImagesList.length > 1;

	prevButton.style.display = hasMultipleImages ? 'block' : 'none';
	nextButton.style.display = hasMultipleImages ? 'block' : 'none';
}

function initPopupActions(popup) {
	const popupContent = popup.querySelector('.media-popup__content');
	const imageContainer = popup.querySelector('.media-popup__image');
	const miniMap = popup.querySelector('.media-popup__mini-map');
	const miniMapViewer = popup.querySelector('.mini-map__position');
	const closeButton = popup.querySelector('.media-popup__close');
	const scaleButton = popup.querySelector('.media-popup__scale');
	const prevButton = popup.querySelector('.navigation-popup-media__button--prev');
	const nextButton = popup.querySelector('.navigation-popup-media__button--next');

	if (!closeButton || !imageContainer || !miniMap || !scaleButton || !prevButton || !nextButton) return;

	// Initially hide mini map
	miniMap.style.display = 'none';

	// Close popup
	closeButton.addEventListener('click', () => {
		togglePopup(false);
	});

	// Handle zoom toggle
	scaleButton.addEventListener('click', () => {
		if (!imageContainer.classList.contains('zoomed')) {
			// Zoom in
			imageContainer.classList.add('zoomed');
			miniMap.style.display = 'block';

			// Change scale button to zoom out
			scaleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M17.5 28.3a10.8 10.8 0 1 1 0-21.7 10.8 10.8 0 0 1 0 21.7Zm17 3.9-5.9-6a14.2 14.2 0 1 0-2.4 2.4l7 7 1.1 1h2.4v-2.3l-2.2-2.1Z"
            fill="#002F34" />
          <path fill="#002F34" d="M22.5 16.2v2.5h-10v-2.5z" />
        </svg>
      `;

			// Apply zoom
			const img = imageContainer.querySelector('img');
			if (img) {
				img.style.width = '200%';
				img.style.height = '200%';
				img.style.maxWidth = 'none';
				img.style.maxHeight = 'none';
				img.style.cursor = 'grab';
			}

			// Update mini-map position to match initial zoom position
			updateMiniMapPosition(-50, -50, miniMapViewer);
		} else {
			// Zoom out
			resetZoom();
		}
	});

	// Image dragging variables
	let isDragging = false;
	let dragStartX = 0;
	let dragStartY = 0;
	let currentTransformX = -50;
	let currentTransformY = -50;

	// Slow down factor for dragging (higher value = slower movement)
	const dragSlowFactor = 3;

	// Handle image dragging
	imageContainer.addEventListener('mousedown', (e) => {
		if (!imageContainer.classList.contains('zoomed')) return;

		const img = imageContainer.querySelector('img');
		if (!img) return;

		isDragging = true;
		dragStartX = e.clientX;
		dragStartY = e.clientY;

		// Get current transform values
		const transform = img.style.transform;
		const matches = transform.match(/translate\((-?\d+\.?\d*)%, (-?\d+\.?\d*)%\)/);

		if (matches) {
			currentTransformX = parseFloat(matches[1]);
			currentTransformY = parseFloat(matches[2]);
		} else {
			currentTransformX = -50;
			currentTransformY = -50;
		}

		// Change cursor style
		img.style.cursor = 'grabbing';
		e.preventDefault();
	});

	// Handle dragging motion
	window.addEventListener('mousemove', (e) => {
		if (!isDragging) return;

		const img = imageContainer.querySelector('img');
		if (!img) return;

		// Calculate movement based on container dimensions
		const containerRect = popupContent.getBoundingClientRect();

		// Apply slow down factor to make dragging more controlled
		const deltaX = (e.clientX - dragStartX) / containerRect.width * (200 / dragSlowFactor);
		const deltaY = (e.clientY - dragStartY) / containerRect.height * (200 / dragSlowFactor);

		// Calculate new transform values with boundaries
		// Adjusted boundaries to provide better control of the image
		// Allow 20% overflow in each direction to see the image edges
		const newTransformX = Math.min(Math.max(currentTransformX + deltaX, -80), -20);
		const newTransformY = Math.min(Math.max(currentTransformY + deltaY, -80), -20);

		// Apply new transform
		img.style.transform = `translate(${newTransformX}%, ${newTransformY}%)`;

		// Update mini-map position
		updateMiniMapPosition(newTransformX, newTransformY, miniMapViewer);
	});

	// End dragging
	window.addEventListener('mouseup', () => {
		if (!isDragging) return;

		isDragging = false;

		// Reset cursor
		const img = imageContainer.querySelector('img');
		if (img && imageContainer.classList.contains('zoomed')) {
			img.style.cursor = 'grab';
		}
	});

	// Navigation buttons
	prevButton.addEventListener('click', () => {
		if (!popup.currentImagesList || popup.currentImagesList.length <= 1) return;

		popup.currentImageIndex = (popup.currentImageIndex - 1 + popup.currentImagesList.length) % popup.currentImagesList.length;
		updatePopupImage(popup);
	});

	nextButton.addEventListener('click', () => {
		if (!popup.currentImagesList || popup.currentImagesList.length <= 1) return;

		popup.currentImageIndex = (popup.currentImageIndex + 1) % popup.currentImagesList.length;
		updatePopupImage(popup);
	});

	// Add click handling on mini-map for direct position navigation
	miniMap.addEventListener('click', (e) => {
		if (!imageContainer.classList.contains('zoomed')) return;

		const img = imageContainer.querySelector('img');
		if (!img) return;

		const miniMapRect = miniMap.getBoundingClientRect();

		// Calculate click position relative to mini-map (0 to 1)
		const clickX = (e.clientX - miniMapRect.left) / miniMapRect.width;
		const clickY = (e.clientY - miniMapRect.top) / miniMapRect.height;

		// Инвертируем направление для более интуитивной навигации
		// Map from [0, 1] to [-20, -80] (инвертировано)
		const newTransformX = -20 - clickX * 60;
		const newTransformY = -20 - clickY * 60;

		// Apply position to main image
		img.style.transform = `translate(${newTransformX}%, ${newTransformY}%)`;

		// Update mini-map UI
		updateMiniMapPosition(newTransformX, newTransformY, miniMapViewer);
	});
}

function updateMiniMapPosition(transformX, transformY, miniMapViewer) {
	// Инвертируем направление: когда изображение движется влево, 
	// рамка на мини-карте должна двигаться вправо и наоборот

	// Преобразуем координаты основного изображения [-80, -20] в нормализованные [0, 1]
	// Инвертируем шкалу для правильного отображения положения
	const normalizedX = (-transformX - 20) / 60;
	const normalizedY = (-transformY - 20) / 60;

	// Рассчитываем границы для рамки мини-карты
	const miniMapWidth = miniMapViewer.parentElement.offsetWidth;
	const miniMapHeight = miniMapViewer.parentElement.offsetHeight;
	const viewerWidth = miniMapViewer.offsetWidth;
	const viewerHeight = miniMapViewer.offsetHeight;

	// Вычисляем максимальные значения в процентах для удержания рамки внутри мини-карты
	const maxX = 100 - (viewerWidth / miniMapWidth * 100);
	const maxY = 100 - (viewerHeight / miniMapHeight * 100);

	// Применяем процентное положение с ограничением границ
	const positionX = Math.max(0, Math.min(maxX, normalizedX * maxX));
	const positionY = Math.max(0, Math.min(maxY, normalizedY * maxY));

	// Устанавливаем положение рамки на мини-карте
	miniMapViewer.style.left = `${positionX}%`;
	miniMapViewer.style.top = `${positionY}%`;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', mediaAction);
} else {
	mediaAction();
}