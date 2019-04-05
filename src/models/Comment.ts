import { Schema, Types, model, Model, Document } from "mongoose";

export interface IComment extends Document{
    text: string,
    author: Types.ObjectId,
    video: Types.ObjectId
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
    }
});

export const Comment:Model<IComment> = model("Comment", commentSchema);
