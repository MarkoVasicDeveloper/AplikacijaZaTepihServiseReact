import { createContext, useContext, useState } from "react";

const ClientContext = createContext({
  data: null,
});

export const useClient = () => useContext(ClientContext);

export default function Client({ children }) {
  const [client, setClient] = useState([]);

  const setClientEvent = (client) => setClient(client);

  const value = { client, setClientEvent };

  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}
