import { createContext, Component } from 'preact';
import firebase from '../firebase';

const UserContext = createContext();

const URL = 'ws://localhost:3030';

class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.usersRef = firebase.database().ref('users')
  }

  state  = {	
    username: '',
    userColour: null,
    allUsers: [],
    ws: new WebSocket(URL)
  }

  // set current user
  setUser = user => {
    this.setState(() => ({ username: user }))
  }

  // interim helper to clear up the db
  clearDb = () => {
    this.usersRef.set('/users', null)
  }

  // add a name to the firebase db
  addName = name => {
    const newPostKey = this.usersRef.push().key
    const updates = {};
    updates[`${newPostKey}`] = {name};

    this.usersRef.update(updates, (error) => {
      if (error) {
        console.log('There was an error updating the database');
      } else {
        console.log('Successfully updated the database')
      }
    })
  }

  componentDidMount() {
    this.state.ws.onopen = () => {
      console.log('Websocket connected')

      console.log('Fetching users from Firebase')
      this.usersRef.once('value', (snapshot) => {
      const items = snapshot.val()
      let users = [];
      for (let item in items) {
        users.push(
          items[item].name,
        );
      }

      this.setState({
        allUsers: users,
      });
    });
  }

  // on receiving a message, add it to the list of names
    this.state.ws.onmessage = event => {
      this.addName(event.data)
    }
    
    // automatically try to reconnect on connection loss
    this.state.ws.onclose = () => {
      console.log('Websocket disconnected, will try to reconnect')

      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  render() {
    const { children } = this.props;
    const { username } = this.state;
    const { userColour } = this.state;
    const { allUsers } = this.state;
    const { setUser, clearDb } = this;
    const { ws } = this.state;
    
    return (
      <UserContext.Provider
        value={{
          username,
          userColour,
          allUsers,
          setUser,
          clearDb,
          ws,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}



export default UserContext;

export { UserProvider }