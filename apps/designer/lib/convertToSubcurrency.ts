function convertToSubcurrency(amount: number, factor = 100, currency: string = "vnd") {
  if (currency.toLowerCase() === "vnd") {
    return Math.round(amount); // VNĐ giữ nguyên, chỉ làm tròn số nguyên
  }
  return Math.round(amount * factor);
}

export default convertToSubcurrency;