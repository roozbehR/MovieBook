const API_HOST = 'http://moviebookapp.herokuapp.com'

// Retrieves user feed and adds to comp's state
export const getFeed = (comp) => {
    const request = new Request(`${API_HOST}/api/feed`, {
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include'
    });

    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            console.log(json);
            comp.setState({ reviews: json });
            return "fetched feed";
        })
        .catch(error => {
            console.log(error);
            return error;
        });
}
