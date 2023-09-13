export function formatToFinancial(numberToConvert: number): string {
  let convertedNumber = numberToConvert.toFixed(2);
  const arrayDecimalAndNumber = convertedNumber.split(".");
  convertedNumber = arrayDecimalAndNumber[0];
  const slicedFor = Math.floor(convertedNumber.length / 3);
  if (slicedFor > 0) {
    const arrOrder = [];
    for (let i = 1; i <= slicedFor; i += 1) {
      arrOrder.push(convertedNumber.slice(i * 3 - 3, i * 3));
    }
    return arrOrder.join(".").concat(",", arrayDecimalAndNumber[1]);
  }
  return arrayDecimalAndNumber.join(",");
}

formatToFinancial(100000.92);
