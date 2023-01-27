# Roofus setup

### Pre-requisites

    Node >= 14
    yarn

#### Notes

Login info for created admin:
email: admin.one@gmail.com
password: 123456

Eliminated the need for setting up a separate database by utilizing MongoDB Atlas, which includes a pre-configured URI with preset data and allows connections from any location.
Just put the .env file provided in /server, and change VITE_API_URL, in /client, to the decired port.

#### How to run

    $ cd path/to/root/dir
    $ yarn start

- Server runs on specified port on env or 3000;
- Client runs on 3001;

#### Project assumptions and features defined

- Implemented an admin panel/dashboard that is only accessible to administrators;
- Utilized JWT authentication for admin login;
- Ensured that non-existing users cannot be added to an open house;
- Selected MongoDB as the database for its ease of setup and the ability to easily share the project.
- Implemented requested features;
- Implemented requested validations;
- Did not create a signup page, as it was not defined on the requirements from my understanding, altought, it is possible to create new admins via POST /admin, with "email" and "password".
- There is a known issue with startDate possible throwing an error from the POST/PATCH of an open house because of localization, but decided to ignore it as it was not defined in the requirements;
