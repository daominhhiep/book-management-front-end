import React, {Component} from "react";
import {render} from "react-dom";
import './borrowing.scss'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Modal from 'react-modal'
import BorrowingModal from './borrowingModal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '700px',
        padding: '0',
        border: '1px solid #bbb',
        boxShadow: '0px 0px 12px #bbb',
        borderRadius: '5px'
    }
};

class BorrowingHistory extends React.Component {

    constructor(props) {
        super(props);
        let search = window.location.search
        let params = new URLSearchParams(window.location.search);
        let bookId = params.get('bookId')

        this.state = {
            isModalOpen: false,
            borrowingHistories: [],
            bookId: bookId,
            bookName: '',
            status:'',
            users: {1: 'Jack' , 2: 'John'}
        };
        this.openModalCreate = this.openModalCreate.bind(this);
        this.openModalEdit = this.openModalEdit.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitSuccessFunction = this.submitSuccessFunction.bind(this);
        this.getBookById = this.getBookById.bind(this);
        this.getBorrowingHistories = this.getBorrowingHistories.bind(this);
        this.deleteBorrowingHistory = this.deleteBorrowingHistory.bind(this);
        this.isOverdue = this.isOverdue.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.getBookById();
        this.getBorrowingHistories();
    }

    openModalCreate() {
        window.isCreateBorrowing = true;
        window.borrowing = null;
        this.setState({modalBorrowingIsOpen: true});
    }

    openModalEdit(borrowing) {
        window.isCreateBorrowing = false;
        window.borrowing = borrowing;
        this.setState({modalBorrowingIsOpen: true});
    }

    closeModal() {
        window.borrowing = null;
        this.setState({modalBorrowingIsOpen: false});
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    submitSuccessFunction() {
        this.closeModal();
        this.getBorrowingHistories()
    }

    isOverdue(returnDate, endDate) {
        if (returnDate == null) return false;
        if (endDate == null ) return false
        if(new Date(returnDate) > new Date(endDate)) {
            return true;
        }
        return false;
    }

    formatDate(date) {
        if (date === null || date === undefined) return '';
        let dateStr = new Date(date).toLocaleDateString('en-GB');
        return dateStr;
    }


    getBorrowingHistories () {
        let url = "http://localhost:9000/api/borrowing-histories-by-book?bookId=" + this.state.bookId
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({borrowingHistories: data.result});
            })
            .catch(err => console.log(err))
    }

    getBookById(){
        let url = "http://localhost:9000/api/books/" + this.state.bookId
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({bookName: data.result.name})
                this.setState({status: data.result.status})
            })
            .catch(err => console.log(err))
    }

    deleteBorrowingHistory (id) {
        var res = confirm("Do you want to delete this session?");
        if (res == true) {
          let url = "http://localhost:9000/api/borrowing-histories/" + id
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                alert("Delete Success!");
                this.getBorrowingHistories();
            })
            .catch(err => console.error("error:", err))
        }
    }

    render() {
        return (
            <div className="admin-page">
                <p className="card-title" style={{marginBottom: '20px', fontSize: '20px', lineHeight: 'inherit'}}>{this.state.bookName} - <span
                className={this.state.status == 'READY' ? 'status-ready' : this.state.status == 'OVERDUE' ? 'status-overdue': 'status-borrowing'}>{this.state.status}</span>
                <button className="btn btn-order" data-target="all" title="Add borrowing session" style={{float: 'right'}} onClick={this.openModalCreate}>
                    <span className="fa fa-plus-circle" style={{padding:"2px 3px"}}></span>
                </button>
                </p>
                {this.state.borrowingHistories.map((borrowing, key) =>
                    <div className={'card'} key={key}>
                      <div className="card-body">
                        <h6 className="card-title">{this.state.users[borrowing.userId]}
                            <span className="fa fa-times-circle btn-action" title="Delete" style={{float: 'right', marginLeft: '3px'}} onClick={(e) => this.deleteBorrowingHistory(borrowing.id, e)}></span>
                            <span className="fa fa-edit btn-action" title="Edit" style={{float: 'right'}} onClick={(e) => this.openModalEdit(borrowing, e)}></span>
                        </h6>
                        <div className="row">
                            <div className="col-md card-text">Start date: {this.formatDate(borrowing.startDate)}</div>
                            <div className="col-md card-text">Expected return date: {this.formatDate(borrowing.endDate)}</div>
                            <div className="col-md card-text">Return date: {this.formatDate(borrowing.returnDate)}</div>
                          </div>
                        <p className="card-text"><span>Overdue reason: {borrowing.overdueReason}</span></p>
                      </div>
                    </div>
                 )}
                <Modal
                    isOpen={this.state.modalBorrowingIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <BorrowingModal closeFunction={this.closeModal} submitSuccessFunction={this.submitSuccessFunction}></BorrowingModal>

                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BorrowingHistory)
