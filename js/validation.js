import { isEcsEvent } from './utils/utils.js';

const InputLimits = {
  MAX_SYMBOLS: 20,
  MAX_HASHTAGS: 5,
};

const hashtagValidation = (hashtagInput) => {
  hashtagInput.setCustomValidity('');

  let hashtagText = hashtagInput.value.toLowerCase().trim();

  if(!hashtagText) return;

  let hashtagInputSplit = hashtagText.split(/\s+/);

  for (let i = 0; i < hashtagInputSplit.length; i++) {
    if (hashtagInputSplit.some((item) => item[0] !== '#')) {
      hashtagInput.setCustomValidity('Хэш-тег должен начинатся с #');
    }
  }
}

const onFocusEsc = (evt) => {
  if (isEcsEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}

export { hashtagValidation };
