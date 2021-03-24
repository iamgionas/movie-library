import View from './View.js';

class MoviesView extends View {
  _parentElement = document.querySelector('.movies');

  addHandlerOpenMovie() {
    this._parentElement.addEventListener('click', function (e) {
      const movie = e.target.closest('.movie');
      if (!movie) return;

      const { movieId } = movie.dataset;
      window.location = `#${movieId}`;
    });
  }

  _generateMarkup() {
    return `
      <div class="movies__title">${this._data.query}</div>
      <div class="movies__list">${this._data.results
        .map(this._generateMarkupMovie)
        .join('')}</div>
    `;
  }

  _generateMarkupMovie(movie) {
    return `
      <div class="movie" data-movie-id="${movie.id}">
        <img class="movie__poster" src="https://image.tmdb.org/t/p/w400${
          movie.poster
        }">
        <div class="movie__info">
          <h2 class="movie__title">${movie.title}</h2>
          <div class="movie__vote"><i class="fas fa-star movie__vote__icon"></i>${
            movie.vote
          }</div>
          <!-- <div class="movie__date">${new Date(
            movie.date
          ).getFullYear()}</div>-->
        </div>
      </div>
    `;
  }
}

export default new MoviesView();
