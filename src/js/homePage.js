import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			usersList : [],
			showTable : false,
			activeRecord : {}
		};
		fetch('/json/userDetails.json')
		.then((response) => response.json())
		.then(res => {
			this.setState({
				usersList: res
			});
			console.log("The userlist are: ", this.state.usersList);
		});
		this.editRow = this.editRow.bind(this);
	}	

	editRow(user) {
			
		this.setState({
			showTable: true,
			activeRecord: user
		});
	}
	

	render() {
		 
		
		return(
			<div>
				<h4>Employee Details</h4>
				<div className="row table">
					<table className="table">
					    <thead>
					      <tr>
					        <th>Firstname</th>
					        <th>Lastname</th>
					        <th>Email</th>
					        <th>Actions</th>
					      </tr>
					    </thead>
					    <tbody>
							<Table usersList={ this.state.usersList } action={this.editRow}/>
					    </tbody>
				    </table>
				</div>
				{ this.state.showTable ? <EditUserDetails info={this.state.activeRecord} /> : null }
			</div>
		);
	}	
}

class Table extends Component {
	constructor(props) {
		super(props);

	}	

	render() {
		return this.props.usersList.map((user) => {
			return(
				<tr>
					<td key={user.id}> {user.firstName} </td>
					<td> {user.lastName} </td>
					<td> {user.email} </td>
					<td><ActionMenu menu="Edit" rowData={user} trigger={this.props.action}/></td>
				</tr>
			);
		});		
	}
}

function ActionMenu(props) {
	
	console.log(props.trigger);
	return (
		<button type="button" className="btn btn-success editRow" onClick={() => props.trigger(props.rowData)}>{props.menu}</button>

	);

}

class EditUserDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: props.info
		}

	}

	render() {
		return(
			<div>
				<h4> Edit the user details </h4>
				<div className="row">
					<div className="col-md-4">
						<label>FirstName</label>
						<input type="text" name="FirstName" defaultValue={this.state.user.firstName} />
					</div>
					<div className="col-md-4">
						<label>LastName</label>
						<input type="text" name="LastName" defaultValue={this.state.user.lastName} />
					</div>
					<div className="col-md-4">
						<label>Email</label>
						<input type="text" name="Email" defaultValue={this.state.user.email} />
					</div>
					<div class="row">
						<div className="col-md-offset-4">
							<button type="button" onClick={this.saveUserDetails}>Save</button>
						</div>
					</div>
					
				</div>
			</div>
		);
	}
}

export default Home;