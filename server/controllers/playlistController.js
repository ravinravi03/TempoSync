import Playlist from '../models/playlistModel.js';

export const retrievePlaylist = async (req, res) => {
    const { playlistId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve playlist', error: error.message });
    }
}

export const addSong = async (req, res) => {
    const { playlistId } = req.params;
    const { song } = req.body;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        playlist.songs.push(song);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add song to playlist', error: error.message });
    }
}

export const removeSong = async (req, res) => {
    const { playlistId, songId } = req.params;

    try {
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        const songIndex = playlist.songs.findIndex(song => song._id.toString() === songId);

        if (songIndex === -1) {
            return res.status(404).json({ message: 'Song not found in playlist' });
        }

        playlist.songs.splice(songIndex, 1);
        await playlist.save();

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove song from playlist', error: error.message });
    }
}

export const updateName = async (req, res) => {
    const { playlistId } = req.params;
    const { playlist_name } = req.body;

    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { playlist_name } },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update playlist name', error: error.message });
    }
}

export const updateIsPublic = async (req, res) => {
    const { playlistId } = req.params;
    const { isPublic } = req.body;

    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { isPublic } },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update isPublic', error: error.message });
    }
}

export const updateDescription = async (req, res) => {
    const { playlistId } = req.params;
    const { description } = req.body;

    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { description } },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update description', error: error.message });
    }
}

export const updateTempoRange = async (req, res) => {
    const { playlistId } = req.params;
    const { maxTempo, minTempo } = req.body;

    try {
        const playlist = await Playlist.findByIdAndUpdate(
            playlistId,
            { $set: { maxTempo, minTempo } },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update tempo range', error: error.message });
    }
}