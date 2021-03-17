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

export const getNowMovies = async function () {
  try {
    state.search.query = 'Now Movies';
    const data = await getJSON(
      `${API_URL}3/movie/now_playing?api_key=${API_KEY}&language=en-US`
    );
    console.log(data.results);

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