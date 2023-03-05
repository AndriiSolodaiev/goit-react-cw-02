import { Component } from 'react';
import Button from './Button/Button';
import { fetchTrendingMoviesPerDay } from '../moviesApi';
import MoviesGallery from './MoviesGallery/MoviesList';
import Loader from './Loader';
import Modal from './Modal/Modal';

class App extends Component {
  state = {
    isListShow: false,
    movies: [],
    page: 1,
    isLoading: false,
    currentImage: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { isListShow } = this.state;
    if (
      (prevState.isListShow !== isListShow && isListShow) ||
      (prevState.page !== this.state.page && isListShow)
    ) {
      this.getMovies();
    }
    if (prevState.isListShow !== isListShow && !isListShow) {
      this.setState({ movies: [], page: 1 });
    }
  }

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchTrendingMoviesPerDay(this.state.page)
      .then(data =>
        this.setState(prevState => ({
          movies: [...prevState.movies, ...data],
        }))
      )
      .catch(err => console.log(err))
      .finally(() => this.setState({ isLoading: false }));
  };

  showList = () => {
    this.setState(prevState => ({ isListShow: !prevState.isListShow }));
  };
  deleteMovie = id => {
    this.setState(prevState => ({
      movies: prevState.movies.filter(movie => movie.id !== id),
    }));
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  openModal = image => {
    this.setState({ currentImage: image });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  render() {
    return (
      <div>
        {this.state.currentImage && (
          <Modal
            currentImage={this.state.currentImage}
            closeModal={this.closeModal}
          />
        )}
        <Button
          clickHendler={this.showList}
          text={this.state.isListShow ? 'Hide movies list' : 'Show movies list'}
        />
        {this.state.movies.length > 0 && (
          <>
            <MoviesGallery
              movies={this.state.movies}
              deleteMovie={this.deleteMovie}
              openModal={this.openModal}
            />
            <Button text="Load more" clickHendler={this.loadMore} />
          </>
        )}

        {this.state.isLoading && <Loader />}
      </div>
    );
  }
}

export default App;
