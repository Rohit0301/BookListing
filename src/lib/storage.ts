/**
 * Stores a value in the local storage with a specified key.
 * @param key - The key under which to store the value.
 * @param value - The value to store (will be serialized to JSON).
 * @param showFailureAlert - Optional callback function to show an alert on failure.
 */
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

/**
 * Retrieves a value from local storage associated with a specified key.
 * @param key - The key of the value to retrieve.
 * @param showFailureAlert - Optional callback function to show an alert on failure.
 * @returns The retrieved value deserialized from JSON, or null if not found or on error.
 */
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
