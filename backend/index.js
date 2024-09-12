const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require("cors");

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());

app.use(cors());

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Mongoose schema and model for task logs
const taskLogSchema = new mongoose.Schema({
  taskName: String,
  status: String,
  timestamp: Date
});
const TaskLog = mongoose.model('TaskLog', taskLogSchema);

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to log task execution to MongoDB
async function logTaskExecution(taskName, status) {
  const log = new TaskLog({ taskName, status, timestamp: new Date() });
  await log.save();
  console.log('Task logged:', log);
}

// Function to send reminder email
async function sendReminderEmail() {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'mukul8285217496@gmail.com',  // Replace with actual recipient email
    subject: 'Reminder',
    text: 'This is a reminder email!'
  };

  try {
    await transporter.sendMail(mailOptions);
    await logTaskExecution('Send Reminder Email', 'Success');
    console.log('Reminder email sent successfully.');
  } catch (error) {
    await logTaskExecution('Send Reminder Email', 'Failed');
    console.error('Error sending email:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Schedule the task to send emails every minute (for testing purposes)
cron.schedule('* * * * *', sendReminderEmail);

// Route to get task logs
app.get('/logs', async (req, res) => {
  const logs = await TaskLog.find();
  res.json(logs);
});

// Route to add a new task (dummy route)
app.post('/add-task', (req, res) => {
  res.send('Task added!');
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
