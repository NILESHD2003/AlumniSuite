import mongoose, { Schema } from 'mongoose';

// Embedded sub-schemas
const ContactInfoSchema = new Schema({
  email: { type: String },
  phNo: { type: String },
  website: { type: String },
});

const SocialsSchema = new Schema({
  facebook: { type: String },
  twitter: { type: String },
  linkedIn: { type: String },
  instagram: { type: String },
});

// Main Host schema
const HostSchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    logo: { type: String },
    description: { type: String },
    status: { type: Boolean, default: true },
    contactInfo: ContactInfoSchema,
    socials: SocialsSchema,
  },
  { timestamps: true },
);

const Host = mongoose.model('Host', HostSchema);

export default Host;
