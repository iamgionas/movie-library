import View from './View';

class MovieView extends View {
  _parentElement = document.querySelector('body');

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, handler)
    );
    //window.addEventListener('hashchange', showRecipe);
    //window.addEventListener('load', showRecipe);
  }

  addHandlerCloseMovie(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const movie = e.target.closest('.popup');
      if (!movie) return;
      movie.remove();
      window.location = '#';
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  closeMovie() {}

  _generateMarkup() {
    console.log(this._data.id);
    return `
      <div class="popup" id="${this._data.id}">
        <div class="popup__content"></div>
      </div>
    `;
  }
}

export default new MovieView();
