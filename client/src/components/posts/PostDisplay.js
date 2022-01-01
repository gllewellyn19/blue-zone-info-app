import LikeButton from "../comments/LikeButton";
import CommentButton from "./CommentButton";
import { Feed, Grid, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from "react-redux";
import { currPost, setCurrentPost } from "../../reducers/posts";
import { fetchComments } from "../../reducers/comments";
import { formatDate } from "../../helpers";
import MoreActionsButton from "./MoreActionsButton";

/*
* Represents a single post object
* A list of posts will be rendered on the page
* Posts will be fetched from the backend and each one will contain:
* title, body, points, page_id, creation_time, comment_count, author
* The above items will be passed to the Card element as props
*
* @author Alicia Steiman
*/

function PostDisplay({ post, alreadySaved = false }) {
  const dispatch = useDispatch();

  // if navigating to a "Post page" by clicking on Comment button, we need to access the currPost
  const clickedPost = useSelector(currPost);
  // else, we are rendering a list of posts for a given group (see PostList)
  const postDisplay = post != null ? post : clickedPost;

  function onCommentButtonClick() {
    dispatch(setCurrentPost(post));
    dispatch(fetchComments(post.id));
  }

  const feedEvent = (
    <Feed.Event>
      <Feed.Label>
        <Image src={require('../../assets/avatar.png').default} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Date>
          <span style={{ fontWeight: 'bold' }}>{postDisplay.author} posted to {postDisplay.pageName}</span> on {formatDate(postDisplay.timestamp)}
        </Feed.Date>
        <Feed.Summary>{postDisplay.title}</Feed.Summary>
        <Feed.Extra text>{postDisplay.body}</Feed.Extra>
        <Feed.Meta>
          <Grid>
            <Grid.Row>
              <div style={{ marginRight: 10.5 }}>
                <LikeButton postId={postDisplay.id} numLikes={postDisplay.likes} />
              </div>
              <div style={{ marginRight: 10.5 }}>
                <CommentButton numComments={postDisplay.commentCount} onClick={() => post != null && post !== clickedPost && onCommentButtonClick()} />
              </div>
              <MoreActionsButton post={post} alreadySaved={alreadySaved} />
            </Grid.Row>
          </Grid>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event >
  );

  // if on Post page, we want to render the FeedEvent as the only item in the Feed
  // else just want the FeedEvent because PostDisplay wraps it with Feed
  return post != null ? feedEvent : <Feed size="large">{feedEvent}</Feed>
}

export default PostDisplay;