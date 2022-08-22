import { generatePhotoCards } from './generate-data.js';
import { showBigPhoto } from './show-big-photo.js';

const similarPictureContainer = document.querySelector('.pictures');
const similarPhotoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotoCards = generatePhotoCards();
const photoCardFragment = document.createDocumentFragment();

renderPhotoCards.forEach((photoCard) => {
  const similarPhotoCard = similarPhotoCardTemplate.cloneNode(true);

  similarPhotoCard.querySelector('.picture__img').src = photoCard.url;
  similarPhotoCard.querySelector('.picture__likes').textContent = photoCard.likes;
  similarPhotoCard.querySelector('.picture__comments').textContent = photoCard.comments.length;

  photoCardFragment.appendChild(similarPhotoCard);

  similarPhotoCard.addEventListener('click', () => {
    showBigPhoto(photoCard);
  });
});

similarPictureContainer.appendChild(photoCardFragment);
