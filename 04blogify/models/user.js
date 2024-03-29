const { createHmac, randomBytes } = require("crypto");
const { Schema, model } = require("mongoose");
const { createToken } = require("../services/auth");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = getHash(salt, user.password);

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("authenticateUser", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("Authentication failed!");

  const newHash = getHash(user.salt, password);
  if (user.password !== newHash) throw new Error("Authentication failed!");

  const token = createToken(user);
  return token;
});

const getHash = (salt, value) => {
  return createHmac("sha256", salt).update(value).digest("hex");
};

const User = model("user", userSchema);

module.exports = User;
