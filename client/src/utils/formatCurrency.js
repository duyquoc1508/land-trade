// Format currency from 1000000 => 1.000.000
export default function formatCurrency(str = "") {
  const number = str.toString().split(".").join("");
  return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}
