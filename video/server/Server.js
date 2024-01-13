// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Chapter, Course } = require('./Video');  // Adjust the path based on your file structure

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://shakshisinha:n8idXfdJIb66V8Rm@cluster0.h63wxne.mongodb.net/Video?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });


  app.use(cors()); 
// Middleware to parse JSON requests
app.use(bodyParser.json());

// Add a route to create a new course
app.post('/api/courses', async (req, res) => {
    try {
      // Extract the course title from the request body
      const { title } = req.body;
  
      // Create a new course
      const newCourse = new Course({ title });
  
      // Save the new course
      const savedCourse = await newCourse.save();
  
      res.json(savedCourse);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


  app.post('/api/chapters', async (req, res) => {
    try {
      // Extract data from the request body
      const { chapterTitle, course, topics } = req.body;
  
      // Check if a chapter with the same title already exists
      const existingChapter = await Chapter.findOne({ chapterTitle, course });
  
      if (existingChapter) {
        // If the chapter exists, add new topics to its topics array
        topics.forEach((newTopic) => {
          // Check if the video title already exists in the existing chapter's topics
          const existingTopic = existingChapter.topics.find(
            (topic) => topic.videoTitle === newTopic.videoTitle
          );
  
          if (!existingTopic) {
            // If the video title doesn't exist, add the new topic
            existingChapter.topics.push(newTopic);
          }
        });
  
        const updatedChapter = await existingChapter.save();
        res.json(updatedChapter);
      } else {
        // Create a new chapter with the provided topics
        const newChapter = new Chapter({
          chapterTitle,
          course,
          topics,
        });
  
        // Save the new chapter
        const savedChapter = await newChapter.save();
  
        res.json(savedChapter);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  




// Add more routes as needed

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
