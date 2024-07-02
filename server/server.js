import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRouter from "./routes/login.js";
import spotifyRouter from "./routes/spotify.js"
import userRouter from "./routes/user.js"
import playlistRouter from "./routes/playlist.js"

const PORT = process.env.PORT || 5050;
const app = express();


app.use(cors());
app.use(express.json());

app.use('/login',loginRouter);
app.use('/spotify',spotifyRouter);
app.use('/db', userRouter);
app.use('/db', playlistRouter);

mongoose.connect(process.env.ATLAS_URI)
// Only after connecting do we start listening for server requests
  .then(() => {
    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
// Catch any errors
  .catch((error) => {
    console.log(error)
  })