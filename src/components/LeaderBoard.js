import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    render() {
        const {users, leaderBoard} = this.props

        return (
            <div>
                {leaderBoard.map((u) => (
                    <div key={users[u].id} >
                        <div style={{
                            width: 80,
                            height: 80,
                            backgroundImage: `url(${users[u].avatarURL})`
                        }}></div>
                        <div>{users[u].id} - Answers: {Object.keys(users[u].answers).length} - Questions: { users[u].questions.length}</div></div>


                ))}
            </div>
        )
    }
}



function mapStateToProps({users}) {

    const orderedUsers = (users === null) ? [] : Object.keys(users).sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
    return {
        users: users,
        leaderBoard: orderedUsers
    }
}

export default connect(mapStateToProps)(LeaderBoard)