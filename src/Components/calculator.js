import "./Style.css";
import { useReducer } from "react"
import ButtonDigit from "./ButtonDigit";
import ButtonOperation from "./ButtonOperation";


export const ACTIONS =
{
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"

}
function reducer(state,{type,payload}){
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currentOperend: payload.digit,
          overWrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperend ==="0") return state
      if (payload.digit === "." && state.currentOperend.includes(".")) return state
      return {
        ...state,
        currentOperend:  `${state.currentOperend || ""}${payload.digit}`
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          overWrite:false,
          currentOperend: null
        }
      }
      if (state.currentOperend == null) {
        return {
          ...state
        }
      }
      if (state.currentOperend.length === 1) {
        return {
          ...state,
          currentOperend: null,
        }
      }
      return {
        ...state,
        currentOperend:`${state.currentOperend.slice(0,-1)}`
      }
    case ACTIONS.CLEAR:
      return {}
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperend == null && state.previousOperend == null) return state
      if (state.currentOperend == null) {
        return {
          ...state,
          operations: payload.operations
        }
      }
      if (state.previousOperend == null) {
        return {
          ...state,
          operations: payload.operations,
          previousOperend: state.currentOperend,
          currentOperend:null
        }

      }
      return {
        ...state,
        previousOperend: evaluate(state),
        operations: payload.operations,
        currentOperend:null
        
      }
    case ACTIONS.EVALUATE:
      if (state.operations == null || state.currentOperend == null || state.previousOperend == null) {
        return state
      }
      return {
        ...state,
        overWrite:true,
        previousOperend: null,
        operations:null,
        currentOperend: evaluate(state)

}
         default:
      return state
  }
}
const evaluate = ({ currentOperend, previousOperend, operations }) => {
  const previous = parseFloat(previousOperend)
  const current = parseFloat(currentOperend)
  if(isNaN(previous) || isNaN(current)) return ""
  const result = ""
  switch (operations) {
    case "+":
      return previous + current
    break
    case "-":
      return previous - current
    break
    case "÷":
      return previous / current
    break
    case "×":
      return previous * current
    break
}
  return result.toString()
}
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.toString().split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function Calculator() {
  const [{ currentOperend, previousOperend, operations }, dispatch] = useReducer(reducer, {})
  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='previous-operand'>{formatOperand(previousOperend)}{operations}</div>
        <div className='current-operand'>{formatOperand( currentOperend)}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <ButtonOperation operations="÷" dispatch={dispatch}/>
      <ButtonDigit digit="1" dispatch={dispatch} />
      <ButtonDigit digit="2" dispatch={dispatch} />
      <ButtonDigit digit="3" dispatch={dispatch} />
      <ButtonOperation operations="+" dispatch={dispatch}/>
      <ButtonDigit digit="4" dispatch={dispatch} />
      <ButtonDigit digit="5" dispatch={dispatch} />
      <ButtonDigit digit="6" dispatch={dispatch} />
      <ButtonOperation operations="-" dispatch={dispatch}/>
      <ButtonDigit digit="7" dispatch={dispatch} />
      <ButtonDigit digit="8" dispatch={dispatch} />
      <ButtonDigit digit="9" dispatch={dispatch} />
      <ButtonOperation operations="×" dispatch={dispatch}/>
      <ButtonDigit digit="0" dispatch={dispatch} />
      <ButtonDigit digit="." dispatch={dispatch} />
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
</div>
  );  
}

export default Calculator;
