import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";
import {unauthUser} from "../actions/authedUser";
import {  } from 'react-router'
import {withRouter} from "react-router-dom";

class Login extends Component {

    handleLogout = (event) => {
        const {dispatch} = this.props
        dispatch(unauthUser())
        this.props.history.push("/");
    }

    handleUserSelection = (event) => {
        const user = event.target.value === '' ? null : event.target.value
        this.props.dispatch(setAuthedUser(user))
        this.props.history.push("/");
    }


    render() {
        const {users, authedUser} = this.props
        const value = (authedUser === null) ? '' : authedUser

        return (
            <div>
                {authedUser === null ?
                    <select value={value} onChange={(e) => this.handleUserSelection(e)}>
                        <option value=''>Login</option>
                        {users !== undefined && (users.map((u) => (
                            <option key={u} value={u}>{u}</option>
                        )))}
                    </select>
                    :
                    <div>Hey {authedUser} <button onClick={(e) => this.handleLogout(e)}>Logout</button></div>

                }


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

export default withRouter(connect(mapStateToProps)(Login))