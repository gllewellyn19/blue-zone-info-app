import { Icon } from 'semantic-ui-react'

/*
* This function is the comment button that allows a user to click this button and be able to comment
* It is passed the number of comments to display which is gotten from the backend in another function
*
* @author Alicia Steiman
*/

function CommentButton({ numComments, onClick }) {
    return (
        <div>
            <Icon name="comment outline" onClick={onClick} />
            <span onClick={onClick}>{numComments > 0 ? `${numComments} Comments` : "Comment"}</span>
        </div>
    );
}

export default CommentButton;