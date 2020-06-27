import { h } from 'preact';
import { useContext } from 'preact/hooks';
import UserContext from '../../context/userContext';
import { route } from 'preact-router';

const Board = () => {
  const {user, allUsers, clearDb} = useContext(UserContext)

  if (!user.name) {
    // replaces the current history entry
    route('/', true)
  }

	return (
    <div>
      <h1>TESTING</h1>
			<p>{`Hello: ${user.name}`}</p>

      <div>
        <p>Also on this board is:</p>
        {allUsers.filter(({id}) => id != user.id).map(({name}) => 
          <h2>{name}</h2>
        )}
        <button
          onClick={() => {
            clearDb()
          }}
        >
          Clear db
        </button>
      </div>
    </div>
  )
};

export default Board;
