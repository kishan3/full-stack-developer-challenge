import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Story extends Component {
    render() {
        const { title, status, id } = this.props.story
        return (
            <Link to={`story/${id}`} className="story">
                <div className="story-info">
                    <div>
                        <span>{title}</span>

                        <p>Status: {status}</p>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Story