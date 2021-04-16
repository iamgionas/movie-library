import 'core-js/stable';

import * as model from './model.js';
import moviesView from './views/moviesView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';

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

    // 1) Gettinsearch query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Loading search results
    await model.loadSearchMovies(query);

    // 3) Rendering results
    moviesView.render(model.state.search);

    // 4) Render initial pagination buttons
    //paginationView.render(model.state.search);
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

const init = function () {
  // Loading Popular Movies
  controlNowMovies();
  // Control the search view
  searchView.addHandlerSearch(controlSearchMovies);
  // Control the movie load
  movieView.addHandlerRender(controlOpenMovie);
  movieView.addHandlerClose(controlCloseMovie);
};

init();
