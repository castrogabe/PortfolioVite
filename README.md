# 1st Commit-Vite

# 2nd Commit-Vite setup Portfolio frontend, basic pages, footer, header

# Create Vite project

npm create vite@latest frontend

# Move into frontend folder

cd frontend

# Install dependencies

npm install

# Ensure Node.js v20+

nvm use 20

# Start dev server

npm run dev

cd frontend
npm install
nvm use20
npm run dev

npm install react-router-dom react-toastify bootstrap typewriter-effect
npm remove @types/react @types/react-dom
npm install --legacy-peer-deps

frontend/
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ └── ...
│ └── pages/
│ ├── About.jsx
│ ├── Design.jsx
│ ├── Home.jsx
│ ├── Portfolio.jsx
│ └── NotFound.jsx
├── index.css
├── App.jsx
└── main.jsx

.gitignore (root)

FRONTEND
folder: components
Header.jsx > added
Footer.jsx > added

folder: pages
About.jsx > added
Design.jsx > added
Home.jsx > added
NotFound.jsx > added
Portfolio.jsx > added

# 3rd Commit-Bootstrap, components, styles folder for .css, index.html SEO, About, Home, Portfolio

nvm use 20
npm run dev

FRONTEND
folder: components
BottomFooter.jsx > added
Footer.jsx > updated
Header.jsx > updated
Pagination.jsx > added
Jumbotron.jsx > added
LoadingBox.jsx > added
MessageBox.jsx > added
Pagination.jsx > added
WebsiteCard.jsx > added

folder: pages
About.jsx > updated
Home.jsx > updated
Portfolio.jsx > updated

index.html > updated, fontawesome, SEO, images (replace with your own)

** Get the full width of the application across the desktop **
App.css > delete
App.jsx > delete App.css

folder: styles
index.css > updated with links to individual pages and components

# 4th Commit-Design, Contact pages

FRONTEND
folder: pages
Contact.jsx > added
Design.jsx > updated

main.jsx > updated with StoreProvider
Store.jsx > added

# 5th Commit-Backend (ESM), Admin, Messages

BACKEND
NEW TERMINAL: mkdir backend > cd backend > npm init -y
npm install bcryptjs cors dotenv express express-async-handler jsonwebtoken mongoose multer nodemailer
npm install --save-dev nodemon
(backend we are using ex: server.js not server.jsx, .jsx is for the frontend)

folder: models
messageModel.js > added
userModel.js > added

folder: routes
messageRoutes.js > added
userRoutes.js > added

.env > added for connection > use .gitignore to prevent from pushing to github
.env.example > added

server.js > updated
{}package.json > updated

FRONTEND
folder: components
AdminPagination.jsx > added
Header.jsx > updated

folder: pages
Messages.jsx > added

# 6th Commit-Admin Signup, Signin, Messages, Upload seed data

BACKEND
folder: models
websiteModel.js > added

folder: routes
seedRoutes.js > added

data.js > added (seed the data)

FRONTEND
folder: pages
Messages.jsx > added

subfolder: pages/forms
Signin.jsx > added
Signup.jsx > added

App.jsx > updated
main.jsx > updated pages
vite.config.js > updated

# 7th Commit-Profile, ForgetPassword, ResetPassword, Dashboard

FRONTEND
npm i react-react-google-charts --force

folder: components
ProtectedRoute.jsx > added

folder: pages
Dashboard.jsx added

subfolder: forms
ForgetPassword.jsx > added
Profile.jsx > added
ResetPassword.jsx > added

main.jsx > updated with new pages
{}package.json > updated

# 8th Commit-Admin, Users

BACKEND

FRONTEND
folder: components
AdminPagination.jsx > updated with WebsiteList instead of OrderList

folder: pages > subfolder > admin
Dashboard.jsx > moved into admin subfolder
Messages.jsx > moved into admin subfolder
UserEdit.jsx > added
UserList.jsx > added
