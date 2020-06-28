import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import style from './style';

import UserContext from '../../context/userContext';
import Column from '../../components/Column'

const Board = () => {
  const {user, allUsers, clearDb} = useContext(UserContext)

  const columns = ['Start', 'Stop', 'Continue', '✨']

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
            clearDb();
          }}
        >
          Clear db
        </button>
      </div>

      <div class={style.columns}>
       {columns.map((title) => 
          <Column title={title} />
        )}
      </div>
    </div>
  )
};

export default Board;
