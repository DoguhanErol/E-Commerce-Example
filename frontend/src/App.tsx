
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import AppRoutes from './routes/AppRoutes'
//axios.defaults.baseURL = 'http://localhost:8000' //for dev
axios.defaults.baseURL = 'https://example-e-commerce.shop' //for publish
const App: React.FC = () => {
  return (
      <BrowserRouter>
        <AppRoutes  /> 
      </BrowserRouter>
  );
};

export default App;
