const { authService, favouriteService, userService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const generateRandomUserId = require("../utils/generateRandomUserId")
const generateReferralCode = require("../utils/generateReferralCode")

const createNewUserObject = newUser => ({
  name: newUser.name,
  email: newUser.email,
  firebaseUid: newUser.uid,
  profilePic: newUser.picture,
  isEmailVerified: newUser.isEmailVerified,
  firebaseSignInProvider: newUser.firebase.sign_in_provider,
  phone: newUser.phone_number,
});

const loginUser = catchAsync(async (req, res) => {
  res.status(200).send({ status: true, message: "Logged in successfully", data: req.user });
});

const registerUser = catchAsync(async (req, res) => {
  if (req.user) {
    res.status(401).send({ message: 'User already exist' });
    // } else if (!req.newUser.email_verified) {
    //   res.status(401).send({ message: "Email not verified" });
  } else {
    let userId = generateRandomUserId()
    const userObj = {
      ...createNewUserObject(req.newUser),
      ...req.body,
      userId,
    };
    let user = null;
    switch (req.routeType) {
      case 'User':
        let referralCode = generateReferralCode()
        user = await authService.createUser({ ...userObj, referralCode });
        break;
      case 'Admin':
        user = await authService.createAdmin({ ...userObj, role: 'admin' });
        break;
      default:
        break;
    }
    res.status(201).json({ status: true, message: "User created", data: user });
  }
});

module.exports = {
  loginUser,
  registerUser,
};
