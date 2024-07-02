import express from 'express';
import { createCreatedPlaylist, createDraftedPlaylist, createUser, deleteDraftedPlaylist, deleteUserById, getUserById, removeCreatedPlaylist, updateUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/user', createUser);
router.get('/user/:id', getUserById);
router.patch('/user/:id', updateUserById);
router.delete('/user/:id', deleteUserById);
router.post('/user/:userId/draftedPlaylist', createDraftedPlaylist);
router.delete('/user/:userId/draftedPlaylist/:playlistId', deleteDraftedPlaylist);
router.post('/user/:userId/createdPlaylist', createCreatedPlaylist);
router.delete('/user/:userId/createdPlaylist/:playlistId', removeCreatedPlaylist);


export default router;