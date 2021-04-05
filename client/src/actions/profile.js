const API_HOST = 'http://localhost:5000'

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

// Retrieves own reviews and adds to comp's reviews state
export const getOwnReviews = (comp) => {
    const request = new Request(`${API_HOST}/api/review/user`, {
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
            comp.setState({ reviews: json });
            console.log(comp.state)
        })
        .catch(error => {
            console.log(error);
        });
}

// Retrieves own comments within reviews and adds to comp's commentReviews state
export const getOwnComments = (comp) => {
    const request = new Request(`${API_HOST}/api/comments/user`, {
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
            comp.setState({ commentReviews: json });
            console.log(comp.state.commentReviews)
        })
        .catch(error => {
            console.log(error);
        });
}