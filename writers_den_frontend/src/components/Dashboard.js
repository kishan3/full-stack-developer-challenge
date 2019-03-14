import React, { Component } from 'react'
import * as Api from '../utils/api'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import AddCircle from '@material-ui/icons/AddCircle'

import Button from '@material-ui/core/Button'


class Dashboard extends Component {
    state = {
        stories: [],
        name: "",
        access_token: "",
        redirectToLogin: false,
    }
    componentDidMount() {
		const access_token = localStorage.getItem("access_token")
		Api.getStories(access_token)
		.then((stories) => {
			Api.getUserDetails(access_token)
			.then((userdetails) => {
				if (stories.code === "token_not_valid") {
					this.setState({
						redirectToLogin: true,
					})
				}
				else {
					this.setState({
					    name: userdetails.name,
						stories,
						access_token,
					})
				}
			})

		})
	}

    handleLogout = (e) => {
		e.preventDefault()
		localStorage.clear()
		this.setState({
			redirectToLogin: true,
		})
	}


    render() {
        const { redirectToLogin, stories, name } = this.state
		if (redirectToLogin) {
			return <Redirect to="/" />
		}
        return (
            <div>
                <Grid container spacing={0} style={{ padding: 20 }}>
                    <Grid item xs={1}>
                        <h4>Hello {name}!</h4>
                    </Grid>
                    <Grid item xs={10}>
                        <h1>Writers Den</h1>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" onClick={this.handleLogout}>LOGOUT</Button>
                    </Grid>

                    <Grid item sm={8}>
                    </Grid>
                    <Grid item sm={4}>
                        <div>
                            <Button aria-label="Add" onClick={this.handleClickOpen}>
                                <AddCircle style={{ fontSize: 60, color: 'black' }}/>
                                {/* <img alt="Add Idea" src={AddCircle} /> */}
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard