import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase";
import { addNewEmptyNote, noteUpdated, savingNewNote, setActiveNote, setNotes, setSaving } from "./journalSlice";
import { loadNotes } from "../../helpers/";

export const startNewNote = () => {
    return async(dispatch, getState) => {

        dispatch(savingNewNote());
       
        const { uid } = getState().auth;
        console.log(uid)

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {

        const { uid } = getState().auth;
        if(!uid) throw new Error('El usuario no está establecido');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));

    }
}

export const startSavingNote = (note) => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await setDoc(docRef, noteToFireStore, {merge: true});
        dispatch(noteUpdated(note));
    }
}