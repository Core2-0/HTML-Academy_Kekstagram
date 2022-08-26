import { renderPhotos } from './render-photo.js';
import { createErrorMessage, showErrorMessage } from './utils/error-utils.js';

const GET_DATA = 'https://23.javascript.pages.academy/kekstagram/data';
const POST_SERVER = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSucces, onFail) => {
  fetch(GET_DATA)
    .then((response) => {
      if (response.ok) {
        const photos = response.json();
        return photos;
      } else {
        onFail();
      }
    })
    .then((photos) => onSucces(photos))
    .catch(() => onFail());
};

const sendData = (onSucces, onFail, body) => {
  fetch(
    POST_SERVER,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      response.ok ? onSucces() : onFail();
    })
    .catch(() => onFail())
};

getData((photos) => {
  renderPhotos(photos);
}, () => showErrorMessage(createErrorMessage));

export { sendData };
