const MoviesGallery = ({ movies, deleteMovie, openModal }) => {
  return (
    <ul>
      {movies.map(({ title, vote_count, poster_path, id }) => (
        <li key={id}>
          <h2>{title}</h2>
          <p>Vote count {vote_count}</p>
          <button onClick={() => deleteMovie(id)}>Delete</button>
          <button onClick={() => openModal({ src: poster_path, alt: title })}>
            Show poster
          </button>
        </li>
      ))}
    </ul>
  );
};

export default MoviesGallery;
