import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BottomFooter from './components/BottomFooter.jsx';

export default function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
      <BottomFooter />
    </div>
  );
}
