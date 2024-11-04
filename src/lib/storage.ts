export const setDataToStorage = (
  key: string,
  value: any,
  showFailureAlert?: (message: string) => void
): void => {
  try {
    const serializedValue: string = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    showFailureAlert &&
      showFailureAlert("Something went wrong while storing data");
    return;
  }
};

export const getDataFromStorage = <T>(
  key: string,
  showFailureAlert?: (message: string) => void
): T | null => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    showFailureAlert &&
      showFailureAlert("Something went wrong while fetching data");
    return null;
  }
};
