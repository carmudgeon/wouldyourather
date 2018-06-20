import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {handleAnswerQuestion} from '../actions/questions';

class Question extends Component {


    handleAnswer = (e, id, answer) => {
        e.preventDefault()

        const {dispatch, authedUser} = this.props

        dispatch(handleAnswerQuestion({
            qid: id,
            authedUser,
            answer: answer

        }))
    }

    formatDate(timestamp) {
        const d = new Date(timestamp)
        const time = d.toLocaleTimeString('en-US')
        return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
    };

    render() {
        const {question, authedUser, avatarURL, numberOfUsers} = this.props

        if (question === undefined) {
            return <p>This question doesn't exist</p>
        }

        const answeredOne = question.optionOne.votes.includes(authedUser)
        const answeredTwo = question.optionTwo.votes.includes(authedUser)

        return (
            <li style={{border: '1px solid #dad7d7', padding: 10, margin: 10, listStyle: 'none'}}>
                <Link style={{ textDecoration: 'none' }}
                    to={`/questions/${question.id}`}>

                        <span>Would you rather :

                            {!(answeredOne || answeredTwo) ? (
                                    <div style={{marginTop: 5, marginBottom: 5}}>
                                        <span style={{color: 'black'}}>Option One:</span>
                                        <button className='replying-to'
                                                onClick={(e) => this.handleAnswer(e, question.id, 'optionOne')}>
                                            <b>"{question.optionOne.text}"</b>
                                        </button>
                                    </div>)
                                :
                                <div>
                                    <span style={{color: 'black'}}>Option One:</span>
                                    <b style={{'color': answeredOne ? 'green' : 'inherit'}}>"{question.optionOne.text}"</b>
                                    <div>Votes: {question.optionOne.votes.length} - % of Voters: % {(question.optionOne.votes.length / numberOfUsers) * 100}</div>
                                </div>
                            }
                            <br/>

                            {!(answeredOne || answeredTwo) ? (
                                    <div style={{marginTop: 5, marginBottom: 5}}>
                                        <span style={{color: 'black'}}>Option Two:</span>
                                        < button className='replying-to'
                                                 onClick={(e) => this.handleAnswer(e, question.id, 'optionTwo')}>
                                            <b>"{question.optionTwo.text}"</b>
                                        </button>
                                    </div>
                                ) :
                                <div>
                                    <span style={{color: 'black'}}>Option Two:</span>
                                    <b style={{'color': answeredTwo ? 'green' : 'inherit'}}>"{question.optionTwo.text}"</b>
                                    <div>Votes: {question.optionTwo.votes.length} - % of Voters: %{(question.optionTwo.votes.length / numberOfUsers) *100}</div>
                                </div>
                            }
                            <div style={{
                                width: 80,
                                height: 80,
                                margin: 10,
                                backgroundImage: `url(${avatarURL})`
                            }}></div>

                            <div style={{
                                fontSize: "small",
                                color: 'grey'
                            }}>created at: {this.formatDate(question.timestamp)}</div>
                             <div style={{
                                 fontSize: "small",
                                 color: 'grey'
                             }}>created by: {question.author}</div>
                </span>

                </Link>
            </li>
        )
    }
}

function mapStateToProps({questions, authedUser, users}, {id}) {
    return {
        question: questions[id],
        authedUser: authedUser,
        avatarURL: questions[id] !== undefined ? users[questions[id].author].avatarURL : null,
        numberOfUsers: Object.keys(users).length
    }
}

export default withRouter(connect(mapStateToProps)(Question))