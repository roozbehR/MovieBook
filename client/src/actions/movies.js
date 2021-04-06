const API_HOST = 'http://localhost:5000'

export const getRandomMovie = (rand) => {
    const url = `${API_HOST}/api/movie/random/movie`

    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("error: could not get movie");
            }
        })
        .then(json => {
            console.log(json);
            rand.setState({ randomReviews: json.review, randomMovie: json.movie[0]});

            //return json.movie[0];
        })
        .catch(error => {
            console.log(error);
        });
};

export const getTopMovies = (movies) => {
	const url = `${API_HOST}/api/movie/top/movies`;

	fetch(url)
		.then(res => {
			if (res.status === 200) {
			return res.json();
		} else {
			alert("error: cannot get top movies");
		}
	})
	.then(json => {
        console.log(json);
		movies.setState({ movies: json.movie });
        console.log(movies.state.movies)
	})
	.catch(error => {
		console.log(error);
	});
};

export const getHookRandomMovie = () => {
  const url = `${API_HOST}/api/movie/random/movie`

  return fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("error: could not get movie");
        }
      })
      .then(json => {
        console.log('hello I"m doing good')
        console.log(json);
        const return_object = { randomReviews: json.review, randomMovie: json.movie[0]}
        return return_object;
      })
      .catch(error => {
        console.log(error);
      });
};

export const getSearchedMovies = searchInput => {
  const url = `${API_HOST}/api/search/movies/${searchInput}`

  return fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          alert("error: could not get movie");
        }
      })
      .then(json => {
        console.log('hello I"m doing good')
        console.log(json);
        return json
      })
      .catch(error => {
        console.log(error);
      });
};

