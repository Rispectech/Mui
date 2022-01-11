import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'

const NoteCard = ({ title, details, Desc, handleDelete, id }) => {
  return (
    <Card elevation={1}>
      <CardHeader
        action={
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteOutlined />
          </IconButton>
        }
        title={title}
        subheader={Desc}
      />
      <CardContent>
        <Typography>{details}</Typography>
      </CardContent>
    </Card>
  )
}

export default NoteCard
