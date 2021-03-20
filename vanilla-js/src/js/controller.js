import 'core-js/stable';

import * as model from './model.js';
import moviesView from './views/moviesView.js';
import searchView from './views/searchView.js';

const controlNowMovies = async function () {
  try {
    // 1) Loading now moves
    await model.loadNowMovies();
    console.log('loadMovies', model.state.search.results);

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

const init = function () {
  controlNowMovies();
  searchView.addHandlerSearch(controlSearchResults);
};

init();
