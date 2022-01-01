import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Header, Divider } from "semantic-ui-react";
import { setDarkMode } from '../../reducers/user';

/**
 * This function allow the user to change their notification settings. Note that since notifications was 
 * not done in the backend this file was not used
 *  
 * @author Grace Llewellyn
 */

const inactiveColor = "white";
const activeColor = "blue";

function Notifications() {

    const [likedPostActive, setLikedPostActive] = useState(true);
    const [commentedPostActive, setCommentedPostActive] = useState(true);
    const [joinedGroupActive, setJoinedGroupActive] = useState(true);
    const [postsGroupActive, setPostsGroupActive] = useState(true);

    // const isDarkMode = useSelector(isDarkMode);

    // onDarkModeClick = () => {
    //     dispatch(setDarkMode());
    // }

    return (
        <div>
            <Header as="h1" dividing>
                Notification settings
            </Header>
            <font size="3">Notifications when someone likes your post:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={likedPostActive ? activeColor : inactiveColor}
                    onClick={function () { setLikedPostActive(likedPostActive => true) }}>On</Button>
                <Button
                    color={!likedPostActive ? activeColor : inactiveColor}
                    onClick={function () { setLikedPostActive(likedPostActive => false) }}>Off</Button>
            </Button.Group>
            <Divider hidden />
            <font size="3">Notifications when someone comments on your post:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={commentedPostActive ? activeColor : inactiveColor}
                    onClick={function () { setCommentedPostActive(commentedPostActive => true) }}>On</Button>
                <Button
                    color={!commentedPostActive ? activeColor : inactiveColor}
                    onClick={function () { setCommentedPostActive(commentedPostActive => false) }}>Off</Button>
            </Button.Group>
            <Divider hidden />
            <font size="3">Notifications when someone joins your group:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={joinedGroupActive ? activeColor : inactiveColor}
                    onClick={function () { setJoinedGroupActive(joinedGroupActive => true) }}>On</Button>
                <Button
                    color={!joinedGroupActive ? activeColor : inactiveColor}
                    onClick={function () { setJoinedGroupActive(joinedGroupActive => false) }}>Off</Button>
            </Button.Group>
            <Divider hidden />
            <font size="3">Notifications when someone posts in your group:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={postsGroupActive ? activeColor : inactiveColor}
                    onClick={function () { setPostsGroupActive(postsGroupActive => true) }}>On</Button>
                <Button
                    color={!postsGroupActive ? activeColor : inactiveColor}
                    onClick={function () { setPostsGroupActive(postsGroupActive => false) }}>Off</Button>
            </Button.Group>
        </div>

    );
}


export default Notifications;