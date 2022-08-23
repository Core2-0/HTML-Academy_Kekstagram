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
