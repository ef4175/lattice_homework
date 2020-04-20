import React from 'react';

const MovieDetail = props => {
  return (
    <div>
      <img src={props.imagePath} alt="Movie Poster" />
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>{props.title}</td>
          </tr>
          <tr>
            <td>Overview</td>
            <td>{props.overview}</td>
          </tr>
          <tr>
            <td>Release Date</td>
            <td>{props.releaseDate}</td>
          </tr>
          <tr>
            <td>Runtime</td>
            <td>{props.runtime}</td>
          </tr>
          <tr>
            <td>NSFW</td>
            <td>{props.adult ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>Genres</td>
            <td>{props.genres.join(', ')}</td>
          </tr>
          <tr>
            <td>Original Language</td>
            <td>{props.originalLanguage}</td>
          </tr>
          <tr>
            <td>Spoken Languages</td>
            <td>{props.spokenLanguages.join(', ')}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{props.status}</td>
          </tr>
          <tr>
            <td>Revenue</td>
            <td>{props.revenue}</td>
          </tr>
          <tr>
            <td>Budget</td>
            <td>{props.budget}</td>
          </tr>
          <tr>
            <td>Production Companies</td>
            <td>{props.productionCompanies.join(', ')}</td>
          </tr>
          <tr>
            <td>Production Countries</td>
            <td>{props.productionCountries.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MovieDetail;
