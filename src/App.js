// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import AppRoutes from './routes'; // Import the AppRoutes component

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes /> {/* Use the AppRoutes component here */}
      </Router>
    </Provider>
  );
}

export default App;
