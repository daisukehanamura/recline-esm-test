import React from 'react';
import './App.css';
import Profile from './components/Profile/Profile';
import Monologue from './components/Monologue/Monologue';

function App() {
  return (
    <div className="App">
      <main className="main-content">
        <Profile />
        <Monologue post="つぶやきだお" />
      </main>
    </div>
  );
}

export default App;
