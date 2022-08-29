const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
export const scaleControlValue = document.querySelector('.scale__control--value');
export const imgUploadPreview = document.querySelector('.img-upload__preview > img');

const ScaleValues = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const setImageScale = () => {
  scaleControlValue.value = `${ScaleValues.MAX}%`;
  imgUploadPreview.style.scale = scaleControlValue.value / 100;

  scaleControlBigger.addEventListener('click', () => {
    let scale = parseInt(scaleControlValue.value, 10) + ScaleValues.STEP;

    if (scale >= ScaleValues.MAX) scale = ScaleValues.MAX;

    scaleControlValue.value = `${scale}%`;
    scale = scale / 100;
    imgUploadPreview.style.transform = `scale(${scale})`;
  });

  scaleControlSmaller.addEventListener('click', () => {
    let scale = parseInt(scaleControlValue.value, 10) - ScaleValues.STEP;

    if (scale <= ScaleValues.MIN) scale = ScaleValues.MIN;

    scaleControlValue.value = `${scale}%`;
    scale = scale / 100;
    imgUploadPreview.style.transform = `scale(${scale})`;
  });
};

export { setImageScale };
