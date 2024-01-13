import React, { useState } from 'react';
import './AddCourseForm.css';

const AddCourseForm = () => {
  const [courseTitle, setCourseTitle] = useState('');

  const handleChange = (e) => {
    setCourseTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: courseTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to add course');
      }

      // Optionally handle the response or redirect to a new page
      const result = await response.json();
      console.log('Course added successfully:', result);

      // Reset the form
      setCourseTitle('');
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Course Title:
        <input
          type="text"
          value={courseTitle}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Add Course</button>
    </form>
  );
};

export default AddCourseForm;
