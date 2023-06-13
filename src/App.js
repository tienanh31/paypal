// routes
import { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// theme
// components
import PayPalButtonComponent from './pages/PayPalButtonComponent';

// ----------------------------------------------------------------------
export default function App() {
  return <PayPalButtonComponent />;
}
