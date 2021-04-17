import View from './View';

class MovieView extends View {
  _parentElement = document.querySelector('body');
  _popup = 'popup';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, handler)
    );
    //window.addEventListener('hashchange', showRecipe);
    //window.addEventListener('load', showRecipe);
  }

  addHandlerClose(handler) {
    this._parentElement.addEventListener('click', (e) => {
      const popup =
        e.target.closest(`.${this._popup}__close`) ||
        e.target.className === this._popup;
      if (!popup) return;
      handler();
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  close() {
    let popup = document.querySelector(`.${this._popup}`);
    popup.remove();
    //this._parentElement.removeChild(this._parentElement.lastChild);
  }

  _generateMarkup() {
    return `
      <div class="popup">
        <div class="popup__content">
          <a class="popup__close"><i class="fas fa-times-circle"></i></a>
          <img class="popup__img" src="https://image.tmdb.org/t/p/w500${
            this._data.backdrop_path
          }">
          <div class="popup__info">
            <h1 class="popup__title">${this._data.title}</h1>
            <div>${new Date(this._data.release_date).getFullYear()}</div>
            <div class="popup__overview">${this._data.overview}</div>
            <div class="popup__genres">
              ${this._data.genres.map(this._generateGenresMarkup).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  _generateGenresMarkup(genre) {
    return `<div>${genre.name}</div>`;
  }
}

export default new MovieView();
