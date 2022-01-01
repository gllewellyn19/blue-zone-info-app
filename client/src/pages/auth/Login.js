import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form } from "semantic-ui-react";
import { login, loginStatus } from "../../reducers/user";

/*
* Login is displayed on the / route when the user object in state is null
* It prompts users for their email and password -- on success, it will push them to Home
*
* Future work will have form validation, "forget password" feature, and more styling
*
* @author Alicia Steiman
*/

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const status = useSelector(loginStatus);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit() {
        dispatch(login({ email: email, password: password }));
        if (status === 'succeeded') {
            navigate("/");
        } else if (status === 'failed') {
            console.log('login failed')
        }
    }

    return (
        <Form onSubmit={() => handleSubmit()}>
            <Form.Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Button primary>Login</Form.Button>
            <div>Or create an account <a href="createAccount">here</a>.</div>
        </Form>
    );
}

export default Login;