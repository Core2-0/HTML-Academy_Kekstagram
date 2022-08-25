import { setImageScale, imgUploadPreview, scaleControlValue } from './scale-photo.js';
import { setFilter } from './effects.js';

const imgUpLoad = document.querySelector('#upload-file');
const imgUpLoadForm = document.querySelector('.img-upload__overlay');
const buttonCancel = imgUpLoadForm.querySelector('#upload-cancel');

imgUpLoad.addEventListener('change', () => {
  resetSettigns();
  imgUpLoadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  setFilter();
})

setImageScale();

const resetSettigns = () => {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = '';
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlValue.value = `${100}%`;
}

buttonCancel.addEventListener('click', () => {
  imgUpLoadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  imgUpLoad.value = '';
});
