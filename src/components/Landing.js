import React, {Component} from 'react'
import {connect} from 'react-redux'

class Landing extends Component {


    render() {
        const {authedUser} = this.props

        let content = <div>Please login by selecting the dropdown located a the nav</div>

        if (authedUser != null) {
            content = <div>
                <h1> Welcome {authedUser}</h1>
            </div>;
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
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(Landing)