import React, { useState , useContext ,useEffect } from "react";
import { Asset } from "./Components/Asset";
import { Button } from "./Components/Button";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { COINS, PERIODS } from "./Config/constants";
import {
  CONTAINER_PADDING,
  graphHeight,
  graphWidth,
  GRAPH_MARGIN,
} from "./Config/dimensions";
import { multiStepContext } from "../StepContext";

const CryptoApp = () => {
  const [period, setPeriod] = useState(PERIODS[0]);
  const { coinListLocal, setCoinListLocal } = useContext(multiStepContext);
  useEffect(() => {
    console.log(coinListLocal)
  }, [])
  return (
    <div   style={{background:"#112233" }}>
      {/* <Header /> */}
      <div style={{ padding: CONTAINER_PADDING + "px" }}>
        {PERIODS.map((option) => (
          <Button
            key={option.title}
            onClick={() => setPeriod(option)}
            disabled={period.value === option.value}
          >
            {option.title}
          </Button>
        ))}
        <main>
          {coinListLocal &&  coinListLocal.map(( coin : any) => (
            <Asset
              key={coin}
              coin={coin}
              graphWidth={graphWidth}
              graphHeight={graphHeight}
              margin={GRAPH_MARGIN}
              period={period}
            />
          ))}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CryptoApp;
