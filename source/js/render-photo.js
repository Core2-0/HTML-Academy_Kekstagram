import { showBigPhoto, onCloseEsc } from './show-big-photo.js';

const similarPictureContainer = document.querySelector('.pictures');
const photoCardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const photoCardFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    const photoCard = photoCardTemplate.cloneNode(true);

    photoCard.querySelector('.picture__img').src = photo.url;
    photoCard.querySelector('.picture__likes').textContent = photo.likes;
    photoCard.querySelector('.picture__comments').textContent = photo.comments.length;

    photoCardFragment.appendChild(photoCard);

    photoCard.addEventListener('click', () => {
      showBigPhoto(photo);

      document.addEventListener('keydown', onCloseEsc);
    });
  });

  similarPictureContainer.appendChild(photoCardFragment);
};

export { renderPhotos };
