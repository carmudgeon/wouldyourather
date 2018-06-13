import React, {Component} from 'react'
import {connect} from 'react-redux'
import Question from './Question'

class QuestionPage extends Component {

    render() {
        const {id} = this.props.match.params

        console.log(id)
        return (
            <div>
                <h3> Selected Question </h3>
                <Question id={id}/>
            </div>
        )
    }
}

export default connect()(QuestionPage)