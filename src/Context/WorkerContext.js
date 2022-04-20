import { createContext, useContext, useState } from "react";

const WorkerContext = createContext({
  data: null,
});

export const useWorker = () => useContext(WorkerContext);

export default function Worker({ children }) {
  const [worker, setWorker] = useState([]);

  const setWorkerEvent = (worker) => setWorker(worker);

  const value = { worker, setWorkerEvent };

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
}
