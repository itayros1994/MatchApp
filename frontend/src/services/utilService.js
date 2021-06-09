export const utilService = {
  delay,
  getRandomInt,
  makeId,
  getTimeAndDate,
};

function delay(ms = 1500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function getTimeAndDate(date) {
  const year = +date.substring(0, 4);
  const day = date.substring(8, 10);
  const numMonth = +date.substring(5, 7);
  var month;
  switch (numMonth) {
    case 1:
      month = 'JUL';
      break;
    case 2:
      month = 'FEB';
      break;
    case 3:
      month = 'MAR';
      break;
    case 4:
      month = 'APR';
      break;
    case 5:
      month = 'MAY';
      break;
    case 6:
      month = 'JUN';
      break;
    case 7:
      month = 'JUL';
      break;
    case 8:
      month = 'AUG';
      break;
    case 9:
      month = 'SEP';
      break;
    case 10:
      month = 'OCT';
      break;
    case 11:
      month = 'NOV';
      break;
    case 12:
      month = 'DEC';
      break;
    default:
      month = numMonth;
  }
  const newDate = {
    day,
    month,
    year,
  };
  return newDate;
}

function makeId(length = 5) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
