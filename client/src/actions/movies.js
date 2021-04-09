import { json } from "body-parser";

const API_HOST = 'https://moviebook309.herokuapp.com'
// const API_HOST = 'http://localhost:5000'

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
            rand.setState({ randomReviews: json.review, randomMovie: json.movie[0] });
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
            movies.setState({ movies: json.movie });
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
            const return_object = { randomReviews: json.review, randomMovie: json.movie[0] }
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

export const getMovieWithReviews = (movieComp, id) => {
    const url = `${API_HOST}/api/movies/${id}/reviews`

    return fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("error: cannot get reviews for the movie")
            }
        })
        .then(json => {
            movieComp.setState({ reviews: json.reviews });
            movieComp.setState({ movie: json.movie });
        })
        .catch(error => {
            console.log(error);
        });
};

// Posts a review and adds to comp's reviews state
export const postReviewForMovie = (comp, movie_id, text, rating) => {
    const request = new Request(`${API_HOST}/api/movie/${movie_id}/review`, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            review: text,
            rating: rating
        })
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            let reviews = comp.state.reviews;
            reviews.push(json);

            comp.setState({
                reviews: reviews,
            });
            comp.toggleAddReview();
        })
        .catch(error => {
            console.log(error);
        });
}

export const addMovie = (movtitle, movplot, movyear, movruntime, movposter) => {
    const request = new Request(`${API_HOST}/api/admin/addmovie`, {
        method: "post",
        body: JSON.stringify({
            title: movtitle,
            plot: movplot,
            year: movyear,
            runtime: movruntime,
            poster: movposter
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include'
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error)
        })
};