export const setDataToStorage = (key: string, value: any): void => {
  try {
    const serializedValue: string = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    // console.error("Error saving to localStorage", error);  todo: display error on UI
    return
  }
};


export const getDataFromStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    // console.error("Error reading from localStorage", error);  todo: display error on UI
    return null;
  }
};
