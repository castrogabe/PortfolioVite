import { Link } from 'react-router-dom';

export default function AdminPagination({
  currentPage = 1,
  totalPages = 1,
  /** Optional explicit path override (recommended): e.g. "/admin/users" */
  basePath = '',
  /** For fallback mapping only */
  isAdmin = true,
  /** Fallback keyword mapping when basePath isn't provided */
  keyword = '',
}) {
  const pageNum = Number(currentPage) || 1;
  const total = Math.max(Number(totalPages) || 1, 1);

  if (total <= 1) return null;

  const resolvePath = () => {
    if (basePath) return basePath; // preferred

    // Fallback mapping for legacy uses (kept simple for Portfolio)
    if (isAdmin) {
      switch (keyword) {
        case 'UserList':
          return '/admin/users';
        case 'Messages':
          return '/admin/messages';
        case 'WebsiteList': // <-- replacement for old OrderList
          return '/admin/websites';
        default:
          return '/admin/websites';
      }
    } else {
      switch (keyword) {
        case 'UserList':
          return '/users';
        case 'Messages':
          return '/messages';
        case 'WebsiteList':
          return '/websites';
        default:
          return '/';
      }
    }
  };

  const pathname = resolvePath();
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav aria-label='Pagination'>
      <ul className='pagination'>
        {pages.map((p) => (
          <li key={p} className={`page-item ${pageNum === p ? 'active' : ''}`}>
            <Link className='page-link' to={{ pathname, search: `?page=${p}` }}>
              {p}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
