import React from 'react'
import { ACTIONS } from './calculator'
export default function ButtonOperation({ dispatch, operations}) {

  return (
      <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operations } })}>{ operations}</button>
  )
}
