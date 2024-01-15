# REST API and HTTP PROTOCOL FOR implementing CRUD OPERATIONS

# Project's objectives

phase 1:
- learn and implement REST API and HTTP protocol
- getting familiar with backend technologies like Node and Express
- getting familiar with persistency and basic querying using MongoDb and Mongoose
- using package management technologies like NPM 
- basic auth using jwt 
- learn testing tools like Postman 
- combine an external APIs using Axios lib
- using containers with docker 
- all the while practicing version control with git

phase 2:
- using more complex data , for more complex querying 
- roles using jwt
- basic CI 



# Installation

Clone the repository:
```
git clone https://github.com/MaoriMalca/MaoriMalca/REST-API-DB.git
```
Navigate to the project directory:
```
cd REST-API-DB
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

#### Add new collection of user data to MongoDB and register to api:

```POST/api/signup ```

Example (on Postman):	
```
POST http://localhost:5000/api/signup
```
Required body params: 
 `email=[string]`
 `password=[number]`
 `name=[string]`
 `age=[number]`
 `city=[number]`

It's also generating a unique ID for the new user.

#### Signin to api after register:

```POST/api/signin ```

Example (on Postman):
```
POST http://localhost:5000/api/signin
```
Required body params: 
 `email=[string]`
 `password=[number]`

You will get token for authorization, save it.


For the following endpoints you need to insert your token to header request (filed 'Authorization'):

#### Add new collection of user data to MongoDB:

```POST/api/create ```
		
Example (on Postman):	
```
POST http://localhost:5000/api/create
```
Required body params: 
 `name=[string]`
 `age=[number]`

It's also generating a unique ID for the new user.

#### Retrieve all the users data from MongoDB:

```GET/api/getAll ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getAll
```

#### Retrieve specific user data (based on ID) from MongoDB:

```GET/api/getByID/:id ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getByID/<id>
```
#### Retrieve specific user city weather (based on ID) from MongoDB:

```GET/api/getWeatherByID/:id ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getWeatherByID/<id>
```

#### Update specific user data (based on ID) from MongoDB:

```PATCH/api/updateByID/:id ```
		
Example (on Postman):	
```
PATCH http://localhost:5000/api/updateByID/<id>
```
Required body params(new data): 
 `name=[string]` for example
 
#### Delete specific user data (based on ID) from MongoDB:

```DELETE/api/deleteByID/:id ```
		
Example (on Postman):	
```
DELETE http://localhost:5000/api/deleteByID/<id>
```


# Additional Note:

1. Ensure that MongoDB is running before starting the server.
2. Customize the data model and routes according to your application's requirements.


