import { Document, Types } from 'mongoose';
export declare class Comments extends Document {
    author: Types.ObjectId;
    contents: string;
    likeCount: number;
    info: Types.ObjectId;
}
export declare const CommentsSchema: import("mongoose").Schema<Comments, import("mongoose").Model<any, any, any>, undefined, any>;
