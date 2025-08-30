// npm i gsap
// import "../files/gsap-animations.js";

// import "../custom/media-action.js";



window.onload = () => {
	const sectionsLists = document.querySelectorAll('.section-about__list')

	if (!sectionsLists.length) return

	sectionsLists.forEach(list => {
		const items = list.querySelectorAll('.section-about__item')
		if (items.length < 5) return
		list.classList.add('section-about__list--accent')
	});

}