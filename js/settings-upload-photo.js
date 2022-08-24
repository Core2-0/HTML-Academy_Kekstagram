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
const sliderValue = sliderField.querySelector('.effect-level__value');

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

const effects = [
  {
    filter: 'none',
  },
  {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    suffix: '%',
  },
  {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    suffix: 'px',
  },
  {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
]

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// FILTER
const setFilter = () => {
  sliderField.classList.add('hidden');

  for (let i = 0; i < filterChange.length; i++) {
    filterChange[i].addEventListener('change', () => {
      if (filterChange[i].value !== 'none') {
        sliderField.classList.remove('hidden');
        imgUploadPreview.removeAttribute('class');
        imgUploadPreview.classList.add(`effects__preview--${filterChange[i].value}`);

        sliderElement.noUiSlider.on('update', (values, handle) => {
          sliderValue.value = values[handle];
          imgUploadPreview.style.filter = `${effects[i].filter}(${effects[i].suffix ? sliderValue.value + effects[i].suffix : sliderValue.value})`;
        });

        sliderElement.noUiSlider.updateOptions({
          range: {
            min: effects[i].min,
            max: effects[i].max,
          },
          step: effects[i].step,
        });
        sliderElement.noUiSlider.set(effects[i].max);
      } else {
        sliderField.classList.add('hidden');
        imgUploadPreview.removeAttribute('class');
        imgUploadPreview.removeAttribute('style');
      }
    });
  }
}

setFilter();
