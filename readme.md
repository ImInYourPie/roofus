# Roofus setup

### Pre-requisites

    Node >= 14
    yarn

#### Notes

Login info for created admin:

**email**: admin.one@gmail.com
**password**: 123456

Eliminated the need for setting up a separate database by utilizing MongoDB Atlas, which includes a pre-configured URI with preset data and allows connections from any location.
Place the provided '.env' file in the '/server' directory, and update the 'VITE_API_URL' in '/client/.env' to match the desired port.

#### How to run

    $ cd path/to/root/dir
    $ yarn start

- The server runs on the port specified in the '.env' file or on port 3000 by default;
- The client runs on port 3001. If you need to use a different port, you can change it in the 'dev' script located in the 'scripts' section of the 'package.json' file in the 'client' directory. I encountered some issues with configuring the port using Vite, so I chose not to spend too much time on it.

#### Project assumptions and features defined

- Implemented an admin panel/dashboard that is only accessible to administrators;
- Utilized JWT authentication for admin login;
- Ensured that non-existing users cannot be added to an open house;
- Selected MongoDB as the database for its ease of setup and the ability to easily share the project.
- Implemented requested features;
- Implemented requested validations;
- I did not create a sign-up page as it was not included in the project requirements, although it is possible to create new admins using the POST '/admin' endpoint with the "email" and "password" fields;
- There is a known issue with the "startDate" field potentially causing an error with the POST/PATCH of an open house due to localization issues. However, as it was not specified in the requirements, I decided not to address it at this time.

#### Auth strategy via Postman/others

Login via POST "/admin/auth" with the provided credentials above, use the "token" as "Bearer token" as such: "Bearer long_token_string_here"
