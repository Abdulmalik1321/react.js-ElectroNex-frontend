export function LocalStorage(localStorageKey: string, data: any = null) {
  console.log(data);

  if (data) {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    return JSON.parse(localStorage.getItem(localStorageKey)!);
  } else {
    return JSON.parse(localStorage.getItem(localStorageKey)!);
  }
}
