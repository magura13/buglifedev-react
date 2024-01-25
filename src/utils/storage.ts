const setItem = (key: string, value: string): void => {
  localStorage.setItem(key, value);
};

const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

const clearStorage = (): void => {
  localStorage.clear();
};

export const storage = {
  setItem,
  getItem,
  removeItem,
  clearStorage
};
