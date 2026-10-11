import { useReducer } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "sub":
      return { count: state.count - 1 };
    case "mul":
      return { count: state.count * 10 };
    case "div":
      return { count: state.count / 10 };
    default:
      return state;
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <h2>Count: {state.count}</h2>
      <button onClick={() => dispatch({ type: "add" })}>ADD</button>
      <button onClick={() => dispatch({ type: "sub" })}>SUB</button>
    </div>
  );
}
export default Counter;
