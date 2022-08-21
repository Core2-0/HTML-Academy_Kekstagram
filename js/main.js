'use strict';

const getRandomNum = (start, end) => {
  if (start < 0 || end < 0) {
    throw new TypeError('Допускаются только положительные числа!');
  }

  if (isNaN(start) || isNaN(end)) {
    throw new TypeError('Параметры могут быть только числами!');
  }

  if (start === end) {
    throw new TypeError('Выполнение операции невозможно!');
  }

  if (start > end) {
    [start, end] = [end, start];
  }

  start = Math.ceil(start);
  end = Math.floor(end);

  return Math.floor(Math.random() * (end - start + 1)) + start;
};

const isLengthLimit = (string, maxLength) => {
  return string.length <= maxLength;
};

getRandomNum(1, 5);
isLengthLimit('hello', 4);
