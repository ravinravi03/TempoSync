import { error } from 'console';
import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { addTracks, createPlaylist, getPlaylistTracks, getTrackWithTempo, getUserPlaylists, getUserProfile, removeTracks, searchTracksWithTempo } from '../controllers/spotifyController.js';

const router = express.Router();

router.get("/profile", getUserProfile)
router.get("/profile/playlists", getUserPlaylists)
router.get("/track", getTrackWithTempo)
router.get("/playlist", getPlaylistTracks)
router.get("/search", searchTracksWithTempo)
router.post("/playlist", createPlaylist)
router.post("/playlist/addTracks", addTracks)
router.delete("/playlist/removeTracks", removeTracks)

export default router;