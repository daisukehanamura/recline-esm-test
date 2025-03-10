import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import Monologue from './components/Monologue/Monologue';
import MonologueForm from './components/Monologue/MonologueForm';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">ホーム</Link>
          <Link to="/todoPosts">TODOPosts</Link>
        </nav>
        <Routes>
          <Route path="/todoPosts" element={<MonologueForm />} />
        </Routes>
        <main className="main-content">
          <Profile />
          <Monologue post="つぶやきだお" post2="だおだお" />
          <MonologueForm />
        </main>
      </div>
    </Router>
  );
}

export default App;
