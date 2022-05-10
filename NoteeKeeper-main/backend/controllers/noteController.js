const expressAsyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

// func to get all notes of a user by user id
const getNotes = expressAsyncHandler(async (req, res) => {
  // console.log("Get Notes Called");
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// func to create notes
const createNotes = expressAsyncHandler(async (req, res) => {
  // console.log("Create Notes Called");

  const { title, content, category } = req.body;

  // if any field is not provided throw error
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  // else create a new note with provided fields
  else {
    const note = new Note({
      user: req.user._id,
      title,
      content,
      category,
    });

    const createNote = await note.save();
    res.status(201).json(createNote);
  }
});

// func to get single note by id
const getNoteById = expressAsyncHandler(async (req, res) => {
  // console.log("Get Notes by Id called");
  const note_id = req.params.id;
  const note = await Note.findById(note_id);

  if (note) res.json(note);
  else
    res.status(404).json({
      message: "Note not Found",
    });
});

// func to update a note
const updateNote = expressAsyncHandler(async (req, res) => {
  // console.log("Update Note Called");
  const note_id = req.params.id;
  const { title, content, category } = req.body;

  const note = await Note.findById(note_id);

  // check if the requested note is created by this user only . (No other user can edit notes of other users)
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  // check if note exist and perform the updation
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();

    res.json(updatedNote);
  }
  // if note dosen't exist throw Error
  else {
    throw new Error("Note not found");
  }
});

// func to delete note
const deleteNote = expressAsyncHandler(async (req, res) => {
  // console.log("Delete Note Called");
  const note_id = req.params.id;

  const note = await Note.findById(note_id);

  // check if the requested note is created by this user only . (No other user can edit notes of other users)
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }

  // removing the note if it exists
  if (note) {
    await note.remove();
    res.json({
      message: "Note Deleted",
    });
  }
  // if note dosen't exist throw Error
  else {
    throw new Error("Note not found");
  }
});

module.exports = { getNotes, createNotes, getNoteById, updateNote, deleteNote };
