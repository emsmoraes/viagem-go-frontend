export const debounce = <T extends (...args: string[]) => void>(
  cb: T,
  delay: number = 1000,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = null;
      cb(...args);
    }, delay);
  };
};
