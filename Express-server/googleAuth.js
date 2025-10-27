const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./user');

module.exports = (passport) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
        console.warn('googleAuth: GOOGLE_CLIENT_ID o GOOGLE_CLIENT_SECRET no definidos. Estrategia Google no registrada.');
        return;
    }

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        const nombre = (profile.name && profile.name.givenName) || '';
        const apellidos = (profile.name && profile.name.familyName) || '';
        const googleId = profile.id;

        let user = null;
        if (googleId) user = await User.findOne({ googleId });
        if (!user && email) user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            user = new User({
            nombre: nombre.trim(),
            apellidos: apellidos.trim(),
            email: email ? email.toLowerCase().trim() : undefined,
            googleId
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        return done(null, user);
        } catch (err) {
        return done(err, null);
        }
    }));
};
