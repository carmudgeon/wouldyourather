import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from './Login'

class Nav extends Component {
    render() {
        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            Add Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' activeClassName='active'>
                            Leader Board
                        </NavLink>
                    </li>
                    <li><Login></Login></li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(Nav)