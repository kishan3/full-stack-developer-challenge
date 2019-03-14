import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import * as Api from '../utils/api'
import { Redirect, Link } from 'react-router-dom'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
})


class Signup extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		invalidInput: false,
		toDashboard: false,
	}

	handleInputChange = (e) => {
		const text = e.target.value
		if (e.target.name === 'name') {
            this.setState(() => ({
                name: text
            }))
        }
        else if (e.target.name === 'email') {
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
        const { name, email, password } = this.state
        Api.createUser(name, email, password)
        .then((response) => {
        	if (response.access !== undefined && response.refresh !== undefined) {
                localStorage.setItem('access_token', response.access)
                localStorage.setItem('refresh_token', response.refresh)
                this.setState(() => ({
                    toDashboard: true,
                }))
            }
            else {
                this.setState(() => ({
                    invalidInput: true,
                }))
            }
        })
    }

	render() {
		const { classes } = this.props
		const { toDashboard, invalidInput } = this.state
		if (toDashboard) {
			return <Redirect to="/dashboard" />
		}
		return(
			<div>
				<Grid container spacing={24}>
					<Grid item sm={12}>
                        <h1 className="text">Writers Den</h1>
                    </Grid>
					<Grid item sm={12}>
						<Grid>
							<TextField
			                  label="Name"
			                  name="name"
			                  value={this.state.name}
			                  onChange={this.handleInputChange}
			                  className={classNames(classes.textField, classes.dense)}
			                  margin="dense"
			                />
		                </Grid>
		                <Grid item sm={12}>
			                <TextField
			                  label="Email"
			                  name="email"
			                  value={this.state.email}
			                  onChange={this.handleInputChange}
			                  className={classNames(classes.textField, classes.dense)}
			                  margin="dense"
			                />
			            </Grid>
		                <Grid item sm={12}>
			                <TextField
			                  id="standard-password-input"
			                  label="Password"
			                  name="password"
			                  value={this.state.password}
			                  type="password"
			                  onChange={this.handleInputChange}
			                  className={classes.textField}
			                  margin="normal"
			                />
			            </Grid>
		                <Grid item sm={12}>
			                <Button
			                    variant="contained"
			                    color="primary"
			                    className={classes.button}
			                    onClick={this.handleSubmit}
			                    disabled={this.state.name === '' || this.state.email === '' || this.state.password === ''}>
			                    Signup
			                </Button>
			                {invalidInput === true ? <p>Invalid Input!!</p> : ""}
			                <p className="subtext">Already have an account? <Link className="subtext" to="/">Login</Link></p>
			            </Grid>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(Signup)