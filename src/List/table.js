import React, { Component } from 'react';

class Table extends Component {
		
	render() {
		return this.props.usersList.map((user) => {
			return(
				<tr key={user.id}>
					<td> {user.firstName} </td>
					<td> {user.lastName} </td>
					<td> {user.email} </td>
					<td>
						<ActionMenu menu="Edit" rowData={user} trigger={this.props.action}/>
						<button type="button" className="btn btn-default" onClick={() => this.props.removeUser(user)}>Delete</button>
					</td>
				</tr>
			);
		});		
	}
}

export function ActionMenu(props) {
	
	return (
		<button type="button" className="btn btn-success editRow edit-btn" onClick={(e) => props.trigger(e, "Edit", props.rowData)}>{props.menu}</button>
	);
}

export default Table;