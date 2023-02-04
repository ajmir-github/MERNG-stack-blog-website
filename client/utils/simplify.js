const thousand = 1000;
const million = thousand * thousand;
function fixNum(num) {
  return num.toFixed(1).toString().replace(".0", "");
}
export function simplifyNum(num) {
  // Zero to 1k
  if (num < thousand) {
    return num.toString();
  }
  // 1K to 1M
  if (num < million) {
    return fixNum(num / thousand) + "K";
  }
  // 1K to Infinite number
  return fixNum(num / million) + "M";
}

export function simplifyDate(data) {
  const [weekday, month, day, year] = new Date(data).toDateString().split(" ");
  return `${month.toUpperCase()} ${parseInt(day)}, ${year}`;
}
