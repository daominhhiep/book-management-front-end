import React from 'react'
import './user.scss'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class UserPage extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render(){
        return (
            <div className={'user-page-container'}>
                Page for user
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)