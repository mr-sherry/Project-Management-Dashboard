import { createContext, useContext } from 'react';

export const UserContext = createContext({
  users: [],
  loggedUser: null,
  projectList: {},
  userId: '',
  login: (email, password) => {},
  register: (username, userId, password, email, cPassword) => {},
  logout: () => {},
  addProject: (
    userId,
    id,
    title,
    description,
    startDate,
    status,
    progress
  ) => {},
  projectsSort: (projects) => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = UserContext.Provider;
