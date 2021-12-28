# Finance manager
## Tech stack:
### Spring Boot , Angular 13, mySQL, Liquibase,Cypress, Maven



## Functionalities

- Register and login 
- Make transaction with existing user
- Visualize latest 3 transactions or all transactions


# Ui

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running end-to-end tests with Cypress

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Bundle analyzer

Run `npm run analyze` to execute webpack bundle analyzer

# Db

### Credentials
- Username/password: root/root 
- db_name: finance_manager



# Api

### Run using maven
. `mvn spring-boot:run`

### Generate liquibase changelog

- `mvn liquibase:generateChangeLog`

### Swagger url
- http://localhost:8080/swagger-ui/index.html?configUrl=/v3/api-docs/swagger-config



