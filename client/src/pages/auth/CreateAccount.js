import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Form } from "semantic-ui-react";
import { createAccount } from "../../reducers/user";

/*
* CreateAccount is displayed on the /createAccount route and contains a form for a user to create an account
* Prompts users for an email, username, and password and pushes them to Home on submit
*
* Future work will have form validation
* Also needs more styling
*
* @author Alicia Steiman
*/

function CreateAccount() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit() {
        dispatch(createAccount({ email: email, password: password, username: username }));
        navigate("/");
    }

    return (
        <Form onSubmit={() => handleSubmit()}>
            <Form.Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button primary>Create Account</Form.Button>
            <div>Already have an account? Login <a href="/">here</a>.</div>
        </Form>
    );
}

export default CreateAccount;