import Note from '../models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};
export const getNoteById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404, `Notes with id=${noteId} not found`);
  }
  res.json(note);
};
export const postNote = async(req, res)=>{
  const note = await Note.create(req.body);
  res.status(200).json(note);
};
export const deleteNotes = async (req, res)=>{
  const {noteId} = req.params;
  const note = await Note.findOneAndDelete({
    _id: noteId,
  });
  if(!note){
    throw createHttpError(404, "Notes not found");
  };
  res.status(200).json(note);
};
export const updateNote = async(req, res)=>{
  const {noteId} = req.params;
  const notes = await Note.findOneAndUpdate(
    {id: noteId},
    req.body,
    {returnDocument: "after"},
  );
  if(!notes){
    throw createHttpError(404, "Notes not found");
  };
  res.status(200).json(notes);
};
