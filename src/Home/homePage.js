import React, { Component } from 'react';
import Table from '../List/table'; 
import EditUserDetails from '../EditUser/editUserDetails';
import '../App.css';
import { map, find } from 'lodash';

class Home extends Component {
		
	constructor(props) {
		super(props);
		/*
			Initialize the state object with 3 properties
		*/
		this.state = {
			usersList : [], 		// List of user details 
			showTable : false,  	// Boolean, show/hide the edit User details row
			activeRecord : {},
			action: ""
		};
		/*  
			Get the User details to display in the table 
		*/
		fetch('/json/userDetails.json')
		.then((response) => response.json())
		.then(res => {
			this.setState({
				usersList: res
			});
		});
		this.editRow = this.editRow.bind(this);
		this.newUser = this.newUser.bind(this);
		this.removeUser = this.removeUser.bind(this);
	}	
	
	newUser = () => {
		return {
			"firstName": "",
			"lastName": "",
			"email": ""
		};
	}
	
	// Edit user details
	editRow(e, action, user=this.newUser()) {
			
		this.setState({
			showTable: true,
			activeRecord: user,
			action
		});
	}
	
	// Update the user details
	saveUserDetails = (updatedUser, action) => {
		let updatedList;
		if (action === "Add") {
			updatedList = Object.assign([], this.state.usersList);
			updatedUser.id = updatedList.length + 1;
			updatedList.push(updatedUser);
		} else {
			updatedList = map(this.state.usersList, function(user){			
				if(user.id === updatedUser.id) return updatedUser;
				return user;
			});
		}
		this.setState({
			usersList: updatedList,
			showTable: false
		});
	}
	
	// Discard edit changes
	cancelEditChanges = () => {
		this.setState({
			showTable: false
		});
	}
	
	//Remove User details
	removeUser = (removeUserDetails) => {
		var removeIndex;
		find(this.state.usersList, function(user, index) {
			if(user.id === removeUserDetails.id) {
				removeIndex = index;
			}
		});
		let updatedList = Object.assign([], this.state.usersList);
		updatedList.splice(removeIndex, 1);
		console.log("updated List: ", updatedList);
		this.setState({
			usersList: updatedList
		});
	}
	
	render() {
		 
		return(
			<div style={{margin: '5em'}}>
				<div>
					<h4>Employee Details</h4>	
					<button type="button" className="btn btn-default addUser" onClick={(e) => this.editRow(e, "Add")}>Add User</button>
				</div>
				<div className="table-header">
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
							<Table usersList={ this.state.usersList } action={this.editRow} removeUser={this.removeUser}/>
					    </tbody>
				    </table>
				</div>
				{ this.state.showTable ? <EditUserDetails info={this.state.activeRecord} saveUser = {this.saveUserDetails} cancel={this.cancelEditChanges} action={this.state.action}/> : null }
			</div>
		);
	}	
}

export default Home;