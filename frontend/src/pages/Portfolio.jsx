// src/pages/Portfolio.jsx
import { useEffect, useReducer, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox.jsx';
import MessageBox from '../components/MessageBox.jsx';
import WebsiteCard from '../components/WebsiteCard.jsx';
import Pagination from '../components/Pagination.jsx';

// If you have an API base URL, set VITE_API_URL in .env.* files
const API_BASE = import.meta.env.VITE_API_URL ?? '';

// Reducer for the website list
const websiteReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: '',
        websites: action.payload.websites,
        page: action.payload.page,
        pages: action.payload.pages,
        countWebsites: action.payload.countWebsites,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload || 'Request failed',
      };
    default:
      return state;
  }
};

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  // 1. New State for Portfolio Content
  const [portfolioContent, setPortfolioContent] = useState({
    paragraphs: [],
    link: '/contact', // Default to /contact
    linkText: 'Contact for Quote', // Default text
  });
  const [contentLoading, setContentLoading] = useState(true);
  const [contentError, setContentError] = useState('');

  // Reducer state for website list
  const [{ loading, error, websites = [], pages = 0 }, dispatch] = useReducer(
    websiteReducer,
    {
      loading: true,
      error: '',
      websites: [],
      page: 1,
      pages: 0,
      countWebsites: 0,
    }
  );

  // 2. New Effect to Fetch Portfolio Content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/portfoliocontent`);
        const data = await res.json();

        if (res.ok) {
          setPortfolioContent({
            paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [],
            // Use fetched link/text, fall back to defaults if not set in DB
            link: data.link || '/contact',
            linkText: data.linkText || 'Contact for Quote',
          });
          setContentError('');
        } else {
          // It's usually fine to let this fail silently and use defaults
          // unless the page can't function without the text.
          setContentError(data.message || 'Failed to load intro content');
        }
      } catch (err) {
        setContentError(err.message || 'Network error fetching intro content');
      } finally {
        setContentLoading(false);
      }
    };
    fetchContent();
  }, []); // Run only once on mount

  // Existing Effect to Fetch Website List (no changes needed)
  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await fetch(
          `${API_BASE}/api/websites/search?page=${page}`,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!ignore) dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        if (!ignore) dispatch({ type: 'FETCH_FAIL', payload: err?.message });
      }
    };

    fetchData();
    return () => {
      ignore = true;
    };
  }, [page]);

  // For your Pagination component
  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    return { pathname: '/portfolio', search: `?page=${filterPage}` };
  };

  const goToPage = (p) => setSearchParams({ page: String(p) });

  return (
    <div className='content'>
      <Helmet>
        <title>Portfolio</title>
      </Helmet>

      <br />
      <div className='box'>
        {/* 3. Render Dynamic Content */}
        {contentLoading ? (
          <LoadingBox size='sm' />
        ) : contentError ? (
          // Display an error or fallback text if content failed to load
          <MessageBox variant='danger'>{contentError}</MessageBox>
        ) : (
          <>
            {/* Render each paragraph from the fetched array */}
            {portfolioContent.paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}

            {/* Render the dynamic Link/Button */}
            {portfolioContent.link && portfolioContent.linkText && (
              <Link to={portfolioContent.link}>
                <button className='btn btn-primary mt-3'>
                  {portfolioContent.linkText}
                </button>
              </Link>
            )}
          </>
        )}
      </div>

      <br />

      {/* Rest of the component for website list */}
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          {websites.length === 0 && <MessageBox>No Website Found</MessageBox>}

          <div className='row g-3'>
            {websites.map((website, idx) => (
              <div className='col-12 box' key={idx}>
                <WebsiteCard website={website} />
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={pages}
            getFilterUrl={getFilterUrl}
            onPageChange={goToPage}
          />
          <br />
        </>
      )}
    </div>
  );
}
