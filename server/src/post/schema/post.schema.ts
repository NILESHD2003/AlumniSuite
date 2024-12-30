import mongoose, { Schema } from 'mongoose';

// Main Post schema
const PostSchema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Host' },
    content: { type: String, required: true },
    attachments: { type: [String], default: [] },
    likesCount: { type: String, default: '0' },
    commentsCount: { type: String, default: '0' },
  },
  { timestamps: true },
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
