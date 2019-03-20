import { IUser, User } from "../models/User";
import { Response, Request } from "express";

export const getUser = (req: Request, res: Response) => {
    User.findById(req.user.id)
        .then((rUser: IUser | null) => {
            if(rUser){
                const { email, username } = rUser;
                res.send({ error: false, user: { email, username } })
            }
        })
        .catch(err => res.send({error: true, msg: err}));
};
