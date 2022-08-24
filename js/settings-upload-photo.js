/* global noUiSlider:readonly */
import '../nouislider/nouislider.js';

const imgUpload = document.querySelector('.img-upload__overlay').classList.remove('hidden');
document.querySelector('body').classList.add('modal-open');

const ScaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview > img');

const sliderField = document.querySelector('.effect-level')
const sliderElement = sliderField.querySelector('.effect-level__slider');

const filterChange = document.querySelectorAll('.effects__radio');

// SCALE

const defaultScale = () => {
  scaleControlValue.value = `${ScaleValues.MAX}%`;
  imgUploadPreview.style.scale = scaleControlValue.value / 100;
}

defaultScale();

const setImageScale = () => {
  scaleControlSmaller.addEventListener('click', () => {
    if (parseInt(scaleControlValue.value) > ScaleValues.MIN) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value) - ScaleValues.STEP}%`;
      imgUploadPreview.style.scale = parseInt(scaleControlValue.value) / 100;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (parseInt(scaleControlValue.value) < ScaleValues.MAX) {
      scaleControlValue.value = `${parseInt(scaleControlValue.value) + ScaleValues.STEP}%`;
      imgUploadPreview.style.scale = parseInt(scaleControlValue.value) / 100;
    }
  });
};

setImageScale();

// SLIDER

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
})

// FILTER
const setFilter = () => {
  sliderField.classList.add('hidden');

  for (let i = 0; i < filterChange.length; i++) {
    filterChange[i].addEventListener('click', () => {
      if (filterChange[i].value !== 'none') {
        sliderField.classList.remove('hidden');
        imgUploadPreview.removeAttribute('class');
        imgUploadPreview.classList.add(`effects__preview--${filterChange[i].value}`);
      } else {
        sliderField.classList.add('hidden');
        imgUploadPreview.removeAttribute('class');
      }
    })
  }
}

setFilter();
