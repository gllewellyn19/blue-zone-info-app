import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { postsLikedByUser, updatePostLikes } from '../../reducers/posts';
import { commentsLikedByUser, updateCommentLikes } from '../../reducers/comments';

/*
* This class creates a like button that enables the user to like and unlike a post. When a post is liked or unliked, 
* there is a call to the database so that the number of likes is accurately reflected
* Note that the color of the button changes when the user likes a button and the likes will increase or decrease by one
*
* @author Alicia Steiman, Grace Llewellyn
*/

function LikeButton({ postId, numLikes, commentId }) {
  const likedComments = useSelector(commentsLikedByUser);
  const likedPosts = useSelector(postsLikedByUser);

  const getIsLiked = () => {
    let idx;
    if (commentId == null && postId != null) {
      idx = likedPosts.findIndex(post => post.id === postId);
    } else if (postId == null && commentId != null) {
      idx = likedComments.findIndex(comment => comment.id === commentId);
    }
    return idx === -1 ? false : true;
  }

  const [likes, setLikes] = useState(numLikes);
  // will need to check if the user has liked this post already
  const [isLiked, setIsLiked] = useState(getIsLiked());

  const dispatch = useDispatch();

  // Either likes or unlikes a post and makes sure the content reflects the new amount of likes
  function changeLikes() {
    if (isLiked) {
      setLikes(likes - 1);
      // change likes in database
      if (commentId == null && postId != null) {
        dispatch(updatePostLikes({ postId: postId, isIncrement: false }))
      } else if (postId == null && commentId != null) {
        dispatch(updateCommentLikes({ commentId: commentId, isIncrement: false }));
      }
    } else {
      setLikes(likes + 1)
      // change likes in database
      if (commentId == null && postId != null) {
        console.log(postId)
        dispatch(updatePostLikes({ postId: postId, isIncrement: true }))
      } else if (postId == null && commentId != null) {
        dispatch(updateCommentLikes({ commentId: commentId, isIncrement: true }))
      }
    }
    setIsLiked(!isLiked)
  }

  return (
    <div>
      <Icon name={isLiked ? 'heart' : 'heart outline'} color={isLiked ? "red" : "grey"} onClick={() => changeLikes()} />
      <span onClick={() => changeLikes()}>{likes} Likes</span>
    </div>
  );
}

export default LikeButton;