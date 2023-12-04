import React from 'react';
// import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import Login from './features/login/Login';
// import { Counter } from './features/counter/Counter';
import firebaseClient from './utils/firebase-client-config';
import NaviBar from './features/navigation/NaviBar';
import SignUp from './features/signUp/SignUp';

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <NaviBar />
      <br />
      <Routes>
        <Route path="/" element={<h1>Welcome!</h1>} />
        <Route path="/login" element={<Login firebaseApp={firebaseClient} />} />
        <Route
          path="/signup"
          element={<SignUp firebaseApp={firebaseClient} />}
        />
      </Routes>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header> */}
    </div>
  );
}

export default App;
