import React, { useState } from "react";

export const RoadmapGenerate = React.createContext();
const RoadmapContext = ({ children }) => {
  const [generateClicked, setGenerateClicked] = useState(false);
  const [input, setInput] = useState("");
  return (
    <div>
      <RoadmapGenerate.Provider
        value={{ generateClicked, setGenerateClicked, input, setInput }}
      >
        {children}
      </RoadmapGenerate.Provider>
    </div>
  );
};

export default RoadmapContext;
