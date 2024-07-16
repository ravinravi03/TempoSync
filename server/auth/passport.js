import dotenv from 'dotenv'
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import User from '../models/userModel.js';

dotenv.config();

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const backendUrl = process.env.BACKEND_URL;

passport.use(
    new SpotifyStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: `${backendUrl}/login/spotify/callback`,
            scope: ['playlist-modify-public', 'playlist-modify-private'],
        },
        async (accessToken, refreshToken, expires_in, profile, done) => {
            try {
                let user = await User.findOne({ id: profile.id });

                if (!user) {
                    user = new User({
                        display_name: profile.displayName,
                        id: profile.id,
                        profile_picture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                    });
                    await user.save();
                }

                return done(null, {profile, accessToken, refreshToken,});

            } catch (error) {
                console.error('Error processing Spotify authentication:', error);
                return done(error);
            }
        }

    )
);

passport.serializeUser((user, done) => {
    done(null, user)
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});
