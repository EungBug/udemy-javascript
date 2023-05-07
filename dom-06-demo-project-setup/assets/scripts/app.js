const startAddMovieBtn = document.querySelector('header button');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addModal.querySelector('.btn--passive');

const toggleMovieModal = () => {
  addModal.classList.toggle('visible');
  toggleBackdrop();
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const cancelAddMovieClickHandler = () => {
  toggleMovieModal();
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieClickHandler);
