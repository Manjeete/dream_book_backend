const express = require('express');

const validate = require('../../middlewares/validate');
const { firebaseAuth } = require('../../middlewares/firebaseAuth');
const userValidation = require('../../validations/user.validation');

const { userController } = require('../../controllers');
const { fileUploadService } = require('../../microservices');

const router = express.Router();

router.get(
  '/',
  firebaseAuth('Admin'),
  userController.getAllUsers
);

router.get(
  '/:id',
  firebaseAuth('Admin'),
  userController.getUserById
);

router.get(
  '/get/me',
  firebaseAuth('All'),
  userController.getMe
);

// for updating userDetails
router.patch(
  '/update/me',
  fileUploadService.multerUpload.single('profilePic'),
  firebaseAuth('All'),
  validate(userValidation.updateDetails),
  userController.updateUser
);

router.patch(
  '/:userId',
  fileUploadService.multerUpload.single('profilePic'),
  firebaseAuth('Admin'),
  userController.updateUserByAdmin
);

router.patch(
  '/:userId/block-unblock',
  firebaseAuth('Admin'),
  validate(userValidation.blockUser),
  userController.blockUnblockUser
);

// for updating specific user preferences
router.patch(
  '/updatePreferences',
  validate(userValidation.updateUserPreferences),
  firebaseAuth('All'),
  userController.updatePreferences
);

// for deleting a user
router.delete('/delete/me', validate(userValidation.deleteUser), firebaseAuth('All'), userController.deleteUser);

// to soft delete a user
router.post('/delete/:userId', validate(userValidation.deleteUser), firebaseAuth('All'), userController.softDeleteUser);

module.exports = router;
