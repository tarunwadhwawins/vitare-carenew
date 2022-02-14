// import { dateFormat } from '../../commonMethods/commonMethod';

export const addNoteSuccess = async (state, note) => {
  state.addNote = note;
}

export const notesListSuccess = async (state, notes) => {
  state.notesList = notes;
}

export const deleteNoteSuccess = async (state, note) => {
  state.deleteNote = note;
}