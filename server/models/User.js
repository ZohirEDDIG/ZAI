import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, match: /^[a-zA-Z0-9\.-@_]{3,}$/ },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model( 'User', userSchema );
