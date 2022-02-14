import { dateOnlyFormat } from '../../commonMethods/commonMethod';

export const addNoteSuccess = async (state, note) => {
  state.addNote = note;
}

export const notesListSuccess = async (state, notes) => {
  state.notesList = notes.map(note => {
    note.date = dateOnlyFormat(note.date);
    return note;
  });
}