import { useState } from "react";
import { Button, Modal } from "semantic-ui-react";
import { useDispatch } from 'react-redux';
import { reportPost, unreportPost } from '../.././reducers/user';

/*
* This function is the report post feature of the list from the more actions button 
* After a user reports their post, they are asked to confirm or cancel. Once they confirm the post is reported
* but they have the option to unreport on the next confirmation screen. All of this is connected to the backend to 
* actually report the post
*
* @author Grace Llewellyn, Alicia Steiman
*/

function ReportPost({ post, isOpen, handleOpen, handleClose }) {
    const dispatch = useDispatch();
    const [confirmationScreen, setConfirmationScreen] = useState(false);
    const [unreportScreen, setUnreportScreen] = useState(false);

    function handleSubmit() {
        dispatch(reportPost(post));

        setConfirmationScreen(true);
    }

    function closeConfirmationScreen() {
        setConfirmationScreen(false);
        handleClose();
    }

    function unreport() {
        dispatch(unreportPost(post));
        setUnreportScreen(true);
        setConfirmationScreen(false);
    }

    function closeUnreportScreen() {
        setUnreportScreen(false);
        handleClose();
    }

    if (confirmationScreen) {
        return (
            <Modal open={isOpen} onOpen={handleOpen} onClose={handleClose}>
                <Modal.Header>Post reported successfully</Modal.Header>
                <Modal.Content>This post will no longer be visible to others until it is reviewed by admin or you unreport it</Modal.Content>
                <Modal.Actions>
                    <Button content="Unreport" onClick={unreport} />
                    <Button primary content="Ok" onClick={closeConfirmationScreen} />
                </Modal.Actions>
            </Modal>
        );
    } else if (unreportScreen) {
        return (
            <Modal open={isOpen} onOpen={handleOpen} onClose={handleClose}>
                <Modal.Header>Post unreported successfully</Modal.Header>
                <Modal.Content>This post is now visible to all others</Modal.Content>
                <Modal.Actions>
                    <Button primary content="Ok" onClick={closeUnreportScreen} />
                </Modal.Actions>
            </Modal>
        );
    } else {
        return (
            <Modal open={isOpen} onOpen={handleOpen} onClose={handleClose}>
                <Modal.Header>Report Post</Modal.Header>
                <Modal.Content>Are you sure you want to report this post?</Modal.Content>
                <Modal.Actions>
                    <Button content="Cancel" onClick={handleClose} />
                    <Button primary content="Report" onClick={() => handleSubmit()} />
                </Modal.Actions>
            </Modal>
        );
    }

}

export default ReportPost;