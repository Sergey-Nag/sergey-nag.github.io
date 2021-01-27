class sliderButtonListenners {
  constructor() {
    this.buttonsElement = {
      prev: null,
      next: null,
      serialWrapp: null,
    };
  }

  buttonsInit() {
    this.buttonsElement.next.addEventListener("click", this.next.bind(this));
    this.buttonsElement.prev.addEventListener("click", this.prev.bind(this));

    this.buttonsElement.serialWrapp = document.querySelector(
      ".slider__serial-buttons"
    );
    this.buttonsElement.serialWrapp.addEventListener(
      "click",
      this._serialButtonsDeligate.bind(this)
    );

    this._updateSerialButtonsActivity(0);
  }

  _serialButtonsDeligate(e) {
    const btn = e.target.closest(".slider__serial-btn");

    if (btn === null) return;

    const index = +btn.dataset.index;

    this.setSlide(index);
  }

  _updateSerialButtonsActivity(index) {
    const btns = document.querySelectorAll(".slider__serial-btn");

    btns.forEach((el) => el.classList.remove("active"));

    btns[index].classList.add("active");
  }
}


class Slider extends sliderButtonListenners {
  constructor({ container, slides }) {
    super();

    this.container = container;
    this.slides = slides;

    this.elements = [];
    this.activeSlide = 0;

    this.init();
  }

  init() {
    this._createElements();
    this._insertElementsIntoContainer();
    this._createSerialButtons();

    super.buttonsInit();
  }

  next() {
    this.setSlide(++this.activeSlide);
  }

  prev() {
    this.setSlide(--this.activeSlide);
  }

  setSlide(index) {
    index =
      index < 0
        ? 0
        : index >= this.elements.length
        ? this.elements.length - 1
        : index;

    const shift = this.elementsPositionArr[index];

    this.activeSlide = index;
    this.moveElements(-shift);
    this._updateSerialButtonsActivity(index);
  }

  destroy() {
    this.container.remove();
    this.buttonsElement.prev.remove();
    this.buttonsElement.next.remove();
    this.buttonsElement.serialWrapp.remove();
  }

  moveElements(pos) {
    this.container.style.transform = `translate(${pos}px)`;
  }

  _createElements() {
    this.elements = this.slides.map(this._returnSlideElement);

    this.buttonsElement.prev = this._createButtonWithEvent("btn prev");
    this.buttonsElement.next = this._createButtonWithEvent("btn next");
  }

  get elementsPositionArr() {
    return this.elements.map((el) => {
      return el.offsetLeft;
    });
  }

  _insertElementsIntoContainer() {
    const elements = this.elements;

    this.container.append(...elements);
    this.container.closest(".slider").prepend(this.buttonsElement.prev);
    this.container.closest(".slider").append(this.buttonsElement.next);
  }

  _createButtonWithEvent(className, callback) {
    const btn = document.createElement("button");
    btn.className = className;
    btn.addEventListener("click", callback);
    return btn;
  }

  _returnSlideElement(slide) {
    const elem = document.createElement("div");
    elem.className = "slider__slide";
    elem.style.backgroundImage = `url(${slide.imgUrl})`;

    elem.innerHTML = `<h2 class="slide__title">${slide.heading}</h2>
      <p class="slide__desc">${slide.description}</p>`;

    return elem;
  }

  _createSerialButtons() {
    const inputs = this.slides.map(this._returnSerialButtonHtml).join("");

    const serialButnsWrapp = document.createElement("div");
    serialButnsWrapp.className = "slider__serial-buttons";
    serialButnsWrapp.innerHTML = inputs;

    this.container.closest(".slider").append(serialButnsWrapp);
  }

  _returnSerialButtonHtml(el, i) {
    return `<div class="slider__serial-btn" data-index="${i}"></div>`;
  }
}
