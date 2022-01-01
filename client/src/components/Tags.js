import React from 'react';
import { Button } from 'semantic-ui-react';

/*
* This function was created to help with the search feature of the web app. Since the search feature didnt have time to 
* be implemented in the frontend this file is not used
* 
* @author Grace Llewellyn
*/

function Tags() {
    /*const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
    &:disabled {
        color: grey;
        opacity: 0.7;
        cursor: default;
    }
    `;*/
    //const [checked, setChecked] = useState(false);
    return (
        <div>
            <Button basic color='red'>
                Classes
            </Button>
            <Button basic color='orange'>
                Study spots
            </Button>
            <Button basic color='yellow'>
                Extracurriculars
            </Button>{' '}
            <Button basic color='olive'>
                Club sports
            </Button>
            <Button basic color='green'>
                Recreation
            </Button>
            <Button basic color='teal'>
                Fitness
            </Button>
            <Button basic color='blue'>
                Greek life
            </Button>
            <Button basic color='violet'>
                Environment
            </Button>
            <Button basic color='purple'>
                Dorms
            </Button>
            <Button basic color='pink'>
                Food
            </Button>
        </div>
    );
}

export default Tags;
