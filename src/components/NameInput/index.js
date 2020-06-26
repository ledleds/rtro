import { Component } from 'preact';
import PropTypes from 'prop-types';
import UserContext from '../../context/userContext';

class NameInput extends Component {
  static contextType = UserContext;

  render() {
    const { setUser, username } = this.context;

    return (
      <form onSubmit={event => {
        // prevent a browser reload/refresh
        event.preventDefault()
        
        this.props.onSubmitName(username)
      }}>
        <input 
          type="text" 
          id="firstName" 
          placeholder="Enter your name" 
          onChange={event => setUser(event.target.value)}
          value={username}
        />
        <input type="submit" value="Get started" 
        
        />
      </form>
    )
  }
}

NameInput.propTypes = {
  onSubmitName: PropTypes.func.isRequired,
}

export default NameInput
