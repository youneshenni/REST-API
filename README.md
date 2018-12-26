# MultiDB REST API

MultiDB REST API is a RESTful API for communication with a SQL/NoSQL Database. Completely configurable, it uses JSON Web Tokens (JWT) for authentication

This API can easily be implemented within a Microservices Architecture as it uses REST (Representational State Transfer)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
A DataBase Management System (DBMS) Server (Microsoft SQL, MySQL, SQLite, PostgreSQL, MongoDB)
Node.js
npm
```

### Installing

A step by step series of examples that tell you how to get a development environment running

1. Execute the following commands:

```shell
git clone https://github.com/younabobo/REST-API.git
cd REST-API
npm install
```

2. Modify the config.hjson file, you could use :

```shell
vim config.hjson
```

or open any text editor and modify it

3. Modify the "database" Object to fit your current Database's configuration. Supported DBMS are: mysql, postgres, mssql, sqlite
   The path attribute represents the path of your sqlite database file (if you chose sqlite)
   **Note:** You don't need to set the Database password in the configuration file, you will be prompted for it upon program start.
4. Modify the server.port attribute (Optional)
5. Convert your config.hjson to a config.json using:

```shell
npm run-script conv
```

6. Run:

```shell
node main.js
```

7. Enter your database account's password
8. Congratulations!! Your database server is now running perfectly. Happy coding!!

#### Setting Schemas/Models

You can define models in the models folder. This folder contains a subfolder for each database type, you must define your model in a file with the model's name as a name. **Note** that a model is a JavaScript file. Eg: models/mongodb/client.js for a model named client.
**Note:** Sequelize names the tables by adding an 's' to the model's name

##### More

The ORMs used in this project are: Mongoose for MongoDB and Sequelize for SQL (MySQL, MSSQL, SQLite, PostgreSQL)
You can find more information about creating models in the following links:

[Mongoose](https://mongoosejs.com/docs/)

[Sequelize](http://docs.sequelizejs.com/identifiers.html)

## Running the tests

Tests are defined in the tests folder

Install Development dependencies:

```shell
npm install --dev
```

Execute tests:

```shell
npm run-script test
```

## Deployment

Deployment hasn't yet been implemented

## Built With

- [Express](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Mongoose](https://mongoosejs.com/) - The ORM used for interacting with MongoDB databases
- [Sequelize](http://docs.sequelizejs.com/) - The ORM used for interacting with SQL Databases
- [Chai](https://www.chaijs.com/) - Used to write tests
- [Mocha](https://mochajs.org/) - Used to execute tests

[//]: # '## Contributing'
[//]: # 'Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.'

## Author

- **Younes Henni** - Developer - [younabobo](https://github.com/younabobo)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
