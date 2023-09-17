export function formatToFinancial(numberToConvert: number): string {
  const convertedNumber = numberToConvert.toFixed(2);
  const arrayDecimalAndNumber = convertedNumber.split(".");
  const lastPos = arrayDecimalAndNumber[0].length - 1;
  let count = 1;
  const financialNumber = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const digitPos in arrayDecimalAndNumber[0] as any) {
    financialNumber.unshift(
      arrayDecimalAndNumber[0][lastPos - Number(digitPos)]
    );
    if (count === 3 && lastPos - Number(digitPos) !== 0) {
      count = 1;
      financialNumber.unshift(".");
    } else {
      count += 1;
    }
  }
  return financialNumber.join("").concat(",", arrayDecimalAndNumber[1]);
}
