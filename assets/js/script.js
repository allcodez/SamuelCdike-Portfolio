const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list .ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list .ul li a');
const header = document.querySelector('.header.container');
const bg = document.querySelector('.banner')
const logo = document.querySelector('.logo')
const scrollnav = document.querySelector(".header")

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
	// bg.style.background = "green";

});


/**
 * dark & light theme toggle
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }


const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

	elemToggleFunc(themeToggleBtn);

	if (themeToggleBtn.classList.contains("active")) {
		document.body.classList.remove("light_theme");
		document.body.classList.add("dark_theme");

		localStorage.setItem("theme", "dark_theme");
	} else {
		document.body.classList.add("light_theme");
		document.body.classList.remove("dark_theme");

		localStorage.setItem("theme", "light_theme");
	}

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "dark_theme") {
	themeToggleBtn.classList.add("active");
	document.body.classList.remove("light_theme");
	document.body.classList.add("dark_theme");
} else {
	themeToggleBtn.classList.remove("active");
	document.body.classList.remove("dark_theme");
	document.body.classList.add("light_theme");
}

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
	for (let i = 0; i < revealElements.length; i++) {
		const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2;

		if (elementIsInScreen) {
			revealElements[i].classList.add("revealed");
		} else {
			revealElements[i].classList.remove("revealed");
		}
	}
}

window.addEventListener("scroll", scrollReveal);

scrollReveal();

//------------------------------------------------------

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 50) {
		header.style.backgroundColor = 'var(--bg-secondary)';
		header.style["boxShadow"] = '#80808078 2px 2px 5px';
		// header.style["backdropFilter"] = '#ffffff9c blur(7px)';
	} else {
		header.style.backgroundColor = 'transparent';
		header.style["boxShadow"] = 'none';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});


const [navTogglers, navLinks, navbar, overlay] = [
	document.querySelectorAll("[data-nav-toggler]"),
	document.querySelectorAll("[data-nav-link]"),
	document.querySelector("[data-navbar]"),
	document.querySelector("[data-overlay]")
];

const toggleNav = function () {
	navbar.classList.toggle("active");
	overlay.classList.toggle("active");
	document.body.classList.toggle("active");
}

// addEventOnElements(navTogglers, "click", toggleNav);

const closeNav = function () {
	navbar.classList.remove("active");
	overlay.classList.remove("active");
	document.body.classList.remove("active");
}

// addEventOnElements(navLinks, "click", closeNav);



/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const initSlider = function (currentSlider) {

	const sliderContainer = currentSlider.querySelector("[data-slider-container]");
	const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
	const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

	let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
	let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

	let currentSlidePos = 0;

	const moveSliderItem = function () {
		sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
	}

	/**
	 * NEXT SLIDE
	 */
	const slideNext = function () {
		const slideEnd = currentSlidePos >= totalSlidableItems;

		if (slideEnd) {
			currentSlidePos = 0;
		} else {
			currentSlidePos++;
		}

		moveSliderItem();
	}

	sliderNextBtn.addEventListener("click", slideNext);

	/**
	 * PREVIOUS SLIDE
	 */
	const slidePrev = function () {
		if (currentSlidePos <= 0) {
			currentSlidePos = totalSlidableItems;
		} else {
			currentSlidePos--;
		}

		moveSliderItem();
	}

	sliderPrevBtn.addEventListener("click", slidePrev);

	const dontHaveExtraItem = totalSlidableItems <= 0;
	if (dontHaveExtraItem) {
		sliderNextBtn.style.display = 'none';
		sliderPrevBtn.style.display = 'none';
	}

	/**
	 * slide with [shift + mouse wheel]
	 */

	currentSlider.addEventListener("wheel", function (event) {
		if (event.shiftKey && event.deltaY > 0) slideNext();
		if (event.shiftKey && event.deltaY < 0) slidePrev();
	});

	/**
	 * RESPONSIVE
	 */

	window.addEventListener("resize", function () {
		totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
		totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

		moveSliderItem();
	});

}

for (let i = 0, len = sliders.length; i < len; i++) { initSlider(sliders[i]); }


'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
// sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
	modalContainer.classList.toggle("active");
	overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

	testimonialsItem[i].addEventListener("click", function () {

		modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
		modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
		modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
		modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

		testimonialsModalFunc();

	});

}


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {

		let selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);

	});
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

	for (let i = 0; i < filterItems.length; i++) {

		if (selectedValue === "all products") {
			filterItems[i].classList.add("active");
		} else if (selectedValue === filterItems[i].dataset.category) {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}

	}

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

	filterBtn[i].addEventListener("click", function () {

		let selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;

	});

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", function () {

		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}

	});
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {

		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}

	});
}

//Flip Card------------------

const card = document.querySelector(".card__inner");

card.addEventListener("click", function (e) {
	card.classList.toggle('is-flipped');
});

const card2 = document.querySelector(".card__inner2");

card2.addEventListener("click", function (e) {
	card2.classList.toggle('is-flipped2');
});



