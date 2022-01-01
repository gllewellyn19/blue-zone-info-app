import React from 'react';
import { Header } from 'semantic-ui-react';

/*
* This function gives the privacy information for BlueZone that users experience
* 
* @author Grace Llewellyn
*/

function About() {
    return (
        <div>
            <Header as="h1" dividing>
                Privacy
            </Header>
            <font size="3">One of the goals of BlueZone is to have all information available to all users. This means that
                any comment, post or group that you make is available to everyone. However, no one can see the posts that you have liked</font>
        </div>

    );
}

export default About;