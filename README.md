<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Messaging API - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 20px;
    }
    h1, h2 {
      color: #2c3e50;
    }
    h3 {
      color: #34495e;
    }
    pre {
      background-color: #ecf0f1;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
      font-size: 1.2rem;
    }
    code {
      font-family: "Courier New", monospace;
      background-color: #ecf0f1;
      padding: 5px;
    }
    ul {
      list-style-type: none;
    }
    ul li {
      margin: 10px 0;
    }
    .container {
      max-width: 1000px;
      margin: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Messaging API</h1>
    <p>This is a secure, API-based chat backend that allows developers to register, connect with other users, and exchange messages.</p>

    <h2>Tech Stack</h2>
    <ul>
      <li>Node.js</li>
      <li>Hapi.js</li>
      <li>MongoDB with Mongoose</li>
      <li>JWT for Authentication</li>
      <li>bcrypt for Password Hashing</li>
      <li>express-rate-limit for Rate Limiting</li>
      <li>Winston/Morgan for Logging</li>
      <li>Hapi-Swagger for API Documentation</li>
    </ul>

    <h2>Features</h2>
    <ul>
      <li><strong>Authentication</strong>: Register, login, and JWT-based auth.</li>
      <li><strong>Contact System</strong>: Send contact requests, accept requests, and view accepted contacts.</li>
      <li><strong>Messaging</strong>: Send messages, view message history, and rate-limit messages (5 per minute).</li>
    </ul>

    <h2>API Endpoints</h2>

    <h3>Authentication</h3>
    <ul>
      <li><strong>POST /auth/register</strong> - Create a new user (email, name, password)</li>
      <li><strong>POST /auth/login</strong> - Login and get JWT token</li>
      <li><strong>GET /users/me</strong> - Get profile (JWT required)</li>
    </ul>

    <h3>Contacts</h3>
    <ul>
      <li><strong>POST /contacts/request</strong> - Send a contact request</li>
      <li><strong>POST /contacts/accept</strong> - Accept a contact request</li>
      <li><strong>GET /contacts</strong> - List all accepted contacts</li>
    </ul>

    <h3>Messages</h3>
    <ul>
      <li><strong>POST /messages</strong> - Send a message to a contact (receiverId, message)</li>
      <li><strong>GET /messages/{contactId}</strong> - Get paginated messages with a contact (query params: page, limit)</li>
    </ul>

    <h2>Rate Limiting</h2>
    <p>The API limits the number of messages a user can send per minute to 5 messages to avoid abuse.</p>

    <h2>API Documentation</h2>
    <p>Interactive API documentation can be accessed here: <a href="http://localhost:3000/documentation" target="_blank">Swagger Documentation</a></p>

    <h2>Installation & Setup</h2>
    <pre>
      <code>
        # Clone the repository
        git clone https://github.com/your-repository/messaging-api.git

        # Install dependencies
        cd messaging-api
        npm install

        # Set environment variables in .env file
        DATABASE_URI=mongodb://localhost/messaging-api
        JWT_SECRET=your_jwt_secret
        PORT=3000

        # Run the application
        npm start
      </code>
    </pre>

    <h2>Testing</h2>
    <ul>
      <li>For testing the API, you can use <a href="https://www.postman.com/" target="_blank">Postman</a> or <a href="https://insomnia.rest/" target="_blank">Insomnia</a>.</li>
      <li>Swagger UI provides interactive API testing: <a href="http://localhost:3000/documentation" target="_blank">Swagger UI</a></li>
    </ul>

    <h2>License</h2>
    <p>This project is licensed under the MIT License.</p>

    <h2>Contributing</h2>
    <p>Feel free to fork the repository, submit issues, and pull requests. All contributions are welcome!</p>
  </div>
</body>
</html>
