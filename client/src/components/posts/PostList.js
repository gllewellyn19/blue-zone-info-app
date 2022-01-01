import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Feed, Loader } from "semantic-ui-react";
import { history } from "../../reducers/groups";
import { fetchAllPosts, fetchPosts, filter, posts } from "../../reducers/posts";
import PostDisplay from "./PostDisplay";

/*
* PostList renders a list of Post components
* These posts will be retrieved by making a database request
* E.g. "Give me all posts for the Majors group" -- probably will look for some sort of group_id tag
* If there are no posts the user if suggested to be the first to post
*
* @author Alicia Steiman
*/

function PostList({ isHome = false }) {
    const dispatch = useDispatch();

    const postsList = useSelector(posts);
    const currFilter = useSelector(filter);
    const status = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);

    const groupsHistory = useSelector(history);
    const currGroupId = groupsHistory.length > 0 ? groupsHistory[groupsHistory.length - 1].id : 1;

    useEffect(() => {
        if (isHome) {
            dispatch(fetchAllPosts())
        }
        if (status === 'idle' && !isHome) {
            dispatch(fetchPosts({ pageId: currGroupId, filter: currFilter }));
        }
    }, [status, dispatch, currGroupId])

    let content;
    if (status === 'loading') {
        content = <Loader content='Loading' />
    } else if (status === 'succeeded') {
        if (postsList.length > 0) {
            content = postsList.map((post) => <PostDisplay key={post.id} post={post} />)
        } else {
            content = <div style={{ fontSize: 18, paddingBottom: 20 }}>Be the first to post!</div>
        }
    } else if (status === 'error') {
        content = <div>{error}</div>
    }

    return (
        <div>
            <Feed size="large">
                {content}
            </Feed>
        </div>
    );
}

export default PostList;