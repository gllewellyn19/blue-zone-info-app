## Table of contents
* [Install Instructions](#install-instructions)
* [Updates](#updates)
* [Open Source](#open-source)

## Install Instructions

An assumption that comes with installation is that your computer will be able to support the versions of Docker, Express, Node, and mySQL installed.

### Back-End Local Installation Instructions

The Back-End utilizes Docker compose up and down to create the database. In order to construct the back-end, create an .env file on the top-most level with the following (and put in personalized inputs):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD= (your local password)
DB_DATABASE= (your local database name)
DB_PORT=3306

APIKEY= for sake of privacy, we will not disclose the APIKey on GitLab

MYSQLDB_USER=root
MYSQLDB_ROOT_PASSWORD=password
MYSQLDB_DATABASE=BlueZone
MYSQLDB_LOCAL_PORT=3307
MYSQLDB_DOCKER_PORT=3306

NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080
```
After creating the .env file, run the following command:
```
docker-compose up --build -d
```
Docker will run `npm start` and all the dependencies (Docker, Express, Node, mySQL) will be installed for you. The project will run at (localhost:6868). 

If you want to shut down the server:
```
docker-compose down
```

To run the database server locally without Docker, run 
``` 
npm start
```
The script will do the same thing and all the dependencies will be installed for you. To start it locally, it is crucial that you make your own local mySQL database instance and adjust the inputs in the .env file. Follow (these instructions) [https://dev.mysql.com/doc/mysql-getting-started/en/] to make a local mySQL instance.

### Front-End Local Installation

To properly run the front-end, make sure the back-end database server is running. This is where it will draw data from through axios calls.  

To locally run the front-end, we need to make a config.js file. Cd into the client folder and create a 'config.js' file. In this file, write:
```
export const API_KEY = ` (insert API Key here) `;
export const BASE_URL = 'localhost:3000';
```
where the API_Key is the APIKey for the server, which we will not push onto GitLab. The BASE_URL will be wherever you want it hosted; it could change to be the deployed back-end IP address as well.

Then, run the following commands:
```
npm install (only need to do this once!) 
npm start
```
	
## Updates

### Update Port Numbers

If you'd like to update the port number, this can be taken care of in the environment file. On your local version for the back-end, change the NODE_LOCAL_PORT or NODE_DOCKER_PORT variables. If you are running it locally, if you change NODE_DOCKER_PORT to be the port you'd like the database to run on, or the one that matches the front-end port it references the database from locally. NODE_LOCAL_PORT is the port NODE_DOCKER_PORT is being routed to. Right now, we would be able to see it on localhost:6868. 
```
NODE_LOCAL_PORT=6868
NODE_DOCKER_PORT=8080
``` 
On the AWS instance, we would have to go into the .env filed uploaded into the server. We'd do the same changes as above, except it would be hosted on AWS IP ADDRESS: 6868. 

For the front-end port number, change the config.js file to be wherever you'd like the front-end web application hosted. 
```
export const BASE_URL = 'localhost:3000';
```
For instance, hosting onto port 8080 would change it to :

```
export const BASE_URL = 'localhost:8080';
```

Then hosting onto the deployed address would be the IP Address instead.

### Updating the Database Schema 

In order to update the database schema, we need to alter the mySQL database. First, log on to the AWS EC2 container (not disclosing here as it is Zach's personal account), then go into the BlueZone folder. Run the following command:
```
docker exec -it \bin\bash
mysql -u -root -p
```
and then type in the MYSQLDB_ROOT_PASSWORD, which in this case, is password.

Now we are in the mySQL database. Run 
```
use BlueZone
```
to use the BlueZone database; We can then alter the database schema. Here are some potential useful commands:

If we wanted to create a savings table, copy and paste this into the mySQL bash. This can be altered to be whatever schema you want.
```
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

To rename a column in an existing table:
```
ALTER TABLE TableName
RENAME COLUMN OldColumnName TO NewColumnName;
```
To change column type in an existing table:
```
ALTER TABLE TableName
CHANGE COLUMN OldColumnName NewColumnName Data Type;
```
To add a column to an existing table:
```
ALTER TABLE table_name
ADD column_name datatype;
```
These are just some examples and ways the schema can be updated. 

### Add a New Route or Alter Existing Routes

First, log on to the AWS EC2 container (not disclosing here as it is Zach's personal account), then cd into the BlueZone folder. We can alter existing code on our local BlueZone repository then push to GitHub. After it is merged into the respective branch, we can go into the EC2 container and git pull. Then, we can 
``` 
docker-compose down 
```
and 
```
docker-compose up
```
to restart the server with the new routes.
	
## Open Source

* MySQL 8.0 [https://downloads.mysql.com/docs/licenses/mysqld-8.0-gpl-en.pdf]
* Express 4.17.1 [https://github.com/expressjs/express/blob/master/LICENSE]
* dot env 10.0.0 [https://github.com/motdotla/dotenv/blob/master/LICENSE]
* cors 2.8.5 [https://github.com/motdotla/dotenv/blob/master/LICENSE]
* body-parser 1.19.0 [https://github.com/expressjs/body-parser/blob/master/LICENSE]
* bcrypt 5.0.1 [https://github.com/kelektiv/node.bcrypt.js/blob/master/LICENSE]
* nodemon 2.0.14 [https://github.com/remy/nodemon/blob/main/LICENSE]
* redux toolkit 1.6.2 [https://github.com/reduxjs/redux/blob/master/LICENSE-logo.md#:~:text=The%20Redux%20logo%20is%20dedicated,purposes%2C%20all%20without%20asking%20permission.]
* testing-library/jest-dom 5.14.1 [https://github.com/testing-library/jest-dom#license]
* testing-library/react 11.2.7 [https://github.com/testing-library/react-testing-library/blob/main/LICENSE]
* testing-library/user-event 12.8.3 [https://github.com/testing-library/user-event#license]
* axios 0.24.0 [https://github.com/axios/axios-docs/blob/master/LICENSE]
* bootstrap 5.1.3 [https://github.com/twbs/bootstrap/blob/main/LICENSE]
* react 17.0.2 [https://github.com/facebook/react/blob/main/LICENSE]
* react-bootstrap 2.0.1 [https://github.com/twbs/bootstrap/blob/main/LICENSE]
* react-dom 17.0.2 [https://github.com/facebook/react/blob/main/LICENSE]
* react-redux 7.2.5 [https://github.com/facebook/react/blob/main/LICENSE]
* react-router 6.0.1 [https://github.com/reduxjs/react-redux/blob/master/LICENSE.md]
* react-router-dom 6.0.1 [https://github.com/remix-run/react-router/blob/main/LICENSE.md]
* react-scripts 4.0.3 [https://github.com/facebook/create-react-app/blob/main/LICENSE]
* semantic-ui-css 2.4.1 [https://github.com/Semantic-Org/Semantic-UI/blob/master/LICENSE.md]
* semantic-ui-react 2.0.4 [https://github.com/Semantic-Org/Semantic-UI-React/blob/master/LICENSE.md]
* styled-components 5.3.3 [https://github.com/styled-components/styled-components/blob/main/LICENSE]
* web-vitals 1.1.2 [https://github.com/GoogleChrome/web-vitals#license]
* npmjs 4.0. [https://www.npmjs.com/package/forever]

