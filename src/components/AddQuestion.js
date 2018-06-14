import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAddQuestion} from '../actions/questions'

class AddQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { optionOne, optionTwo} = this.state
        const { dispatch, authedUser } = this.props

        dispatch(handleAddQuestion({optionOne, optionTwo, authedUser}))
        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
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

        const {optionOne, optionTwo} = this.state

        return (
            <div>
                <h3 className='center'>Add New Question</h3>
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
        )
    }
}

export default connect()(AddQuestion)