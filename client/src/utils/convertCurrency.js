const vndToEth = 1 / 5000000; //suppose: 1ETH => 5000000VND
const ethToWei = 1 / 1000000000000000000;

export function convertVNDtoETH(str = "") {
  const value = parseInt(str.toString().replace(/\./g, ""), 10);
  return value * vndToEth;
}

export function convertWeiToVND(value = 0) {
  return ((value * ethToWei) / vndToEth).toFixed(0);
}
