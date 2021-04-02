const API_HOST = 'http://localhost:5000'

// Check if user session exists
export const checkSession = (app) => {
    const request = new Request(`${API_HOST}/user/check-session`, {
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
        .then(json => {
            console.log(json)
            app.setState({ user: json });
        })
        .catch(error => {
            console.log(error);
        });
};

export const login = (loginComp, app) => {
    const request = new Request(`${API_HOST}/user/login`, {
        method: "post",
        body: JSON.stringify({
            username: loginComp.state.login.username == '' ? 'newuser' : loginComp.state.login.username,
            password: loginComp.state.login.password == '' ? 'hellothere' : loginComp.state.login.password
        }),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include'
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            // if (json !== undefined) {
            loginComp.handleLogin(json);
            // app.setState({ currentUser: json.currentUser });
            // }
        })
        .catch(error => {
            console.log(error);
        });
};