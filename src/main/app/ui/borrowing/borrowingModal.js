import React from 'react'
import './borrowingModal.scss'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class BorrowingModal extends React.Component {

    constructor(props, context) {
        super(props, context);
        let search = window.location.search
        let params = new URLSearchParams(window.location.search);
        let bookId = params.get('bookId')
        this.state = {
            users: [{id: 1, name: 'Jack'}, {id: 2, name: 'John'}],
            id: '',
            userId: 1,
            bookId: bookId,
            startDate: '',
            endDate: '',
            returnDate: '',
            overdueReason: '',
            endDateError: '',
            returnDateError: '',
            isCreateBorrowing: window.isCreateBorrowing
        }

        if (!window.isCreateBorrowing) {
            let borrowing = window.borrowing;
            this.state.id = borrowing.id;
            this.state.userId = borrowing.userId;
            this.state.bookId = borrowing.bookId;
            this.state.startDate = borrowing.startDate;
            this.state.endDate = borrowing.endDate;
            this.state.returnDate = borrowing.returnDate == null ? '' : borrowing.returnDate;
            this.state.overdueReason = borrowing.overdueReason;
            this.state.status = borrowing.status;
        }

        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleChange = this.onHandleChange.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    onHandleChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    validate() {
        let overdueReasonError = "";
        let endDateError = "";
        let returnDateError = "";

        if (new Date(this.state.startDate) >= new Date(this.state.endDate)) {
            endDateError = "Expected return date must be greater than Start Date.";
        }

        if (this.state.returnDate !== '' && new Date(this.state.startDate) >= new Date(this.state.returnDate)) {
            returnDateError = "Return date must be greater than Start Date.";
        }

        this.setState({endDateError: endDateError})
        this.setState({returnDateError: returnDateError})

        if (endDateError || returnDateError)
            return false;
        return true;
    }

    onHandleSubmit(event) {
        event.preventDefault();
        let isValid = this.validate();
        if (isValid) {
            if (window.isCreateBorrowing) this.addBorrowingHistory();
            else this.editBorrowingHistory();
        }
    }

    addBorrowingHistory() {
        let url = "http://localhost:9000/api/borrowing-histories"
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.state.userId,
                bookId: this.state.bookId,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                returnDate: this.state.returnDate,
                overdueReason: this.state.overdueReason,
                isActive: true,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)
            })
        }).then(response => response.json())
            .then(data => {
                this.props.submitSuccessFunction()
            })
            .catch(err => console.error("error:", err))
    }

    editBorrowingHistory() {
        let url = "http://localhost:9000/api/borrowing-histories"
        fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                userId: this.state.userId,
                bookId: this.state.bookId,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                returnDate: this.state.returnDate,
                overdueReason: this.state.overdueReason,
                isActive: true,
                createdAt: this.state.createdAt,
                updatedAt: new Date().toISOString().slice(0, 10)
            })
        }).then(response => response.json())
            .then(data => {
                this.props.submitSuccessFunction();
            })
            .catch(err => console.error("error:", err))
    }

    render() {
        return (
            <div className="outer">
                <div className="container-fluid create-post-modal">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb30">
                            <div className="tour-booking-form">
                                <form onSubmit={this.onHandleSubmit}>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="create-form-title">
                                                <p className="custom-close-x" onClick={this.props.closeFunction}>x</p>
                                                <h4 className={this.state.isCreateBorrowing ? '' : 'hidden'}>Create new
                                                    borrowing session</h4>
                                                <h4 className={this.state.isCreateBorrowing ? 'hidden' : ''}>Edit
                                                    borrowing session</h4>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="country">Start date <sup
                                                    style={{color: 'red'}}>*</sup></label>
                                                <input type="date" name="startDate" value={this.state.startDate}
                                                       className={'form-control'} required
                                                       onChange={this.onHandleChange}/>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="country">Expected return
                                                    date <sup style={{color: 'red'}}>*</sup></label>
                                                <input type="date" name="endDate" value={this.state.endDate}
                                                       className={this.state.endDateError ? 'form-control custom-input-invalid' : 'form-control'}
                                                       required onChange={this.onHandleChange}/>
                                                {this.state.endDateError ?
                                                    <p className="custom-invalid">{this.state.endDateError}</p> : null}
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <div className="form-group">
                                                <label className="control-label required" htmlFor="select">Choose
                                                    user<sup style={{color: 'red'}}>*</sup></label>
                                                <div className="select">
                                                    <select id="select" name="userId" className="form-control"
                                                            value={this.state.userId} onChange={this.onHandleChange}>
                                                        {this.state.users.length ? this.state.users.map((user, key) =>
                                                            <option key={key}
                                                                    value={user.id}>{user.name}</option>) : null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={this.state.isCreateBorrowing ? 'hidden' : 'col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'}>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="country">Return date</label>
                                                <input type="date" name="returnDate" value={this.state.returnDate}
                                                       className={this.state.returnDateError ? 'form-control custom-input-invalid' : 'form-control'}
                                                       onChange={this.onHandleChange}/>
                                                {this.state.returnDateError ?
                                                    <p className="custom-invalid">{this.state.returnDateError}</p> : null}
                                            </div>
                                        </div>
                                        <div
                                            className={this.state.isCreateBorrowing ? 'hidden' : 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12'}>
                                            <div className="form-group">
                                                <label className="control-label" htmlFor="textarea">Overdue
                                                    reason</label>
                                                <textarea name="overdueReason"
                                                          className={this.state.overdueReasonError ? 'form-control custom-input-invalid' : 'form-control'}
                                                          rows={4} placeholder="Write overdue reason"
                                                          value={this.state.overdueReason}
                                                          onChange={this.onHandleChange} maxLength='250'/>
                                            </div>
                                        </div>
                                        <div
                                            className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 custom-form-footer">
                                            <button type="button" className="btn btn-default custom-cancel-btn"
                                                    onClick={this.props.closeFunction}>Cancel
                                            </button>
                                            <button type="submit"
                                                    className={this.state.isCreateBorrowing ? 'hidden' : 'btn btn-primary custom-create-btn'}>Edit
                                            </button>
                                            <button type="submit"
                                                    className={this.state.isCreateBorrowing ? 'btn btn-primary custom-create-btn' : 'hidden'}>Create
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingModal)
