import { Schema, Types, model, Model, Document } from "mongoose";

export interface IComment extends Document{
    text: string,
    author: Types.ObjectId,
    video: Types.ObjectId
    isReply: boolean,
    reply: IComment[]
};

const commentSchema = new Schema({
    text: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    reply: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    isReply: {
        type: Boolean,
        default: false
    }
});

export const Comment:Model<IComment> = model("Comment", commentSchema);
