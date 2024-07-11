import express from 'express';
import session from 'express-session'
import passport from 'passport';
import "../auth/passport.js"
import { createCookieValue } from '../encryption/cookieUtils.js';

const router = express.Router();

const frontendURL = process.env.FRONTEND_URL;

router.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

router.use(passport.initialize());
router.use(passport.session());

router.get('/spotify', passport.authenticate('spotify'));

router.get('/spotify/callback',
    passport.authenticate('spotify',{
        failureRedirect: '/login'
    }),
    function(req,res){
        res.cookie('accessToken', createCookieValue(req.user.accessToken), { 
            httpOnly: false,
            secure: true,
            maxAge: 86400 * 1000,
            sameSite: 'None',
            path: '/',
            domain: process.env.NODE_ENV === 'development' ? '.localhost' : 'temposync-server-awcnt37iza-uc.a.run.app'
        });
        res.cookie('refreshToken', createCookieValue(req.user.refreshToken), { 
            httpOnly: false,
            secure: true,
            maxAge: 86400 * 1000,
            sameSite: 'None',
            path: '/',
            domain: process.env.NODE_ENV === 'development' ? '.localhost' : 'temposync-server-awcnt37iza-uc.a.run.app'
        });
        res.redirect(`${frontendURL}/main/home`);
    }
);


export default router;