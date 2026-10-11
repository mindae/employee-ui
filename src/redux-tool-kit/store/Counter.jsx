import { useSelector, useDispatch } from "react-redux";
import { inc, dec, incByAmount } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(inc())}>+1</button>
      <button onClick={() => dispatch(dec())}>-1</button>
      <button onClick={() => dispatch(incByAmount(10))}>+10</button>
    </div>
  );
}

export default Counter;
