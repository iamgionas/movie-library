import 'core-js/stable';

import * as model from './model.js';
import moviesView from './views/moviesView.js';

const controlNowMovies = async function () {
  try {
    // 1) Loading now moves
    await model.loadNowMovies();
    console.log('loadMovies', model.state.search.results);

    // 2) Rendering recipe
    moviesView.render(model.state.search.results);
  } catch (err) {
    //recipeView.renderError();
  }
};

const init = function () {
  controlNowMovies();
};

init();
