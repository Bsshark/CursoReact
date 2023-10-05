import { AddOutlined, MailOutline } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views/"

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>
        Dolor nisi quis sunt duis magna do proident proident irure sint esse.
      </Typography> */}
      <NothingSelectedView />
      {/* <NoteView/> */}

      <IconButton 
        size="large"
        sx={{
          color: 'white',
          bgcolor: 'error.main',
          ':hover': {
            bgcolor: 'error.main',
            opacity: 0.9
          },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{fontSize: 30}}/>

      </IconButton>
    </JournalLayout>
    
  )
}
