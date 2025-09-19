// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Jumbotron from '../components/Jumbotron';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

export default function Home() {
  const [homeContent, setHomeContent] = useState({
    jumbotronText: ['Loading...'],
    sections: [],
  });

  useEffect(() => {
    const ac = new AbortController();

    const fetchHomeContent = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/homecontent`, {
          signal: ac.signal,
          headers: { Accept: 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHomeContent(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Failed to fetch home content:', err);
          toast.error('Failed to load content. Please try again later.');
          setHomeContent({
            jumbotronText: ['Error loading...'],
            sections: [{ title: 'Error', content: 'Failed to load content.' }],
          });
        }
      }
    };
    fetchHomeContent();

    return () => ac.abort();
  }, []);

  return (
    <>
      <Helmet>
        <title>Portfolio Home</title>
      </Helmet>
      <Jumbotron text={homeContent.jumbotronText} />

      <br />

      <div className='content'>
        {homeContent.sections.map((section, index) => (
          <div className='box' key={index}>
            <h4>{section.title}</h4>
            <p>{section.content}</p>
            {section.link && section.linkText && (
              <a href={section.link} className='my-button'>
                {section.linkText}
              </a>
            )}
          </div>
        ))}
      </div>
      <br />
    </>
  );
}
