import 'core-js/stable';

import * as model from './model.js';
import moviesView from './views/moviesView.js';
import movieView from './views/movieView.js';
import searchView from './views/searchView.js';

const controlNowMovies = async function () {
  try {
    // 1) Loading now moves
    await model.loadNowMovies();

    // 2) Rendering recipe
    moviesView.render(model.state.search);
  } catch (err) {
    //recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    moviesView.render(model.state.search);

    // 4) Render initial pagination buttons
    //paginationView.render(model.state.search);
  } catch (error) {}
};

const controlMovie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2) Load search results
    await model.loadMovie(id);

    // 3) Render results
    movieView.render(model.state.movie);
  } catch (error) {}
};

const controlClose = function () {
  // 1) Remove movie from state
  model.removeMovie();

  // 2) Remove movie view
  movieView.close();

  // 3) Remove id from address
  window.history.pushState('', '', '/');
};

const init = function () {
  // Load Popular Movies
  controlNowMovies();
  // Control the search view
  searchView.addHandlerSearch(controlSearchResults);
  // Control the load of the movie
  movieView.addHandlerRender(controlMovie);
  movieView.addHandlerClose(controlClose);
};

init();
