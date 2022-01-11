import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import NoteCard from '../components/Card'

const Notes = () => {
  const [notesData, setNotesData] = useState(undefined)

  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/notes/' + id, {
      method: 'DELETE',
    })

    setNotesData(notesData.filter((notes) => notes.id !== id))
  }

  useEffect(() => {
    fetch('http://localhost:8000/notes') // The data u get from fetch is a Buffer (a chunk of bytes in memory), but you need json right? So to convert it to json we first need to serialize that buffer into JSON and that's an asynchronous task. That's why res.json gives back an promise
      .then((res) => res.json())
      .then((data) => setNotesData(data))
  }, [])

  console.log(notesData)
  return (
    <Container>
      <Grid container spacing={3}>
        {notesData
          ? notesData.map((items) => {
              return (
                <Grid item md={4} xs={12} lg={4} key={items.id}>
                  <NoteCard {...items} handleDelete={handleDelete} />
                </Grid>
              )
            })
          : null}
      </Grid>
    </Container>
    // <Typography variant='h1'>this is the notes page</Typography>
  )
}

export default Notes
