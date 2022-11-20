const mongoose = require("mongoose");
const Note = require("../models/Note");

// add new note
const addNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const {_id} = req.user
    const data = await Note.create({ title, content, user: _id });
    console.log(data)
    res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// get all Notes
const getAll = async (req, res) => {
  try {
    const {_id} = req.user;
    const data = await Note.find({user: _id}).sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

// get by id and update
const getByIdAndUpdate = async (req, res) => {
  const { title, content } = req.body;
  try {
    const data = await Note.findOneAndUpdate(
      { _id: req.params.id },
      { title, content },
      {
        new: true,
        runValidators: true
      }
    );
    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({
        success: false,
        message: "Note not found"
      });
    console.log(err);
  }
};

// get by id and remove
const getByIdAndRemove = async (req, res) => {
  try {
    const data = await Note.findOneAndDelete(
      { _id: req.params.id },
      {
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({
        success: false,
        message: "Note not found"
      });
  }
};

// get by id
const getById = async (req, res) => {
  try {
    const data = await Note.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: data
    });
  } catch (err) {
    if (err.name === "CastError")
      return res.status(400).json({
        success: false,
        message: "Note not found"
      });
  }
};

module.exports = {
  addNote,
  getAll,
  getById,
  getByIdAndRemove,
  getByIdAndUpdate
};
