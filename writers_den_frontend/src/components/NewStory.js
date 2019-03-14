import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import * as Api from '../utils/api'


class NewStory extends Component {
    state = {
        text: "",
        title: "",
        toHome: false,
    }

    handleChange = (e) => {
        const text = e.target.value
        const name = e.target.name
        if (name === 'text') {
            this.setState(() => ({
                text
            }))
        }
        else if (name === 'title') {
        	this.setState(() => ({
                title: text
            }))
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { text, title } = this.state
        const access_token = localStorage.getItem("access_token")
		Api.createStory(access_token, title, text)
		.then((story) => {
			Api.getUserDetails(access_token)
			.then((userdetails) => {
			    console.log(userdetails, story)
				if (story.code === "token_not_valid") {
					this.setState({
						toHome: true,
					})
				}
				else {
					this.setState({
					    toHome: true,
					})
				}
			})

		})
    }
    render(){
        const { title, text, toHome } = this.state
        // todo: redirect to home view if submit
        if (toHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h3 className="center">
                    Compose New Story
                </h3>
                <form className="new-tweet" onSubmit={this.handleSubmit}>
                    <input type="text" name="title"
                            placeholder="Story title" value={title} onChange={this.handleChange} />
                    <textarea
                        placeholder="What's happening?"
                        value={text}
                        name="text"
                        onChange={this.handleChange}
                        className="textarea"
                    />
                    <button
                        className="btn"
                        type="submit"
                        disabled={text === '' || title === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}


export default NewStory