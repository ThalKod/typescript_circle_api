import { Request, Response } from "express";
import { User, IUser } from "../models/User";


export const checkEmail = (req:Request , res:Response) => {
    User.findOne({email: req.body.email})
        .then((rUser: IUser | null) => {
            if(!rUser) return res.send({error: false, valid: true});
            return res.send({error: false, valid: false});
        })
        .catch(err => res.send({ error: true, msg: err }));
};

export const checkUsername = (req:Request, res:Response) => {
    User.findOne({username: req.body.username})
        .then((rUser: IUser | null) => {
            if(!rUser) return res.send({error: false, valid: true});
            return res.send({error: false, valid: false});
        })
        .catch(err => res.send({ error: true, msg: err }));
};
