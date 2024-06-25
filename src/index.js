import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleBaseApp from './RoleBaseAuth/RoleBaseAuthApp';
import { AuthProvider } from './RoleBaseAuth/AuthProvider';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<RoleBaseApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);