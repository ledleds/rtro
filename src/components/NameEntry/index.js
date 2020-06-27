import { Component } from 'preact'
import NameInput from '../NameInput'
import UserContext from '../../context/userContext'
import { route } from 'preact-router';

class NameEntry extends Component {
  static contextType = UserContext;

  submitName = () => {
    // redirect to board page
    route('/board');
  }

  render() {
    return (
      <div>
        <NameInput 
          onSubmitName={name => this.submitName(name)} 
        />
      </div>
    )
  }
}

export default NameEntry