import { createContext, useContext, useState } from "react";

const ReceptionInfoContext = createContext({
  numberOfCarpets: 0,
  numberOfTracks: 0,
});

export const useReceptionInfo = () => useContext(ReceptionInfoContext);

export default function ReceptionInfo({ children }) {
  const [reception, setReception] = useState({
    numberOfCarpets: 0,
    numberOfTracks: 0,
    prepared: 0,
  });

  const setReceptionEvent = (reception) => setReception(reception);
  const value = { reception, setReceptionEvent };

  return (
    <ReceptionInfoContext.Provider value={value}>
      {children}
    </ReceptionInfoContext.Provider>
  );
}
