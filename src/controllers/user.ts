import { IUser, User } from "../models/User";
import { Response, Request } from "express";
import { Video, IVideo} from "../models/Video";

export const getUser = (req: Request, res: Response) => {
    User.findById(req.user.id)
        .then((rUser: IUser | null) => {
            if(rUser){
                const { email, username, _id } = rUser;
                res.send({ error: false, user: { email, username, _id } })
            }
        })
        .catch(err => res.send({error: true, msg: err}));
};

export const getVideoCountByUserId = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.send({ error: true, msg: "Please provide a user id"});

    Video.find({ author: id })
        .then((rVideo: IVideo[]) => {
            res.send({ error: false, videosCount: rVideo.length})
        })
        .catch(err => res.send({ error: true, msg: err }));
};

export const getSubscribersCountByUserId = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.send({ error: true, msg: "Please provide a user id"});

    User.findById(id)
        .then((rUser: IUser | null) => {
            if(!rUser) return res.send({ error: true, msg: "no user record"});
            res.send({ error: false, subscribersCount: rUser.subscribersCount})
        })
        .catch(err => res.send({error: true, msg: err}));
};

export const getUserNameById = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.send({ error: true, msg: "Please provide a user id"});

    User.findById(id)
        .then((rUser: IUser | null) => {
            if(!rUser) return res.send({ error: true, msg: "No user record"});
            res.send({ error: false, username: rUser.username})
        })
        .catch(err => res.send({error: true, msg: err}));
};

export const addSubscribersByUserId = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) return res.send({ error: true, msg: "Please provide a user id"});

    User.findById(id)
        .then((rUser: IUser | null ) => {
            if(!rUser) return res.send({ error: true, msg: "No user record"});

            rUser.subscribersCount += 1;
            rUser.subscribers.push(req.user.id);
            rUser.save();

            return res.send({ error: false });
        })
        .catch((err) => {
            res.send({ error: true, msg: err})
        });
};

export const getUserSubscriberListById = (req:Request, res:Response) => {
    const { id } = req.params;
    const { limit, offset } = req.query;

    if(!id || !limit || !offset) return res.send({ error: true, msg: "Please provide the correct params"});

    User.find({ subscribers: id})
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .select("username subscribersCount")
        .then((rUsers: IUser[]) => {
            if(!rUsers) return res.send({ error: true, msg: "Internal server record"});
            res.send({ error: false, channels: rUsers });
        })
        .catch(err => res.send({ error: false, msg: err}));
};
