import React, { Component } from 'react'
import * as Api from '../utils/api'


class StoryPage extends Component {
    state = {
        story: []
    }

    componeneDidMount() {
        const story_id = this.props.id
        console.log(story_id)
        const access_token = localStorage.getItem("access_token")
		Api.getStory(access_token, story_id)
		.then((story) => {
			Api.getUserDetails(access_token)
			.then((userdetails) => {
			    console.log(userdetails, story)
				if (story.code === "token_not_valid") {
					this.setState({
						redirectToLogin: true,
					})
				}
				else {
					this.setState({
					    story
					})
				}
			})

		})
    }
    render () {
        return (
            <div>
                <h1>StoryPage</h1>
            </div>
        )
    }
}


export default StoryPage