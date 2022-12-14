const getRandomNum = (start, end) => {
  if (start < 0 || end < 0) {
    throw new TypeError('Допускаются только положительные числа!');
  }

  if (isNaN(start) || isNaN(end)) {
    throw new TypeError('Параметры могут быть только числами!');
  }

  if (start === end) {
    throw new TypeError('Невозможно сформировать разные числа!');
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

const getRandomElement = (elements) => elements[getRandomNum(0, elements.length - 1)];

const isEcsEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const shuffleArray = (arr) => {
  let j, temp;

  for (let i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }

  return arr;
};

const sortDownComments = (arr) => {
  return arr.sort((a, b) => b.comments.length - a.comments.length);
}

const onStopEsc = (...args) => {
  return args.map((arg) => {
    return arg.addEventListener('keydown', (evt) => {
      if (isEcsEvent) {
        evt.stopPropagation();
      }
    });
  })
};

export { getRandomNum, isLengthLimit, getRandomElement, shuffleArray, sortDownComments, isEcsEvent, onStopEsc };
