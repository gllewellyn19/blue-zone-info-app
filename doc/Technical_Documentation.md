## Table of contents
* [In Code Comments](#in-code-comments)
* [Overall Architecture Design including justification](#overall-architecture-design)
* [Database Schema](#database-schema)

## In Code Comments

The comments can be seen in  every Controller and route in the (back-end GitHub)[https://github.com/BleuZone/BlueZone]. In this repository, there are comments for each function as well. 

An example of in-code comments in the back-end routes:

```
/**
 * DELETE: deletes specific post
 * PUT: edits specific post
 */
router.route('/Posts/:id')
  // .get((req, res) => {
  //   PostController.getSinglePost(req, res);
  // })
  .delete((req, res) => {
    PostController.deletePost(req, res)
  })
  .put((req, res) => {
    PostController.editPost(req, res)
  });

  ```

An example of in-code comments in the Groups template for the front-end:

```
/*
* Template for a Group page (e.g. Majors, Dorms, etc.)
* Can navigate to the Group page by clicking one of the "group cards" on the Home page
*/

function Group() {
    return (
        <div>
            <div style={{ paddingRight: 10, paddingBottom: 15, display: "flex", justifyContent: "flex-end" }}>
                <NewGroup />
            </div>
            <GroupsDisplay />
            <div style={{ paddingBottom: 15, paddingTop: 10, paddingLeft: 5, paddingRight: 5 }}>
                <NewPost />
            </div>
            <SortByDropdown />
            <PostList />
        </div>
    );
}

```

For the programmers that want to modify the app, going through each file, there are comments on what each function and reducer does.

	
## Overall Architecture Design

The architecture design graph is in the doc folder for reference.

In general, we are building a full stack web application that should support many concurrent users. To understand our design, it’s important to understand our tech stack. In the most basic of categories, we have a frontend (or client) which allows the user to interact with our software. We chose to use the React JS framework to utilize reusable components and make things easier. Other frontend packages include Semantic UI for styled UI components, React Router to handle page navigation, and Redux for state management. We chose to use these packages because it provides code that can be easily integrated into a React app. The Semantic UI package also saves us from having to build our own grids or cards, for example. Redux is a commonly used package that gives all components access to a global state rather than "passing state up" the component tree (which tends to lead to messy and hard-to-follow code). For more information on the project structure, check out Frontend Docs.

We also have our backend (see repo)[https://github.com/BleuZone/BlueZone], which provides all the data necessary for our frontend to display. Diving deeper into our backend, we decided to utilize a Node.js web server built using the Express framework for hosting our backend APIs. These APIs will receive requests from our frontend, call the appropriate functions, and then return a response in the proper format. We are using JSON objects as responses since they are easily parsed with JavaScript (i.e. our frontend language). Moving deeper into our backend structure, we also have controllers. There are controllers for each major path group: /Users, /Posts, /Pages, /Comments. The controllers essentially house functions that organize interactions with our database, clean the resulting data, and return it to our Express router which then sends it to the frontend. For example, the /Users controller houses functions such as “createUser” to create a User and “deleteUser” to delete a user. These controller functions will call our Model functions, which are what interact with our database. Each model function is designed to do one task involving the database. There is no logic in these model functions other than queries like “getPosts” which returns all the post information given a page ID, or “createComment” which adds a comment record to our Comments table. These functions all look fairly similar, as they generally just execute one SQL query using the function parameters as inputs in the query string. For more information, check out Backend Docs. [https://coursework.cs.duke.edu/compsci390_2021fall/project_BlueZone/-/wikis/backend-docs]

Finally, at the bottom of our tech stack is our mySQL database. We elected to utilize a SQL database rather than a no-SQL database because we felt that it would be easier to structure our data. We also decided that we didn’t need the flexibility document storing databases such as MongoDB provided, and we felt it would be more inefficient. If we were to use a no-sql database, we’d be sending super large Mongo objects of comment strings, and it would likely be super messy. We elected to use mySQL rather than POSTGRES because it’s simpler and easier to use. Additionally, having everything related in our SQL database tables makes more sense for us. We didn’t need some of the fancy features POSTGRES has and didn’t want to go through the headache of setting it up. Our database is structured as follows: we currently have tables for Users, Usernames, Posts, Comments, and Pages. Many of the fields in some tables are foreign keys in others. If you are interested in seeing our exact structure, please visit BlueZone Schema.

We feel that the above is the best way to organize our software, as it’s not only industry standard but also incredibly simple. In our design, the frontend doesn’t need to interact with anything but JSON objects, and the calls they make to the backend are packaged very logically (i.e. there is only one call per desired outcome in the frontend so that what happens in the backend can remain in a "black box"). The backend’s design is also very simple and logical. There is the router which receives requests, the controllers which take information from request parameters given by the router and use it to execute most of the logic. We also have the models which act as translators between JavaScript and the database, and then the database itself. We encapsulate things very well, so that most functions and files only have one job. This design also makes it incredibly easy when it comes time to test. We can have tests to make sure our routes are working, we can have tests for our Model functions to make sure that they are interacting with the database properly, and finally we can have tests to make sure that everything is being brought together appropriately. If we have a bunch of passing tests for our Model functions, we can eliminate issues with our database when trying to decipher where a bug is occurring. React JS also provides a Jest framework for testing, which allows us to verify that the correct components are being rendered in the right spot and displaying the right information.

One specific issue that we discussed as a team was how to call model functions that were solely focused on retrieving or updating data in the database. These functions needed to be called based on prompts from the frontend, but we did not want the frontend to directly call these model functions and interact with the database. The obvious choice to resolve this issue was to use a controller. After some discussion, the backend team decided to organize the controller with "mini-controllers" for each path group (Users, Username, Posts, Pages, Comments). Each controller would be responsible for calling model functions that had data endpoints located in each respective table (Users, Username, Posts, Pages, Comments). One other option that we considered was to have one centralized controller that would call all model functions. After some discussion we came to the conclusion that this controller would be calling many different model functions and would result in a cluttered controller. Since model functions were all relatively simple, we also considered calling these functions directly from the frontend requests but quickly decided against this as it would allow for too much interaction between the frontend and database directly. As far as dependencies related to other issues, choosing to have separate controllers for each path group will allow us to avoid organization problems in the future where we will not be able to easily track the calls to model functions.

All of this is contained in a Docker container and deployed on Amazon Web Services. We deployed it on Docker first so everything can be downloaded into one spot without having to download node, express, mysql directly into the container itself. Then, with port forwarding, we can use axios calls from the front-end to retrieve the information from the IP address.  

The front-end is structured into components, pages, and reducers. Every object on the front-end is in the components folder. We have the AppBar. which  is displayed at the top of every page, allows the user to navigate through the app. At its most basic level, AppBar contains the BlueZone logo, a search bar, and a profile icon. Then, there's the ProfileBar which is the bar that helps you navigate the profile page (shows posts and groups). Essentially, every sort of "bar" that leads to different screens exists in the components group. Following this, we can further organize what "new" things need to be created: groups, comments, posts, notifications. In the respective folder, there is a template for a new component of groups, comments, posts, and notifications. Then there is the overall display of everything that has to do with that functionality. 

All of these components live on pages. The pages are created in another directory and utilize the components. In order to get the data to populate any of these components, the front-end utilizes axios calls within reducers. There are three main reducers: groups, comments, and posts. These reducers communicate with the back-end server by calling a specific route. Then, it will use the response and load the data into created pages and components.
	
## Database Schema

In the doc folder, there is an image with our database schema design. Please reference the database schema design for specific insights to what tables contain. The interactions are detailed below.

For the database schema design, our initial thought was to include usernames as a part of the User table in the database. We thought that user information should include username as a key. However, we had also made a decision to allow users to have multiple usernames with a different username per page that they join. Therefore, it would be difficult to distinguish users if we kept usernames and user information (e.g. email, password) in the same table on SQL. Instead, we chose to have a separate username table in our database that would match usernames to user ids. This database design allowed for the same user id to have multiple different usernames attributed to it. This one user id would then be attributed to specific user information like email and password. Another important reason we opted for this design was that we wanted each user profile (username) to have a certain number of points/karma based on the engagement of the user. These points would be attributed to a username and not a user email so that when other users click on the profile they only see the profile from one page and cannot identify any user based off of their activity. We considered holding multiple usernames within the User table, but quickly decided against this option as having a Username table allowed for a more organized structure and separated secure user information like user email and password from a user’s points and username.

The username from the username_matching table is referenced in posts, comments, and the reported table. When the user creates a post or comment, the username is displayed on that post or comment. If the username is deleted, the relevant attached posts and comments are deleted as well. When a post is created, the post is tied to a page_id that the post lies on. If a comment is created, it is tied to the post_id. Essentially, whenever some component is created, the id of the object it exists on is a factor in the schema.

For reporting, currently the reported posts gets moved from the posts table to the reported one. To unreport, the post gets moved back from the reported one and back to the posts. 

For saved posts, if a user saves a post, that user's personal id is tied to that table as well as the post that user decided to save.

This is how the tables interact in mySQL code: 

```
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_email varchar(255) NOT NULL,
  user_password varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE username_matching (
  id INT AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  points INT,
  FOREIGN KEY (id) REFERENCES users(id),
  PRIMARY KEY (username)
);

CREATE TABLE pages (
  page_id INT NOT NULL AUTO_INCREMENT,
  page_title varchar(255) NOT NULL,
  page_parent_id INT,
  post_count INT NOT NULL,
  page_description varchar(255),
  PRIMARY KEY (page_id)
);

CREATE TABLE posts (
  post_id INT NOT NULL AUTO_INCREMENT,
  post_title varchar(255) NOT NULL,
  post_body TEXT,
  points INT NOT NULL,
  page_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  comment_count int NOT NULL,
  username varchar(255),
  FOREIGN KEY (username) REFERENCES username_matching(username) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (page_id) REFERENCES pages(page_id) ON DELETE CASCADE,
  PRIMARY KEY (post_id)
);


CREATE TABLE comments (
  comment_id INT NOT NULL AUTO_INCREMENT,
  username varchar(255),
  comment TEXT NOT NULL,
  parent_id INT,
  post_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  points INT NOT NULL,
  FOREIGN KEY (username) REFERENCES username_matching(username) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id)
);

CREATE TABLE reported (
  post_id INT NOT NULL,
  post_title varchar(255) NOT NULL,
  post_body TEXT,
  points INT NOT NULL,
  page_id INT NOT NULL,
  creation_time TIMESTAMP NOT NULL,
  comment_count int NOT NULL,
  username varchar(255),
  FOREIGN KEY (username) REFERENCES username_matching(username),
  FOREIGN KEY (page_id) REFERENCES pages(page_id),
  PRIMARY KEY (post_id)
);

CREATE TABLE saving (
  save_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT,
  comment_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(comment_id) ON DELETE CASCADE,
  PRIMARY KEY (save_id)
);
```

