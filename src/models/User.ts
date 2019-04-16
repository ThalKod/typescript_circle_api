import { Schema, Document, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document{
    email: string,
    username: string,
    password: string,
    comparePassword: (val1:string, val2: (err:Error, val2: boolean) => void) => void,
    subscribersCount: number
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    subscribersCount: {
        type: Number,
        default: 0
    }
});

userSchema.pre<IUser>("save", function(next){
    const user = this;

    bcrypt.genSalt(10, (err: Error, salt: string) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, (err: Error, hash: string) => {
            if(err) { return next(err);}
            user.password = hash;
            return next();
        });
    })
});

userSchema.methods.comparePassword = function(candidatePassword: string, callback: (err: Error|null, val2?: boolean) => {}){
    bcrypt.compare(candidatePassword, this.password, (err, isMatch: boolean) => {
        if(err) return callback(err);

        return callback(null, isMatch);
    });
};

export const User:Model<IUser> = model<IUser>("User", userSchema);
