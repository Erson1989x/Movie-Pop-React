import React from "react";
import { useState } from "react";
import WatchList from "./WatchList";
import Summary from "./Summary";

const WatchBox = ( { watched, average }) => {
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <Summary watched={watched} average={average}/>
          <WatchList watched={watched} />
        </>
      )}
    </div>
  );
};

export default WatchBox;
