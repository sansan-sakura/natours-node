const express = require('express');

const router = express.Router();
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} = require('./../controllers/userController');

router
  .route('/')
  .get(getAllUsers)
  .get(createUser);

router
  .route('/:id')
  .get(getUser)
  .delete(deleteUser)
  .patch(updateUser);

module.exports = router;
