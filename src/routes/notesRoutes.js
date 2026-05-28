import { Router } from 'express';
import { deleteNotes, getNoteById, getNotes, postNote, updateNote } from '../controllers/notesController.js';



const notesRouter = Router();
notesRouter.get('/', getNotes);

notesRouter.get('/:noteId', getNoteById);

notesRouter.get('/test-error', () => {
  throw new Error('Simulated server error');
});
notesRouter.post('/', postNote);
notesRouter.delete('/:noteId', deleteNotes);
notesRouter.patch('/:noteId', updateNote);
export default notesRouter;
