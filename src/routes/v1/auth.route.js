const express = require('express');

const validate = require('../../middlewares/validate');
const { firebaseAuth, generateToken } = require('../../middlewares/firebaseAuth');
const { authValidation } = require('../../validations');
const { fileUploadService } = require('../../microservices');

const { authController } = require('../../controllers');

const router = express.Router();

router.post('/login', firebaseAuth('All'), authController.loginUser);

router.post(
  '/register',
  firebaseAuth('User'),
  // fileUploadService.multerUpload.single('profilePic'),
  // validate(authValidation.register),
  authController.registerUser
);

router.post(
  '/register-admin',
  firebaseAuth('Admin'),
  // fileUploadService.multerUpload.single('profilePic'),
  // validate(authValidation.register),
  authController.registerUser
);

router.post("/generate-token/:uid", generateToken);

module.exports = router;
