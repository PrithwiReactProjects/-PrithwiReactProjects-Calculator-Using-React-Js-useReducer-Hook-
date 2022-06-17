import React from 'react'
import { ACTIONS } from './calculator'
export default function ButtonDigit({ digit, dispatch }) {


  return (
      <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>
  )
}
