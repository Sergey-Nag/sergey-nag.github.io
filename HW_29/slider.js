class Slider {
  constructor({
    container,
    slides
  }) {
    this.container = container;
    this.slides = slides;

    this.elements = {};
    this.activeSlide = 0;

    this.init();
  }

  init() {
    this._createElements();
  }

  _createElements() {    
    const elems = this.slides.map(this._returnSlideElement);
    
    const btnPrev = this._createButtonWithEvent('btn prev');
    const btnNext = this._createButtonWithEvent('btn next');
    
    this.container.append(...elems);
    console.log(this.container.offsetParent)
    this.container.closest('.slider').prepend(btnPrev);
    this.container.closest('.slider').append(btnNext);
  }

  _createButtonWithEvent(className, callback) {
    const btn = document.createElement('button');
    btn.className = className;
    btn.addEventListener('click', callback);
    return btn;
  }

  _returnSlideElement(slide) {
    const elem = document.createElement('div');
    elem.className = 'slider__slide';
    elem.style.backgroundImage = `url(${slide.imgUrl})`;

    elem.innerHTML = `<h2 class="slide__title">${slide.heading}</h2>
      <p class="slide__desc">${slide.description}</p>`

    return elem;
  }

  updateElementsInfo() {
    this.elements = this.sliderDom.getInfoFromElements();
  }

  next() {
    this.setSlide(++this.activeSlide);
  }

  prev() {
    this.setSlide(--this.activeSlide);
  }

  setSlide(index) {
    index =
      index < 0 ?
      0 :
      index >= this.elements.length ?
      this.elements.length - 1 :
      index;

    const shift = this.elements[index].position;

    this.activeSlide = index;
    this.sliderDom.moveElements(-shift);
  }
}
