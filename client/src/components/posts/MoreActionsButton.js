import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import ReportPost from "./ReportPost";
import { useDispatch, useSelector } from 'react-redux';
import { addSavedPost, addSavedComment, unsavePost, unsaveComment, currUser, userSavedPosts, userSavedComments } from '../.././reducers/user';

/*
* MoreActionsButton is the 3-dot icon menu that shows up for a post or comment
* It defines the extra actions you can take (appears next to like and comment/reply buttons)
*
* For posts, this dropdown will give the option to save or report
* For comments, this dropdown will only give the option to report
* You can also unsave or report
* This file dispatches to the backend to save your changes
* Note that it would be best if it went into the backend to see if each post had already been reported or saved but we prioritized other endeavors
*
* @author Alicia Steiman
*/

function MoreActionsButton({ post = null, comment = null, includeReport = true, alreadySaved = false }) {
    const dispatch = useDispatch();
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [isSaved, setSaved] = useState(alreadySaved);
    const user = useSelector(currUser);
    const userId = user.id;
    const userSavedPostList = useSelector(userSavedPosts);
    const userSavedCommentList = useSelector(userSavedComments);

    function onSave() {

        if (!isSaved) {
            if (post != null) {
                dispatch(addSavedPost({ userId: userId, post: post }));
            } else if (comment != null) {
                dispatch(addSavedComment({ comment: comment, userId: userId }));
            }
        } else {
            if (post != null) {
                const postId = post.id;
                let postToUnsave = userSavedPostList.filter(post => post.id === postId);
                dispatch(unsavePost({ post: post, userId: userId, saveId: postToUnsave[0].saveId }))
            } else if (comment != null) {
                const commentId = comment.id;
                let commentToUnsave = userSavedCommentList.filter(comment => comment.id === commentId);
                dispatch(unsaveComment({ comment: comment, userId: userId, saveId: commentToUnsave[0].saveId }))
            }
        }

        setSaved(!isSaved);
    }

    return (
        <Dropdown icon='ellipsis horizontal'>
            <Dropdown.Menu>
                <Dropdown.Item
                    text={isSaved ? 'Unsave' : 'Save'}
                    icon={isSaved ? 'bookmark' : 'bookmark outline'}
                    onClick={() => onSave()}
                />
                {includeReport &&
                    <Dropdown.Item
                        text='Report'
                        icon='flag outline'
                        onClick={() => setReportModalOpen(true)} />}
                {includeReport &&
                    <ReportPost
                        post={post}
                        isOpen={reportModalOpen}
                        handleOpen={() => setReportModalOpen(true)}
                        handleClose={() => setReportModalOpen(false)}
                    />}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default MoreActionsButton;