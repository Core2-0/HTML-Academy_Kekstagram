import { getRandomNum, getRandomElement } from './utils/utils.js';

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
