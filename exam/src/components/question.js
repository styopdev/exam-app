import { useEffect, useState } from 'react';
import './question.css';

function Question({ data, onOpen }) {
  const [isOpened, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(data.isAnswered); 
  }, []);

  function open() {
    if (!isOpened) { 
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Are you sure you want to open this question?')) {
           return;
        }
        setAnswered(true);
        onOpen(data.points);
    } else {
        //
    }
  }
  
  return (
    <div onClick={open} className={"box box-" + data.points + (isOpened ? ' opened' : '')}>
        { data.points }
    </div>
  );
}

export default Question;
