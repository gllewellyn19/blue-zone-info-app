import CommentDisplay from './CommentDisplay';
import ReplyToComment from './ReplyToComment';
import { Comment, Divider, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { comments, fetchComments } from '../../reducers/comments';
import { currPost } from '../../reducers/posts';
import { useEffect } from 'react';

/*
 * This function creates a list of comments through mapping to build a subcomment thread. Comment Display is called to actually show these comments
 * Everything is read from the backend so it is updated correctly
 * This function also takes into account the status of the request to display the most current results to the user
 * 
 * @author Alicia Steiman
 */

const buildSubcommentThread = (subcomments) => {
    if (subcomments == null) {
        return;
    } else {
        return (
            <Comment.Group size="large">
                {subcomments.map(subcomment => subcomment.subcomments != null ?
                    <Comment>
                        <CommentDisplay comment={subcomment} includeLike={false} includeReply={false} />
                        {buildSubcommentThread(subcomment.subcomments)}
                    </Comment> : <CommentDisplay comment={subcomment} />
                )}
            </Comment.Group>
        )
    }
};

function CommentList() {
    const commentsList = useSelector(comments);
    const currPostId = useSelector(currPost).id;

    const status = useSelector(state => state.comments.status);
    const error = useSelector(state => state.comments.error);

    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchComments(currPostId))
        }
    }, [status, dispatch, currPostId])

    let content;
    if (status === 'loading') {
        content = <Loader content='Loading' />
    } else if (status === 'succeeded') {
        if (commentsList.length > 0) {
            content = commentsList.map(comment =>
                <Comment key={comment.id}>
                    <CommentDisplay comment={comment} />
                    {buildSubcommentThread(comment.subcomments)}
                </Comment>
            )
        } else {
            content = <div style={{ fontSize: 16 }}>Be the first to comment!</div>
        }
    } else if (status === 'error') {
        content = <div>{error}</div>
    }

    return (
        <Comment.Group threaded size="large" style={{ paddingBottom: 15 }}>
            <ReplyToComment currPostId={currPostId} showCancel={false} />
            <Divider hidden />
            {content}
        </Comment.Group>
    );
};

export default CommentList;