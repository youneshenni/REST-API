# REST-API

## Description

API for communication with a SQL/NoSQL Database. Completely configurable, it uses JSON Web Tokens (JWT) for authentication

This API can easily be implemented within a Microservices Architecture as it uses REST (Representational State Transfer)

## Setting up

1. Execute the following commands:

```shell
git clone https://github.com/younabobo/REST-API.git
cd REST-API
npm install
```

2. Modify the config.json file, you could use :

```shell
vim config.json
```

or open any text editor and modify it

3. Modify the "database" Object to fit your current Database's configuration. Supported DBMS are: mysql, postgres, mssql, sqlite
   The path attribute represents the path of your sqlite database file (if you chose sqlite)
   **Note:** You don't need to set the Database password in the configuration file, you will be prompted for it upon program start.
4. Modify the server.port attribute (Optional)
5. Run:

```shell
node main.js
```

6. Enter your database account's password
7. Congratulations!! Your database server is now running perfectly. Happy coding!!

## Note

This API is still under development.

### Checklist

- [x] SQL Databases
- [ ] MongoDB Database
- [ ] Google Firebase
- [ ] Database switching through configuration files
- [x] CRUD Support
- [ ] JWT Authentication
