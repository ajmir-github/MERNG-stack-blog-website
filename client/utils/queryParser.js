export function parseQuery(params) {
  const list = Object.entries(params)
    .filter(([key, value]) => Boolean(value))
    .map((pair) => pair.join("="))
    .join("&");
  if (list.length === 0) return "";
  // DONE
  return (
    "/?" +
    Object.entries(params)
      .filter(([key, value]) => Boolean(value))
      .map((pair) => pair.join("="))
      .join("&")
  );
}
