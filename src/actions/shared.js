import { getInitialData, getUsers } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'


export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}


export function handleRetrieveUsers() {
    return (dispatch) => {
        dispatch(showLoading())
        return getUsers()
            .then(({ users }) => {
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}