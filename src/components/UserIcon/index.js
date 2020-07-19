import { h } from 'preact';
import style from './style.css';

const UserIcon = ({initial, mainUser, ready}) => {
  return (
    <div class={`${style.container} ${mainUser ? style.mainUser : null}`}>
      {!mainUser && <div class={`${style.status} ${ready ? style.ready : style.unready}`} />}
      <div class={style.initial}>
        {initial}
      </div>
    </div>
  )
}

export default UserIcon;