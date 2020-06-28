import { h } from 'preact';
import style from './style.css';

const Column = ({title}) => {
  return (
    <div class={style.container}>
      <p class={style.title}>
        {title}
      </p>
    </div>
  )
}

export default Column;
