export const isRequired = (value: string): boolean => {
  return !!(value.trim() !== '');
};

export const isEmail = (value: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!regex.test(value);
};

export const isMinLength = (value: string, length: number): boolean => {
  return !!(value.length >= length);
};

export const isMaxLength = (value: string, length: number): boolean => {
  return !!(value.length <= length);
};
