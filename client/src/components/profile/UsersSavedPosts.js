import React from 'react';
import { Feed, Header } from "semantic-ui-react";
import PostDisplay from "../posts/PostDisplay";

/*
* User's saved posts page. Everything is read from the backend and displayed on this page. After a user saves a post,
* you don't need to refresh this page to see those changes. You can also unsave a post from this page
*
* @author Grace Llewellyn
*/

function UsersSavedPosts({ userSavedPosts }) {
    const none = "You haven't saved any posts yet!";
    const heading = <Header as='h1' dividing>Your saved posts</Header>;

    let content;
    if (userSavedPosts.length > 0) {
        content = userSavedPosts.map((post) => <PostDisplay key={post.id} post={post} alreadySaved={true} />)
    } else {
        content = <div style={{ paddingLeft: 8, fontSize: 18 }}>{none}</div>
    }

    return (
        <div>
            {heading}
            <Feed size="large" style={{ paddingLeft: 10 }}>
                {content}
            </Feed>
        </div>
    );
}

export default UsersSavedPosts;