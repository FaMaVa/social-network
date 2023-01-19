# social-network

[Walkthrough Video](https://youtu.be/uWQ4QzbDkM0)

## Description

This code was designed as an API for social media applications. 

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

You need to install Node.js and MongoDB to run this API.
Once installed, navigate to this API in your terminal and type "npm i" to download the Express, Mongoose, Nodemon, and Moment npm packages.

## Usage

After installing the requirements, navigate to this API in your terminal and type "npm start" to start the server, then you can navigate the API with the following routes:
- View all Users (GET route): http://localhost:3001/api/users
- View one User (GET route): http://localhost:3001/api/users/:userId
- Create a User (POST route): http://localhost:3001/api/users
- Update a User (PUT route): http://localhost:3001/api/users/:userId
- Delete a User (DELETE route): http://localhost:3001/api/users/:userId
- Add a Friend (POST route): http://localhost:3001/api/users/:userId/friends/:friendId
- Remove a Friend (DELETE route): http://localhost:3001/api/users/:userId/friends/:friendId
- View all Thoughts (GET route): http://localhost:3001/api/thoughts
- View one Thought (GET route): http://localhost:3001/api/thoughts/:thoughtId
- Create a Thought (POST route): http://localhost:3001/api/thoughts/:userId
- Update a Thought (PUT route): http://localhost:3001/api/thoughts/:thoughtId
- Delete a Thought (DELETE route): http://localhost:3001/api/thoughts/:thoughtId
- Create a Reaction (POST route): http://localhost:3001/api/thoughts/:thoughtId/reactions
- Delete a Reaction (DELETE route): http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
<br/> 
<br/>

## Credits

N/A

## License

MIT