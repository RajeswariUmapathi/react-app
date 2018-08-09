import React, { Component } from 'react';

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

export function ActionMenu(props) {
	
	return (
		<button type="button" className="btn btn-success editRow" onClick={() => props.trigger(props.rowData)}>{props.menu}</button>

	);

}

export default Table;