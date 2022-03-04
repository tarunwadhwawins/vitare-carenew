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

export const latestNotesSuccess = async (state, note) => {
  if(note && note.length > 0) {
    note.date = dateOnlyFormat(note.date);
    state.latestNotes = note;
  }
  else {
    state.latestNotes = null;
  }
}