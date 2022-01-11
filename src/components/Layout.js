import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles({
  layout: {
    background: '#f9f9f9',
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  root: {
    display: 'flex',
  },
  active: {
    backgroundColor: '#f4f4f4',
    transition: '0.3s',
  },
})

const Layout = ({ children }) => {
  const classes = useStyles()
  const [activeState, setActive] = useState(1)

  const menuItems = [
    {
      Text: 'My Notes',
      Icon: <SubjectOutlined color='secondary' /> /*color='secondary'*/,
      path: '/',
      id: 1,
    },

    {
      Text: 'Create Notes',
      Icon: <AddCircleOutlineOutlined color='secondary' />,
      path: '/create',
      id: 2,
    },
  ]
  return (
    <section className={classes.root}>
      <Drawer
        variant='permanent'
        anchor='left'
        className={classes.drawer}
        classes={{ paper: classes.drawerPaper }}
      >
        <Typography variant='h5'>RV Notes</Typography>

        <List>
          {menuItems.map((items) => (
            <Link
              to={items.path}
              key={items.id}
              onClick={() => {
                console.log(items.id, activeState)
                setActive(items.id)
                console.log(items.id, activeState)
              }}
            >
              <ListItem
                className={items.id === activeState ? classes.active : null}
              >
                <ListItemIcon>{items.Icon}</ListItemIcon>
                <ListItemText>{items.Text}</ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <div className={classes.layout}>{children} </div>
    </section>
  )
}

export default Layout
