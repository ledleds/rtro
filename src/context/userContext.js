import { createContext, Component } from 'preact';
import firebase from '../firebase';

const UserContext = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.usersRef = firebase.database().ref('users')
  }

  state  = {	
    username: '',
    userColour: null,
    allUsers: [],
  }

  // set current user and add to firebase db
  setUser = user => {
    this.setState(() => ({ username: user }))
    this.addName(user)
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
    console.log('Fetching users from Firebase')
    this.usersRef.on('value', (snapshot) => {
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

  render() {
    const { children } = this.props;
    const { username } = this.state;
    const { userColour } = this.state;
    const { allUsers } = this.state;
    const { setUser, clearDb } = this;
    
    return (
      <UserContext.Provider
        value={{
          username,
          userColour,
          allUsers,
          setUser,
          clearDb,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}



export default UserContext;

export { UserProvider }