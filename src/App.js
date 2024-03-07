import React from 'react';
import AudioRecorder from './AudioRecorder';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1 className="app-title">Audio Recognition App</h1>
      <AudioRecorder />
    </div>
  );
};

export default App;
