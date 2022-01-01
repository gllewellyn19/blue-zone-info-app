import { Dropdown, Item } from 'semantic-ui-react'

/*
* Notification components are rendered in NotificationList
* where NotificationList is the content of <Dropdown item> for notifications in AppBar
* Note that we decided to remove notifications because it wasnt done in the backend in time
*
* @author Alicia Steiman, Grace Llewellyn
*/


var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const buildNotificationText = (type) => {
    if (type === "LikedPost") {
        return "liked your post in";
    } else if (type === "CommentedPost") {
        return "replied to your post in";
    } else if (type === "NewPost") {
        return "posted in your group";
    } else if (type === "RepliedComment") {
        return "replied to your comment in"
    }
}

function Notification({ notification, isDropdown }) {
    const image = { avatar: true, src: require('../../assets/avatar.png').default };
    const formattedDate = notification.timestamp.toLocaleDateString("en-US", dateOptions);

    return (isDropdown ?
        <Dropdown.Item
            key={notification.id}
            image={image}
            text={<span>{notification.authorName} {buildNotificationText(notification.type)} {notification.groupName} &#183; <span style={{ color: "grey" }}>{formattedDate}</span></span>}
        /> :
        <Item>
            <Item.Image size="mini" src={require('../../assets/avatar.png').default} />
            <Item.Content>
                <Item.Header>{notification.authorName} {buildNotificationText(notification.type)} {notification.groupName}</Item.Header>
                <Item.Meta>{formattedDate}</Item.Meta>
                <Item.Description>Will eventually replace this with a preview of the comment/post</Item.Description>
            </Item.Content>
        </Item >
    );
}

export default Notification;