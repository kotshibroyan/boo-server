# Boo Server


## Table of Contents

- [Project Overview](#project-overview)
- [API Endpoints](#api-endpoints)
  - [/profiles](#profiles)
  - [/celebrities](#celebrities)
  - [/comments](#comments)
- [Scripts](#scripts)
- [Getting Started](#getting-started)
  - [Installation](#installation)


## Project Overview

API-s for boo profiles

### /profiles

- **POST**: Creates a new profile.
- **GET /:id**: Renders the profile with the given ID.

### /celebrities

- **POST**: Creates a new celebrity.
- **GET**: Retrieves a list of celebrities. Supports pagination using `page` and `pageSize` parameters.
- **GET /:id**: Retrieves a specific celebrity by ID.

### /comments


- **POST**: Creates a new comment.
  - **Headers**:
    - `x-user-id`: Specify the user's ID for identifying the commenter.
  - **Request Body**: Include the following JSON properties to create a comment:
    - `celebrityId`: The ID of the celebrity on whom you want to comment.
    - Add any other necessary properties for the comment (e.g., `title`, `description`, etc.).
  - **Example Request**:

    ```http
    POST /comments
    Host: your-api-host.com
    Content-Type: application/json
    x-user-id: user-id-here

    {
      "celebrityId": "celebrity-id-here",
      "title": "My Comment Title",
      "description": "My comment description",
      "mbti": "INFP",
      "enneagram": "4w3",
      "zodiac": "LEO"
    }
    ```

  - **Response**: The API will respond with the newly created comment object.
  
  ### /comments

- **GET**: Retrieves a list of comments. Supports pagination using `page` and `pageSize` parameters.
  - **Query Parameters**:
    - `page`: Specifies the page number (default is 1).
    - `pageSize`: Specifies the number of comments per page (default is 10).
    - Add any other query parameters or filters as needed (e.g., filtering by `zodiac`, `mbti`, etc.).

  - **Example Request**:

    ```http
    GET /comments?page=1&pageSize=10&zodiac=Leo
  
    ```

  - **Response**: The API will respond with a paginated list of comments.
    - The response format will typically include:
      - `data`: An array of comment objects.
      - `meta`: Metadata containing information about the current page

### /comments/:id/toggle-like

- **POST**: Toggles the like status of a comment.
  - **Headers**:
    - `x-user-id`: Specify the user's ID for identifying the liker.
  - **Request URL Parameters**:
    - `id`: The ID of the comment to like or dislike.
  - **Example Request**:

    ```http
    POST /comments/comment-id-here/toggle-like
    Content-Type: application/json
    x-user-id: user-id-here
    ```

  - **Response**: The API will respond with the updated comment object, indicating whether the user has liked or disliked the comment.






## Scripts

List the available scripts in your `package.json` file:

- `start:dev`: Start the development server using `node app.js`.
- `test`: Run tests using Mocha.

## Getting Started

Provide instructions for getting started with your project, including prerequisites and installation steps.

### Prerequisites

List any software, tools, or dependencies that users need to have installed before they can use your project.

### Installation

1. Clone the repository:

   git clone git@github.com:kotshibroyan/boo-server.git
   
2. Navigate to new directory:
  
  cd boo-server
 
3. Install dependencies

 yarn
 
4. run via run script

 yarn start:dev
