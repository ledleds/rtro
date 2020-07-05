import { createContext, Component } from 'preact';
import firebase from '../firebase';
import { uuid } from 'uuidv4';

const UserContext = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.usersRef = firebase.database().ref('users')
    this.cardsRef = firebase.database().ref('cards')
  }

  state  = {	
    user: {name: '', id: null},
    userColour: null,
    allUsers: [],
    retroStarted: false,
    cards: {Start: [], Stop: [], Continue: [], MVP: []}
  }

  // set current user and add to firebase db
  setUser = user => {
    const id = uuid()
    // TODO: Store user data in browser session: https://www.robinwieruch.de/local-storage-react
    this.setState(() => ({ user: {name: user, id} }))
    this.addName(user, id)
  }

  // interim helper to clear up the db
  clearDb = () => {
    this.usersRef.set('/users', null)
  }

  startRetro = () => {
    this.setState(() => ({ retroStarted: true }))
  }

  // add a name to the firebase db
  addName = (name, id = uuid()) => {
    const updates = {};
    updates[`${ id }`] = {name};
    // TODO: change this to set instead
    this.usersRef.update(updates, (error) => {
      if (error) {
        console.log('There was an error updating the database');
      } else {
        console.log('Successfully updated the database')
      }
    })
  }

  addNewCard = ({column, value}) => {
    this.setState((state) => {
      const cards = {...state.cards, [column]: [...state.cards[column], value]};
 
      return {
        ...state,
        cards
      };
    });
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
    const { retroStarted } = this.state;
    const { cards } = this.state;
    const { setUser, clearDb, startRetro, addNewCard } = this;
    
    return (
      <UserContext.Provider
        value={{
          user,
          userColour,
          allUsers,
          setUser,
          clearDb,
          retroStarted,
          startRetro,
          addNewCard,
          cards
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}



export default UserContext;

export { UserProvider }