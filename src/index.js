import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import RoleBaseApp from './RoleBaseAuth/RoleBaseAuthApp';

// import { Auth0Provider } from '@auth0/auth0-react'; //Oath2Login
// import App, { LogoutFun } from './Oath2Login2/App';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import App from './AccessTokenAuth/App';
import { AuthProvider } from './AccessTokenAuth/Context/AuthProvide';
// import App from './Oath2Login/App';
// import App from './Oath2Login2/App';



//npm i disable-react-devtools
// require('disable-react-devtools');

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<RoleBaseApp />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
//);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
       
         <App />
        
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <Routes>
//           <Route path="/*" element={<App />} />
//         </Routes>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//oath2 login 1 // add https://dev-1xgv0i5r33flbcp3.us.auth0.com/login/callback in google console redirect url
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

// ReactDOM.render(
//   <React.StrictMode>
//     <Auth0Provider
//       domain="dev-1xgv0i5r33flbcp3.us.auth0.com"
//       clientId="M1iGUhbJV9A8EYTZhXHraZdM1sBfeGwj"
//       redirectUri={window.location.origin}>
//       <App />
//     </Auth0Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//   ReactDOM.render(
//     <React.StrictMode>
//     <Auth0Provider
//     domain={"dev-1xgv0i5r33flbcp3.us.auth0.com"}
//     clientId="M1iGUhbJV9A8EYTZhXHraZdM1sBfeGwj"
//     authorizationParams={{
//       redirect_uri: window.location.origin
//     }}  >
//     <App />
//   </Auth0Provider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//oath2 login 2 //add localhost:3000 in google console authorisez origins
//https://www.npmjs.com/package/@react-oauth/google
//https://www.npmjs.com/package/jwt-decode
// ReactDOM.render(
//     <React.StrictMode>
//       <GoogleOAuthProvider clientId="393510483930-4sij930ln4mavipbr548oiid6t24gt90.apps.googleusercontent.com">
//       <App />
//       <button onClick={()=>{LogoutFun()}}> logout</button>
//       </GoogleOAuthProvider>
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
