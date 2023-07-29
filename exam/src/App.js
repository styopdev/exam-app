import { useState } from 'react';
import './App.css';
import Question from './components/question';

function App() {
  const [tries, setTries] = useState(5);
  const [selectedPoints, setSelectedPoints] = useState(0)
  const [score, setScore] = useState(0);

  const questionList = [
    { text: 'What?', points: 1, isAnswered: false },
    { text: 'What?', points: 1, isAnswered: false },
    { text: 'What?', points: 1, isAnswered: false },
    { text: 'Where?', points: 1, isAnswered: false },
    { text: 'Why?', points: 1, isAnswered: false },
    { text: 'Why?', points: 2, isAnswered: false },
    { text: 'Who?', points: 2, isAnswered: false },
    { text: 'Whom?', points: 2, isAnswered: false },
    { text: 'Who?', points: 2, isAnswered: false },
    { text: 'Whom?', points: 3, isAnswered: false },
    { text: 'What?', points: 3, isAnswered: false },
    { text: 'Where?', points: 3, isAnswered: false },
    { text: 'Why?', points: 4, isAnswered: false },
    { text: 'Who?', points: 4, isAnswered: false },
    { text: 'Whom?', points: 5, isAnswered: false },
  ];

  function onOpen(points) {
    setSelectedPoints(selectedPoints + points)
    setTries(tries - 1);
  }

  return (
    <div className='App'>
      <h2>Tries left: {tries}</h2>
      <h2>Total score:  <span className='gray'>{selectedPoints}</span> / {score}</h2>
      <div className="question-container">
        {
          questionList.map((q) => {
            return <Question data={q} onOpen={onOpen}></Question>;
          })
        }
      </div>
    </div>
  );
}

export default App;
