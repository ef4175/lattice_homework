export const getPopularMovies = () => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/popular`;
  return fetch(url).then(res => res.json());
};

export const searchMovies = query => {
  const u = new URLSearchParams();
  u.set('q', query);
  const url = `${process.env.REACT_APP_API_BASE_URL}/search?${u.toString()}`;
  return fetch(url).then(res => res.json());
};

export const getMovieDetails = movieId => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/movie/${movieId}`;
  return fetch(url).then(res => res.json());
};
