import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/home.gif';
import '../stylesheet/App.css';

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
			var authorizedUser = res.filter(user => { return user.name === requestObject.userName});
			if(!authorizedUser.length) {
				alert("Unauthorized User....Please provide valid credentials to proceed further!!!");
			} else {
				this.props.history.push('/home');
			}
		});	
	}
  
  componentDidMount() {
  	
  }

  render() {

	const leftPanel = {
    	backgroundImage: `url(${logo})`
	}

    return (
    		<div>
				<h4 className="header">Resource Management System</h4>
				<div className="row">
					<div className="col-md-8" style={leftPanel}>
					</div>
					<div className="col-md-4">
						<div><b>Login/Register</b></div>
						<form>
							<div>
								<label> Username: </label>
								<input type="text" name="Username" placeholder="Username" ref="userName"/>
							</div>
							<div>
								<label> Password: </label>
								<input type="password" name="Password" placeholder="Password" ref="password"/>
							</div>
							<div>
								<Button Type="button" text="Login" invokeMethod={ this.submit }></Button>
								<Link to="/home">Register</Link>
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
