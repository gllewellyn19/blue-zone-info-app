import { useState } from 'react';
import { Comment } from 'semantic-ui-react'
import ReplyToComment from './ReplyToComment';
import { formatDate } from '../../helpers';
import LikeButton from './LikeButton';
import MoreActionsButton from '../posts/MoreActionsButton';

/*
* This function creates the display that a comment is shown on. The date is formatted for the comment display. Also, every user is shown with the same avatar
* The More actions button allows a user to save or report a post
* If the comment is active then the user has the ability to reply to the comment
*
* @author Alicia Steiman
*/


function CommentDisplay({ comment, includeLike = true, includeReply = true, alreadySaved = false }) {
    const [isActive, setActive] = useState(false);

    return (
        <Comment key={comment.id}>
            <Comment.Avatar src={require('../../assets/avatar.png').default} />
            <Comment.Content>
                <Comment.Author>
                    {comment.authorName}
                </Comment.Author>
                <Comment.Metadata>
                    {formatDate(comment.timestamp)}
                </Comment.Metadata>
                <Comment.Text>
                    {comment.body}
                </Comment.Text>
                <Comment.Actions>
                    <Comment.Action>
                        {includeLike && <LikeButton numLikes={comment.likes} commentId={comment.id} />}
                    </Comment.Action>
                    {includeReply && <Comment.Action onClick={() => setActive(true)}>
                        Reply
                    </Comment.Action>}
                    <Comment.Action>
                        <MoreActionsButton comment={comment} includeReport={false} alreadySaved={alreadySaved} />
                    </Comment.Action>
                </Comment.Actions>
                {isActive && <ReplyToComment replyTo={comment} showCancel={true} onCancelClick={() => setActive(false)} />}
            </Comment.Content>
        </Comment>
    )
}

export default CommentDisplay;