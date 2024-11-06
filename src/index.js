import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App';
import AppProviders from './Providers';
import 'leaflet/dist/leaflet.css';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

function IndexApp(){

  return(
    <AppProviders>
      <App />
    </AppProviders>
  )
}

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<IndexApp />);
