'use strict';

const PHOTO_COUNT = 25;

const CommentCount = {
  MIN: 0,
  MAX: 5,
};

const Likes = {
  MIN: 15,
  MAX: 200,
};

const DESCRIPTIONS = [
  'Тестим новую камеру! =)',
  'Просто хорошее фото)))',
  'Какой вид! как считаете?',
  'Снято на ксяоми +100500 мегапикселей ультра про сериес',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артем',
  'Сергей',
  'Егор',
  'Настя',
  'Катя',
  'Елена',
];

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

const createCommentsArray = (minLength, maxLength) => {
  const comments = [];

  for (let index = 0; index < getRandomNum(minLength, maxLength); index++) {
    comments.push({
      id: getRandomNum(0, 200),
      avatar: `img/avatar-${getRandomNum(1, 6)}.svg}`,
      message: getRandomElement(MESSAGES),
      name: getRandomElement(NAMES),
    });
  }

  return comments;
}

const generatePhotoCards = () => {
  const photos = [];

  for (let i = 0; i < PHOTO_COUNT; i += 1) {
    photos.push({
      id: i,
      url: `photos/${i + 1}.jpg}`,
      description: getRandomElement(DESCRIPTIONS),
      likes: getRandomNum(Likes.MIN, Likes.MAX),
      comments: createCommentsArray(CommentCount.MIN, CommentCount.MAX),
    });
  }

  return photos;
}

generatePhotoCards();
