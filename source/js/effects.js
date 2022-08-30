/* global noUiSlider:readonly */
import './../../build/nouislider/nouislider.js';
import { imgUploadPreview } from './scale-photo.js';

const sliderField = document.querySelector('.effect-level')
const sliderElement = sliderField.querySelector('.effect-level__slider');
const sliderValue = sliderField.querySelector('.effect-level__value');
const effectChange = document.querySelectorAll('.effects__radio');

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

const setFilter = () => {
  sliderField.classList.add('hidden');

  for (let i = 0; i < effectChange.length; i++) {
    effectChange[i].addEventListener('change', () => {
      if (effectChange[i].value !== 'none') {
        sliderField.classList.remove('hidden');
        imgUploadPreview.removeAttribute('class');
        imgUploadPreview.classList.add(`effects__preview--${effectChange[i].value}`);

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

export { setFilter };
