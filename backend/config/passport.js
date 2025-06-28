import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from 'dotenv'
dotenv.config();
//Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//Deserialize user
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

//Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });
  if (existingUser) return done(null, existingUser);

  const user = await User.create({
    name: profile.displayName,
    email: profile.emails[0].value,
    googleId: profile.id,
  });
  done(null, user);
}));
