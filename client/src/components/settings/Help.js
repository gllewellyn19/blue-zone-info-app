import React from 'react';
import { Header } from 'semantic-ui-react';

/*
* This function describes how to use the BlueZone web app
* 
* @author Grace Llewellyn
*/

function Help() {
    return (
        <div>
            <Header as="h1" dividing>Help page</Header>
            <Header as="h2">How to create a post</Header>
            <font size="3">You create a post by visting a group page and you will see the dropdown for creating a post (in that group).
                Just fill in the information for each of the fields then press post. This means the post will post to the
                group that you are currently in. </font>
            <Header as="h2">How to join a group</Header>
            <font size="3">Join a group by visiting the group page and pressing the join button in the top right corner</font>
            <Header as="h2">How to comment on a post</Header>
            <font size="3">Comment on a post by clicking the comment button underneath the post. Then scroll to the bottom and type your
                reply in the text area and then press the comment button. You can also reply on a comment thread by pressing
                the reply button underneath the comment. </font>
            <Header as="h2">How to change your username</Header>
            <font size="3">Change your username by pressing the avatar in the top right corner of the screen, then the profile dropdown.
                Click on the Overview tab then the edit profile button at the buttom on the page. From there, in the text area
                edit your username then press the save changes button. You will then see these changes reflected in your profile page.</font>
            <Header as="h2">How to create a group</Header>
            <font size="3">Create a group by pressing the + button in the top right corner of the home page or any group page. Fill in the
                information about your group including the group description so that people are able to find your group. Once you press the
                Create Group button, anyone with a BlueZone account can find and join your group</font>
            <Header as="h2">How see your notifications</Header>
            <font size="3">Press the bell icon in the top right corner of the page. This will show you your top 5 most recent notifications. You
                can press see all at the bottom of this window to see all of your notifications. You can press each notification to see
                the post or comment. You can also see a preview of the notification on this screen. </font>
        </div>

    );
}

export default Help;