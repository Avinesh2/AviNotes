import express from 'express';
import { signup, signin, signout, checkAuth } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Regular auth routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', verifyToken, signout);
router.get('/checkAuth', checkAuth);

// Google Strategy configuration
const googleStrategyConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production'
    ? "https://avinotes.onrender.com/api/auth/google/callback"
    : "http://localhost:3000/api/auth/google/callback",
  passReqToCallback: true
};

// Initialize Google Strategy
try {
  if (!googleStrategyConfig.clientID || !googleStrategyConfig.clientSecret) {
    throw new Error('Google OAuth credentials are missing');
  }

  passport.use(new GoogleStrategy(googleStrategyConfig,
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails[0]) {
          return done(new Error('No email found in Google profile'), null);
        }

        const email = profile.emails[0].value;
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email,
            password: 'google-oauth'
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('Error in Google strategy:', err);
        return done(err, null);
      }
    }
  ));

  // Google OAuth routes
  router.get('/google',
    passport.authenticate('google', { 
      scope: ['profile', 'email'],
      prompt: 'select_account',
      session: false
    })
  );

  router.get('/google/callback',
    passport.authenticate('google', { 
      failureRedirect: '/login',
      session: false 
    }),
    async (req, res) => {
      try {
        // Clear any existing cookies
        res.clearCookie('access_token');

        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.redirect(process.env.NODE_ENV === 'production'
          ? 'https://avi-notes.vercel.app'
          : 'http://localhost:5173'
        );
      } catch (error) {
        console.error('Error in Google callback:', error);
        res.redirect('/login?error=auth_failed');
      }
    }
  );

  console.log('Google OAuth routes initialized successfully');
} catch (error) {
  console.error('Failed to initialize Google OAuth:', error.message);
}

// Required for passport
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default router;