const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
export const imgUploadPreview = document.querySelector('.img-upload__preview > img');

const ScaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

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

export { setImageScale };
