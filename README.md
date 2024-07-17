# TempoSync

TempoSync is a personal project aimed at enhancing my skills with JavaScript and React frameworks. It allows users to create playlists which contains songs of a certain tempo range.

  <img width="420" alt="Screenshot 2024-07-17 at 11 46 11 AM" src="https://github.com/user-attachments/assets/576605bc-9077-4d80-b3d0-7ae3a7123b3b">
  <img width="420" alt="Screenshot 2024-07-17 at 11 46 25 AM" src="https://github.com/user-attachments/assets/9e9b3fb4-6340-482c-b7b9-31a9182b5fc3">

## Important Note on Deployment

The Vercel deployment link on this GitHub repository will not work past the login page due to the limitations imposed by the Spotify Web API. Specifically, the Spotify Web API has an access control list that restricts usage to up to 25 users in development mode. This limit cannot be increased for personal projects because Spotify requires certain criteria to be met for a quota increase, which personal projects typically do not qualify for. The Vercel deployment is provided to demonstrate that deployment is possible, even though it won't function as intended for more than the allowed number of users.

## Running the Backend

To run the backend server, follow these steps:


1. Open a terminal at the `server` folder.
2. Ensure you have a `config.env` file with the following variables:
   ```
   ATLAS_URI=<your MongoDB Atlas URI>
   SPOTIFY_CLIENT=<your Spotify client ID>
   SPOTIFY_CLIENT_SECRET=<your Spotify client secret>
   ENCRYPT_KEY=<AES-256 encryption key for secure data handling>
   FRONTEND_URL=http://localhost:5173
   BACKEND_URL=http://localhost:5050
   NODE_ENV=development
   ```
   You can source the atlas URI by generating a MongoDB database, the spotify client ids through the Spotify Developer Dashboard, and the encryption key from 'https://acte.ltd/utils/randomkeygen'.
4. Run the following command:
   ```
   npm start
   ```

## Running the Frontend

To run the frontend of TempoSync, follow these steps:

1. Open a terminal at the `frontend` folder.
2. Ensure you have a `.env` file with the following variables:
   ```
   VITE_BACKEND_URL=http://localhost:5050
   ```
4. Run the following command:
   ```
   npm run dev
   ```

This will start the development server for the frontend.
