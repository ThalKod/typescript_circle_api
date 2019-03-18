import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy} from "passport-local";
import { IUser, User } from "../models/User";

// setup options for strategies

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.JWT_SECRET
};

const localOptions = {
    usernameField: "email"
};

// create Local Strategy
const localLogin = new LocalStrategy(localOptions, (email: string, password: string, done) => {
    User.findOne({ email }).then((rUser) => {
        console.log(rUser);
        if(!rUser){
            console.log("not here");
            return done(null, false);
        }
        // Compare password
        rUser.comparePassword(password, (err: Error, isMatch: boolean) => {
            console.log(err);
            if(err) return done(err);
            console.log(isMatch);
            if(!isMatch) return done(null, false);

            done(null, { id: rUser._id});
        });
    }).catch((err) => {
        done(err);
    });
});

// create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.user._id).then((rUser: IUser|null) => {
        if(!rUser){
            return done(null, false);
        }
        console.log(rUser);
        return done(null,{ id: rUser._id});
    }).catch((err) => {
        console.log("error========",err);
        done(err, false)
    });
});

// Tell passport to use the strategy
passport.use(jwtLogin);
passport.use(localLogin);
