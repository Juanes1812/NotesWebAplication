# NotesWebApp
application to control notes: add, update and delete them; dividing them by category

NotesWebApp is a web application to manage your notes no matter what they are used for. The application uses React with Vite js for the frontend and Node.js/Express with a SQLite database for the backend.

- Creation of notes and categories with their own attributes.
- Archiving and unarchiving notes
- Crud required for note management

## Frontend:  
- React 18.3.1  
- React Router  
- Axios
- react-dom

## Backend:  
- Node.js
- Yarn
- Express  
- SQLite
- Sequelize
- Cors

## General Architecture: 
- **Frontend:** React application with Vite js that consumes the backend APIs. 
- Backend:** REST API in Express that communicates with the database. 
- Database:** SQLite to store notes and categories information.

## Prerequisites: 
- Node.js 16+ 
- Yarn 

## Steps: 

1. - Clone this repository:  
   - git clone https://github.com/ensolvers-github-challenges/Monsalve-d48fd6.git
   - cd Monsalve-d48fd6
2. - cd backend
   - yarn install
   - yarn start
3. - cd frontend
   - yarn install
   - yarn dev

## Script:  

   - git clone https://github.com/ensolvers-github-challenges/Monsalve-d48fd6.git
   - cd Monsalve-d48fd6
   - cd backend
   - yarn install
   - yarn start
   - cd ..
   - cd frontend
   - yarn install
   - yarn dev

## Usage: 

1. Access `http://localhost:3000` to log in to the API.
2. Access the URL provided by React (Ctrl + click). 
3. Create Categories, Create notes and see the available options.

## Endpoints:  

- **Notes:**  
  - `GET /notes/` - Get data from API 
  - `POST /notes/` - Create Note
  - `PUT /notes/:id` - Update Note
  - `PUT /notes/archived/:id` - Update archived
  - `DELETE /notes/:id` - Delete Note

- **Categories:**  
  - `GET /categories/` - Get data from API  
  - `POST /categories/` - Create Category
  - `DELETE /categories/:id` - Delete Category
 
  Created to apply for the Ensolvers company position. Thank you for the opportunity.


   



