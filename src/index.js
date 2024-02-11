import React from 'react';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import DetailPokemon from './App/DetailPokemon';
import ListPokemon from './App/ListPokemon';
import reportWebVitals from './reportWebVitals';
import Providers from './Utils/Provider';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Providers>
      <Router>
        <Routes>
          <Route path="/" element={<ListPokemon />} />
          <Route path="/detail/:id" element={<DetailPokemon />} />
        </Routes>
      </Router>
    </Providers>
  </React.StrictMode>
);

reportWebVitals();
