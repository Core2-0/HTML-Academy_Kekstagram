import { renderPhotos } from './render-photo.js';

const GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';

const getData = (onSucces, onFail) => {
  fetch(GET_DATA)
    .then((response) => {
      if (response.ok) {
        const photos = response.json();
        return photos;
      }
    })
    .then((photos) => onSucces(photos))
};

getData((photos) => {
  renderPhotos(photos);
});
