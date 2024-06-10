export const saveAvatarToLocalStorage = (avatar: string) => {
  localStorage.setItem('avatar', avatar);
};

export const loadAvatarFromLocalStorage = (): string | null => {
  return localStorage.getItem('avatar');
};

export const saveFirstNameToLocalStorage = (firstName: string) => {
  localStorage.setItem('firstName', firstName);
};

export const loadFirstNameFromLocalStorage = (): string | null => {
  return localStorage.getItem('firstName');
};

export const saveSurnameToLocalStorage = (surname: string) => {
  localStorage.setItem('surname', surname);
};

export const loadSurnameFromLocalStorage = (): string | null => {
  return localStorage.getItem('surname');
};
