import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'semantic-ui-react';
import { addNewGroup, history } from '../../reducers/groups';

/* 
* NewGroup is a dialog that will allow a user to create a new group (from home)
* or new subgroup for the current group page that the user is currently on 
* After the group or subgroup is created, it is dispatched to the backend to save
*
* @author Alicia Steiman, Grace Llewellyn
*/

function NewGroup() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState();
    const [nameError, setNameError] = useState(false);

    const groupsHistory = useSelector(history);
    const dispatch = useDispatch();

    function handleSubmit() {
        if (name !== "") {
            dispatch(addNewGroup({
                name: name,
                parentId: groupsHistory.length > 0 ? groupsHistory[groupsHistory.length - 1].id : 1,
                description: description
            }));
            setOpen(false);
            setName("");
        } else {
            setNameError(true);
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary content={`Add ${groupsHistory.length > 0 ? "Subgroup" : "Group"}`} icon="plus" labelPosition="right" />}
        >
            <Modal.Header>
                Create a new group {groupsHistory.length > 0 && `in ${groupsHistory[groupsHistory.length - 1].name}`}
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={() => handleSubmit()}>
                    <Form.Input
                        label="Group Name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            setNameError(false)
                        }}
                        error={nameError && { content: "Please enter a group name", pointing: "below" }}
                    />
                    <Form.TextArea
                        label="Description"
                        placeholder="Text (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button content="Cancel" onClick={() => setOpen(false)} />
                <Button primary content="Create Group" onClick={() => handleSubmit()} />
            </Modal.Actions>
        </Modal>
    );
}

export default NewGroup;