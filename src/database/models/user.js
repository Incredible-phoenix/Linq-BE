import mongoose from 'mongoose';

const SCHEMA_NAME = 'user';

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  }
});

const User = mongoose.model(SCHEMA_NAME, UserSchema);

export default User;