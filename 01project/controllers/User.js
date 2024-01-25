const User = require("../models/User");

const handleCreateUser = async (req, res) => {
  const body = req.body;
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
  });

  return res.status(201).json({ msg: "Successfull!", user: result });
};

const handleDeleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id).then((result) => {
    return res.json({ msg: "Successfull" });
  });
};

const handleGetAllUsers = async (req, res) => {
  // Always start header name with X for custom header
  res.setHeader("X-Name", "Ajmal Hossain");

  const users = await User.find({});
  return res.json(users);
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.json(user);
};

const handleUpdateUser = async (req, res) => {
  const body = req.body;
  const updatedRow = {
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
  };
  await User.findByIdAndUpdate(req.params.id, updatedRow).then((result) => {
    return res.json({ msg: "Successfull" });
  });
};

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  handleGetUserById,
  handleUpdateUser,
  handleDeleteUser,
};
