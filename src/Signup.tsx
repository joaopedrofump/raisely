import React, { useState } from 'react'
import { Card, Grid, makeStyles, createStyles, Theme, Box, TextField, Typography, Button, CircularProgress, InputAdornment } from '@material-ui/core'

import {RemoveRedEye} from '@material-ui/icons'

import Image from './background.jpg'
import { fetchRequest, RAISELY_ENDPOINT } from './network'

const campaignUuid = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a"

const useStyles = makeStyles((theme: Theme) => createStyles({

    root: {
        height: '100vh',
        width: '100vw',
        position: 'relative',
    },
    background: {
        background: `url(${Image}) no-repeat center center fixed`,
        WebkitBackgroundSize: 'cover',
        MozBackgroundSize: 'cover',
        OBackgroundSize: 'cover',
        backgroundSize: 'cover',
        // filter: 'blur(2px)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: -1,
    },
    form: {
        zIndex: 1,
    },
    card: {
        opacity: 0.90,
        padding: 30,
        borderRadius: 10,
        margin: '50px 0',
        boxShadow: '3px 3px 1px 3px black',
    },

    submit: {
        width: '95px',
        height: '45px',
        overflow: 'hidden',
    },
    fields: {
        margin: '20px 0',
    },
    field: {
        marginBottom: 10,
    },
    success: {
        color: theme.palette.success.main
    },
    unknown: {
        visibility: 'hidden'
    },
    message: {
        textShadow: 'black 10px 10px 10px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '1.3em',
    },
    messageWrapper: {
        marginTop: 20,
    },
    eye: {
        cursor: 'pointer'
    }
}))

const Signup = () => {

    const classes = useStyles()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')


    const [validName, setValidName] = useState<boolean>(true)
    const [validEmail, setValidEmail] = useState<boolean>(true)
    const [validPassword, setValidPassword] = useState<boolean>(true)
    const [samePassword, setSamePassword] = useState<boolean>(true)

    const setter = (propertySetter: Function) => (event: any) => propertySetter(event.target.value)
    const resetFieldValidation = (validationSetter: Function) => () => validationSetter(true)

    const showPassword = (setter: Function) => () => setter('text')
    const hidePassword = (setter: Function) => () => setter('password')

    const [loading, setLoading] = useState<boolean>(false)

    const [error, setError] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    
    const [message, setMessage] = useState<string>('')

    const [passwordType,setPasswordType] = useState<string>('password')
    const [confirmPasswordType,setConfirmPasswordType] = useState<string>('password')

    const validateFields = () => {

        const nameValidation = /^[a-zA-Z\xC0-\uFFFF]+\s+[a-zA-Z\xC0-\uFFFF]+\s*$/.test(name)
        const emailValidation = /^[a-zA-Z][a-zA-Z1-9]+@[a-zA-Z]+\.[a-z]{2,}$/.test(email)
        const passwordValidation = /^(?=.*[!-/:-@].*).{6,}$/.test(password)
        const samePasswordValidation = password === confirmPassword

        setValidName(nameValidation)
        setValidEmail(emailValidation)
        setValidPassword(passwordValidation)
        setSamePassword(samePasswordValidation)

        return nameValidation && emailValidation && passwordValidation && samePasswordValidation

    }

    const submit = () => {

        setDone(false)

        if (validateFields()) {

            setLoading(true)

            // setTimeout(() => {

                const [firstName, lastName] = name.split(/\s+/)

                fetchRequest({ campaignUuid, data: { firstName, lastName, email, password } }, RAISELY_ENDPOINT)
                    .then((result) => {

                        setError(false)
                        setMessage(`${result.message.substring(0,result.message.length-1)}, ${result.data.preferredName}! Check your email (${email}) to confirm your registration and start renting bikes with us!`)

                    })
                    .catch(err => {

                        const genericError = 'Unkown error while registering. Please try again.'
                        
                        if(err === 'fetch error') {
                            console.error('fetch error')
                            setMessage(genericError)
                        }
                        else {                            
                            setMessage(err.errors[0].message ?? genericError)
                        }
                        setError(true)

                    })
                    .finally(() => { 
                        setLoading(false)
                        setDone(true)
                    })


            // }, 2000) //delay simulation

        }

    }

    return (
        <Box className={classes.root}>
            <Box className={classes.background} />
            <Grid container className={classes.form} justify={'center'}>
                <Grid item xs={11} sm={9} md={7} lg={6}  xl={4}>
                    <Card elevation={20} className={classes.card}>
                        <Grid container direction="column" alignItems="center">
                            <Grid item>
                                <Typography variant="h4">Welcome to Oporto City Bike</Typography>
                                <Typography variant="subtitle2">Register to rent the best bikes</Typography>
                            </Grid>
                            <Grid className={classes.fields} item container direction="column">
                                <Grid item container direction="row" justify="space-around">
                                    <Grid item xs={11} sm={5} className={classes.field} >
                                        <TextField
                                            disabled={loading || (done && !error)}
                                            label="full name"
                                            fullWidth
                                            required
                                            type="text"
                                            value={name}
                                            error={!validName}
                                            helperText={'2 names, first and last'}
                                            onChange={setter(setName)}
                                            onSelect={resetFieldValidation(setValidName)}
                                            variant="filled"
                                            color="secondary"
                                        />
                                    </Grid>
                                    <Grid item xs={11} sm={5} className={classes.field}>
                                        <TextField
                                            disabled={loading || (done && !error)}
                                            label="email"
                                            fullWidth
                                            type="email"
                                            required
                                            value={email}
                                            onChange={setter(setEmail)}
                                            error={!validEmail}
                                            helperText={"Email format"}
                                            onSelect={resetFieldValidation(setValidEmail)}
                                            variant="filled"
                                            color="secondary"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container direction="row" justify="space-around">
                                    <Grid item xs={11} sm={5} className={classes.field}>
                                        <TextField
                                            disabled={loading || (done && !error)}
                                            label="password"
                                            fullWidth
                                            required
                                            type={passwordType}
                                            value={password}
                                            onChange={setter(setPassword)}
                                            error={!validPassword}
                                            helperText={'Minimum 6 characters, 1 special'}
                                            onSelect={resetFieldValidation(setValidPassword)}
                                            variant="filled"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                  <InputAdornment className={classes.eye} position="start">
                                                        <Box onTouchStart={showPassword(setPasswordType)} 
                                                            onTouchCancel={hidePassword(setPasswordType)} 
                                                            onTouchEnd={hidePassword(setPasswordType)} 
                                                            onMouseDown={showPassword(setPasswordType)}
                                                            onMouseUp={hidePassword(setPasswordType)} 
                                                            onMouseLeave={hidePassword(setPasswordType)} 
                                                        >
                                                            <RemoveRedEye />
                                                        </Box>
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={11} sm={5} className={classes.field}>
                                        <TextField
                                            disabled={loading || (done && !error)}
                                            label="confirm password"
                                            fullWidth
                                            type={confirmPasswordType}
                                            required
                                            value={confirmPassword}
                                            onChange={setter(setConfirmPassword)}
                                            error={!samePassword}
                                            helperText={!samePassword ? 'Passwords do not match' : 'Password again'}
                                            onSelect={() => { setValidPassword(true); setSamePassword(true) }}
                                            variant="filled"
                                            color="secondary"
                                            InputProps={{
                                                endAdornment: (
                                                  <InputAdornment className={classes.eye} position="start">
                                                        <Box
                                                            onTouchStart={showPassword(setConfirmPasswordType)} 
                                                            onTouchEnd={hidePassword(setConfirmPasswordType)}
                                                            onTouchCancel={hidePassword(setConfirmPasswordType)}
                                                            onMouseDown={showPassword(setConfirmPasswordType)}
                                                            onMouseUp={hidePassword(setConfirmPasswordType)} 
                                                            onMouseLeave={hidePassword(setConfirmPasswordType)} 
                                                        >
                                                            <RemoveRedEye />
                                                        </Box>
                                                  </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Button disabled={loading  || (done && !error)} className={classes.submit} onClick={submit} color="secondary" variant="contained">
                                    {!loading 
                                        ? 'Signup' 
                                        : 'Signup'
                                    }
                                </Button>
                            </Grid>
                            <Grid item className={classes.messageWrapper}>
                                {
                                    loading 
                                        ? <CircularProgress size={25} color="secondary"/>
                                        : done 
                                            ? <Typography className={classes.message} variant="body1" color={error ? 'error' : 'initial'}>{message}</Typography>
                                            : null
                                    
                                }
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )

}

export default Signup
