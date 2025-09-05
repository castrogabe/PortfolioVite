// models/userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    // needed for /forget-password and /reset-password routes
    resetToken: { type: String },

    // optional hardening (use if you plan the “must change password” flow)
    // mustChangePassword: { type: Boolean, default: false },
    // passwordChangedAt: { type: Date },
  },
  { timestamps: true }
);

// prevent OverwriteModelError in dev/hot-reload
const User = mongoose.models?.User || mongoose.model('User', userSchema);

export default User;
