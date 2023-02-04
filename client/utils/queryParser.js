export function parseQuery(params) {
  return (
    "/?" +
    Object.entries(params)
      .map((pair) => pair.join("="))
      .join("&")
  );
}
