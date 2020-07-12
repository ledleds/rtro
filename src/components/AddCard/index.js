import { h } from 'preact';
import { useState, useContext } from 'preact/hooks';
import UserContext from '../../context/userContext';

import style from './style.css';

const AddCard = ({column}) => {
  const { addNewCard } = useContext(UserContext)
  const [inputVisible, setInputVisible] = useState(false);
  const [cardText, setCardText] = useState(null);

  return (
    inputVisible ? 
    <form onSubmit={event => {
          event.preventDefault();
          addNewCard({column, value: cardText});
          setCardText(null);
          setInputVisible(false)
        }}>
          <input 
            class={style.textInput} 
            type="text" name="newCard" 
            onChange={event => {setCardText(event.target.value)}} 
            value={cardText}
          />
          <input class={style.addButton} type="submit" value="Add" />
        </form>
       :
    (<button type="button" onClick={() => {setInputVisible(true)}}>
      +
    </button>)
  )
}

export default AddCard;