import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class Dashboard extends Component {

    state = {
        showingUnansweredQuestions: true
    }

    toggleQuestions = (showingUnansweredQuestions) => {
        this.setState({showingUnansweredQuestions: !showingUnansweredQuestions})
    }

    render() {
        const {showingUnansweredQuestions} = this.state
        const {unanswered, answered, authedUser} = this.props

        const currentQuestions = (showingUnansweredQuestions) ? unanswered : answered
        const title = (showingUnansweredQuestions) ? '[  ] Unanswered Questions' : '[x] Answered Questions'

        let content = <div>Please login</div>

        if (authedUser != null) {
            content = <div>
                <h3 className='center'
                    onClick={(e) => this.toggleQuestions(showingUnansweredQuestions)}
                style={{cursor: 'pointer'}}> {title}</h3>

                <ul className='dashboard-list'>
                    {currentQuestions.map((id) => (
                        <Question key={id} id={id}/>
                    ))}
                </ul>
            </div>;
        }

        return (

            <div>
                {content}
            </div>
        )
    }
}

function unansweredQuestion(questions, id, user) {
    const votes = questions[id].optionOne.votes.concat(questions[id].optionTwo.votes)
    return votes.length === 0 || !votes.includes(user)
}

function answeredQuestion(questions, id, user) {
    const votes = questions[id].optionOne.votes.concat(questions[id].optionTwo.votes)
    return votes.length !== 0 && votes.includes(user)
}

function mapStateToProps({authedUser, questions}) {

    const unansweredQuestions = (authedUser === null) ? [] : Object.keys(questions).filter(q => (unansweredQuestion(questions, q, authedUser))).sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
    const answeredQuestions = (authedUser === null) ? [] : Object.keys(questions).filter(q => (answeredQuestion(questions, q, authedUser))).sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
    return {
        unanswered: unansweredQuestions,
        answered: answeredQuestions,
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(Dashboard)