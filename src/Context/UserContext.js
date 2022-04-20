import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  data: null,
});

export const useUser = () => useContext(UserContext);

export default function User({ children }) {
  const [user, setUser] = useState([]);

  const setUserEvent = (user) => setUser(user);

  const value = { user, setUserEvent };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
