import bitmoji from "../.././assets/avatar.png";
import { Image, Button, Form, Header, Icon, Divider } from "semantic-ui-react";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { currUser } from '../.././reducers/user';

/*
* This shows the information about the user given from the backend. Note that we removed changing the username at the end because we
* prioritized other features but everything on the profile page is read from the backend
*
* @author Grace Llewellyn
*/

function Overview() {

    const user = useSelector(currUser);
    const [editingProfile, setEditingProfile] = useState(false);
    const [username, setUsername] = useState(user.username);
    const [usernameEdit, setUsernameEdit] = useState(username);
    const userEmail = user.email;

    const dispatch = useDispatch();

    function enterEditingMode(state, action) {
        setEditingProfile(true);
        setUsernameEdit(username);
    }

    function exitEditingMode(state, action) {
        setEditingProfile(false);
    }

    const onSubmit = (event) => {
        setEditingProfile(!editingProfile);
        setUsername(usernameEdit);
        // dispatch(setUsername({ userId: user.id, username: usernameEdit }));
    }

    function handleChange(e, { name, value }) {
        setUsernameEdit(value);
    }

    return (editingProfile ?
        <div>
            <Header as="h1" dividing>
                Editing your profile
            </Header>

            <Image avatar src={bitmoji} wrapped ui={false} height='300' />

            <div>
                <font size="5">Username: </font>
                <Form onSubmit={onSubmit}>
                    <Form.Input
                        placeholder='Username'
                        name='username'
                        value={usernameEdit}
                        onChange={handleChange}
                        color='blue'
                    />
                    <Button onClick={exitEditingMode}>Cancel</Button>
                    <Button type='submit'>Save Changes</Button>
                </Form>
            </div>
            <Divider hidden />
            <font size="5">Email: {userEmail}</font>

        </div> :
        <div>
            <Header as="h1" dividing>
                Your profile
            </Header>
            <div>
                <Image size="small" src={bitmoji} />
                <Divider hidden />
                <font size="5">Username: {user.username} </font>
                {/* <Icon name='pencil' onClick={enterEditingMode} /> */}
            </div>
            <Divider hidden />
            <font size="5">Email: {userEmail}</font>

        </div>

    );

}

export default Overview;