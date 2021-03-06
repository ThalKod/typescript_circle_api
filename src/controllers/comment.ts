import { Request, Response } from "express";
import { IComment, Comment } from "../models/Comment";
import {IUser} from "../models/User";

export const addCommentToVideo = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) res.send({ error: true, msg: "Please provide video id "});

    const comment = {
        text: req.body.commentText,
        author:  req.user.id,
        video: id
    };

    Comment.create(comment)
        .then((comment: IComment) => {
            comment.populate("author", "username", (err, doc) => {
                if(err) return res.send({ error: true, msg: err});
                res.send({ error: false, comment: doc});
            })
        })
        .catch(err => console.log(err));
};

export const getCommentCountOfVideo = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) res.send({ error: true, msg: "Please provide video id "});

    Comment.count({ video: id })
        .then((count: number) => res.send({ error: false, count}))
        .catch(err => res.send({ error: true, msg: err}));
};

export const getVideoComment = (req:Request, res:Response) => {
    const { id } = req.params;
    const { limit, offset = 0 } = req.query;

    if(!id || ! limit ) return res.send({ error: true, msg: "Please provide the correct params"});

    Comment.find({ video: id })
        .sort({ createdAt: -1 })
        .skip(parseInt(offset))
        .limit(parseInt(limit))
        .populate("author", "username")
        .then((rComments: IComment[]) => {
            res.send({ error: false, comments: rComments});
        })
        .catch(err => res.send({ error: true, msg: err}));
};

export const addReplyToCommentById = (req:Request, res:Response) => {
    const { id } = req.params;
    if(!id) res.send({ error: true, msg: "Please provide comment id "});

    // @ts-ignore
    const comment: IComment = {
        text: req.body.commentText,
        author:  req.user.id,
        isReply: true
    };

    Comment.findById(id)
        .then(async (rComment: IComment | null) => {
            if(!rComment) return res.send({ error: true, msg: "No Comment record"});

            comment.video = rComment.video;
            const newComment: IComment = await Comment.create(comment);

            newComment.populate("author", "username", (err, result) => {
                if(err) return res.send({ error: true, msg: err});

                rComment.reply.push(newComment);
                rComment.save();

                return res.send({ error: false, comment: newComment });
            });
        })
        .catch(err => console.log(err));
};
