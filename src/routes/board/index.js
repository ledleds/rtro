import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import style from './style';

import UserContext from '../../context/userContext';
import Column from '../../components/Column'
import UserIcon from '../../components/UserIcon'

const Board = () => {
  const {user, allUsers, clearDb, sendToDb, retroStarted} = useContext(UserContext)

  // TODO: Colour columns
  const columns = ['Start', 'Stop', 'Continue', 'MVP']

  if (!user.name) {
    // replaces the current history entry
    route('/', true)
  }

	return (
    <div class={style.container}>
      {!retroStarted && 
        <button onClick={() => sendToDb()}>
          I'm ready
        </button>
      }
      <div class={style.userIcons}>
        {allUsers.filter(({id}) => id != user.id).map(({name, ready}) =>
          <UserIcon initial={name.charAt(0).toUpperCase()} ready={ready} />
          )}
        <div class={style.divider} />
        {/* TODO: Do this uppercasing when accepting the users name */}
        <UserIcon initial={user.name.charAt(0).toUpperCase()} mainUser={true} />
      </div>

      <div class={style.columns}>
       {columns.map((title) => 
          <Column title={title} />
        )}
      </div>

      <button onClick={() => clearDb()}>
        Clear users db
      </button>
    </div>
  )
};

export default Board;
