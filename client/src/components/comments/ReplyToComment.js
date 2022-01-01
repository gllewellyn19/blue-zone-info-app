import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'semantic-ui-react';
import { addNewComment } from '../../reducers/comments';
import { increaseCommentCount } from '../../reducers/posts';
import { currUser } from '../../reducers/user';

/*
* Creates the reply box so that you can reply to another comment or post. The new comment is dispacthed to be added to the backend after the
* datetime is modified to be in the correct format. Separately, the comment count is then incremented. 
* This also shows the user who they will be commenting as
*
* @author Alicia Steiman, Grace Llewellyn
*/

// replyTo = the comment being replied to
function ReplyToComment({ currPostId, replyTo, showCancel, onCancelClick }) {
    const [reply, setReply] = useState();
    const dispatch = useDispatch();

    const user = useSelector(currUser);

    function handleSubmit() {
        const currTime = new Date().toISOString().replace('T', ' ').replace('Z', '');
        dispatch(addNewComment({
            author: user.username,
            body: reply,
            parentId: replyTo != null ? replyTo.id : null,
            postId: replyTo != null ? replyTo.postId : currPostId,
            timestamp: currTime,
        }));
        setReply('');
        // dispatch(increaseCommentCount({ postId: currPostId }));
        // onCancelClick();
    }

    return (
        <Form reply onSubmit={() => handleSubmit()}>
            <Form.TextArea value={reply} onChange={(e) => setReply(e.target.value)} label={!showCancel && `Comment as ${user.username}`} />
            <Button.Group floated='right'>
                {showCancel && <Form.Button content='Cancel' onClick={onCancelClick} style={{ marginRight: 5 }} />}
                <Form.Button primary content='Comment' />
            </Button.Group>
        </Form>
    );
}

export default ReplyToComment;