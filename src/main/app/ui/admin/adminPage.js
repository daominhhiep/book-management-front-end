import React, {Component} from "react";
import {render} from "react-dom";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import Table from "./table"
import Modal from 'react-modal'
import PostModal from './createPostModal'

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

class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
        this.openModalCreate = this.openModalCreate.bind(this);
        this.openModalEdit = this.openModalEdit.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.submitSuccessFunction = this.submitSuccessFunction.bind(this);
        this.refreshTable = this.refreshTable.bind(this);
        window.showModal = this.openModalEdit;
    }

    openModalCreate() {
        window.isCreate = true;
        window.book = null;
        this.setState({modalIsOpen: true});
    }

    openModalEdit(book) {
        window.isCreate = false;
        window.book = book;
        this.setState({modalIsOpen: true});
    }    

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        window.book = null;
        this.setState({modalIsOpen: false});
    }

    componentWillMount() {
        Modal.setAppElement('body');
    }

    submitSuccessFunction() {
        this.closeModal();
        this.refreshTable()
    }

    refreshTable () {
        localStorage.setItem('flag', true)
    }

    render() {
        return (
            <div className="admin-page">
                <p className="card-title" style={{marginBottom: '20px', fontSize: '20px', lineHeight: 'inherit'}}>Book list <button className="btn btn-order" data-target="all" title="Add book" style={{float: 'right'}} onClick={this.openModalCreate}>
                    <span className="fa fa-plus-circle" style={{padding:"2px 3px"}}></span>
                </button></p>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <PostModal closeFunction={this.closeModal} submitSuccessFunction={this.submitSuccessFunction}></PostModal>
                </Modal>
                <Table></Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)