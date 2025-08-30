function mediaAction() {
	const blocks = document.querySelectorAll('.media-block')
	const popup = document.querySelector('.media-popup')

	if (!blocks.length) return

	blocks.forEach(block => {
		initBlock(block, popup)
	})
}

function initBlock(block, popup) {
	const button = block.querySelector('.media-block__action')
	const imagesList = block.querySelectorAll('.media-block__image')


	if (!button && !imagesList.length) return
	initPopupActions(popup, imagesList)

	button.addEventListener('click', () => {
		togglePopup()
	})
}

function togglePopup() {
	document.body.classList.toggle('open-media-popup')
}


function initPopupActions(popup, imagesList) {
	const imageWrapper = popup.querySelector('.media-popup__image')
	const imageMiniMap = popup.querySelector('.mini-map__image')

	const closeButton = popup.querySelector('.media-popup__close')

	if (!closeButton && !imageWrapper && !imageMiniMap) return

	closeButton.addEventListener('click', () => {
		togglePopup()
	})
	imageWrapper.appendChild(imagesList[0].cloneNode())
}

window.onload = () => {
	mediaAction()
}