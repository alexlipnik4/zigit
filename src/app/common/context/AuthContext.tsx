import React, { createContext, useState, ReactNode } from 'react';
import { LocalStorageService } from '../services/localStorageService';

type PersonalDetails = {
  name: String;
  Team: String;
  joinedAt: String;
  avatar: String;
};

type AppState = {
  user: PersonalDetails | null;
  setUser: React.Dispatch<React.SetStateAction<PersonalDetails>>;
};

export const AuthContext = createContext<AppState>({
  user: LocalStorageService.getItem('signInData') || null,
  setUser: () => {},
});

export default (props: { children: ReactNode }) => {
  const [user, setUser] = useState<PersonalDetails>({
    name: '',
    Team: '',
    joinedAt: '',
    avatar: '',
  });

  return (
    <div style={{ height: '100%' }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {props.children}
      </AuthContext.Provider>
    </div>
  );
};
