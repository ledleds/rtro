import { Component } from 'preact'
import NameInput from '../NameInput'
// import firebase from '../../firebase';
import UserContext from '../../context/userContext'
import { route } from 'preact-router';

class NameEntry extends Component {
  static contextType = UserContext;

  submitName = name => {
    // on submitting the name input form, send the name
    this.context.ws.send(name);

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