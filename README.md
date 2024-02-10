# Project Flutter-App Backend

## Overview

This project is a NodeJS backend application created using Express and MongoDB. It follows the MVC (Model-View-Controller) model, consisting of three different models: User, Data, and Tags.

## Models

### 1. User

- Fields:
  - username
  - email
  - password
  - timestamps

#### Endpoints for User:

- **POST** `/api/createuser`: Create a new user with unique email and username. Requires {email, password, username}.
- **GET** `/api/getuser`: Retrieve details of a logged-in user. Authentication is done via JWT (JSON Web Token) using a middleware {fetchUser}.
- **POST** `/api/login`: Log in a user if the credentials are correct.

### 2. Data

- Fields:
  - title
  - description
  - tags (array of strings)
  - username
  - user (reference to 'User' model)

#### Endpoints for Data:

- **GET** `/api/data`: Get all different data on the main screen (No authentication required).
- **POST** `/api/addData`: Add new data. Requires authorization via JWT in the headers' Bearer token.
- **PUT** `/api/updateData`: Update a data entry. Requires authorization via JWT in the headers' Bearer token.
- **DELETE** `/api/deleteData`: Delete a data entry. Requires authorization via JWT in the headers' Bearer token.

### Tags

- Tags associated with data are handled via the 'tags' array in the Data model.
- Tags are created, updated, and deleted using the Tags model whenever a data entry is added, updated, or deleted.

## Additional Endpoint

- **GET** `/api/profile`: A logged-in user can see their data entries in a separate section.

## Validation

- The 'joi' library is used to validate new entries for both User and Data.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure your MongoDB connection in the `config.js` file.
4. Run the application using `npm start`.

Feel free to explore and modify the code as needed for your specific use case. If you have any questions or issues, please refer to the project documentation or contact the project maintainers.
