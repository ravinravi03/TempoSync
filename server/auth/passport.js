import dotenv from 'dotenv'
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';

dotenv.config();

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

passport.use(
    new SpotifyStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: 'http://localhost:5050/login/spotify/callback'
        },
        function(accessToken,refreshToken,expires_in, profile, done){
            return done(null,{profile, accessToken, refreshToken});
        }

    )
);

passport.serializeUser((user, done) => {
    done(null, user)
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});
