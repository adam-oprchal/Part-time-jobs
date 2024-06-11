import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  loadAvatarFromLocalStorage,
  saveAvatarToLocalStorage,
  loadFirstNameFromLocalStorage,
  saveFirstNameToLocalStorage,
  loadSurnameFromLocalStorage,
  saveSurnameToLocalStorage,
} from '../../utils/localStorageHelpers';

type AccountContextType = {
  avatar: string;
  setAvatar: (avatar: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
};

const defaultContextValue: AccountContextType = {
  avatar: '',
  setAvatar: () => {
    ('');
  },
  firstName: '',
  setFirstName: () => {
    ('');
  },
  surname: '',
  setSurname: () => {
    ('');
  },
};

const AccountContext = createContext<AccountContextType>(defaultContextValue);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState<string>(() => {
    const savedAvatar = loadAvatarFromLocalStorage();
    return savedAvatar || '';
  });
  const [firstName, setFirstName] = useState<string>(() => {
    const savedFirstName = loadFirstNameFromLocalStorage();
    return savedFirstName || '';
  });
  const [surname, setSurname] = useState<string>(() => {
    const savedSurname = loadSurnameFromLocalStorage();
    return savedSurname || '';
  });

  useEffect(() => {
    saveAvatarToLocalStorage(avatar);
  }, [avatar]);

  useEffect(() => {
    saveFirstNameToLocalStorage(firstName);
  }, [firstName]);

  useEffect(() => {
    saveSurnameToLocalStorage(surname);
  }, [surname]);

  return (
    <AccountContext.Provider
      value={{
        avatar,
        setAvatar,
        firstName,
        setFirstName,
        surname,
        setSurname,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
