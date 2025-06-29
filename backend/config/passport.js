import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
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



passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "15d" }
          );

          existingUser.token = token;
          return done(null, existingUser);
        }

        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        await newUser.save();

        const token = jwt.sign(
          { id: newUser._id, email: newUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "15d" }
        );

        newUser.token = token;
        done(null, newUser);
      } catch (err) {
        console.log("Google auth error", err);
        done(err, null);
      }
    }
  )
);
