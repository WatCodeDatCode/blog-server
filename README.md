# Final Project: Mongo Server for React Blog
## Table of contents
* [General information](#general-information)
* [Features](#features)
* [Future plans](#future-plans)

## General information
This database is set up for serving blog details and user authentication for a final project for the _Full-Stack Web Development_ program at _Hamburg Coding School_. The repo to the site using this database can be found [here](https://github.com/WatCodeDatCode/react-blog).

## Features
* At the /blogs route, blog details stored in the server can be fetched. 
* Additional routes here allow for posting of new blog details as well as putting changes. 
* The /users route offers routing for post requests, either for signing up new users or logging in. 
* Log ins are authenticated using JWTs and stored hashed in the server. 

## Future plans
* Add additional routes for updating stored passwords. 
* Grant specific roles to users as well as an admin to allow for more controlled user-functions on the front-end (i. e. deleting of posts only by owner of post or admin)
