import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'
import authedUser from "../reducers/authedUser";

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

        let currentQuestions = (showingUnansweredQuestions) ? unanswered : answered
        let title = (showingUnansweredQuestions) ? '[  ] Unanswered Questions' : '[x] Answered Questions'

        let content = <div>Please login</div>

        if(authedUser != null) {
            content = <div>
                <h3 className='center'
                    onClick={(e) => this.toggleQuestions(showingUnansweredQuestions)}> {title}</h3>

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

function mapStateToProps({authedUser, questions}) {

    const unansweredQuestions = (authedUser === null) ? [] : Object.keys(questions).filter(q => (!questions[q].optionOne.votes.includes(authedUser) && !questions[q].optionTwo.votes.includes(authedUser))).sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
    const answeredQuestions = (authedUser === null) ? [] : Object.keys(questions).filter(q => (questions[q].optionOne.votes.includes(authedUser) || questions[q].optionTwo.votes.includes(authedUser))).sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
    return {
        unanswered: unansweredQuestions,
        answered: answeredQuestions,
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(Dashboard)