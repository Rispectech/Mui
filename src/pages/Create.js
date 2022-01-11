import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { createTheme, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'

const makeStyleClasses = makeStyles({
  textlabels: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block',
  },
})

const Theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe',
    },
    secondary: purple,
  },
  typography: {
    fontFamily: 'Open Sans',
    fontWeightLight: 300,
    fontWeightRegular: 400,
  },
})

const Create = () => {
  const classes = makeStyleClasses()
  const [formState, setFormState] = useState({
    formTitle: '',
    formDetails: '',
    titleError: false,
    detailError: false,
    description: '',
  })

  console.log(formState)
  const handleSubmit = (e) => {
    // formState.detailError = false
    setFormState((prevState) => {
      return { ...prevState, detailError: false }
    })
    setFormState((prevState) => {
      return { ...prevState, titleError: false }
    })
    e.preventDefault()

    if (formState.formDetails === '') {
      setFormState((prevState) => {
        return { ...prevState, detailError: true }
      })
      // console.log(formState)
    }

    if (formState.formTitle === '') {
      setFormState((prevState) => {
        return { ...prevState, titleError: true }
      })
      // console.log(formState)
    }
    if (formState.formTitle && formState.formDetails)
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          title: formState.formTitle,
          details: formState.formDetails,
          Desc: formState.description,
        }),
      }).then(
        setFormState({
          formTitle: '',
          formDetails: '',
          description: 'work',
          titleError: false,
          detailError: false,
        })
      )

    // console.log(formState)
  }

  const handleDesc = (Desc) =>
    setFormState((prevState) => {
      return { ...prevState, description: Desc }
    })
  return (
    <ThemeProvider theme={Theme}>
      <Container>
        <Typography
          variant='h6'
          component='h2'
          gutterBottom
          color='textSecondary'
        >
          Create a New Note
        </Typography>

        <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setFormState({ ...formState, formTitle: e.target.value })
            }
            variant='outlined'
            label='Note Title'
            color='secondary'
            className={classes.textlabels}
            fullWidth
            error={formState.titleError}
            defaultValue=''
          />
          <TextField
            onChange={(e) =>
              setFormState({ ...formState, formDetails: e.target.value })
            }
            variant='outlined'
            label='Details'
            color='secondary'
            className={classes.textlabels}
            multiline
            rows={3}
            fullWidth
            error={formState.detailError}
          />

          <FormControl className={classes.textlabels}>
            <FormLabel> Note Component</FormLabel>
            <RadioGroup
              onChange={(e) => handleDesc(e.target.value)}
              value={formState.description}
            >
              <FormControlLabel
                value='money'
                control={<Radio />}
                label='Money'
                // onChange={(e) => handleDesc(e.target.value)}
              />
              <FormControlLabel
                value='todos'
                control={<Radio />}
                label='Todos'
                // onChange={(e) => handleDesc(e.target.value)}
              />
              <FormControlLabel
                value='work'
                control={<Radio />}
                label='Work'
                // onChange={(e) => handleDesc(e.target.value)}
              />
              <FormControlLabel
                value='reminders'
                control={<Radio />}
                label='Reminders'
                // onChange={(e) => handleDesc(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
          <Button
            color='secondary'
            type='submit'
            variant='contained'
            disableElevation
            endIcon={<KeyboardArrowRightIcon />}
            // onSubmit={() => handleSubmit()}
          >
            Submit
          </Button>
        </form>
        {/* 
      <ButtonGroup>
        <Button>Submit</Button>
        <Button>Submit</Button>
        <Button>Submit</Button>
      </ButtonGroup> */}
        {/* <AcUnitIcon color='secondary' fontSize='large' /> */}
      </Container>
    </ThemeProvider>
  )
}

export default Create
