import React from 'react';
import './App.css';
import Profile from './components/Profile/Profile';
import Monologue from './components/Monologue/Monologue';
import MonologueForm from './components/Monologue/MonologueForm';

function App() {
  return (
    <div className="App">
      <main className="main-content">
        <Profile />
        <Monologue post="つぶやきだお" post2="だおだお" />
        <MonologueForm />
      </main>
    </div>
  );
}

export default App;
