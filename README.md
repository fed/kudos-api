# kudos-api

## Prerequisites

-   Node.js (https://nodejs.org/)
-   Yarn (https://yarnpkg.com/)

## Development Tasks

| Command        | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `yarn install` | Fetch dependencies and build binaries for any of the modules                 |
| `yarn start`   | Run the app on production                                                    |
| `yarn watch`   | Start the app [for development](http://localhost:6789) and watch for changes |

## Architecture

* **Routes:** The `routes` directory contains all of the route definitions for the different data models. Here we define all endpoints, bind them to an HTTP verb and a controller, and mark them as protected if needed. This is where you want to look at if you need to enable/disable existing routes or create new ones.

* **Controllers:** Each endpoint has its own controller. Controllers are in charge of calling services and returning a response to the user. If you need to tweak any of the endpoints' responses (i.e. the "shape" of the response), this is where you should have a look at.

* **Services:** Services talk to the ORM. They can create, update, remove and retrieve stuff from the database. If you somehow need to get more or fewer data from the database for a particular endpoint, you need to tweak the corresponding service.

* **Models:** The definition for each one of the entities in our application live within the `models` directory. Changes to the database structure should be directly reflected on our models.
