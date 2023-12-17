# REST API FOR CRUD OPERATIONS

This is a project made in order to apply topics I've been learning recently about building REST APIs with JavaScript and Node.js.
In my project,using REST API, I implemented CRUD operations on Mongodb database collection by sending an HTTP requests to the server. (See the schema that defines my database structure in 'mongoose_model' folder).
In my project the server is local.


# Technologies used

-Node.js
-Express.js
-MongoDB
-Mongoose
-Postman


# Prerequisites

For using my project, ensure you have met the following requirements:

1. Node.js and npm 
2. Express.js - Node.js web application framework.
3. Mongoose - Object Mapping between Node and MongoDB managed via Mongoose.
4. git - Clone the project repository.
5. Text editor or IDE - View the project's source code. 
6. Postman - Test and interact with the API endpoints.


# Installation

Clone the repository:
```
git clone https://github.com/MaoriMalca/MaoriMalca/REST-API-MongoDB.git
```
Navigate to the project directory:
```
cd REST-API-MongoDB
```
Install dependencies:
```
npm install
```

# Set up MongoDB

Start your MongoDB server.

Configure environment:

1.  See `.env.example` file from 'example' folder.
2.  Create a new environment file by copying and pasting the example file. 
    ```
    cp .env.example .env
    ```
3.  Change the values of the file according the example file instructions.


# Usage

### Runnig the server:

start the sever:
```
npm start
```
If the server is running successfully, you will get the following output:

```
Server is running on port 5000
Database connected
``````

### Connect to the client API using Postman on port 5000.


# API endpoints:

#### Add new collection of user data to MongoDB:

```POST/api/create ```
		
Example (on Postman):	
```
POST https://localhost:5000/api/create
```
Required body params: 
 `name=[string]`
 `age=[number]`

It's also generating a unique ID for the new user.


#### Retrieve all the users data from MongoDB:

```GET/api/getAll ```
		
Example (on Postman):	
```
GET https://localhost:5000/api/getAll
```

#### Retrieve specific user data (based on ID) from MongoDB:

```GET/api/getByID/:id ```
		
Example (on Postman):	
```
GET https://localhost:5000/api/getByID/<id>
```

#### Update specific user data (based on ID) from MongoDB:

```PATCH/api/updateByID/:id ```
		
Example (on Postman):	
```
PATCH https://localhost:5000/api/updateByID/<id>
```
Required body params(new data): 
 `name=[string]`
 `age=[number]`

 
#### Delete specific user data (based on ID) from MongoDB:

```DELETE/api/deleteByID/:id ```
		
Example (on Postman):	
```
DELETE https://localhost:5000/api/deleteByID/<id>
```

# Additional Note:

1. Ensure that MongoDB is running before starting the server.
2. Customize the data model and routes according to your application's requirements.


