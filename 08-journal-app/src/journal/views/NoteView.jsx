import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../hooks/useForm"
import { useEffect, useMemo } from "react"
import { setActiveNote, startSavingNote } from "../../store/journal/"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

    const {
        body, title, onInputChange, formState, date
    } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
      if(formState !== note) {
        dispatch(setActiveNote(formState));
      }

    }, [formState]);

    const onSaveNote = () => {
        dispatch(startSavingNote());
        //console.log('asd2');
    }

    useEffect(() => {
      if(messageSaved.length > 0) {
        Swal.fire('Nota Actualizada', messageSaved, 'success');
      }
    
    }, [messageSaved])
    
    

  return (
    <Grid className="animate__animated animate__fadeIn animate__faster" container direction='row' justifyContent='space-between' sx={{mb:1}} alignItems='center'>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>
        <Grid item>
            <Button disabled={isSaving} color="primary" sx={{ padding: 2 }} onClick={() => onSaveNote()}>
                <SaveOutlined xs={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border:'none', mb: 1 }}
                name="title"
                value={title}
                onChange={onInputChange}
            />
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué ocurrió hoy?"
                minRows={5}
                name="body"
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        {/* Galería de imágenes */}
        <ImageGallery>

        </ImageGallery>
    </Grid>
  )
}
