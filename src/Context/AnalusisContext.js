import { createContext, useContext, useState } from "react";

const AnalusisContext = createContext({
  data: null,
});

export const useAnalusis = () => useContext(AnalusisContext);

export default function Analusis({ children }) {
  const [analusisData, setAnalusis] = useState([]);

  const setAnalusisEvent = (analusisData) => setAnalusis(analusisData);

  const value = { analusisData, setAnalusisEvent };

  return (
    <AnalusisContext.Provider value={value}>
      {children}
    </AnalusisContext.Provider>
  );
}
