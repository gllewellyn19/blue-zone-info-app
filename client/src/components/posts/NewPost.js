import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Accordion, Icon } from 'semantic-ui-react';
import { history } from '../../reducers/groups';
import { addNewPost } from '../../reducers/posts';
import { currUser } from '../../reducers/user';

/*
* This function creates the accordion for the user to create a post. Note that after the user creates their post it is submitted to the backend 
* and automatically displayed on the page. The datetime is formatted and the accordion is collapsed 
* The user is given an error if they dont have a title but they dont need to have content in their post
*
* @author Alicia Steiman, Grace Llewellyn
*/

const buildHistoryBreadcrumbs = (groupsHistory, username) => {
    let groupNames = [];
    groupsHistory.map((group) => groupNames.push(group.name));
    return <span style={{ fontSize: 16 }}>Create post as  <span style={{ fontWeight: 'bold' }}>{username}</span> in{`\xa0`} <span style={{ fontWeight: 'bold' }}>{groupNames.join(" > ")}</span>:</span>
};

function NewPost() {
    const groupsHistory = useSelector(history);
    const user = useSelector(currUser);

    const [openDropdown, setOpenDropdown] = useState(false);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState();
    const [titleError, setTitleError] = useState(false);

    const dispatch = useDispatch();

    function handleSubmit() {
        if (title !== "") {
            const currTime = new Date().toISOString().replace('T', ' ').replace('Z', '');
            dispatch(addNewPost({
                title: title,
                body: content,
                author: user.username,
                timestamp: currTime,
                pageId: groupsHistory[groupsHistory.length - 1].id,
            }));
            setTitle("");
            setContent("");
            setOpenDropdown(false);
        } else {
            setTitleError(true);
        }
    }

    return (
        <Accordion fluid className="newPost">
            <Accordion.Title active={openDropdown === true} onClick={() => setOpenDropdown(!openDropdown)}>
                <Icon name="dropdown" />{buildHistoryBreadcrumbs(groupsHistory, user.username)}
            </Accordion.Title>
            <Accordion.Content active={openDropdown === true}>
                <Form onSubmit={() => handleSubmit()} size="large">
                    <Form.Input
                        label="Title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            setTitleError(false)
                        }}
                        error={titleError && { content: "Please enter a title", pointing: "below" }}
                    />
                    <Form.TextArea
                        label="Content"
                        placeholder="Text (optional)"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Form.Button primary style={{ marginBottom: 10 }}>Post</Form.Button>
                </Form>
            </Accordion.Content>
        </Accordion>
    );
}

export default NewPost;