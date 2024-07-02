import express from 'express'
import { addSong, removeSong, retrievePlaylist, updateDescription, updateIsPublic, updateName, updateTempoRange } from '../controllers/playlistController.js';

const router = express.Router();

router.get('/playlist/:playlistId', retrievePlaylist)
router.post('/playlist/:playlistId/addSong', addSong)
router.delete('/playlist/:playlistId/removeSong/:songId', removeSong)
router.put('/playlist/:playlistId/updateName', updateName)
router.put('/playlist/:playlistId/updateIsPublic', updateIsPublic);
router.put('/playlist/:playlistId/updateDescription', updateDescription);
router.put('/playlist/:playlistId/updateTempoRange', updateTempoRange);

export default router;