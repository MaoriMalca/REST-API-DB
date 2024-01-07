# REST API and HTTP PROTOCOL FOR implementing CRUD OPERATIONS

# Project's objectives

phase 1:
- learn and implement REST API and HTTP protocol
- getting familiar with backend technologies like Node and Express
- getting familiar with persistency and basic querying using mySQL and phpMyasmin
- using package management technologies like NPM 
- learn testing tools like Postman 
- combine an external APIs using Axios lib
- all the while practicing version control with git

# Usage

# API endpoints:


#### Add new collection of user data to mySQL:

```POST/api/create ```
		
Example (on Postman):	
```
POST http://localhost:5000/api/create
```
Required body params: 
 `email=[string]`
 `password=[string]`
 `name=[string]`
 `age=[number]`
 `city=[string]`

#### Retrieve all the users data from mySQL:

```GET/api/getAll ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getAll
```

#### Retrieve specific user data (based on email) from mySQL:

```GET/api/getByEmail/:email ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getByEmail/<email>
```
#### Retrieve specific user's city weather (based on email) from mySQL:

```GET/api/getWeatherByEmail/:email ```
		
Example (on Postman):	
```
GET http://localhost:5000/api/getWeatherByEmail/<email>

#### Update specific user data (based on email) from mySQL:

```PUT/api/updateByEmail/:email ```
		
Example (on Postman):	
```
PUT http://localhost:5000/api/updateByEmail/<email>
```
Required body params(new data): 
 `email=[string]`
 `password=[string]`
 `name=[string]`
 `age=[number]`
 `city=[string]`

#### Delete specific user data (based on email) from mySQL:

```DELETE/api/deleteByEmail/:email ```
		
Example (on Postman):	
```
DELETE http://localhost:5000/api/deleteByEmail/<email>
```
