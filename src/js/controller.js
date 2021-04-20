import 'core-js/stable';

import * as model from './model.js';
import moviesView from './views/moviesView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView';

const controlNowMovies = async function () {
  try {
    // 0) Rendering spinner
    moviesView.renderSpinner();

    // 1) Loading now moves
    await model.loadNowMovies();

    // 2) Rendering recipe
    moviesView.render(model.state.search);
  } catch (err) {
    //recipeView.renderError();
  }
};

const controlSearchMovies = async function () {
  try {
    // 0) Rendering spinner
    moviesView.renderSpinner();

    // 1) Getting search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Loading search results
    await model.loadSearchMovies(query);

    // 3) Rendering results
    moviesView.render(model.state.search);

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlOpenMovie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 1) Loading selected movie
    await model.loadMovie(id);

    // 3) Rendering selected movie
    movieView.render(model.state.movie);
  } catch (error) {}
};

const controlCloseMovie = function () {
  // 1) Remove movie from state
  model.removeMovie();

  // 2) Remove movie view
  movieView.close();

  // 3) Remove id from address
  window.history.pushState('', '', '/');
};

const controlPagination = async function (goToPage) {
  // 0) Rendering spinner
  moviesView.renderSpinner();
  paginationView._clear();

  // 1) Getting search query
  const query = model.state.search.query;
  if (!query) return;

  // 2) Loading search results
  await model.loadSearchMovies(query, goToPage);

  // 3) Rendering results
  moviesView.render(model.state.search);

  // 4) Render pagination buttons
  paginationView.render(model.state.search);
}

const init = function () {
  controlNowMovies();
  searchView.addHandlerSearch(controlSearchMovies);
  movieView.addHandlerRender(controlOpenMovie);
  movieView.addHandlerClose(controlCloseMovie);
  paginationView.addHandlerClick(controlPagination);
};

init();
