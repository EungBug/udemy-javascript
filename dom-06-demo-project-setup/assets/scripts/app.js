const startAddMovieBtn = document.querySelector('header button');
const addModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addModal.querySelector('.btn--passive');
const confrimAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addModal.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');

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
  newMovieEl.addEventListener('click', deleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMovieEl);
};

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
  clearMovieInputs();
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
  console.log(movies);
  toggleMovieModal();
  clearMovieInputs();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieClickHandler);
confrimAddMovieBtn.addEventListener('click', addMovieClickHandler);
