const mongoose = require('mongoose');

// Define the topic schema
const topicSchema = new mongoose.Schema({
  videoTitle: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  pdfTitle: {
    type: String,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
  completed: [
    {
      user: {
        type: String,
        required: false,
      },
      userCompleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

// Define the chapter schema
const chapterSchema = new mongoose.Schema({
  chapterTitle: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
  },
  topics: [topicSchema],
});

// Define the chapter model
const Chapter = mongoose.model('Chapter', chapterSchema);

// Define the course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
});

// Define the course model
const Course = mongoose.model('Course', courseSchema);

// Export both models
module.exports = { Chapter, Course };
