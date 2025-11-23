import React, { useState,useEffect } from 'react';
import musicFile from './minecraft.mp3';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? '❌' : '🟢';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every(cell => cell))
      setWinner('Draw');
  };
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };
  useEffect(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.3;
    const playAudio = () => {
      audio.play().catch(() => {});
      window.removeEventListener('click', playAudio);
    };
    window.addEventListener('click', playAudio);
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
      <div className ="app">
        <h1>Tic Tac Toe </h1>
        <div className = "board">
          {board.map((cell, index) => (
            <button key= {index} className= "square" onClick= {() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      <div className="status">
        {winner ? (winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`):`Next player: ${isXNext?'❌':'🟢'}`}
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
    
  );
}

export default App;
