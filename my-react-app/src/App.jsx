import React, { useEffect } from 'react'
import './App.css'
import Square from './Square/Square'
import { useState } from 'react'

const renderFrom=[
  [1,2,3],
  [4,5,6],
  [7,8,9]
]
const App=()=>{

  const [gameState,setGameState]=useState(renderFrom);
  const [currentPlayer,setCurrentPlayer]=useState('circle');
  const [finishedState,setFinishState]=useState(false);

  const checkWinner=()=>{
    for (let row = 0; row < gameState.length; row++) {
      if(gameState[row][0]=== gameState[row][1] && gameState[row][1] === gameState[row][2]){
        return gameState[row][2]
      }
    }

    for (let col = 0; col < gameState.length; col++) {
      if(gameState[0][col]=== gameState[1][col] && gameState[1][col] === gameState[2][col]){
        return gameState[2][col]
      }
    }

    if(gameState[0][0]===gameState[1][1] && gameState[1][1]===gameState[2][2]){
      return gameState[0][0]
    }

    if(gameState[0][2]===gameState[1][1] && gameState[1][1]===gameState[2][0]){
      return gameState[0][2]
    }

    const isDrawMatch = gameState.flat().every(e=>{
      if(e==='circle' || e==='cross'){
        return true
      }
    })

    if(isDrawMatch){
      return 'draw'
    }

  }

  useEffect(()=>{
    const winner=checkWinner()

    if(winner){
      setFinishState(winner)
    }
    
  },[gameState])

  return (
    <div className='main-div'>
      <div>
        <div className='move-detection'>
          <div className='left'>YourSelf</div>
          <div className='right'>Opponent</div>
        </div>
        <h1 className='game-heading water-background'>Tic Tac Toe</h1>
        <div className='square-wrapper'>
          {
            gameState.map((arr,rowIndex)=>
            arr.map((e,colIndex)=>{
              return <Square finishedState={finishedState} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} setGameState={setGameState} id={rowIndex*3+colIndex} key={rowIndex*3+colIndex}/>
            }))
          }
        </div>
        {finishedState && finishedState!=='draw' && (
          <h3 className='finished-state'>{finishedState} won the game</h3>
        )}
        {finishedState && finishedState==='draw'&& (
          <h3 className='finished-state'> Draw match</h3>
        )}
      </div>
    </div>
  )
}

export default App