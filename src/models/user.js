import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// model instance method for password
// user.setPassword()
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash; // this -> document instance
};
// user.checkpassword()
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true||false
};

// static method
UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username }); // this -> User(model instance)
};

const User = mongoose.model('User', UserSchema);

export default User;
