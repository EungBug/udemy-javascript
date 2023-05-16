const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');

const movies = [];

const renderMovies = (filter = '') => {
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = '';

  const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));
  filteredMovies.forEach(movie => {
    const movieEl = document.createElement('li');
    const { info } = movie;
    // 구조분해를 통해 얻어온 메서드를 호출할 경우 this가 달라져 정상 동작을 하지 않음
    // this.info가 undefined를 반환하여 오류 발생
    let { getFormattedTitle } = movie;
    // getFormattedTitle() => 전역 실행 컨텍스트 (여기서 this는 window 객체를 참조한다.)
    // getFormattedTitle = getFormattedTitle.bind(movie);
    // let text = getFormattedTitle() + '-';

    let text = movie.getFormattedTitle() + ' - ';
    // For in 반복문을 통해 사용자 지정 Key 프로퍼티에 접근할 수 있다.
    for (const key in info) {
      if (key !== 'title') {
        text = text + `${key}: ${info[key]}`;
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
    id: Math.random().toString(),
    getFormattedTitle: function () {
      return this.info.title.toUpperCase();
    }
  };

  movies.push(newMovie);
  console.log(newMovie);
  renderMovies();
};

const searchMoviewHandler = () => {
  const filterTerm = document.getElementById('filter-title').value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', searchMoviewHandler);
