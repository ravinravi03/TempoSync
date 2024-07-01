import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    display_name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    profile_picture: { type: String, required: true },
    draftedPlaylists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    createdPlaylists: [
      {
        id: { type: String, required: true },
        maxTempo: { type: Number, required: true },
        minTempo: { type: Number, required: true }
      }
    ]
  });


const User = mongoose.model('User', userSchema);
export default User;