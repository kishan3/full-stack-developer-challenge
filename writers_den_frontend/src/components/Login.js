import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import { Redirect, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import * as Api from '../utils/api'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: 'white',
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
})


class Login extends Component {
    state = {
        email: "",
        password: "",
        toDashboard: false,
        wrongCreds: false,
    }

    handleInputChange = (e) => {
        const text = e.target.value
        if (e.target.name === 'email') {
            this.setState(() => ({
                email: text
            }))
        }
        else {
            this.setState(() => ({
                password: text
            }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { email, password } = this.state
        Api.checkLogin(email, password)
        .then((response) => {
            if (response.jwt !== undefined && response.refresh_token !== undefined) {
                localStorage.setItem('access_token', response.jwt)
                localStorage.setItem('refresh_token', response.refresh_token)
                this.setState(() => ({
                    toDashboard: true,
                }))
            }
            else {
                this.setState(() => ({
                    wrongCreds: true,
                }))
            }
        })


    }

    render() {
        const { classes } = this.props
        const { toDashboard, wrongCreds } = this.state
        if (toDashboard) {
            return <Redirect to="/dashboard" />
        }

        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item sm={12}>
                        <h1 className="text">Writers Den</h1>
                    </Grid>
                    <Grid item sm={12}>
                        <Grid>
                            <TextField
                              id="standard-dense"
                              label="Email"
                              name="email"
                              value={this.state.email}
                              onChange={this.handleInputChange}
                              className={classNames(classes.textField, classes.dense)}
                              margin="dense"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                              id="standard-password-input"
                              label="Password"
                              value={this.state.password}
                              type="password"
                              name="password"
                              onChange={this.handleInputChange}
                              className={classes.textField}
                              margin="normal"
                            />
                        </Grid>
                        <Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.handleSubmit}
                                disabled={this.state.email === '' || this.state.password === ''}>
                                Login
                            </Button>
                            {wrongCreds === true ? <p>Wrong Credentials given!!</p> : ""}
                            <p className="subtext">Don't have an account? <Link className="subtext" to="/signup">Create an account</Link></p>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Login)