# Secure Messaging API

A secure, API-based messaging platform built with **Hapi.js**, **MongoDB**, **JWT** authentication, **bcrypt** password hashing, and **rate limiting**.

## Features

- **User Authentication**
  - Register and login users using JWT.
  - Secure password storage using bcrypt.
  
- **Contact System**
  - Send and accept contact requests.
  - View all accepted contacts.

- **Messaging System**
  - Send and receive messages between accepted contacts.
  - Paginated message retrieval.
  - Rate limit of 5 messages per minute per user.

- **Logging**
  - Requests and errors are logged using **Winston**.
<<<<<<< HEAD
=======
  - HTTP request logging via **Morgan**.
>>>>>>> refs/remotes/origin/main

## Tech Stack

- **Node.js** with **Hapi.js** for the backend API.
- **MongoDB** with **Mongoose** for data storage.
- **JWT** (JSON Web Tokens) for user authentication.
- **bcrypt** for secure password hashing.
<<<<<<< HEAD
=======
- **Morgan** for HTTP request logging.
>>>>>>> refs/remotes/origin/main
- **Winston** for custom application logging.
- **Express-rate-limit** for rate limiting.

## Setup and Installation

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local or cloud instance)

### Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/secure-messaging-api.git
