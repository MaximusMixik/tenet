class MediaGallery {
	constructor(options = {}) {
		// Default selectors
		this.selectors = {
			blockSelector: '.media-block',
			popupSelector: '.media-popup',
			buttonSelector: '.media-block__action',
			imageSelector: '.media-block__image img',
			imageContainerSelector: '.media-popup__image',
			miniMapSelector: '.media-popup__mini-map',
			miniMapImageSelector: '.mini-map__image',
			miniMapViewerSelector: '.mini-map__position',
			closeButtonSelector: '.media-popup__close',
			scaleButtonSelector: '.media-popup__scale',
			prevButtonSelector: '.navigation-popup-media__button--prev',
			nextButtonSelector: '.navigation-popup-media__button--next',
			popupContentSelector: '.media-popup__content',
			...options.selectors
		};

		// Configuration
		this.config = {
			dragThreshold: 5,
			dragSlowFactor: 3,
			openClass: 'open-media-popup',
			zoomedClass: 'zoomed',
			...options.config
		};

		// State
		this.state = {
			isDragging: false,
			dragStartX: 0,
			dragStartY: 0,
			currentTransformX: -50,
			currentTransformY: -50,
			hasMoved: false,
			currentImagesList: [],
			currentImageIndex: 0
		};

		// DOM elements cache
		this.elements = {
			blocks: null,
			popup: null
		};

		// Bind methods to maintain context
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);

		// Initialize
		this.init();
	}

	init() {
		// Get main elements
		this.elements.blocks = document.querySelectorAll(this.selectors.blockSelector);
		this.elements.popup = document.querySelector(this.selectors.popupSelector);

		if (!this.elements.blocks.length || !this.elements.popup) return;

		// Initialize popup actions only once
		this.initPopupActions();

		// Initialize each block separately
		this.elements.blocks.forEach(block => this.initBlock(block));

		// Register global event listeners
		window.addEventListener('mousemove', this.handleMouseMove);
		window.addEventListener('mouseup', this.handleMouseUp);
	}

	initBlock(block) {
		const button = block.querySelector(this.selectors.buttonSelector);
		const imagesList = block.querySelectorAll(this.selectors.imageSelector);

		if (!button || !imagesList.length) return;

		// Open popup when action button is clicked
		button.addEventListener('click', () => {
			this.openPopupWithImages(Array.from(imagesList), 0);
		});

		// Click on any image to open popup
		imagesList.forEach((img, index) => {
			img.parentElement.addEventListener('click', () => {
				this.openPopupWithImages(Array.from(imagesList), index);
			});
		});
	}

	openPopupWithImages(imagesList, startIndex) {
		// Store reference to current image list and index
		this.state.currentImagesList = imagesList;
		this.state.currentImageIndex = startIndex;

		// Update popup with the selected image
		this.updatePopupImage();

		// Open the popup
		this.togglePopup(true);
	}

	togglePopup(isOpen = null) {
		if (isOpen === null) {
			document.body.classList.toggle(this.config.openClass);
		} else if (isOpen) {
			document.body.classList.add(this.config.openClass);
		} else {
			document.body.classList.remove(this.config.openClass);
			this.resetZoom();
		}
	}

	resetZoom() {
		const popupImage = this.elements.popup.querySelector(this.selectors.imageContainerSelector);
		const miniMap = this.elements.popup.querySelector(this.selectors.miniMapSelector);
		const scaleButton = this.elements.popup.querySelector(this.selectors.scaleButtonSelector);
		const miniMapViewer = this.elements.popup.querySelector(this.selectors.miniMapViewerSelector);

		if (popupImage) {
			popupImage.classList.remove(this.config.zoomedClass);

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
		if (miniMapViewer) {
			miniMapViewer.style.top = '30%';
			miniMapViewer.style.left = '20%';
		}

		// Reset scale button
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

	updatePopupImage() {
		if (!this.state.currentImagesList.length || this.state.currentImageIndex === undefined) return;

		const popupImageContainer = this.elements.popup.querySelector(this.selectors.imageContainerSelector);
		const miniMapImageContainer = this.elements.popup.querySelector(this.selectors.miniMapImageSelector);

		if (!popupImageContainer || !miniMapImageContainer) return;

		// Get current image
		const currentImage = this.state.currentImagesList[this.state.currentImageIndex];
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
		this.resetZoom();

		// Update navigation buttons visibility
		this.updateNavigationVisibility();
	}

	updateNavigationVisibility() {
		const prevButton = this.elements.popup.querySelector(this.selectors.prevButtonSelector);
		const nextButton = this.elements.popup.querySelector(this.selectors.nextButtonSelector);

		if (!prevButton || !nextButton) return;

		// Show navigation only if there are multiple images
		const hasMultipleImages = this.state.currentImagesList.length > 1;
		const displayValue = hasMultipleImages ? 'block' : 'none';

		prevButton.style.display = displayValue;
		nextButton.style.display = displayValue;
	}

	toggleZoom() {
		const imageContainer = this.elements.popup.querySelector(this.selectors.imageContainerSelector);
		const miniMap = this.elements.popup.querySelector(this.selectors.miniMapSelector);
		const scaleButton = this.elements.popup.querySelector(this.selectors.scaleButtonSelector);
		const miniMapViewer = this.elements.popup.querySelector(this.selectors.miniMapViewerSelector);

		if (!imageContainer || !miniMap || !scaleButton) return;

		if (!imageContainer.classList.contains(this.config.zoomedClass)) {
			// Zoom in
			imageContainer.classList.add(this.config.zoomedClass);
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
			if (miniMapViewer) {
				this.updateMiniMapPosition(-50, -50, miniMapViewer);
			}
		} else {
			// Zoom out
			this.resetZoom();
		}
	}

	initPopupActions() {
		const popup = this.elements.popup;
		const imageContainer = popup.querySelector(this.selectors.imageContainerSelector);
		const miniMap = popup.querySelector(this.selectors.miniMapSelector);
		const closeButton = popup.querySelector(this.selectors.closeButtonSelector);
		const scaleButton = popup.querySelector(this.selectors.scaleButtonSelector);
		const prevButton = popup.querySelector(this.selectors.prevButtonSelector);
		const nextButton = popup.querySelector(this.selectors.nextButtonSelector);

		if (!closeButton || !imageContainer || !miniMap || !scaleButton || !prevButton || !nextButton) return;

		// Initially hide mini map
		miniMap.style.display = 'none';

		// Close popup
		closeButton.addEventListener('click', () => this.togglePopup(false));

		// Handle zoom toggle via scale button
		scaleButton.addEventListener('click', () => this.toggleZoom());

		// Handle zoom toggle by clicking on the image itself when not in zoom mode
		imageContainer.addEventListener('click', (e) => {
			// Only toggle zoom if clicking directly on the image and not already in zoom mode
			if (!imageContainer.classList.contains(this.config.zoomedClass) && e.target.tagName === 'IMG') {
				this.toggleZoom();
			}
		});

		// Handle image dragging
		imageContainer.addEventListener('mousedown', (e) => {
			if (!imageContainer.classList.contains(this.config.zoomedClass) || e.target.tagName !== 'IMG') return;

			const img = e.target;
			if (!img) return;

			this.state.isDragging = true;
			this.state.hasMoved = false;
			this.state.dragStartX = e.clientX;
			this.state.dragStartY = e.clientY;

			// Get current transform values
			const transform = img.style.transform;
			const matches = transform.match(/translate\((-?\d+\.?\d*)%, (-?\d+\.?\d*)%\)/);

			if (matches) {
				this.state.currentTransformX = parseFloat(matches[1]);
				this.state.currentTransformY = parseFloat(matches[2]);
			} else {
				this.state.currentTransformX = -50;
				this.state.currentTransformY = -50;
			}

			// Change cursor style
			img.style.cursor = 'grabbing';
			e.preventDefault();
		});

		// Navigation buttons
		prevButton.addEventListener('click', () => {
			if (this.state.currentImagesList.length <= 1) return;

			this.state.currentImageIndex = (this.state.currentImageIndex - 1 + this.state.currentImagesList.length) % this.state.currentImagesList.length;
			this.updatePopupImage();
		});

		nextButton.addEventListener('click', () => {
			if (this.state.currentImagesList.length <= 1) return;

			this.state.currentImageIndex = (this.state.currentImageIndex + 1) % this.state.currentImagesList.length;
			this.updatePopupImage();
		});

		// Add click handling on mini-map for direct position navigation
		miniMap.addEventListener('click', (e) => {
			if (!imageContainer.classList.contains(this.config.zoomedClass)) return;

			const img = imageContainer.querySelector('img');
			if (!img) return;

			const miniMapRect = miniMap.getBoundingClientRect();

			// Calculate click position relative to mini-map (0 to 1)
			const clickX = (e.clientX - miniMapRect.left) / miniMapRect.width;
			const clickY = (e.clientY - miniMapRect.top) / miniMapRect.height;

			// Inverted direction for more intuitive navigation
			// Map from [0, 1] to [-20, -80] (inverted)
			const newTransformX = -20 - clickX * 60;
			const newTransformY = -20 - clickY * 60;

			// Apply position to main image
			img.style.transform = `translate(${newTransformX}%, ${newTransformY}%)`;

			// Update mini-map UI
			const miniMapViewer = popup.querySelector(this.selectors.miniMapViewerSelector);
			if (miniMapViewer) {
				this.updateMiniMapPosition(newTransformX, newTransformY, miniMapViewer);
			}
		});
	}

	handleMouseMove(e) {
		if (!this.state.isDragging) return;

		const imageContainer = this.elements.popup.querySelector(this.selectors.imageContainerSelector);
		const popupContent = this.elements.popup.querySelector(this.selectors.popupContentSelector);
		const miniMapViewer = this.elements.popup.querySelector(this.selectors.miniMapViewerSelector);

		if (!imageContainer || !popupContent) return;

		const img = imageContainer.querySelector('img');
		if (!img) return;

		// Calculate total movement to determine if this is a drag or just a click
		const totalMovement = Math.abs(e.clientX - this.state.dragStartX) + Math.abs(e.clientY - this.state.dragStartY);
		if (totalMovement > this.config.dragThreshold) {
			this.state.hasMoved = true;
		}

		// Calculate movement based on container dimensions
		const containerRect = popupContent.getBoundingClientRect();

		// Apply slow down factor to make dragging more controlled
		const deltaX = (e.clientX - this.state.dragStartX) / containerRect.width * (200 / this.config.dragSlowFactor);
		const deltaY = (e.clientY - this.state.dragStartY) / containerRect.height * (200 / this.config.dragSlowFactor);

		// Calculate new transform values with boundaries
		// Allow 20% overflow in each direction to see the image edges
		const newTransformX = Math.min(Math.max(this.state.currentTransformX + deltaX, -80), -20);
		const newTransformY = Math.min(Math.max(this.state.currentTransformY + deltaY, -80), -20);

		// Apply new transform
		img.style.transform = `translate(${newTransformX}%, ${newTransformY}%)`;

		// Update mini-map position
		if (miniMapViewer) {
			this.updateMiniMapPosition(newTransformX, newTransformY, miniMapViewer);
		}
	}

	handleMouseUp() {
		if (!this.state.isDragging) return;

		this.state.isDragging = false;

		// Reset cursor
		const imageContainer = this.elements.popup.querySelector(this.selectors.imageContainerSelector);
		if (imageContainer) {
			const img = imageContainer.querySelector('img');
			if (img && imageContainer.classList.contains(this.config.zoomedClass)) {
				img.style.cursor = 'grab';
			}
		}
	}

	updateMiniMapPosition(transformX, transformY, miniMapViewer) {
		// Invert the direction: when the image moves left,
		// the frame on the mini-map should move right and vice versa

		// Convert main image coordinates [-80, -20] to normalized [0, 1]
		// Invert the scale for correct position display
		const normalizedX = (-transformX - 20) / 60;
		const normalizedY = (-transformY - 20) / 60;

		// Calculate boundaries for the mini-map frame
		const miniMapWidth = miniMapViewer.parentElement.offsetWidth;
		const miniMapHeight = miniMapViewer.parentElement.offsetHeight;
		const viewerWidth = miniMapViewer.offsetWidth;
		const viewerHeight = miniMapViewer.offsetHeight;

		// Calculate maximum percentage values to keep the frame inside the mini-map
		const maxX = 100 - (viewerWidth / miniMapWidth * 100);
		const maxY = 100 - (viewerHeight / miniMapHeight * 100);

		// Apply percentage position with boundary constraints
		const positionX = Math.max(0, Math.min(maxX, normalizedX * maxX));
		const positionY = Math.max(0, Math.min(maxY, normalizedY * maxY));

		// Set the position of the frame on the mini-map
		miniMapViewer.style.left = `${positionX}%`;
		miniMapViewer.style.top = `${positionY}%`;
	}

	// Clean up method to remove event listeners
	destroy() {
		window.removeEventListener('mousemove', this.handleMouseMove);
		window.removeEventListener('mouseup', this.handleMouseUp);
	}
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => new MediaGallery());
} else {
	new MediaGallery();
}