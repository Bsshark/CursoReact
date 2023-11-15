import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { FirebaseDB } from "../../../src/firebase";
import { loadNotes } from "../../../src/helpers";

describe('Pruebas en thunk de Journal', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    it('startNewNote debe crear una nueva nota en blanco', async() => {
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid: uid}});

        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            date:  expect.any(Number) ,
            id: expect.any(String)
        }));

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            date:  expect.any(Number) ,
            id: expect.any(String)
        }));

        //Eliminacion
        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const deletePromises = [];
        docs.forEach(doc => {
            deletePromises.push(deleteDoc(doc.ref));
        });

        await Promise.all(deletePromises);

    });

    //No se hacer que funcione
    /* it('startLoadingNotes debe cargar todas las notas', async() => {
        const uid = 'TEST-UID';
        const notes = [];
        getState.mockReturnValue({auth: {uid: uid}});

        await loadNotes.mockResolvedValue(notes);

        await startLoadingNotes()(dispatch, getState);

        
        expect(dispatch).toHaveBeenCalledWith(setNotes(expect.any(Array)));
    }); */
 })