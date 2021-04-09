const API_HOST = 'https://moviebook309.herokuapp.com'
// const API_HOST = 'http://localhost:5000'

// Retrives user by username and adds to comp's viewingUser state
export const followUser = (comp, message, username) => {
    const request = new Request(`${API_HOST}/api/user/follow/${username}`, {
        method: "put",
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
            let updatedViewingUser = { ...comp.state.viewingUser };
            updatedViewingUser.isFollowing = !updatedViewingUser.isFollowing;
            updatedViewingUser.numberOfFollowers += (updatedViewingUser.isFollowing ? 1 : -1);

            comp.setState({ viewingUser: updatedViewingUser });
            {
                if (updatedViewingUser.isFollowing)
                    message.success("Following")
                else
                    message.success("Unfollowed")
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Retrieves profile's reviews and adds to comp's reviews state
export const getProfileReviews = (comp, user_id) => {
    const request = new Request(`${API_HOST}/api/profile/${user_id}/reviews`, {
        method: "get",
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
            comp.setState({ reviews: json });
            console.log(comp.state)
            return 'fetched reviews';
        })
        .catch(error => {
            console.log(error);
        });
}

// Retrieves profile's comments within reviews and adds to comp's commentReviews state
export const getProfileComments = (comp, user_id) => {
    const request = new Request(`${API_HOST}/api/profile/${user_id}/comments`, {
        method: "get",
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
            comp.setState({ commentReviews: json });
            console.log(comp.state.commentReviews)
            return "fetched comments"
        })
        .catch(error => {
            console.log(error);
        });
}

// Retrieves profile's favourite movies and adds to comp's state
export const getProfileFavouriteMovies = (comp, user_id) => {
    const request = new Request(`${API_HOST}/api/profile/${user_id}/movies`, {
        method: "get",
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
            console.log(json);
            comp.setState({ favouriteMovies: json });
        })
        .catch(error => {
            console.log(error);
        });
}

// Retrieves profile's favourite movies and adds to comp's state
export const updateProfileBiography = (comp) => {
    const request = new Request(`${API_HOST}/api/profile/biography`, {
        method: "post",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
            bio: comp.state.editBioText
        })
    });

    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            const viewingUser = { ...comp.state.viewingUser };
            viewingUser.biography = json.bio;
            comp.setState({ viewingUser: viewingUser, editBio: false });
        })
        .catch(error => {
            console.log(error);
        });
}

export const postProfilePicture = (comp, form) => {
    const imageData = new FormData(form);

    const request = new Request(`${API_HOST}/api/profile/picture`, {
        method: "post",
        credentials: 'include',
        body: imageData
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            const viewingUser = comp.state.viewingUser;
            viewingUser.picture = json.picture
            comp.setState({ viewingUser: viewingUser });
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
};
