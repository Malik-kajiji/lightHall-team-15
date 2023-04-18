import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import AlertContext from './context/AlertContext';
import TasksContext from './context/TasksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TasksContext>
    <AlertContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AlertContext>
  </TasksContext>
);


