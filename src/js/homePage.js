import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Table, { ActionMenu } from './table'; 
import EditUserDetails from './editUserDetails';
import '../stylesheet/App.css';
var _ = require('lodash'); // Import lodash 

class Home extends Component {

	constructor(props) {
		super(props);
		/*
			Initialize the state object with 3 properties
		*/
		this.state = {
			usersList : [], 		// List of user details 
			showTable : false,  	// Boolean, show/hide the edit User details row
			activeRecord : {}		
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
	}	

	// Edit user details
	editRow(user) {
			
		this.setState({
			showTable: true,
			activeRecord: user
		});
	}
	
	// Update the user details
	saveUserDetails = (updatedUser) => {
		
		var updatedList = _.map(this.state.usersList, function(user){			
			if(user.id === updatedUser.id) return updatedUser;
			return user;
		});
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
	
	render() {
		 
		return(
			<div style={{margin: '5em'}}>
				<h4>Employee Details</h4>
				<div className="row">
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
				{ this.state.showTable ? <EditUserDetails info={this.state.activeRecord} saveUser = {this.saveUserDetails} cancel={this.cancelEditChanges}/> : null }
			</div>
		);
	}	
}

export default Home;