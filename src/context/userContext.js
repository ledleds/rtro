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
    userReady: false,
    userColour: null,
    allUsers: [],
    retroStarted: false,
    // TODO: Improve the below to share card titles from elsewhere.
    cards: {Start: [], Stop: [], Continue: [], MVP: []},
    allCards: null
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

  fetchCards = () => {
    this.cardsRef.on('value', (snapshot) => {
      this.setState({
        allCards: snapshot.val(),
      });
    });
  }

  sendToDb = () => {
    this.setState(() => ({ retroStarted: true }));
    // send all current users cards to the db
    for (const [key, value] of Object.entries(this.state.cards)) {
      firebase.database().ref(`cards/${key}`).update({
        [this.state.user.id] : value
      });
    }
    // set current user as ready
    firebase.database().ref(`users/${this.state.user.id}`).update({
      ready : true
    });


    this.setState({
      userReady: true,
    });
  }

  // add a name to the firebase db
  addName = (name, id = uuid()) => {
    const updates = {};
    updates[`${ id }`] = {name, ready: false};
    console.log('---updates-->', JSON.stringify(updates))
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
    // firebase.database().ref(`cards/${column}`).update({
    //   [this.state.user.id] : value
    // });

    // Below sets in state instead
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
          name: dbItems[item].name, id: item, ready: dbItems[item].ready
        });
      }

      this.setState({
        allUsers: users,
      });
    });

    this.fetchCards();
  }

  render() {
    const { children } = this.props;
    const { user, userReady, userColour } = this.state;
    const { allUsers } = this.state;
    const { retroStarted } = this.state;
    const { cards, allCards } = this.state;
    const { setUser, clearDb, sendToDb, addNewCard } = this;
    
    return (
      <UserContext.Provider
        value={{
          user,
          userColour,
          userReady,
          allUsers,
          setUser,
          clearDb,
          retroStarted,
          sendToDb,
          addNewCard,
          cards,
          allCards
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}



export default UserContext;

export { UserProvider }