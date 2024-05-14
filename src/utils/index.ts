export function LocalStorage(
  localStorageKey: string,
  data: any = null,
  action: any = null
) {
  if (data || action === "delete") {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    return JSON.parse(localStorage.getItem(localStorageKey)!);
  } else {
    return JSON.parse(localStorage.getItem(localStorageKey)!);
  }
}
