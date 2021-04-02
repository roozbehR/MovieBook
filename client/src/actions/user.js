import { json } from "body-parser";

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

export const login = (loginComp) => {
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

export const signup = (signupComp) => {
    console.log("Here in user.js");
    const request = new Request(`${API_HOST}/user/register`, {
        method: "post",
        body: JSON.stringify({
            username: signupComp.state.signup.username === '' ? 'newuser' : signupComp.state.signup.username,
            password: signupComp.state.signup.password === '' ? 'correctPass' : signupComp.state.signup.password,
            email: signupComp.state.signup.email === '' ? '309@mail.com' : signupComp.state.signup.email
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
    .then(json => {
        signupComp.handleLogin(json);
    })
    .catch(error => {
        console.log(error);
    });
};