import { API_KEY, API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  movie: {},
  search: {
    query: '',
    results: [],
    page: 1,
    totalPages: null,
    totalResults: null,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadNowMovies = async function (page = 1) {
  try {
    const data = await getJSON(
      `${API_URL}3/movie/popular?api_key=${API_KEY}&page=${page}`
    );

    state.search.query = 'Popular Movies';
    state.search.page = 1;
    state.search.totalPages = data.total_pages;
    state.search.totalResults = data.total_results;

    loadMoviesToState(data);
  } catch (error) {
    throw error;
  }
};

export const loadSearchMovies = async function (query, page = 1) {
  try {
    const data = await getJSON(
      `${API_URL}3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );

    state.search.query = query;
    state.search.page = page;
    state.search.totalPages = data.total_pages;
    state.search.totalResults = data.total_results;

    loadMoviesToState(data);
  } catch (error) {
    throw error;
  }
};

const loadMoviesToState = function (data) {
  state.search.results = data.results.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      date: movie.release_date,
      vote: movie.vote_average,
    };
  });
};

export const loadMovie = async function (id) {
  const data = await getJSON(
    `${API_URL}3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  state.movie = data;
};

export const removeMovie = function () {
  state.movie = {};
};
