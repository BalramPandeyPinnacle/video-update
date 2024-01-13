import React, { useState, useEffect } from 'react';
import './AddTopicForm.css'; // Import your CSS file

const AddTopicForm = () => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');

  console.log(courses);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'course') {
      setSelectedCourse(value);
      // Reset other fields when a new course is selected
      setVideoTitle('');
      setVideoUrl('');
      setPdfTitle('');
      setPdfUrl('');
    } else if (name === 'chapterTitle') {
      setChapterTitle(value);
    } else {
      if (name === 'videoTitle') setVideoTitle(value);
      else if (name === 'videoUrl') setVideoUrl(value);
      else if (name === 'pdfTitle') setPdfTitle(value);
      else if (name === 'pdfUrl') setPdfUrl(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the topic data
      const newTopic = {
        videoTitle,
        videoUrl,
        pdfTitle,
        pdfUrl,
        completed: [], // Assuming you want to start with an empty completed array
      };

      // Fetch the course ID associated with the selected course title
      const selectedCourseObject = courses.find((course) => course._id === selectedCourse);
      const selectedCourseId = selectedCourseObject._id;

      // Create an object with the chapter data
      const newChapter = {
        chapterTitle: chapterTitle || selectedCourseObject.title, // Use manual input or selected course title
        course: selectedCourseId,
        topics: [newTopic],
      };

      // Make the API request to save the new chapter and topic
      const response = await fetch('http://localhost:5000/api/chapters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newChapter),
      });

      if (!response.ok) {
        throw new Error('Failed to add topic');
      }

      // Optionally handle the response or redirect to a new page
      const result = await response.json();
      console.log('Topic added successfully:', result);

      // Reset the form
      setVideoTitle('');
      setVideoUrl('');
      setPdfTitle('');
      setPdfUrl('');
      setSelectedCourse('');
      setChapterTitle('');
    } catch (error) {
      console.error('Error adding topic:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Course:
        <select name="course" value={selectedCourse} onChange={handleChange} required>
          <option value="" disabled>
            Choose a course
          </option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Chapter Title:
        <input type="text" name="chapterTitle" value={chapterTitle} onChange={handleChange} />
      </label>
      <br />
      {selectedCourse && (
        <>
          <label>
            Video Title:
            <input type="text" name="videoTitle" value={videoTitle} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Video URL:
            <input type="text" name="videoUrl" value={videoUrl} onChange={handleChange} required />
          </label>
          <br />
          <label>
            PDF Title:
            <input type="text" name="pdfTitle" value={pdfTitle} onChange={handleChange} required />
          </label>
          <br />
          <label>
            PDF URL:
            <input type="text" name="pdfUrl" value={pdfUrl} onChange={handleChange} required />
          </label>
          <br />
        </>
      )}
      <button type="submit">Add Topic</button>
    </form>
  );
};

export default AddTopicForm;
