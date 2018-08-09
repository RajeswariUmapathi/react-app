import React, { Component } from 'react';

class EditUserDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.info
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.info.id !== nextProps.info.id) {
			this.setState(function() {
			 return {
			  user: nextProps.info
			 }
			});
		}
	}
	
	editRowDetails = (event, key) => {
		
		var obj = {
			user: {}
		};
		obj.user = Object.assign({},this.props.info);
		obj.user[key] = event.target.value;
		this.setState(obj);
	}

	render() {
		
		return(
			<div>
				<h4> Edit the user details </h4>
				<div className="row">
					<div className="col-md-3">
						<label>FirstName</label>
						<input type="text" name="FirstName" value={this.state.user.firstName} onChange={(e) => this.editRowDetails(e,'firstName')}/>
					</div>
					<div className="col-md-3">
						<label>LastName</label>
						<input type="text" name="LastName" value={this.state.user.lastName}  onChange={(e) => this.editRowDetails(e,'lastName')}/>
					</div>
					<div className="col-md-3">
						<label>Email</label>
						<input type="text" name="Email" value={this.state.user.email}  onChange={(e) => this.editRowDetails(e,'email')}/>
					</div>
					<div className="col-md-3">
						<label>Actions</label>
						<button type="button" className="btn btn-success" onClick={() => this.props.saveUser(this.state.user)}>Save</button>
						<button type="button" className="btn btn-default" onClick={this.props.cancel}>Cancel</button>
					</div>
					
				</div>
			</div>
		);
	}
}

export default EditUserDetails;