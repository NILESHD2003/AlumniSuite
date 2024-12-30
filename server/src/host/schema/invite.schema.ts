import mongoose, { Schema } from 'mongoose';

const Roles = ['Student', 'Alumni'];

const InviteSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Roles, required: true },
    token: { type: String, required: true },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Host',
      required: true,
    },
    createdAt: { type: Date, default: Date.now, expires: 15 * 24 * 60 * 60 },
  },
  { timestamps: true },
);

const Invite = mongoose.model('Invite', InviteSchema);

export default Invite;
