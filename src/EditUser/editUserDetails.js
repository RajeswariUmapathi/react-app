import React, { Component } from 'react';

class EditUserDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.info,
			action: props.action
		}
	}
	
	componentWillReceiveProps(nextProps) {
		if(this.props.info.id !== nextProps.info.id) {
			this.setState(function() {
			 return {
			  user: nextProps.info,
			  action: nextProps.action
			 }
			});
		}
	}
	
	editRowDetails = (event, key) => {
		
		var obj = {
			user: {}
		};
		obj.user = Object.assign({},this.state.user);
		obj.user[key] = event.target.value;
		this.setState(obj);
	}

	render() {
		
		return(
			<div className="edit-user">
				<h4> {this.state.action} the user details </h4>
				<div>
					<form onSubmit={() => this.props.saveUser(this.state.user, this.state.action)}>
						<div>
							<label>FirstName</label>
							<input type="text" name="FirstName" value={this.state.user.firstName} onChange={(e) => this.editRowDetails(e,'firstName')} required/>
						</div>
						<div>
							<label>LastName</label>
							<input type="text" name="LastName" value={this.state.user.lastName}  onChange={(e) => this.editRowDetails(e,'lastName')} required/>
						</div>
						<div>
							<label>Email</label>
							<input type="text" name="Email" value={this.state.user.email}  onChange={(e) => this.editRowDetails(e,'email')} required/>
						</div>
						<div>
							<button type="submit" className="btn btn-success edit-btn">Save</button>
							<button type="button" className="btn btn-default" onClick={this.props.cancel}>Cancel</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default EditUserDetails;