# BlueZone: CompSci 390 Project

See our project here: [http://3.15.39.214:3000/]

## Table of contents
* [Executive Summary](#executive-summary)
* [Dependencies](#dependencies)
* [Setup](#setup)

## Executive Summary

As Duke students, it's extremely difficult to get candid opinions and thorough information on topics such as classes, majors, dorm culture, and dining options. Information crucial to the success of Duke students is often gate kept behind the walls of exclusive student groups. BlueZone aims to solve these problems; we plan to create a web app for students that leverages discussion boards and anonymous posting to facilitate honest conversations about all things Duke. The app will use a “groups and subgroups” structure to organize the discussion boards. Users can create posts specific to a group or subgroup as well as comment on and react to existing posts. There will be smart filtering on posts in the discussion groups so that users can sort by newest or most liked, for example. We hope that BlueZone will foster greater conversations about topics Duke students are most curious about so that our peers can get clear information, especially in situations where they might be too afraid to ask. There is also an opportunity for this app to be extended to all universities, or even large companies where access to information and need for discussion is crucial. BlueZone will be open to anyone with a duke.edu email address.

	
## Dependencies

BlueZone is dependent on a [back-end repository](https://github.com/BleuZone/BlueZone) hosted on GitHub. It consists of the back-end database with routes for the front-end web app to call from (project_BlueZone GitLab repository, this one). This GitHub repository is deployed onto Amazon Web Services (AWS) and axios calls are made from the front-end to the deployed database address.

The front-end is dependent on Axios calls to the back-end server as well as semantic-ui for styling. It is dependent on redux as well to allow for a centralized state in a React-app; this way, components don't need to get data just from their parent.

	
## Setup

To deploy the [back-end](https://github.com/BleuZone/BlueZone), we need to utiize Docker and Amazon Web Services. After creating the Amazon EC2 container, we [create an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) within the container in order to be able to pull our backend code down from github. After adding that key to GitHub, we can clone our GitHub repository into the container. We can install docker into the ECS container by using `sudo yum install docker`. Start the Docker service, `sudo service docker start` and add the EC2-user (whatever your AWS-EC2 username is) to the Docker group so you don't have to sudo anymore, `sudo usermod -a -G docker ec2-user`.  Now that we have Docker installed and the repository is in the container, cd into the respective directory containing the docker-compose file. In this directory, we need to create an .env file containing the Docker database server information. You can use touch and vim to create and write this file as the GitHub is dependent on those settings. Now run `docker-compose up --build -d` to begin the composition of the volume containing the web and mySQL database images. Navigate to the mySQL database inside docker with `docker exec -it /bin/bash` followed by `mysql -u root -p`, and type in your database password. Add your initial data to the database and when you're done, run `docker-compose down` to shut it down. 

On the AWS home page, there should be an IP Address. That is where your server is launched and that is the address the front-end should be connecting and routing from. 

To deploy the front-end, (found in this repo), we also utilize an AWS EC2 instance. We use an entirely different instance though, so in total we have 2! We follow very similar steps to the ones outlined for the backend, as we ssh into the EC2 instance from our local terminal utilizing the key downloaded from the EC2 instance upon creation, before creating a different an [ssh key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) in the instance and pasting it into Josh's gitlab list of ssh keys. Then we were able to clone our front end code from gitlab into our EC2 instance. We have to download node from scratch because we don't have a dockerized front end, utilzing the directions found (here)[https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html]. We then run `npm run build` in order to build a production version of our code and `serve -s build`. The front end is served at the EC2's IP address.
