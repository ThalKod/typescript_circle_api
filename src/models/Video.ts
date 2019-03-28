import { Schema, Document, model, Model, Types } from "mongoose";

export interface IVideo extends Document{
    name: string,
    handle: string,
    mimeType: string,
    url: string,
    duration: number,
    size: number,
    author: Types.ObjectId,
    defaultCoverPhoto: string,
    description: string,
    tags: { id: string, text: string}[],
    viewCount: number
    createdAt?: number,
    updatedAt?: number
}

const videosSchema = new Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    handle: {
        type: String,
        unique: true,
        require: true
    },
    mimeType: String,
    url: {
        type: String,
        unique: true,
        require: true,
    },
    duration: Number,
    size: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    defaultCoverPhoto: String,
    description: String,
    tags: [],
    viewCount: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

export const Video:Model<IVideo> =  model<IVideo>("Video", videosSchema);
