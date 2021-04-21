import View from './View.js';
import imageUrl from "url:../../img/not_image.png";

class MoviesView extends View {
  _parentElement = document.querySelector('.movies');

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
      <a class="movie" href="#${movie.id}">
        <img class="movie__poster" src="${movie.poster ? `https://image.tmdb.org/t/p/w400${movie.poster}` : imageUrl}">
        <div class="movie__vote"><i class="fas fa-star movie__vote__icon"></i>${movie.vote.toFixed(
          1
        )}</div>
        <div class="movie__info">
          <h2 class="movie__title">${movie.title}</h2>
          <div class="movie__date">${new Date(movie.date).getFullYear()}</div>
        </div>
      </a>
    `;
  }
}

export default new MoviesView();
