import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'

const defaultState = {
    optionOne: '',
    optionTwo: '',
    toHome: false
}

class AddQuestion extends Component {

    state = defaultState

    handleSubmit = (e) => {
        e.preventDefault()

        const {optionOne, optionTwo} = this.state
        const {dispatch, authedUser} = this.props

        dispatch(handleAddQuestion({optionOne, optionTwo, authedUser}))
        this.setState(() => ({
            ...defaultState,
            toHome: true
        }))
    }

    handleOptionOne = (e) => {
        this.setState({
            optionOne: e
        })
    }

    handleOptionTwo = (e) => {
        this.setState({
            optionTwo: e
        })
    }

    render() {
        const {authedUser} = this.props
        const {optionOne, optionTwo, toHome} = this.state

        if (toHome === true) {
            return <Redirect to='/dashboard' />
        }

        let content = <div>Please login</div>

        if (authedUser !== null) {
            content = <div>
                <h3 className='center'>Would you rather ?</h3>
                <form className='add-question' onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="Option One"
                        value={optionOne}
                        onChange={(e) => this.handleOptionOne(e.target.value)}/>

                    <input
                        type="text"
                        placeholder="Option Two"
                        value={optionTwo}
                        onChange={(e) => this.handleOptionTwo(e.target.value)}/>

                    <button
                        className='btn'
                        type='submit'
                        disabled={optionOne === '' || optionTwo === ''}>
                        Submit
                    </button>
                </form>
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

export default connect(mapStateToProps)(AddQuestion)