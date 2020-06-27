import { createContext, Component } from 'preact';
import firebase from '../firebase';
import { uuid } from 'uuidv4';

const UserContext = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.usersRef = firebase.database().ref('users')
  }

  state  = {	
    user: {name: '', id: null},
    userColour: null,
    allUsers: [],
  }

  // set current user and add to firebase db
  setUser = user => {
    const id = uuid()
    this.setState(() => ({ user: {name: user, id} }))
    this.addName(user, id)
  }

  // interim helper to clear up the db
  clearDb = () => {
    this.usersRef.set('/users', null)
  }

  // add a name to the firebase db
  addName = (name, id = uuid()) => {
    const updates = {};
    updates[`${ id }`] = {name};

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
      const dbItems = snapshot.val();
      let users = [];
      for (let item in dbItems) {
        users.push({
          name: dbItems[item].name, id: item
        });
      }

      this.setState({
        allUsers: users,
      });
    });
  }

  render() {
    const { children } = this.props;
    const { user } = this.state;
    const { userColour } = this.state;
    const { allUsers } = this.state;
    const { setUser, clearDb } = this;
    
    return (
      <UserContext.Provider
        value={{
          user,
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