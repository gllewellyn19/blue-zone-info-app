import { Button } from 'semantic-ui-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

/*
* This function is the notification button to put in the AppBar. Note that we didnt have time to implement notifications so this file isnt 
* used but is included for you all to view
*
* @author Alicia Steiman, Grace Llewellyn
*/

function NotificationButton() {
  const [activeItem, setActiveItem] = useState();
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Button
      icon='bell'
      labelPosition='right'
      as={NavLink}
      to="/notifications"
      name="notifications"
      active={activeItem === "notifications"}
      onClick={handleItemClick}
    />
  );
}

export default NotificationButton;