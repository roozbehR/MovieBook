const API_HOST = 'http://moviebookapp.herokuapp.com'

export const postComment = (reviewComp, commentText) => {

    const request = new Request(`${API_HOST}/api/feed/review/${reviewComp.state.id}/comment`, {
        method: "post",
        body: JSON.stringify({
            text: commentText
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
            let comments = reviewComp.state.comments;
            let newComment = json.comment;
            comments.push(newComment);

            reviewComp.setState({
                comments: comments,
            });
        })
        .catch(error => {
            console.log(error);
        });

}