import mongoose, { Schema } from 'mongoose';

// Enum for Role
const Roles = ['Student', 'Alumni'];

// Main Member schema
const MemberSchema = new Schema(
  {
    role: { type: String, enum: Roles, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    location: { type: String },
    bio: { type: String },
    profileImage: { type: String },
    phone: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const Member = mongoose.model('Member', MemberSchema);

export default Member;
