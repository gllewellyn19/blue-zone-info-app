import React, { useState } from 'react';
import { Button, Header, Divider } from "semantic-ui-react";

/**
 * Appearance settings for changing the text size and dark mode. Note that this file was not prioritized 
 *  and ended up not being implemented
 * 
 * @author Grace Llewellyn
 */

const inactiveColor = "white";
const activeColor = "blue";

function AppearanceSettings() {

    const [darkMode, setDarkMode] = useState(false);
    const [largeText, setLargeText] = useState(false);

    return (
        <div>
            <Header as="h1" dividing>
                Appearance settings
            </Header>
            <font size="3">Dark mode:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={darkMode ? activeColor : inactiveColor}
                    onClick={function () { setDarkMode(darkMode => true) }}>On</Button>
                <Button
                    color={!darkMode ? activeColor : inactiveColor}
                    onClick={function () { setDarkMode(darkMode => false) }}>Off</Button>
            </Button.Group>
            <Divider hidden />
            <font size="3">Large text:</font>
            <Divider hidden />
            <Button.Group>
                <Button
                    color={largeText ? activeColor : inactiveColor}
                    onClick={function () { setLargeText(largeText => true) }}>On</Button>
                <Button
                    color={!largeText ? activeColor : inactiveColor}
                    onClick={function () { setLargeText(largeText => false) }}>Off</Button>
            </Button.Group>

        </div>

    );
}


export default AppearanceSettings;