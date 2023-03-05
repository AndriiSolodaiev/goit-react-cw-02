import { Component } from 'react';
import { Backdrop, ModalWindow, CloseButton } from './Modal.styled';

class Modal extends Component {
  closeModalByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.closeModalByEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalByEscape);
  }
  render() {
    return (
      <Backdrop>
        <ModalWindow>
          <img
            src={
              'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' +
              this.props.currentImage.src
            }
            alt={this.props.currentImage.alt}
          />
          <CloseButton onClick={this.props.closeModal}>X</CloseButton>
        </ModalWindow>
      </Backdrop>
    );
  }
}

export default Modal;
