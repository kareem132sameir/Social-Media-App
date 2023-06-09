const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UsersSchema = new Schema({
  email: {
    type: String,
    required: [true, "please enter an email"],
  },
  username: {
    type: String,
    required: [true, "please enter a username"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "please enter a username"],
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    selected: false,
  },
  photo_url: [
    {
      type: String,
    },
  ],
  postId: [
    {
      type: Schema.Types.ObjectId, // Change the type to ObjectId
      ref: "Post", // Reference the Post model
    },
  ],
});

UsersSchema.methods.savePassword = async function (password) {
  const hashed_password = await bcrypt.hash(password, 10);
  this.password = hashed_password;
  await this.save();
};

UsersSchema.methods.checkPassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("fbUsers", UsersSchema);

module.exports = User;
