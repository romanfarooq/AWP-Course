# Todo App

**Name :** Roman Farooq  
**Roll No :** L1F20BSCS0338  
**Section :** F3  
**Assignment :** 2  
**Course :** Advanced Web Programming


## Description

This is Assignment 2 for the course Advanced Web Programming and It is simple todo app that allows you to add, edit, and delete tasks. It also allows you to mark tasks as complete and Filter tasks by Today, This Week, This Month and All. This app is created using React and Express and stores data in Todo directory using File System in JSON format.

## Installation

### Client
```terminal
$ cd client                     // go to client folder
$ npm install                   // npm install packages
$ npm run start                 // run it locally

// deployment for client app
$ npm run build                 /* this will compile the react code using webpack and 
                                generate a folder called build in the root level */
```

### Server
```terminal
$ cd server                         // go to server folder
$ npm install                       // npm install packages
$ npm run dev   or  node index.js   // run it locally
```

## Usage

To use the app, simply add a task in the input field and click the add button. To edit a task, click the edit button and type in the new task. To delete a task, click the delete button. To mark a task as complete, click the checkbox next to the task. and Filter tasks by clicking the filter options.

## Dependencies
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/)
- [UUID](https://www.npmjs.com/package/uuid)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Express](https://expressjs.com/)
- [Cors](https://www.npmjs.com/package/cors)
- [Nodemon](https://nodemon.io/)
- [File System](https://nodejs.org/api/fs.html)