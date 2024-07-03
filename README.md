# TempoSync

TempoSync is a personal project aimed at enhancing my skills with JavaScript and React frameworks.

## Running the Backend

To run the backend server, follow these steps:

1. Open a terminal at the `server` folder.
2. Ensure you have a `config.env` file with the following variables:
   ```
   ATLAS_URI=<your MongoDB Atlas URI>
   PORT=<desired port for the server>
   SPOTIFY_CLIENT=<your Spotify client ID>
   SPOTIFY_CLIENT_SECRET=<your Spotify client secret>
   ENCRYPT_KEY=<encryption key for secure data handling>
   ```
3. Run the following command:
   ```
   node --env-file=config.env server
   ```

## Running the Frontend

To run the frontend of TempoSync, follow these steps:

1. Open a terminal at the `frontend` folder.
2. Ensure you have a `.env` file with the following variables:
   ```
   REACT_APP_BACKEND_URL=http://localhost:5050
   ```
4. Run the following command:
   ```
   npm run dev
   ```

This will start the development server for the frontend.
