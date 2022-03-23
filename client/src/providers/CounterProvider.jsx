import { createContext, useState } from 'react';

// Create a Context
export const counterContext = createContext();

// Create a Component wrapper from Context.Provider
export default function CounterProvider(props) {
  // Here is our Shared State Object
  const [counter, setCounter] = useState(0);

  // Functions to change  the counter state item
  const increment = function () {
    setCounter(counter + 1);
  };
  const decrement = function () {
    setCounter(counter - 1);
  };
  const clear = function () {
    setCounter(0);
  };

  // This list can get long with a lot of functions.  Reducer may be a better choice
  const providerData = { counter, increment, decrement, clear };

  // We can now use this as a component to wrap anything
  // that needs our state
  // const Provider = counterContext.Provider same as <counterContext.Provider>
  return (
    // カウンターデータ App.js に受け渡し
    <counterContext.Provider value={providerData}>
      {props.children}
      {/* if we dont have {props.children} App.js is empty */}
      {/* also this page need props at CounterProvider(props) */}
    </counterContext.Provider>
  );
}
