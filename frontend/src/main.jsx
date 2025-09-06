import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import { StoreProvider } from './Store.jsx';

// user protected pages
import ProtectedRoute from './components/ProtectedRoute.jsx';

// admin pages
import AdminRoute from './components/AdminRoute.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import Messages from './pages/admin/Messages.jsx';
import UserList from './pages/admin/UserList.jsx';
import UserEdit from './pages/admin/UserEdit.jsx';
import WebsiteList from './pages/admin/WebsiteList.jsx';
import WebsiteEdit from './pages/admin/WebsiteEdit.jsx';

// pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Design from './pages/Design.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';

// forms
import Signin from './pages/forms/Signin.jsx';
import Signup from './pages/forms/Signup.jsx';
import Profile from './pages/forms/Profile.jsx';
import ForgetPassword from './pages/forms/ForgetPassword.jsx';
import ResetPassword from './pages/forms/ResetPassword.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />, // renders for unknown routes under this branch
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'design', element: <Design /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'contact', element: <Contact /> },
      { path: 'signin', element: <Signin /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgetPassword /> },

      // Protected Route
      { path: 'reset-password/:token', element: <ResetPassword /> },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },

      // admin route
      {
        path: 'admin/messages',
        element: (
          <AdminRoute>
            <Messages />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/dashboard',
        element: (
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <AdminRoute>
            <UserList />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/users/:id',
        element: (
          <AdminRoute>
            <UserEdit />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/websites',
        element: (
          <AdminRoute>
            <WebsiteList />
          </AdminRoute>
        ),
      },
      {
        path: 'admin/websites/:id', // you already navigate to this path
        element: (
          <AdminRoute>
            <WebsiteEdit />
          </AdminRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </HelmetProvider>
  </React.StrictMode>
);
