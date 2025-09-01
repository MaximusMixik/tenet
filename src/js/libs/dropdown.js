export default class Dropdown {
	constructor(element) {
		this.toggler = element;

		this.toggler.addEventListener('click', () => {
			this.toggleDropdown();
		});

		document.addEventListener('click', (event) => {
			this.handleOutsideClick(event);
		});

		this.initCloseButtons();
	}

	toggleDropdown() {
		this.toggler.classList.toggle('active');
	}

	handleOutsideClick(event) {
		if (!this.toggler.contains(event.target)) {
			this.toggler.classList.remove('active');
		}
	}

	initCloseButtons() {
		const closeButtons = this.toggler.querySelectorAll('[data-js-dropdown-close]');

		closeButtons.forEach(closeBtn => {
			closeBtn.addEventListener('click', (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.closeDropdown();
			});
		});
	}

	closeDropdown() {
		this.toggler.classList.remove('active');
	}
}
