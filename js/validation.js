const ERROR_STYLE = '2px solid #ff0000';

const HashTagRules = {
  SYMBOL: '#',
  MIN_SYMBOLS: 2,
  MAX_SYMBOLS: 20,
  MAX_HASHTAGS: 5,
  PATTERN: /#[А-Яа-яЁё\sa-zA-Z\s]/,
};

const setErrorValidStyle = (element) => {
  element.style.border = ERROR_STYLE;
};

const resetErrorValidStyle = (element) => {
  element.style.border = '';
}

const checkActions = [
  {
    message: false,
    check: (arg) => arg.length === 0,
  },
  {
    message: 'Хэш-тэг должен начинатся с # и содержать только буквы',
    check: (arg) => arg.some((value) => !HashTagRules.PATTERN.test(value)),
  },
  {
    message: `Хэш-тэгов должно быть не более ${HashTagRules.MAX_HASHTAGS}`,
    check: (arg) => arg.length > HashTagRules.MAX_HASHTAGS,
  },
  {
    message: `Хэш-тэг должен состоять минимум из ${HashTagRules.MIN_SYMBOLS} символов`,
    check: (arg) => arg.some((value) => value.length < HashTagRules.MIN_SYMBOLS),
  },
  {
    message: `Хэш-тэг не должен превышать ${HashTagRules.MAX_SYMBOLS} символов`,
    check: (arg) => arg.some((value) => value.length > HashTagRules.MAX_SYMBOLS),
  },
  {
    message: 'Хэш-тэги должны быть уникальными',
    check: (arg) => arg.some((value, index, arr) => arr.indexOf(value) !== index),
  },
  {
    message: 'Хэш-теги разделяются пробелами',
    check: (arg) => arg.some((value) => value.indexOf(HashTagRules.SYMBOL, 1) >= 1),
  },
  {
    message: false,
    check: (arg) => arg,
  },
];

const getCheckAction = (arg) => checkActions.find(({check}) => check(arg));

const getHashTagsArray = (str) => {
  const arr = str.split(' ').map(((value) => value.toLowerCase()));
  return arr.reduce((acc, value) => value === '' ? acc : [...acc, value], []);
};

const checkHashTag = (data, hashTagfield) => {
  const hashTags = getHashTagsArray(data);
  const {message} = getCheckAction(hashTags);

  message ? hashTagfield.setCustomValidity(message) : hashTagfield.setCustomValidity('');
};

const clearCustomValidity = (...fields) => {
  fields.forEach((field) => {
    field.addEventListener('input', () => {
      field.setCustomValidity('');
    })
  });
}

const validationHashtags = (form, hashtagsField) => {
  clearCustomValidity(hashtagsField);

  form.addEventListener('invalid', (evt) => {
    setErrorValidStyle(evt.target);
  }, true);

  form.addEventListener('input', (evt) => {
    resetErrorValidStyle(evt.target);
    checkHashTag(hashtagsField.value, hashtagsField);
  });
};

export { validationHashtags };
