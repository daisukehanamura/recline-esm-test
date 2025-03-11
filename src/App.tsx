import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import Profile from './components/Profile/Profile';
import MonologueForm from './components/Monologue/MonologueForm';
import PropsStudy from './components/ReactStudy/PropsStudy';
import './styles/Navigation.css';

function App() {
  return (
    <Router>
      <div className="App">
      <nav className="nav-container">
          <div className="nav-links">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              ホーム
            </NavLink>
            <NavLink 
              to="/todoPosts" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              TODOPosts
            </NavLink>
            <NavLink 
              to="/reactStudy" 
              className={({ isActive }) => 
                isActive ? 'nav-link active' : 'nav-link'
              }
            >
              ReactStudy
            </NavLink>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/todoPosts" element={<MonologueForm />} />
          <Route path="/reactStudy" element={<PropsStudy post="つぶやきだお" post2="だおだお"/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
