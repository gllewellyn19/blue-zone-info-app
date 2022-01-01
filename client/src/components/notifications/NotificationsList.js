import Notification from './Notification';

/*
* This function is list of notifications supplied with dummy data because this was never done in the backend 
* This file isnt used but is included for you all to view
*
* @author Grace Llewellyn
*/

const notification1 = {
    authorImage: require('../../assets/avatar.png').default,
    authorName: 'anonymous tree',
    timestamp: new Date(2021, 9, 25, 10, 22, 0), // year, month (0-indexed), day, hours, minutes, seconds
    type: "LikedPost",
    groupName: "PoliSci",
};

const notification2 = {
    authorImage: require('../../assets/avatar.png').default,
    authorName: 'anonymous bird',
    timestamp: new Date(2021, 9, 22, 4, 57, 0), // year, month (0-indexed), day, hours, minutes, seconds
    type: "LikedPost",
    groupName: "CS390",
};

const notification3 = {
    authorImage: require('../../assets/avatar.png').default,
    authorName: 'anonymous bird',
    timestamp: new Date(2021, 9, 22, 4, 57, 0), // year, month (0-indexed), day, hours, minutes, seconds
    type: "CommentedPost",
    groupName: "Majors",
};

const notification4 = {
    authorImage: require('../../assets/avatar.png').default,
    authorName: 'anonymous bird',
    timestamp: new Date(2021, 9, 22, 4, 57, 0), // year, month (0-indexed), day, hours, minutes, seconds
    groupName: "CS101",
    type: "NewPost",
};

const notification5 = {
    authorImage: require('../../assets/avatar.png').default,
    authorName: 'anonymous bird',
    timestamp: new Date(2021, 9, 22, 4, 57, 0), // year, month (0-indexed), day, hours, minutes, seconds
    type: "RepliedComment",
    groupName: "CS390",
};


const notifications = [notification1, notification2, notification3, notification4, notification5];

function NotificationsList({ isDropdown = true }) {
    return notifications.map((notification) => <Notification notification={notification} isDropdown={isDropdown} />)
};

export default NotificationsList;