import React, { Component } from 'react'
import * as Api from '../utils/api'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Story from './Story'


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
                    <Grid item sm={1}>
                    </Grid>
                    <Grid item sm={10}>
                        {stories.map((story) => (
                            <Story key={story.id} story={story} />
                        ))}
                    </Grid>
                    <Grid item sm={1}>
                        <div>
                            <Link to="/new">
                                <Button aria-label="Add">
                                    Create New Story
                                </Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard