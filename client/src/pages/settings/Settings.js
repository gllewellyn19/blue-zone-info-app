import { Tab } from "semantic-ui-react";
import React from 'react';
import About from "../.././components/settings/About";
import Help from "../.././components/settings/Help";
import Privacy from "../.././components/settings/Privacy";

/*
* Setting page currently contains information about BlueZone in regards to privacy, about information and help
*
* @author Grace Llewellyn
*/

function Settings() {
  const panes = [
    {
      menuItem: 'Privacy',
      render: () => <Privacy />,
    },
    {
      menuItem: 'Help',
      render: () => <Help />,
    },
    {
      menuItem: 'About',
      render: () => <About />,
    },
  ]

  // Will probably need to change the label for the groups/subgroups menu items
  // Unless we think the pathname will be the name of the group/subgroup
  // Otherwise we can probably do some sort of id lookup based on what's in the URL
  return (
    <div>
      <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
    </div>
  );
}

export default Settings;