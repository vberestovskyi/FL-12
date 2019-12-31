function isLeapYear(input) {
  const date = (new Date(input));
  const year = date.getFullYear();
  const result = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
  if (result && !isNaN(date)) {
    return `${year} is a leap year`
  } else if (!result && !isNaN(date)) {
    return `${year} is not a leap year`
  } else if (isNaN(date)) {
    return "Invalid Date"
  }
}
isLeapYear();