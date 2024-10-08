import mongoose,{ Schema } from 'mongoose';

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamp: true,
    }
)

export const Comment = mongoose.model('Comment', commentSchema);