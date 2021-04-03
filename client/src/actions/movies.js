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