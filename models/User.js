const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true
    },
    password: {
      type: String,
      required: [true, "Please provide a password"]
    }
  },
  {
    timestamps: true
  }
);
userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) throw Error("fields cannot be left blank");
  if (!validator.isEmail(email)) throw Error("please provide a valid email");
  if (!validator.isStrongPassword(password))
    throw Error("please provide a strong password");

  let user = await this.findOne({ email });
  if (user) throw Error("email already received");

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(password, salt);
  user = await this.create({ email, password: hashedPass });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("fields cannot be left blank");
  const user = await this.findOne({ email });
  if (!user) throw Error("user not found");
  const passCheck = await bcrypt.compare(password, user.password);
  if(!passCheck) throw Error("check your credentials");
//   if (!bcrypt.compare(password, user.password))
//     throw Error("check your credentials");

    return user
};
module.exports = mongoose.model("User", userSchema);
