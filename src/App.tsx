import React from 'react'
import './App.css'

import {createMuiTheme, ThemeProvider, CssBaseline} from '@material-ui/core'
import Signup from './Signup'

const primary = '#954526'
const secondary = '#C37837'

const primaryText = 'rgba(240,240,240,0.7)'

const error = '#ee2010'

const background = '#E4C099'
const paper = '#403427'


export const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: primary,
        },
        secondary: {
          main:secondary,
        },
        background: {
            default: background,
            paper: paper
        },
        text: {
          primary: primaryText,
        },
        error: {
          main: error
        },
    },
    typography: {
      fontFamily: 'Titillium Web'
    }
})

const App = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Signup />
    </ThemeProvider>
  )  
}

export default App
