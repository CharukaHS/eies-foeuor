const carouselFn = () => {
  const slides = document.getElementsByClassName("carousel-content");

  // first of all, hide all slides, and stack them
  for (let index = 0; index < slides.length; index++) {
    const element = slides[index];
    element.classList.add("opacity-0"); // hide every slide
    element.style.zindex = slides.length - index + 1; // set z-index
  }

  const timer = 2000; // slide animation time in millisecond
  let currentIndex = 0;
  setInterval(() => {
    const currentElement = slides[currentIndex];
    const previousElement =
      currentIndex === 0 ? slides[slides.length - 1] : slides[currentIndex - 1];

    previousElement.classList.add("opacity-0");
    currentElement.classList.remove("opacity-0");

    if (currentIndex == slides.length - 1) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
  }, timer);
};

// document onready
(() => {
  carouselFn();
})();
