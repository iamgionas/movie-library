import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadNowMovies = async function () {
  try {
    state.search.query = 'Popular Movies';
    const data = await getJSON(
      `${API_URL}3/movie/popular?api_key=${API_KEY}&language=en-US`
    );

    state.search.results = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        date: movie.release_date,
        vote: movie.vote_average,
      };
    });
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  console.log('Query', query);
  try {
    state.search.query = `Search: "${query}"`;
    const data = await getJSON(
      `${API_URL}3/search/movie?api_key=${API_KEY}&query=${query}`
    );

    state.search.results = data.results.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        date: movie.release_date,
        vote: movie.vote_average,
      };
    });
  } catch (error) {
    throw error;
  }
};
