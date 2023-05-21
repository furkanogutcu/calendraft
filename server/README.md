# Calendraft API

This project is a NestJS application that contains the server-side logic.

## Installation

1. Clone this project to your local machine:

   ```bash
   git clone https://github.com/furkanogutcu/calendraft.git
   ```

2. Navigate to the project directory:

   ```bash
   cd calendraft
   ```

3. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

4. Bring up the database using Docker Compose:

   ```bash
   docker-compose up --detach
   ```

5. Navigate to the project directory:

   ```bash
   cd server
   ```

## Configuration

The project requires a few environment variables to configure various settings. You can change the configuration by creating and editing the `.env` file.

Below is a sample `.env` file:

```bash
DATABASE_URL="postgresql://calendraft_admin:calendraft_admin@localhost:5432/calendraft?schema=public"
JWT_SECRET="YOUR_VERY_SECRET_KEY"

JWT_EXPIRES_IN=86400 # Default 1 day - Not Required
BCRYPT_SALT_ROUND=12 # Default 12 - Not required
SUPER_ADMIN_EMAIL='admin@calendraft.com' # Default 'admin@calendraft.com' - Not required
SUPER_ADMIN_PASSWORD='cal3endraft' # Default 'cal3endraft' - Not reqired
```

## Running

You can start the project by running the following command:

```bash
npm run start:dev
```

The server will be running at http://localhost:3000

This command will serve the Swagger documentation at http://localhost:3000/docs
