import { setImageScale, imgUploadPreview, scaleControlValue } from './scale-photo.js';
import { setFilter } from './effects.js';
import { isEcsEvent, onStopEsc } from './utils/utils.js';
import { validationHashtags } from './validation.js';
import { createFormMessage, showFormMessage } from './utils/error-utils.js';
import { sendData } from './server.js';
import { loadPhoto } from './image-preview.js';

const imgUpLoadInput = document.querySelector('#upload-file');
const imgUpLoadOverlay = document.querySelector('.img-upload__overlay');
const buttonCancel = imgUpLoadOverlay.querySelector('#upload-cancel');

const upLoadForm = document.querySelector('.img-upload__form')
const hashtagInput = upLoadForm.querySelector('.text__hashtags');
const descriptionInput = upLoadForm.querySelector('.text__description');

const uploadFile = upLoadForm.querySelector('#upload-file');
const photoPreveiw = upLoadForm.querySelector('.img-upload__preview img');
const effectsPreview = upLoadForm.querySelectorAll('.effects__preview');

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
  hashtagInput.value = '';
  descriptionInput.value = '';
};

const closeUpLoad = () => {
  imgUpLoadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUpLoadInput.value = '';
  resetSettigns();

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

validationHashtags(upLoadForm, hashtagInput);

onStopEsc(hashtagInput, descriptionInput);

const setFormSubmit = (onSuccess, onFail) => {
  upLoadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(() => onSuccess(), () => onFail(), formData);
  });
};

const setSuccessForm = () => {
  showFormMessage(createFormMessage('success', 'success'));
  imgUpLoadInput.value = '';
  closeUpLoad();
  resetSettigns();
}

const setErrorForm = () => {
  showFormMessage(createFormMessage('error', 'error'));
  imgUpLoadInput.value = '';
  closeUpLoad();
  resetSettigns();
}

setFormSubmit(setSuccessForm, setErrorForm);

uploadFile.addEventListener('change', () => loadPhoto(uploadFile, photoPreveiw, effectsPreview));
