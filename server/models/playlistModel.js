import mongoose from "mongoose";

const Schema = mongoose.Schema;

const songSchema = new Schema({
    song_id: { type: String, required: true},
    album_name: { type: String,required: true},
    song_title: { type: String,required: true},
    duration_ms: { type: Number,required: true},
    artists: [{ type: String,required: true}],
    tempo: { type: Number,required: true},
    album_art: { type: String,required: true}
});

const playlistSchema = new Schema({
    playlist_name: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    description: { type: String, required: true },
    maxTempo: { type: Number, required: true },
    minTempo: { type: Number, required: true },
    songs: [songSchema]
  });

const Playlist = mongoose.model('Playlist',playlistSchema);
export default Playlist;