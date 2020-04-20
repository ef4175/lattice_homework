import React from 'react';
import MovieDetail from './MovieDetail';
import MovieListEntry from './MovieListEntry';
import { getPopularMovies, searchMovies, getMovieDetails } from './api';

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      showError: false,
      showMovieDetail: false,
      errorMessage: '',
      movieList: null,
      movieDetail: null,
    };
    this.searchRef = React.createRef();
  }
  componentDidMount() {
    this.loadPopularMovies();
  }
  async loadPopularMovies() {
    const popularResult = await getPopularMovies();
    if (
      popularResult.status_code !== undefined &&
      popularResult.status_message !== undefined
    ) {
      this.setState({
        loaded: true,
        showError: true,
        errorMessage: popularResult.status_message,
      });
      return;
    }
    this.setState({
      movieList: popularResult.results,
      loaded: true,
    });
  }
  async handleKeyUp(e) {
    const keyedUpEnter = e.keyCode === 13;
    if (!keyedUpEnter) {
      return;
    }
    const query = this.searchRef.current.value;
    if (!query) {
      return;
    }
    const searchResult = await searchMovies(query);
    if (
      searchResult.status_code !== undefined &&
      searchResult.status_message !== undefined
    ) {
      this.setState({
        showError: true,
        errorMessage: searchResult.status_message,
      });
      return;
    }
    const newMovieList = [
      ...searchResult.results,
      ...this.state.movieList,
    ];
    this.setState({ movieList: newMovieList }, () => {
      this.searchRef.current.value = '';
    });
  }
  async handleClick(movieId) {
    const detailResult = await getMovieDetails(movieId);
    if (
      detailResult.status_code !== undefined &&
      detailResult.status_message !== undefined
    ) {
      this.setState({
        showError: true,
        errorMessage: detailResult.status_message,
      });
      return;
    }
    this.setState({ showMovieDetail: true, movieDetail: detailResult });
  }
  render() {
    if (!this.state.loaded) {
      return (
        <p>Loading</p>
      );
    }
    if (this.state.showError) {
      return (
        <p>{this.state.errorMessage}</p>
      );
    }
    if (this.state.showMovieDetail) {
      const movie = this.state.movieDetail;
      return (
        <MovieDetail
          adult={movie.adult}
          budget={movie.budget}
          genres={movie.genres.map(o => o.name)}
          originalLanguage={movie.original_language}
          overview={movie.overview}
          imagePath={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          productionCompanies={movie.production_companies.map(o => o.name)}
          productionCountries={movie.production_countries.map(o => o.name)}
          releaseDate={movie.release_date}
          revenue={movie.revenue}
          runtime={movie.runtime}
          spokenLanguages={movie.spoken_languages.map(o => o.name)}
          status={movie.status}
          title={movie.title}
        />
      );
    }
    const movieListEntries = this.state.movieList.map(movie => {
      return (
        <MovieListEntry
          key={movie.id}
          imagePath={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          title={movie.title}
          handleClick={() => this.handleClick(movie.id)}
        />
      );
    });
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          ref={this.searchRef}
          onKeyUp={this.handleKeyUp.bind(this)}
        />
        <table>
          <tbody>
            {movieListEntries}
          </tbody>
        </table>
      </div>
    );
  }
}

export default MovieList;
