import { Component } from 'preact'
import NameInput from '../NameInput'

const URL = 'ws://localhost:3030'

class NameEntry extends Component {
  constructor(props) {
    super(props)
    this.ws = new WebSocket(URL)
    this.state = {
      users: [],
    }
  }
  
  componentDidMount() {
    this.ws.onopen = () => {
      console.log('connected')
    }

    this.ws.onmessage = event => {
      // on receiving a message, add it to the list of names
      this.addName(event.data)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  count = 0

  addName = name => {
    this.count++
    this.setState(state => ({ users: [name, ...state.users] }))
  }

  submitName = name => {
    // on submitting the name input form, send the name, add it to the list and reset the input
    this.ws.send(name)
    // this.addName(name)
  }

  render() {
    return (
      <div>
        <NameInput 
          onSubmitName={name => this.submitName(name)} 
        />

        {this.state.users.map((name) => 
          <h2>HELLO {name}</h2>
        )}
      </div>
    )
  }
}

export default NameEntry