import { Component } from 'preact';
import PropTypes from 'prop-types';
import UserContext from '../../context/userContext';

class NameInput extends Component {
  static contextType = UserContext;

  render() {
    const { setUser, user } = this.context;

    return (
      <form onSubmit={event => {
        // prevent a browser reload/refresh
        event.preventDefault()
        
        this.props.onSubmitName(user.name)
      }}>
        <input 
          type="text" 
          id="firstName" 
          placeholder="Enter your name" 
          // TODO: change this to be onsubmit instead
          onChange={event => setUser(event.target.value)}
          value={user.name}
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
