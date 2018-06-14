import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

class Question extends Component {


    formatDate(timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
    };

    render() {
        const {question} = this.props

        if (question === undefined) {
            return <p>This question doesn't exist</p>
        }

        return (
            <li>
                <Link
                    to={`/questions/${question.id}`}>
                <span>
                    Would you
                    rather <b>"{question.optionOne.text}"</b> or <b>"{question.optionTwo.text}"</b>? {this.formatDate(question.timestamp)}
                </span>
                </Link>
            </li>
        )
    }
}

function mapStateToProps({questions, authedUser}, {id}) {
    return {
        question: questions[id],
        authedUser: authedUser
    }
}

export default withRouter(connect(mapStateToProps)(Question))