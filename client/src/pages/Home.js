import React, { useEffect } from 'react'
import GroupsDisplay from '../components/groups/GroupsDisplay';
import PostList from '../components/posts/PostList';
import NewGroup from '../components/groups/NewGroup';
import { Button, Grid } from 'semantic-ui-react';
import SortBySelector from '../components/SortBySelector';
import PostDisplay from '../components/posts/PostDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { currPost, setCurrentPost } from '../reducers/posts';
import CommentList from '../components/comments/CommentList';
import { currUser, getUsername, setUsername } from '../reducers/user';

/*
* Home page of the app that the user first sees when logging in. The user also
* sees a general feed that is all the posts created in bluezone 
* in the home page you can also click on a post to see it open up on the right side of the page
* This page also deals with a user logging into BlueZone and created an account if needed
* @author: Alicia Steiman
*/

function Home() {
    const clickedPost = useSelector(currPost);
    const dispatch = useDispatch();

    const user = useSelector(currUser);

    useEffect(() => {
        // when a user logs in, the user object only contains {id}
        // need to retrieve the email and username given their id
        if (user.username === null) {
            dispatch(getUsername(user.id));
        }
        // when a user creates an account, the user object returned contains {id, email}
        // need to set the username in the backend (gets added to redux though, so not null when created)
        if (user.createAccount) {
            dispatch(setUsername({ userId: user.id, username: user.username }));
        }
    }, [dispatch, user]);

    const postColumnStyle = clickedPost != null ? { height: "1000px", overflow: "auto" } : null;

    return (
        <Grid className="mainContentGrid">
            <Grid.Row className="newGroupRow">
                <NewGroup />
            </Grid.Row>
            <Grid.Row>
                <GroupsDisplay />
            </Grid.Row>
            <Grid.Row className="sortByRow">
                <SortBySelector />
            </Grid.Row>
            <Grid.Row className="postsRow" columns={clickedPost != null ? 2 : 1}>
                <Grid.Column className="postsColumn" style={postColumnStyle}>
                    <PostList isHome={true} />
                </Grid.Column>
                {clickedPost != null &&
                    <Grid.Column className="postsColumn" style={postColumnStyle}>
                        <Button circular icon="close" floated="right" onClick={() => dispatch(setCurrentPost(null))} />
                        <PostDisplay />
                        <CommentList />
                    </Grid.Column>
                }
            </Grid.Row>
        </Grid>
    );
}

export default Home;