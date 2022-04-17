const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const authConfig = require("../config/auth.config");

const RefreshTokenSchema = new Schema({
  // tk: String,
  token: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  expiryDate: Date,
});

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();
  //   console.log(
  //     "expiredat",
  //     expiredAt.getSeconds() + authConfig.refreshExpiresIn
  //   );
  expiredAt.getSeconds() + authConfig.refreshExpiresIn;

  let _token = uuidv4();

  let _object = new this({
    // tk: tk,
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });
  console.log("dfjd", _object);

  let refreshToken = await _object.save();
  console.log("rf", refreshToken);
  return refreshToken.token;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);
module.exports = RefreshToken;
