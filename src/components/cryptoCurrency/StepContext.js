import React, { useState } from "react";
import createPersistedState from "use-persisted-state";
import App from "../../App";
const useCounterState4 = createPersistedState("coinListLocal");
export const multiStepContext = React.createContext();

const StepContext = () => {
  const [coinListLocal, setCoinListLocal] = useCounterState4([
    "bitcoin",
    "ethereum",
    "litecoin",
    "bitcoin-cash",
    "binancecoin",
    "ripple",
    "polkadot",
    "dogecoin",
    "chainlink",
  ]);

  return (
    <div>
      <multiStepContext.Provider
        value={{
          coinListLocal,
          setCoinListLocal,
        }}
      >
        <App />
      </multiStepContext.Provider>
    </div>
  );
};

export default StepContext;
