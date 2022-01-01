import React from 'react'
import GroupsDisplay from '../components/groups/GroupsDisplay';
import PostList from '../components/posts/PostList';
import NewGroup from '../components/groups/NewGroup';
import { Button, Grid, Popup } from 'semantic-ui-react';
import SortBySelector from '../components/SortBySelector';
import NewPost from '../components/posts/NewPost';
import { useDispatch, useSelector } from 'react-redux';
import { currPost, setCurrentPost } from '../reducers/posts';
import PostDisplay from '../components/posts/PostDisplay';
import CommentList from '../components/comments/CommentList';
import { history } from '../reducers/groups';

/*
* Template for a Group page (e.g. Majors, Dorms, etc.)
* Can navigate to the Group page by clicking one of the "group cards" on the Home page
* Also contains an i icon to show more information about the post read from the backend
* Shows all the posts for that group and just that group in its page
* Note that if there is a subgroup of the current group, the posts of the subgroup wont show up 
* only the posts of the current group
* @author: Alicia Steiman
*/

function Group() {
    const clickedPost = useSelector(currPost);

    const groupsHistory = useSelector(history);
    const currGroup = groupsHistory.length > 0 ? groupsHistory[groupsHistory.length - 1] : null;
    const groupDesc = currGroup ? currGroup.description : null;

    const dispatch = useDispatch();

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
                {groupDesc && <Popup content={currGroup.description} trigger={<Button icon="info" />} />}
            </Grid.Row>
            <Grid.Row className="newPostRow">
                <NewPost />
            </Grid.Row>
            <Grid.Row className="postsRow" columns={clickedPost != null ? 2 : 1}>
                <Grid.Column className="postsColumn" style={postColumnStyle}>
                    <PostList />
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

export default Group;