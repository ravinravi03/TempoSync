import User from '../models/userModel.js';
import Playlist from '../models/playlistModel.js';

export const createUser = async (req, res) => {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).send(user);
    } catch (error) {
        console.log(error)
      res.status(400).send(error);
    }
  };
  
export const getUserById = async (req, res) => {
try {
    const user = await User.findOne({ id: req.params.id }).populate('draftedPlaylists');
    if (!user) {
    return res.status(404).send();
    }
    res.send(user);
} catch (error) {
    console.error(error)
    res.status(500).send(error);
}
};

export const updateUserById = async (req, res) => {
const updates = Object.keys(req.body);
const allowedUpdates = ['display_name', 'profile_picture', 'draftedPlaylists', 'createdPlaylists'];
const isValidOperation = updates.every(update => allowedUpdates.includes(update));

if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
}

try {
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
    return res.status(404).send();
    }

    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.send(user);
} catch (error) {
    res.status(400).send(error);
}
};

export const deleteUserById = async (req, res) => {
try {
    const user = await User.findOneAndDelete({ id: req.params.id });

    if (!user) {
    return res.status(404).send();
    }

    res.send(user);
} catch (error) {
    res.status(500).send(error);
}
};

export const createDraftedPlaylist = async (req, res) => {
    const userId = req.params.userId;
    const { playlistDetails } = req.body;
  
    try {
      const { playlist_name, isPublic, description, maxTempo, minTempo, songs } = playlistDetails;

      const newPlaylist = new Playlist({
        playlist_name,
        isPublic,
        description,
        maxTempo,
        minTempo,
        songs: songs || []
      });
  
      await newPlaylist.save();
  
      const user = await User.findOneAndUpdate(
        { id: userId },
        { $push: { draftedPlaylists: newPlaylist._id} },
        { new: true }
      );
  
      res.status(201).json(user);
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: error.message });
    }
  };

export const deleteDraftedPlaylist = async (req, res) => {
    const { userId, playlistId } = req.params;
  
    try {
      await Playlist.findByIdAndDelete(playlistId);
  
      const user = await User.findOneAndUpdate(
        { id: userId },
        { $pull: { draftedPlaylists: playlistId } },
        { new: true }
      );
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const createCreatedPlaylist = async (req, res) => {
    const userId = req.params.userId;
    const { playlistDetails } = req.body;
  
    try {
      const user = await User.findOneAndUpdate(
        { id: userId },
        { $push: { createdPlaylists: playlistDetails } },
        { new: true }
      );
  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

export const removeCreatedPlaylist = async (req, res) => {
const { userId, playlistId } = req.params;

try {
    const user = await User.findOneAndUpdate(
    { id: userId },
    { $pull: { createdPlaylists: { id: playlistId } } },
    { new: true }
    );

    res.status(200).json(user);
} catch (error) {
    res.status(500).json({ message: error.message });
}
};