// src/components/Header.jsx
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from '../Store';

export default function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const location = useLocation();

  const navLink = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    navigate('/signin');
  };

  const signInHref = `/signin?redirect=${encodeURIComponent(
    location.pathname + location.search
  )}`;

  return (
    <header>
      <nav className='navbar navbar-expand-lg header' data-bs-theme='dark'>
        <div className='container-fluid px-3'>
          <NavLink to='/' className='navbar-brand'>
            <i className='fas fa-home' aria-hidden='true' /> My Portfolio
          </NavLink>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#mainNavbar'
            aria-controls='mainNavbar'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>

          <div className='collapse navbar-collapse' id='mainNavbar'>
            <ul className='navbar-nav ms-auto w-100 justify-content-end align-items-lg-center'>
              {/* About Us dropdown */}
              <li className='nav-item dropdown'>
                <button
                  className='nav-link dropdown-toggle'
                  id='aboutDropdown'
                  data-bs-toggle='dropdown'
                  aria-expanded='false'
                  type='button'
                >
                  About Us
                </button>
                <ul className='dropdown-menu' aria-labelledby='aboutDropdown'>
                  <li>
                    <Link className='dropdown-item' to='/about'>
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className='dropdown-item' to='/contact'>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Portfolio */}
              <li className='nav-item'>
                <NavLink to='/portfolio' className={navLink}>
                  <i className='fas fa-briefcase' aria-hidden='true' />{' '}
                  Portfolio
                </NavLink>
              </li>

              {/* Web Design */}
              <li className='nav-item'>
                <NavLink to='/webdesign' className={navLink}>
                  <i className='fas fa-layer-group' aria-hidden='true' /> Web
                  Design
                </NavLink>
              </li>

              {/* Admin menu */}
              {userInfo?.isAdmin && (
                <li className='nav-item dropdown'>
                  <button
                    className='nav-link dropdown-toggle'
                    id='adminDropdown'
                    data-bs-toggle='dropdown'
                    data-bs-auto-close='outside' // keep submenu open while interacting
                    aria-expanded='false'
                    type='button'
                  >
                    Admin
                  </button>

                  <ul
                    className='dropdown-menu dropdown-menu-end'
                    aria-labelledby='adminDropdown'
                  >
                    <li>
                      <Link className='dropdown-item' to='/admin/dashboard'>
                        Website Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/users'>
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/websites'>
                        Websites
                      </Link>
                    </li>
                    <li>
                      <Link className='dropdown-item' to='/admin/messages'>
                        Messages
                      </Link>
                    </li>

                    {/* Edit Pages submenu (green) */}
                    <li className='nav-item dropdown'>
                      <button
                        className='dropdown-item dropdown-toggle text-white bg-success fw-semibold'
                        id='editPagesDropdown'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'
                        type='button'
                      >
                        Edit Pages
                      </button>
                      <ul
                        className='dropdown-menu'
                        aria-labelledby='editPagesDropdown'
                      >
                        <li>
                          <Link
                            className='dropdown-item'
                            to='/admin/homecontent'
                          >
                            Home Edit
                          </Link>
                        </li>

                        <li>
                          <Link
                            className='dropdown-item'
                            to='/admin/aboutusedit'
                          >
                            About Edit
                          </Link>
                        </li>

                        <li>
                          <Link
                            className='dropdown-item'
                            to='/admin/designedit'
                          >
                            Design Edit
                          </Link>
                        </li>

                        <li>
                          <Link
                            className='dropdown-item'
                            to='/admin/portfolioedit'
                          >
                            PortfolioEdit
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
