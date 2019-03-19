import passport from "passport";

export const requireAuth = passport.authenticate("jwt", { session: false });

export const requireSignin = passport.authenticate("local", { session: false });

