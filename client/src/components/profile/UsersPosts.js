import React from 'react';
import { Feed, Header } from "semantic-ui-react";
import PostDisplay from ".././posts/PostDisplay";

/*
* User's post page. Everything is read from the backend and displayed on this page. After a user posts, you don't need to refresh this page to 
* see those changes
*
* @author Grace Llewellyn
*/

function UsersPosts({ userPosts }) {
    const none = "You haven't created any posts yet!";
    const heading = <Header as='h1' dividing>Your posts</Header>;

    let content;
    if (userPosts.length > 0) {
        content = userPosts.map((post) => <PostDisplay key={post.id} post={post} />)
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

export default UsersPosts;