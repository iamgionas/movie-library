import View from './View';

class MovieView extends View {
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach((event) =>
      window.addEventListener(event, handler)
    );
    //window.addEventListener('hashchange', showRecipe);
    //window.addEventListener('load', showRecipe);
  }
}

export default new MovieView();
