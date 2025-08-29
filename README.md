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
