# project_management_tool
Web application in nodeJs, MongoDB, Express and Angular2 (mean stack). App should work similar to Jira and should be used to manage projects in IT.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.9.

## Screens from application
![login_site](https://user-images.githubusercontent.com/39520658/63208585-3a96b380-c0d6-11e9-8cdd-594c2dd13b00.png)
![board_site](https://user-images.githubusercontent.com/39520658/63208587-3cf90d80-c0d6-11e9-90f3-c24a0ed1bcda.png)

## Preparation
User should (before serving an application) generate SendGrid token (https://sendgrid.com/docs/ui/account-and-settings/api-keys/). And then place it inside YOUR_PROJECT_PATH/backend/config/default.json. This is essential for registration of new users (all newly registered users are receiving authorisation token which is sent into their email address using SendGrid).
After this we should run `npm install` command (in backend and frontend folders) which will install all missing dependencies.

## Running application
First, when in backend folder run a command `npm start`. Then you can type `ng serve --open` when inside a frontend folder (`--open` flag should open a browser with proper address, but if this will not work, an address is displayed in terminal when running ng serve right at the beginning).

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
