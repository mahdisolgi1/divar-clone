export const formatPrice = (num: string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let persianNum = "";
  for (let i = 0; i < num.length; i++) {
    const char = num[i];
    if (/\d/.test(char)) {
      persianNum += persianNumbers[parseInt(char)];
    } else {
      persianNum += char;
    }
  }

  let withSeparators = "";
  let count = 0;
  for (let i = persianNum.length - 1; i >= 0; i--) {
    withSeparators = persianNum[i] + withSeparators;
    count++;
    if (count % 3 === 0 && i !== 0) {
      withSeparators = "٬" + withSeparators;
    }
  }

  return withSeparators;
};
