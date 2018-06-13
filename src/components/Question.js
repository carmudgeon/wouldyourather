import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Question extends Component {


    formatDate(timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
    };

    render() {
        const {question, authedUser} = this.props

        return (
            <li>
                <span>
                    Would you
                    rather <b>"{question.optionOne.text}"</b> or <b>"{question.optionTwo.text}"</b>? {this.formatDate(question.timestamp)}

                    <Link
                        to={`/questions/${question.id}`}>
                        Answer
                    </Link>
                </span>
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

export default connect(mapStateToProps)(Question)