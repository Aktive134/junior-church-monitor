import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      required: true
    },
    role_type: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],
      default: "pending"
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
