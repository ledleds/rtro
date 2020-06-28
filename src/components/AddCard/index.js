import { useState } from 'preact/hooks';

const AddCard = () => {
  const [inputVisible, setInputVisible] = useState(false);

  return (
    inputVisible ? <div>HELLO</div> :
    (<button type="button" onClick={() => {setInputVisible(true)}}>
      +
    </button>)
  )
}

export default AddCard;