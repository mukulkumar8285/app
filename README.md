# Task Management Application

## Overview

This is a full-stack application consisting of a React front-end and an Express back-end with MongoDB for data storage. The application manages and displays task logs, includes functionality to add new tasks, and sends reminder emails using a scheduled task.

## Features

- **React Front-End**: Displays task logs in a table and allows users to add tasks.
- **Express Back-End**: Manages task logs, schedules email reminders, and provides API endpoints.
- **MongoDB**: Stores task logs.
- **Nodemailer**: Sends reminder emails.
- **Node-Cron**: Schedules tasks.

## Project Structure


## Prerequisites

- Node.js (v14.x or higher)
- MongoDB

## Setup

### Front-End Setup

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

   The front-end application will be running at `http://localhost:3000`.

### Back-End Setup

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Create a `.env` file in the `server` directory with the following content:

    ```env
    DB_URI=mongodb://localhost:27017/taskdb
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    PORT=5000
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the Express server:

    ```bash
    node server.js
    ```

   The back-end server will be running at `http://localhost:5000`.

## API Endpoints

- **GET** `/logs` - Retrieve all task logs.
- **POST** `/add-task` - Dummy endpoint to simulate adding a task (not implemented).

## Task Scheduling

The server uses `node-cron` to schedule a task that sends reminder emails every minute. This is for testing purposes and can be adjusted as needed.

## Contributing

Feel free to submit issues and pull requests. Please ensure to follow coding standards and include tests with your contributions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, you can reach me at [mukulved07@gmail.com](mailto:mukulved07@gmail.com).
