import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from "../actions/shared";

class LeaderBoard extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const {users, leaderBoard, authedUser} = this.props
        let content = <div>Please login</div>

        if (authedUser !== null) {
            content = <div>
                {leaderBoard.map((u) => (
                    <div key={users[u].id}>
                        <div style={{
                            width: 80,
                            height: 80,
                            backgroundImage: `url(${users[u].avatarURL})`
                        }}></div>
                        <div>{users[u].id} - Answers: {Object.keys(users[u].answers).length} -
                            Questions: {users[u].questions.length}</div>
                    </div>


                ))}
            </div>
        }
        return (

            <div>
                {content}
            </div>
        )
    }
}


function mapStateToProps({users, authedUser}) {

    const orderedUsers = (users === null) ? [] : Object.keys(users).sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    return {
        users: users,
        leaderBoard: orderedUsers,
        authedUser
    }
}

export default connect(mapStateToProps)(LeaderBoard)