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
      window.history.pushState('', '', '/');
    });
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  closeMovie() {}

  _generateMarkup() {
    console.log(this._data);
    return `
      <div class="popup">
        <div class="popup__content"><h1>${this._data.title}</h1></div>
      </div>
    `;
  }
}

export default new MovieView();
