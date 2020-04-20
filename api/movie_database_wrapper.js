import { Buffer } from 'buffer';
import http from 'http';
import url from 'url';
import querystring from 'querystring';

const api_key = process.env.MOVIE_DB_API_KEY;

const searchCache = new Map();
const movieDetailsCache = new Map();

const httpGet = url => new Promise(resolve => {
  http.get(url, res => {
    let buf = Buffer.alloc(0);
    res.on('data', d => {
      buf = Buffer.concat([buf, d]);
    });
    res.on('end', () => {
      resolve(buf);
    });
  });
});

const getPopularMovies = () => {
  const q = querystring.stringify({ api_key });
  const url = `http://api.themoviedb.org/3/movie/popular?${q}`;
  return httpGet(url);
};

const searchMovie = async query => {
  if (!searchCache.has(query)) {
    const q = querystring.stringify({ api_key, query });
    const url = `http://api.themoviedb.org/3/search/movie?${q}`;
    const res = await httpGet(url);
    searchCache.set(query, res);
  }
  return searchCache.get(query);
};

const getMovieDetails = async movieId => {
  if (!movieDetailsCache.has(movieId)) {
    const q = querystring.stringify({ api_key });
    const url = `http://api.themoviedb.org/3/movie/${movieId}?${q}`;
    const res = await httpGet(url);
    movieDetailsCache.set(movieId, res);
  }
  return movieDetailsCache.get(movieId);
};

http.createServer(async (req, res) => {
  const validUrl = req.url === '/popular' ||
    req.url.startsWith('/search') ||
    req.url.startsWith('/movie/');
  if (!validUrl) {
    res.writeHead(404);
    return res.end();
  }
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/popular') {
    const popularMovies = await getPopularMovies();
    return res.end(popularMovies);
  }
  if (req.url.startsWith('/search')) {
    const { query } = url.parse(req.url, true);
    const searchResult = await searchMovie(query.q);
    return res.end(searchResult);
  }
  if (req.url.startsWith('/movie/')) {
    const movieId = req.url.split('/').pop();
    const movieDetails = await getMovieDetails(movieId);
    return res.end(movieDetails);
  }
}).listen(80);
