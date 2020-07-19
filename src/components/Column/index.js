import { h } from 'preact';
import { useContext } from 'preact/hooks';
import style from './style.css';
import UserContext from '../../context/userContext';
import AddCard from '../AddCard';

const Column = ({title}) => {
  const {retroStarted, cards, allCards, userReady} = useContext(UserContext)

  const cardsArray = allCards && allCards[title] ? Object.values(allCards[title]).flat() : [];

  return (
    <div class={style.container}>
      <p class={style.title}>
        {title}
      </p>
    
      {!retroStarted && 
        <div>
          <AddCard column={title} />
        </div>
      }
      {userReady ? cardsArray.map((text) => {
        return <p>{text}</p>
      }) :
      cards[title].map((text) => {
        return <p>{text}</p>
      })} 
    </div>
  )
}

export default Column;
