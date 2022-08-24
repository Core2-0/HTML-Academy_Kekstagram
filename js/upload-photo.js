import { setImageScale } from './scale-photo.js';
import { setFilter } from './effects.js';

const imgUpLoad = document.querySelector('#upload-file');
const imgUpLoadForm = document.querySelector('.img-upload__overlay');
const buttonCancel = imgUpLoadForm.querySelector('#upload-cancel');

imgUpLoad.addEventListener('change', () => {
  imgUpLoadForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  setImageScale();
  setFilter();
})

buttonCancel.addEventListener('click', () => {
  imgUpLoadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});
