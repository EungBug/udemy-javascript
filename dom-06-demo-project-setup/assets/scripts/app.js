const startAddMovieBtn = document.querySelector('header button');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addModal.querySelector('.btn--passive');
const confrimAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const deleteModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovieHandler = movieId => {
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  movies.splice(movieIndex, 1);

  // 목록 요소에서 제거
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  closeMovieDeleteModal();
};

const closeMovieDeleteModal = () => {
  toggleBackdrop();
  deleteModal.classList.remove('visible');
};

const startDeleteMovieHandler = movieId => {
  toggleBackdrop();
  deleteModal.classList.add('visible');
  const cancelDeletionBtn = deleteModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteModal.querySelector('.btn--danger');
  // 기존 요소를 복제하여 새로운 참조를 하도록 함
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteModal.querySelector('.btn--danger');
  // 기존에 등록된 리스너 제거
  cancelDeletionBtn.removeEventListener('click', closeMovieDeleteModal);
  cancelDeletionBtn.addEventListener('click', closeMovieDeleteModal);
  confirmDeletionBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieEl = document.createElement('li');
  newMovieEl.className = 'movie-element';
  newMovieEl.innerHTML = `
      <div class='movie-element__image'>
        <img src='${imageUrl}' alt='${title}'/>
      </div>
      <div class='movie-element__info'>
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
      </div>
  `;
  newMovieEl.addEventListener('click', startDeleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieEl);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const closeMovieModal = () => {
  addModal.classList.remove('visible');
};

const showMovieModal = () => {
  addModal.classList.add('visible');
  toggleBackdrop();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeleteModal();
  clearMovieInputs();
};

const cancelAddMovieClickHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
};

const clearMovieInputs = () => {
  for (const input of userInputs) {
    input.value = '';
  }
};

const addMovieClickHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    Number(ratingValue) < 1 ||
    Number(ratingValue) > 5
  ) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue
  };

  movies.push(newMovie);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieClickHandler);
confrimAddMovieBtn.addEventListener('click', addMovieClickHandler);
