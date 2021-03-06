import { h, Component } from 'preact';
// import { useReducer } from 'preact/hooks'
import { Router } from 'preact-router';


// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Board from '../routes/board';

import { UserProvider } from '../context/userContext';

export default class App extends Component {	
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<UserProvider>	      
					<div id="app">
						<Router onChange={this.handleRoute}>
							<Home path="/" />
							<Profile path="/profile/" user="me" />
							<Profile path="/profile/:user" />
							<Board path="/board" />
						</Router>
					</div>
			</UserProvider>	      
		);
	}
}
