# website_dev

This website is running with angular a web framework using Typescript and an Express server that does the job of the backend.

Some formations are available here: </br>
[beginner](https://www.youtube.com/watch?v=AAu8bjj6-UI)
[angular-material](https://www.youtube.com/watch?v=jUfEn032IL8)
[express integration](https://www.youtube.com/watch?v=dT1ID4q57fs&t=468s)
https://hackafro.github.io/angular-epic-spinners/

## Collaboration
To collaborate on this project please request access to the owner.</br>
Please create your branch before collaborating on this project.</br>
It's can be done with: `git checkout -b "MyBranch"`</br>

## Installation

Install node: [here](https://nodejs.org/en/download/)

Verify your installation:
`npm --version`

Install angular: `npm install -g @angular/cli` </br>

These following steps have to be executed in two differents terminals </br>

> ## angular app
> 
> **Lines to run:** </br>
>- Go to the app directory: `cd IDeA` </br>
>
> - Install dependencies: `npm install` </br>
>
> - Run the app in localhost: `ng serve`</br>

>## express app 
>
> **Lines to run:** </br>
> - Go to the app directory: `cd backend` </br>
> - Install dependencies: `npm install` </br>
> - Run the app in localhost: `nodemon --exec npm start app.js`</br>
> *If nodemon is not install ->`npm i nodemon`* </br>

*When all these steps are done just launch you web browser with this access:* </br>
Access to localhost: [here](http://localhost:4200/)

## Architecture of the website

![](IDeA/src/assets/website_archi.drawio.png)
## Futur Developpement
>This app is an angular app, it means that all the pages and features are organized trough components that are reusable in multiple apps. </br>
>All the architecture of the website has been created, including routing for differents parts of the app (Particuliers, Collectivités, Entreprise...) </br>
>To add some new features to these parts you just need to add components on them and create the route corresponding in the submodule you want. </br>

