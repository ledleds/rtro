import { Component } from 'preact'
import PropTypes from 'prop-types'

class NameInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
    }
  }
  
  render() {
    return (
      <form onSubmit={event => {
        // prevent a browser reload/refresh
        event.preventDefault()
        
        this.props.onSubmitName(this.state.name)
        // reset back to empty to clear the field.
        this.setState({ name: null })
      }}>
        <input 
          type="text" 
          id="firstName" 
          placeholder="Enter your name" 
          onChange={event => this.setState({ name: event.target.value })}
          value={this.state.name}
        />
        <input type="submit" value="Get started" />
      </form>
    )
  }
}

NameInput.propTypes = {
  onSubmitName: PropTypes.func.isRequired,
}

export default NameInput
