import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {

    render() {
        const {id} = this.props.match.params
        const {authedUser} = this.props
        let content = <div>Please login</div>

        if (authedUser !== null) {
            content = <div>
                <h3> Selected Question </h3>
                <Question id={id}/>
            </div>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {

    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionPage)