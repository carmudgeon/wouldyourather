import { saveQuestion } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading'
import {handleRetrieveUsers} from '../actions/shared'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'


export function handleAddQuestion (info) {
    return (dispatch, getState) => {
        const { optionOne, optionTwo } = info
        const { authedUser } = getState()

        dispatch(showLoading())

        return saveQuestion({
            optionOne,
            optionTwo,
            author: authedUser
        })
            .then((question) => dispatch(addQuestion(question)))
            .then(() => dispatch(handleRetrieveUsers()))
            .then(() => dispatch(hideLoading()))
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function receiveQuestions(questions) {
    return {
        type : RECEIVE_QUESTIONS,
        questions
    }
}