import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";

class Login extends Component {

    handleUserSelection = (event) => {
        this.props.dispatch(setAuthedUser(event.target.value))
    }


    render(){
        const {users, authedUser} = this.props
        const value = (authedUser === null)?'': authedUser

        return (
            <div className='book-shelf-changer'>
                <select value={value} onChange={(e) => this.handleUserSelection(e)}>
                    <option value='' disabled>Login</option>
                    {users !== undefined && (users.map((u) => (
                        <option key={u} value={u}>{u}</option>
                    )))}
                </select>
            </div>
        )
    }
}

function mapStateToProps({users, authedUser}) {
    return {
        users: Object.keys(users),
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(Login)