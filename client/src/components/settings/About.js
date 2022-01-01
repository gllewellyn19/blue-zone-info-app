import React from 'react';
import { Header } from 'semantic-ui-react';

/*
* This function gives the about information for BlueZone including the license used
* 
* @author Grace Llewellyn
*/

function About() {
    return (
        <div>
            <Header as="h1" dividing>About</Header>
            <font size="3">This web app was created by Alicia Steiman, Arjun Rao, Grace Llewellyn, Jodi Yeh, Josh Boss, and Zachary Lewitton
                for the class CS390 Collaborative Project: From concept to delivery.
                They will be hosting their launch party on ninth street on Thursday, December 2nd. In order to attend, you must
                create an account on BlueZone. </font>
            <Header as="h2">Terms of use</Header>
            <font size="3">This project uses a GNU General Public License v3. </font>
        </div>

    );
}

export default About;