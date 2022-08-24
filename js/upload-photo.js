import { setImageScale, imgUploadPreview, scaleControlValue } from './scale-photo.js';
import { setFilter } from './effects.js';
import { isEcsEvent } from './utils/utils.js';
import { hashtagValidation } from './validation.js';

const imgUpLoadInput = document.querySelector('#upload-file');
const imgUpLoadOverlay = document.querySelector('.img-upload__overlay');
const buttonCancel = imgUpLoadOverlay.querySelector('#upload-cancel');

const hashtagInput = imgUpLoadOverlay.querySelector('.text__hashtags');

imgUpLoadInput.addEventListener('change', () => {
  resetSettigns();
  imgUpLoadOverlay.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  setFilter();

  document.addEventListener('keydown', onCloseUpLoadEsc);
});

setImageScale();

const resetSettigns = () => {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = '';
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlValue.value = `${100}%`;
};

const closeUpLoad = () => {
  imgUpLoadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUpLoadInput.value = '';

  document.removeEventListener('keydown', onCloseUpLoadEsc);
};

const onCloseUpLoadEsc = (evt) => {
  if (isEcsEvent(evt)) {
    evt.preventDefault();
    closeUpLoad();
  }
}

buttonCancel.addEventListener('click', () => {
  closeUpLoad();
});

hashtagInput.addEventListener('input', () => {
  hashtagValidation(hashtagInput);
})
