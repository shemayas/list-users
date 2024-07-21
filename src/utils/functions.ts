
export function debounce<T extends (...args: Parameters<T>) => void>(
  cb: T,
  wait = 200
) {
  let setTimeoutId: ReturnType<typeof setTimeout>;
  const callable = (...args: Parameters<T>) => {
    clearTimeout(setTimeoutId);
    setTimeoutId = setTimeout(() => cb(...args), wait);
  };
  return callable;
}
