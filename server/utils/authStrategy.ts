import oauth from "passport-google-oauth20";
import {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "_constants";
const GoogleStrategy = oauth.Strategy;

export const googleStrategy = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL,
      },
      function (_accessToken, _refreshToken, _profile, cb) {
        return cb();
      }
    )
  );
};
