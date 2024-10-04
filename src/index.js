import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import dotenv from 'dotenv'
import { FirebaseProvider } from './context/firebase';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
);