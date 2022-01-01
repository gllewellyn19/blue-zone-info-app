import React from 'react';
import { Header, Item } from 'semantic-ui-react';
import NotificationsList from "../components/notifications/NotificationsList";

/*
* Notifications page when you choose to expand your options. Note that we decided not to do notifications so this file isnt used
* @author: Grace Llewellyn, Alicia Steiman
*/

function Notifications() {
    return (
        <div>
            <Header as="h2">Notifications</Header>
            <Item.Group divided link>
                <NotificationsList isDropdown={false} />
            </Item.Group>
        </div>
    );
}

export default Notifications;