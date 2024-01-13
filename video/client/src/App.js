import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddCourseForm from './AddCourseForm';
import AddTopicForm from "./AddTopicForm"
import './App.css';



function App() {
  return (
    <Router>
      <Routes>
    
        <Route path="/" element={<AddCourseForm />} />
        <Route path="/add" element={<AddTopicForm />} />
      </Routes>
    </Router>
  );
}

export default App;
