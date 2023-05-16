const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = () => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('li');
    let text = movie.info.title + ' - ';
    // For in 반복문을 통해 사용자 지정 Key 프로퍼티에 접근할 수 있다.
    for (const key in movie.info) {
      if (key !== 'title') {
        text = text + `${key}: ${movie.info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (title.trim() === '' || extraName.trim() === '' || extraValue.trim() === '') {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue
    },
    id: Math.random()
  };

  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();
};

addMovieBtn.addEventListener('click', addMovieHandler);
