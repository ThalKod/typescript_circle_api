import jwt from "jsonwebtoken";
import _ from "lodash";
import { Request, NextFunction, Response} from "express";

import { User, IUser } from "../models/User";

// Create an access or refresh token based on type
const createJwtToken = (user: IUser, type: string) => {
    if(type === "refreshToken"){
        if(process.env.JWT_REFRESH_TOKEN_SECRET)
            return  jwt.sign({user: _.pick(user, ["id"])}, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    }
    if(process.env.JWT_SECRET)
        return  jwt.sign({ user: user.toJSON()}, process.env.JWT_SECRET, { expiresIn: '5m' });
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const { email, password, username } = req.body;

    if(!email || !password || !username){
        return res.status(422).send({ error: "You must provide an email, username and password" });
    }

    User.findOne({ email }, (err, rUser: IUser) => {
        if(err){
            return next(err);
        }
        if(rUser){
            return res.status(422).send({ error: "Already registered with this email" });
        }

        const user: IUser = new User({ email, password, username});
        user.save((err, rUser) => {
            if(err) return next(err);
            const jwtToken = createJwtToken(rUser, "refreshToken");
            return res.json({ user: { email, username }, token: `jwt ${jwtToken}`});
        });
    });
};
