const express = require("express");
const {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
} = require("../controllers/User");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

module.exports = router;
