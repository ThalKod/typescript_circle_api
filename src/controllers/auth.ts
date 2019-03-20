import jwt from "jsonwebtoken";
import _ from "lodash";
import { Request, NextFunction, Response } from "express";

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

export const signIn = (req: Request, res: Response, next:NextFunction) => {
    const jwtToken = createJwtToken(req.user, "refreshToken");

    User.findById(req.user.id)
        .then((rUser: IUser | null) => {
            if(rUser){
                const { email, username } = rUser;
                return res.json({ user: {email, username}, token: `jwt ${jwtToken}`});
            }
        })
        .catch(err => next(err));
};

export const getToken = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) return res.status(403).send({"error": true, "message": 'No token provided.'});

    const token: string = req.headers.authorization.substring(4);

    if(token){
        if(process.env.JWT_REFRESH_TOKEN_SECRET){
            jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET, (err: Error, decoded: any) => {
                if(err)
                    return res.status(401).json({"error": true, "message": 'Unauthorized access.' });

                User.findById(decoded.user.id)
                    .then((rUser: IUser | null) => {
                        if(rUser){
                            const jwtToken = createJwtToken(rUser, "accessToken");
                            res.json({ token: `jwt ${jwtToken}` });
                        }
                    })
                    .catch(err => next(err));
                // return false;
            })
        }else{
            return res.status(403).send({
                "error": true,
                "message": 'No token provided.'
            });
        }
    }
};

