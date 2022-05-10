# NoteeKeeper
### Yet another note keeper app to keep your notes at one place.
==========



### The Login Page - 
Login with your credentials to start saving your important notes

![](https://github.com/Utqrsh04/NoteeKeeper/blob/main/frontend/src/assests/Login.jpeg)

### Dashboard Notes Page
Here you can view all your notes , as well as delete and edit it . There's also a search bar to search into your notes . 

![](https://github.com/Utqrsh04/NoteeKeeper/blob/main/frontend/src/assests/Notes.jpeg)

### Profile Page
Here you can update your profile and add your profile picture to it.

![](https://github.com/Utqrsh04/NoteeKeeper/blob/main/frontend/src/assests/Profile.png)


I have used MERN stack for this project and used Redux-Thunk to efficiently manage the state and used tailwindcss for styling 
and deployed the whole project on heroku . 



### Building and running

To run, simply clone the repo , install dependencies and start a web server serving the main project directory.

    git clone https://github.com/Utqrsh04/NoteeKeeper.git
    cd NoteeKeeper
    npm install 
    
Provide the env variables for Database and JWT Secret.

To start the server 

    npm run server

To start the frontend
    
    cd frontend
    npm install
    npm run client

or you can do run this to start both after installing dependencies
    
    npm run dev

and the website will be accessible on ```localhost:5000```.
The page will reload if you make edits.
