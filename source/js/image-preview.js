const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const loadPhoto = (input, preview, miniPreview) => {
  const photo = input.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return photoName.endsWith(it)
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
      preview.width = '600';
      preview.height = '600';

      miniPreview.forEach(miniPhoto => {
        miniPhoto.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(photo);
  }
};

export { loadPhoto };
