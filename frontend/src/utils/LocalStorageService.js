export const saveStorage = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const fetchStorage = (key) => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (err) {
      return localStorage.getItem(key);
    }
  }
};

export const clearStorage = (key) => {
  localStorage.removeItem(key);
};
