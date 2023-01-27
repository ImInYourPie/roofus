# Roofus setup

### Pre-requisites

    Node >= 14
    yarn

#### Notes

Eliminated the need for setting up a separate database by utilizing MongoDB Atlas, which includes a pre-configured URI with preset data and allows connections from any location.

#### How to run

    $ cd path/to/root/dir
    $ yarn
    $ yarn start

#### Project assumptions and features defined

- Implemented an admin panel/dashboard that is only accessible to administrators;
- Utilized JWT authentication for admin login;
- Ensured that non-existing users cannot be added to an open house;
- Selected MongoDB as the database for its ease of setup and the ability to easily share the project.
- Implemented requested features;
- Implemented requested validations.
