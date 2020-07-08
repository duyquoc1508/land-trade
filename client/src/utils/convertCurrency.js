const vndToEth = 1 / 5343154;
const ethToWei = 1 / 1000000000000000000;

export function convertVNDtoETH(str) {
  const value = parseInt(str.toString().replace(/\./g, ""));
  return value * vndToEth;
}

export function convertWeiToVND(value) {
  return ((value * ethToWei) / vndToEth).toFixed();
}
