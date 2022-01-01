import React from 'react';
import { Comment, Header } from "semantic-ui-react";
import CommentDisplay from "../comments/CommentDisplay";

/*
* User's saved comments page. Everything is read from the backend and displayed on this page. After a user saves a comment,
* you don't need to refresh this page to see those changes. You can also unsave a comment from this page
*
* @author Grace Llewellyn
*/

function UsersSavedComments({ userSavedComments }) {
    const none = "You haven't saved any comments yet!";
    const heading = <Header as='h1' dividing>Your saved comments</Header>;

    let content;
    if (userSavedComments.length > 0) {
        content = userSavedComments.map((comment) => <CommentDisplay comment={comment} alreadySaved={true} />)
    } else {
        content = <div style={{ paddingLeft: 8, fontSize: 18 }}>{none}</div>
    }

    return (
        <div>
            {heading}
            <Comment.Group size="large" style={{ paddingLeft: 10, marginTop: 16 }}>
                {content}
            </Comment.Group>
        </div>
    );
}

export default UsersSavedComments;