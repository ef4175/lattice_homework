import React from 'react';

const MovieListEntry = props => {
  return (
    <tr onClick={props.handleClick}>
      <td><img src={props.imagePath} alt="Movie Poster" /></td>
      <td>{props.title}</td>
    </tr>
  );
};

export default MovieListEntry;
