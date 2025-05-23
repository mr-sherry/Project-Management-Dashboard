import { createContext, useContext } from 'react';

export const UserContext = createContext({
  users: [],
  loggedUser: null,
  projectList: {},
  login: (email, password) => {},
  register: (username, password, email, cPassword) => {},
  logout: () => {},
  project: (id, title, description) => {},
  projectsSort: (projects) => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = UserContext.Provider;
