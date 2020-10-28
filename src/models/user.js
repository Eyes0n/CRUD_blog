import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

/*  
Model Method
  1.Instance(of Document) Method 
    user.setPassword() checkpassword() serailize
  2.Static Method(Model Instance=Document)
    findByUsername()
*/
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash; // this -> document instance
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; // true||false
};

UserSchema.methods.serialize = function () {
  // 응답할 데이터에서 hashedPassword 제거
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};
UserSchema.statics.findByUsername = async function (username) {
  return this.findOne({ username }); // this -> User(model instance = doc)
};

const User = mongoose.model('User', UserSchema);

export default User;
