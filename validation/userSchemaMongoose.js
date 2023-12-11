const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

// userSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;

//   return obj;
// };

const User = mongoose.model("users", userSchema);
module.exports = User;
