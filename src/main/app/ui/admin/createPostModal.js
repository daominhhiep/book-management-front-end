
import React from 'react'
import './createPostModal.scss'
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";

class CreatePostModal extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			id: '',
			order: '',
			name: '',
			author: '',
			publisher: '',
			category: 1,
			purchasedDate: '',
			description: '',
			nameError: '',
			authorError: '', 
			publisherError: '',
			purchasedDateError: '',
			descriptionError:'',
			categories: [],
			isCreate : window.isCreate
		}

		if (!window.isCreate) {
			let book = window.book;
			this.state.id = book.id;
			this.state.order = book.order;
			this.state.name = book.name;
			this.state.author = book.author;
			this.state.publisher = book.publisher;
			this.state.category = 1;
			this.state.status = book.status;
			this.state.purchasedDate = book.purchasedDate;
			this.state.description = book.description;
		}
		
		this.onHandleChange = this.onHandleChange.bind(this);
		this.onHandleSubmit = this.onHandleSubmit.bind(this);
		this.validate = this.validate.bind(this);
		this.getCategoryList = this.getCategoryList.bind(this);
		this.getCategoryList();
	}

	onHandleChange (event) {
		var target = event.target;
		var name = target.name;
		var value = target.value;
		this.setState({
			[name]: value
		})
	}

	validate () {
		let nameError = "";
		let authorError = "";
		let publisherError = "";
		let purchasedDateError = "";
		let descriptionError = "";

		if(this.state.name.length > 100) {
			nameError = "Book name is too long."
		}

		if(this.state.author.length > 100) {
			authorError = "Author name is too long."
		}

		if(this.state.publisher.length > 100) {
			publisherError = "Publisher name is too long."
		}

		let today = new Date();
		if(today < new Date(this.state.purchasedDate)) {
			purchasedDateError = "Purchased date is not valid.";
		}

		if(this.state.description.length > 250) {
			descriptionError = "Desciption is too long."
		}

		this.setState({nameError: nameError})
		this.setState({authorError: authorError})
		this.setState({publisherError: publisherError})
		this.setState({purchasedDateError : purchasedDateError});
		this.setState({descriptionError: descriptionError})

		if(nameError || authorError || publisherError || purchasedDateError || descriptionError)
			return false;
		return true;
	}

	onHandleSubmit (event) {
		event.preventDefault();
		let isValid = this.validate();
		if(isValid) {
			if (window.isCreate) this.addBook();
			else this.editBook();
		}
	}

	getCategoryList () {
		let url = "http://localhost:9000/api/categories"
		fetch(url)
			.then(response => response.json())
			.then(data => {
				this.setState({categories: data.result})
			})
			.catch(err => console.log(err))
	}


	addBook () {
		let url = "http://localhost:9000/api/books"
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: this.state.name,
				author: this.state.author,
				publisher: this.state.publisher,
				category: this.state.category,
				purchasedDate: this.state.purchasedDate,
				description:  this.state.description,
				status: "READY",
				isActive: true,
				createdAt: new Date().toISOString().slice(0,10),
				updatedAt: new Date().toISOString().slice(0,10)
			})
		}).then(response => response.json())
			.then(data => {
				this.props.submitSuccessFunction()
			})
			.catch(err => console.error("error:", err))
	}

	editBook () {
		let url = "http://localhost:9000/api/books"
		fetch(url, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.state.id,
				order: this.order,
				name: this.state.name,
				author: this.state.author,
				publisher: this.state.publisher,
				category: this.state.category,
				purchasedDate: this.state.purchasedDate,
				description:  this.state.description,
				status: this.state.status,
				isActive: true,
				createdAt: this.state.createdAt,
				updatedAt: new Date().toISOString().slice(0,10)
			})
		}).then(response => response.json())
			.then(data => {
				this.props.submitSuccessFunction()
			})
			.catch(err => console.error("error:", err))
	}

	render(){
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
												<h4 className={this.state.isCreate ? '' : 'hidden'}>Create new book</h4>
												<h4 className={this.state.isCreate ? 'hidden' : ''}>Edit book</h4>
											</div>
										</div>
										<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
											<div className="form-group">
												<label className="control-label"htmlFor="name">Book name <sup style={{color: 'red'}}>*</sup></label>
												<input type="text" name="name" placeholder="Book Name" value={this.state.name} className={this.state.nameError ? 'form-control custom-input-invalid' : 'form-control'} required onChange={this.onHandleChange} maxLength='100'/>
												{this.state.nameError ? <p className="custom-invalid">{this.state.nameError}</p> : null}
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
											<div className="form-group">
												<label className="control-label"htmlFor="email"> Author <sup style={{color: 'red'}}>*</sup></label>
												<input type="text" name="author" placeholder="Author name" value={this.state.author} className={this.state.authorError ? 'form-control custom-input-invalid' : 'form-control'} required onChange={this.onHandleChange} maxLength='100' />
												{this.state.authorError ? <p className="custom-invalid">{this.state.authorError}</p> : null}
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
											<div className="form-group">
												<label className="control-label"htmlFor="city">Publisher <sup style={{color: 'red'}}>*</sup></label>
												<input type="text" name="publisher" placeholder="Publisher" value={this.state.publisher} className={this.state.publisherError ? 'form-control custom-input-invalid' : 'form-control'} required onChange={this.onHandleChange} maxLength='100' />
												{this.state.publisherError ? <p className="custom-invalid">{this.state.publisherError}</p> : null}
											</div>
										</div>
										<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
											<div className="form-group">
												<label className="control-label required"htmlFor="select">Category <sup style={{color: 'red'}}>*</sup></label>
												<div className="select">
												<select id="select" name="category" className="form-control" value={this.state.category} onChange={this.onHandleChange}>
													{this.state.categories.length ? this.state.categories.map((cat,key) =>
														<option key={key} value={cat.id}>{cat.name}</option>) : null
													}
												</select>
											</div>
										</div>
									</div>
									<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
										<div className="form-group">
											<label className="control-label"htmlFor="country">Purchased date <sup style={{color: 'red'}}>*</sup></label>
											<input type="date" name="purchasedDate" value={this.state.purchasedDate} className={this.state.purchasedDateError ? 'form-control custom-input-invalid' : 'form-control'} required onChange={this.onHandleChange}/>
											{this.state.purchasedDateError ? <p className="custom-invalid">{this.state.purchasedDateError}</p> : null}
										</div>
									</div>
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
										<div className="form-group">
											<label className="control-label"htmlFor="textarea">Description</label>
											<textarea name="description" className={this.state.descriptionError ? 'form-control custom-input-invalid' : 'form-control'} rows={4} placeholder="Write book desciption" value={this.state.description} onChange={this.onHandleChange} maxLength='250'/>
											{this.state.descriptionError ? <p className="custom-invalid">{this.state.descriptionError}</p> : null}
										</div>
									</div>
									<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 custom-form-footer">
										<button type="button"className="btn btn-default custom-cancel-btn" onClick={this.props.closeFunction}>Cancel</button>
										<button type="submit" className={this.state.isCreate ? 'hidden' : 'btn btn-primary custom-create-btn'}>Edit</button>
										<button type="submit" className={this.state.isCreate ? 'btn btn-primary custom-create-btn' : 'hidden'}>Create</button>
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

const mapStateToProps = (state, ownProps) => {return {}
}

const mapDispatchToProps = (dispatch) => {return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostModal)


