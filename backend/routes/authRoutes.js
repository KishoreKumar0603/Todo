import express from "express";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//Google
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Access token stored in user object by strategy above
    const token = req.user.token;
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);


export default router;
