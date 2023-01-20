const thousand = 1000;
const million = thousand * thousand;
const billion = million * thousand;
const trillion = million * million;
function fixNum(num) {
  return num.toFixed(1).toString().replace(".0", "");
}
function simplifyNum(num) {
  // Zero to 1k
  if (num < thousand) {
    return num.toString();
  }
  // 1K to 1M
  if (num < million) {
    return fixNum(num / thousand) + "K";
  }
  // 1K to 1MM
  if (num < billion) {
    return fixNum(num / million) + "M";
  }
  // 1K to Infinte number
  if (num < trillion) {
    return fixNum(num / billion) + "MM";
  }
}
