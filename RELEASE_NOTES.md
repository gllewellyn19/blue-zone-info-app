# Release Notes

## Current Functionality (Last updated December 9, 2021)

BlueZone's current functionality:

* See posts on a page
* Create a new post in any group or subgroup
* Filter posts by relevant and top
* Save a post or comment and have it show up on the profile page
* User login
* Create a user
* Add a group with a description and see that description in the little i next to the group's page
* Return to the homepage by clicking on the logo
* Comment on a post
* Navigate through groups using the AppBar
* Ability to report and unreport posts with a confirmation screen
* Like and unlike a post as well as see the number of people who have also liked it
* Create a subgroup with description and see that description in the little i next to the subgroup's page
* See information about yourself in the profile page
* See information about BlueZone in the settings page



## Known Bugs (Last updated December 9, 2021)

* Comment on a sub-comment breaks
* Cannot filter the home page
* Some data doesn't persist (like data not pushed to the backend and is stored locally in state). This means that when you refresh the page you are automatically logged out. 
* Need to refresh to leave the page to see the page you just reported missing
* Sometimes when you post a post you can see it in the profile of user's posts and other times you need to do a hard refresh to see the post

## Assumptions and Limitations (Last updated December 9, 2021)

The current functionality is currently limited to a web application. While accessible on mobile, the current state of the project is best-suited for a web application. An additional limitation is the inability to search.

Another limitation is the time zone changes when a post and comment is created.

Users will refresh the page to see other peoples' posts in real-time.

The user will have a computer that can run the version of react-app.



## Platforms Tested

This platform has been tested on both Mac OS Big Sur and Windows 10
