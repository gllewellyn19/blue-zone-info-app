import { useState } from 'react';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory, fetchGroups, history } from '../reducers/groups';
import { fetchAllPosts, fetchPosts, filter } from '../reducers/posts';
import { removePath } from '../helpers';

/*
* AppBar is displayed at the top of every page, allows the user to navigate through the app
* From the AppBar there is a logo that takes the user to the home screen and there is the profile
* button that allows the user to see information about their profile
* Through the AppBar the user can also navigate through the different groups for the web app that they 
* have nested themselves in
*
* @author Alicia Steiman
*/

function AppBar() {
    const [activeItem, setActiveItem] = useState("home");

    let navigate = useNavigate();

    const groupsHistory = useSelector(history);
    const currFilter = useSelector(filter);
    const dispatch = useDispatch();

    function handleGroupItemClick(group, index) {
        setActiveItem(group.name);
        dispatch(fetchGroups({ groupId: group.id, group: group, index: index }));
        dispatch(fetchPosts({ pageId: group.id, filter: currFilter }));
        navigate(removePath(index, groupsHistory));
    };

    function handleHomeClick() {
        setActiveItem("home");
        dispatch(fetchGroups({ groupId: 1, group: { id: 1 }, index: 1 }));
        dispatch(fetchAllPosts());
        navigate("/");
    };

    function handleProfileAndSettingsClick(path) {
        dispatch(clearHistory());
        navigate(path);
    }

    return (
        <Menu pointing secondary size="large">
            <Menu.Item key="home" name="home" active onClick={() => handleHomeClick()} className="blueZoneLogo">
                <Image src={require('../assets/BlueZoneLogo.png').default} size="small" floated="left" />
            </Menu.Item>
            {groupsHistory != null && groupsHistory.map((group, index) =>
                <Menu.Item key={group.id} name={group.name} active onClick={() => handleGroupItemClick(group, index)}>
                    {group.name}
                </Menu.Item>
            )}
            {/* <Menu.Item position="right">
                <SearchBar />
            </Menu.Item> */}
            <Menu.Menu position="right">
                {/* <Menu.Item position="right">
                    <Dropdown item icon="bell" active>
                        <Dropdown.Menu direction="left">
                            <Dropdown.Header content="Notifications" />
                            <NotificationsList />
                            <Dropdown.Item content="See all" onClick={() => navigate("/notifications")} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item> */}
                <Menu.Item position="right" className="profileDropdown">
                    <Dropdown item icon="user" active size="large">
                        <Dropdown.Menu direction="left">
                            <Dropdown.Item content="Profile" onClick={() => handleProfileAndSettingsClick("/profile")} />
                            <Dropdown.Item content="Settings" onClick={() => handleProfileAndSettingsClick("/settings")} />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu>
        </Menu >
    );
}

export default AppBar;