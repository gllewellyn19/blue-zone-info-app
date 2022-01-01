import CommentList from "../components/comments/CommentList";
import PostDisplay from "../components/posts/PostDisplay";

/*
* In an old version of the code, Post was the page that displayed of a single post
* When a user went to comment on a post, they were redirected to a new page containing just the post
*
* Current version of the code does not use this component as posts open in a new column (vs a new page)
*
* @author Alicia Steiman
*/

function Post() {
    return (
        <div style={{ paddingBottom: 10, paddingLeft: 5, paddingRight: 10 }}>
            <PostDisplay />
            <CommentList />
        </div>
    );
}

export default Post;