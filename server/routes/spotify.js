import { error } from 'console';
import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = express.Router();

router.get("/profile", async(req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getMe()
        .then(data=>{
            res.json(data.body);
        })
        .catch(err=>{
            if(err.statusCode === 401){
                res.status(401).json({error:'Access token expired'});
            }else{
                res.status(500).json({error:'Failed to retrieve profile'})
            }
        });
})

router.get("/profile/playlists",async(req,res)=>{
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    const username = req.query.username;

    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getUserPlaylists(username)
        .then(data =>{
            res.json(data.body);
        })
        .catch(err=>{
            if(err.statusCode === 401){
                res.status(401).json({error:'Access token expired'});
            }else{
                res.status(500).json({error:'Failed to retrieve user\'s playlists'});
            }
        });
})

router.get("/track", async(req,res)=>{
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    const trackId = req.query.trackId;

    spotifyApi.setAccessToken(accessToken);

    try {
        const [trackData, audioFeaturesData] = await Promise.all([
            spotifyApi.getTrack(trackId),
            spotifyApi.getAudioFeaturesForTrack(trackId)
        ]);

        const trackResponse = trackData.body;
        const tempo = audioFeaturesData.body.tempo;

        trackResponse.tempo = tempo;

        res.json(trackResponse);
    } catch (err) {
        if (err.statusCode === 401) {
            res.status(401).json({ error: 'Access token expired' });
        } else {
            res.status(500).json({ error: 'Failed to retrieve track' });
        }
    }
})

router.get("/playlist", async(req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    const playlistId = req.query.playlistId;

    spotifyApi.setAccessToken(accessToken);

    try {
        const playlistData = await spotifyApi.getPlaylistTracks(playlistId);
        const tracks = playlistData.body.items;

        const trackPromises = tracks.map(async (item) => {
            const track = item.track;
            const audioFeaturesData = await spotifyApi.getAudioFeaturesForTrack(track.id);
            track.tempo = audioFeaturesData.body.tempo;
            return track;
        });

        const tracksWithTempo = await Promise.all(trackPromises);

        res.json(tracksWithTempo);
    } catch (err) {
        if (err.statusCode === 401) {
            res.status(401).json({ error: 'Access token expired' });
        } else {
            res.status(500).json({ error: 'Failed to retrieve playlist tracks' });
        }
    }
})

router.get("/search", async(req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    const searchQuery = req.query.searchQuery;
    const minTempo = req.query.minTempo ? parseFloat(req.query.minTempo) : null;
    const maxTempo = req.query.maxTempo ? parseFloat(req.query.maxTempo) : null;
  
    if ((minTempo && isNaN(minTempo)) || (maxTempo && isNaN(maxTempo))) {
      return res.status(400).json({ error: 'Invalid tempo range' });
    }
  
    spotifyApi.setAccessToken(accessToken);
  
    let filteredTracks = [];
    let offset = 0;
    const limit = 20;
  
    try {
        while (filteredTracks.length < limit) {
            const searchData = await spotifyApi.searchTracks(searchQuery, { limit: 50, offset });
            const tracks = searchData.body.tracks.items;
            if (tracks.length === 0) break;

            const trackIds = tracks.map(track => track.id);
            const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(trackIds);
            const audioFeatures = audioFeaturesData.body.audio_features;
      
            const newlyFilteredTracks = tracks.filter((track, index) => {
              const tempo = audioFeatures[index]?.tempo;
              if (minTempo && maxTempo) {
                return tempo >= minTempo && tempo <= maxTempo;
              } else if (minTempo) {
                return tempo >= minTempo;
              } else if (maxTempo) {
                return tempo <= maxTempo;
              } else {
                return true;
              }
            });
      
            filteredTracks = filteredTracks.concat(newlyFilteredTracks);
            offset += 50;
          }
      
          res.json(filteredTracks.slice(0, limit));
    } catch (err) {
      if (err.statusCode === 401) {
        res.status(401).json({ error: 'Access token invalid' });
      } else {
        res.status(500).json({ error: "Error retrieving search results" });
      }
    }
})

router.post("/playlist", async (req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    const { playlistName, description, isPublic } = req.body;

    const options = {
        description: description || 'A playlist created by TempoSync',
        public: isPublic === 'true'
    };

    console.log(options)

    spotifyApi.createPlaylist(playlistName,options)
        .then(data => {
            res.json(data.body)
        })
        .catch(err => {
            if(err.statusCode === 401){
                res.status(401).json({error:"Access token invalid"})
            }else{
                res.status(500).json({error:"Error creating a playlist"})
            }
        });
})

router.post("/playlist/addTracks", async(req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    const {playlistId, tracks} = req.body;

    spotifyApi.addTracksToPlaylist(playlistId, tracks)
        .then(data => {
            res.json(data.body)
        })
        .catch(err => {
            if(err.statusCode === 401){
                res.status(401).json({error:"Access token invalid"})
            }else{
                res.status(500).json({error:"Error adding tracks to the playlist"})
            }
        });
})

router.delete("/playlist/removeTracks", async(req,res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if(!accessToken){
        return res.status(401).json({error:'No access token found'})
    }

    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    const {playlistId, tracks} = req.body;

    spotifyApi.removeTracksFromPlaylist(playlistId, tracks)
        .then(data => {
            res.json(data.body)
        })
        .catch(err => {
            if(err.statusCode === 401){
                res.status(401).json({error:"Access token invalid"})
            }else{
                res.status(500).json({error:"Error removing tracks to the playlist"})
            }
        });
})





export default router;