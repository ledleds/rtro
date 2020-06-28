import { h } from 'preact';
import style from './style.css';

const UserIcon = ({initial, mainUser}) => {
  return (
    <div class={`${style.container} ${mainUser ? style.mainUser : null}`}>
      <div class={style.initial}>
        {initial}
      </div>
    </div>
  )
}

export default UserIcon;