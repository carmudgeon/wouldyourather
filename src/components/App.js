import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import QuestionPage from './QuestionPage'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <div className='container'>
                        <Nav/>
                        {this.props.loading === true
                            ? null
                            : <div>
                                <Route path='/' exact component={Dashboard}/>
                                <Route path='/questions/:id' component={QuestionPage}/>
                                <Route path='/add' component={AddQuestion}/>
                                <Route path='/leaderboard' component={LeaderBoard}/>
                            </div>}
                    </div>
                </Fragment>
            </Router>
        )
    }
}

function mapStateToProps({users}) {
    return {
        loading: users === null
    }
}

export default connect(mapStateToProps)(App)