# project_management_tool
Web application in nodeJs, MongoDB, Express and Angular2 (mean stack). App should work similar to Jira and should be used to manage projects in IT.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.9.

## Preparation
User should (before serving application) generate SendGrid token (https://sendgrid.com/docs/ui/account-and-settings/api-keys/). And then place it inside YOUR_PROJECT_PATH/backend/config/default.json. This is essential for working registration of new users (all newly registred users are recieving authorization token which is send onto their email address using SendGrid).
After this we should run npm run `npm install` command (in backend and frontend folders) which will install all missing dependencies.

## Running application
First, when present in backend folder run command `npm run`. Then you can type `ng serve` when inside frontend folder. Application should run on port `http://localhost:4200/`.

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
