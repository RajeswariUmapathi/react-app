import React, { Component } from 'react';
import logo from './reactjs.jpg';
import '../App.css';

class Login extends Component {
	
	
	// Send login details for authentication
	submit = () => {
		var requestObject = {
			userName: this.refs.userName.value,
			password: this.refs.password.value
		}
		fetch('/json/users.json')
	  	.then(response => response.json())
		.then(res => { 
			var authorizedUser = res.filter( user => { return (user.name === requestObject.userName && user.password === requestObject.password) });
			if(!authorizedUser.length || !requestObject.userName || !requestObject.password) {
				alert("Unauthorized User....Please provide valid credentials to proceed further!!!");
			} else {
				// Routing to home page
				this.props.history.push('/home');
			}
		});	
	}
  
  componentDidMount() {
  	
  }

  render() {
	
	// Inline styles in react
	const leftPanel = {
    	backgroundImage: `url(${logo})`,
		position: 'absolute', 
		height: '100%',
		width: '100%',
		overflow: 'hidden'
	}

    return (
    		<div style={leftPanel}>
				<h4 className="header">REACTJS APPLICATION</h4>
				<div>
					<div className="loginForm">
						<form>
							<div>
								<label> USERNAME </label>
								<input type="text" name="Username" placeholder="Username" ref="userName"/>
							</div>
							<div>
								<label> PASSWORD </label>
								<input type="password" name="Password" placeholder="Password" ref="password"/>
							</div>
							<div style={{textAlign: 'center'}}>
								<Button Type="button" text="LOGIN" invokeMethod={ this.submit }></Button>
							</div>
						</form>
					</div>
				</div>
			</div>

			
    	);
  	}
}

class Button extends Component {
	render() {
		return(
			<button type={ this.props.Type } onClick={this.props.invokeMethod} className="btn btn-default">{ this.props.text }

			</button>
		);
	}
}

export default Login;
