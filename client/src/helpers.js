/*
* Helper functions that are used by multiple components are defined here
*/

// Builds the URL path when you click on a group card
export const buildPath = (nextGroup, prevGroups) => {
    let groupNames = [];
    prevGroups.map((group) => groupNames.push(group.name));
    groupNames.push(nextGroup.name);
    return groupNames.join("/");
}

// Formats the date which is given in YYYY-MM-DD HH:MM:SS (e.g. 2021-10-28T22:01:23.000Z)
// Returns "Month Day, Year at Time" 
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const formatDate = (date) => {
    const dateAndTime = date.split('T');
    const justDate = dateAndTime[0].split('-');
    const justTime = dateAndTime[1].substring(0, 8); // TODO: handle timezones
    return `${months[justDate[1] - 1]} ${justDate[2]}, ${justDate[0]} at ${justTime}`;
}

// Removes the subgroups from URL path when using navigational breadcrumbs in AppBar
export const removePath = (idx, prevGroups) => {
    let groupNames = [];
    // [a, b, c, d] click on b -- want to remove c, d from list
    let temp = prevGroups.slice(0, idx + 1);
    temp.map((group) => groupNames.push(group.name));
    return groupNames.join("/");
}