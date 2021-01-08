import React from 'react'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import './admin.scss'
import {application} from "./tableController"

class Table extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render(){
        return (
            <div className={'admin-table'}>
                <div ng-app="table">
                    <div ng-controller="tableController">
                        <div>
                            <div ui-grid="tableData" ui-grid-selection="true" ui-grid-pagination="true" ui-grid-resize-columns="true"></div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Table)
