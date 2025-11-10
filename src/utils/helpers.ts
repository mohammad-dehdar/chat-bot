export const bToA = (obj: Record<string, unknown>): string => {
  return btoa(unescape(encodeURIComponent(JSON.stringify(obj))));
};

export const aToB = (data: string): unknown => {
  return JSON.parse(decodeURIComponent(escape(atob(data))));
};
