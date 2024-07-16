import mongoose from "mongoose";
import Playlist from "./playlistModel.js";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    display_name: { type: String, required: true },
    id: { type: String, required: true, unique: true, index: true },
    profile_picture: { type: String, required: false },
    draftedPlaylists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    createdPlaylists: [
      {
        id: { type: String, required: true },
        maxTempo: { type: Number, required: true },
        minTempo: { type: Number, required: true }
      }
    ]
  });

userSchema.index({ id: 1 }, { unique: true });


const User = mongoose.model('User', userSchema);
export default User;