/* global _:readonly */
import { renderPhotos } from './render-photo.js';
import { shuffleArray, sortDownComments } from './utils/utils.js';

const SHOW_RANDOM_PHOTO = 10;
const RENDER_DELAY = 500;

const filter = document.querySelector('.img-filters');

const setActiveFilter = () => {
  filter.classList.remove('img-filters--inactive');
}

const filters = {
  'filter-default': _.debounce((photos) => {
    removePhotos();
    renderPhotos(photos)
  }, RENDER_DELAY),
  'filter-random': _.debounce((photos) => {
    removePhotos();
    renderPhotos(shuffleArray(photos.slice()).slice(0, SHOW_RANDOM_PHOTO));
  }, RENDER_DELAY),
  'filter-discussed': _.debounce((photos) => {
    removePhotos();
    renderPhotos(sortDownComments(photos.slice()));
  }, RENDER_DELAY),
};

const removeActiveClass = () => {
  let activeFilter = filter.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
}

const removePhotos = () => {
  let pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
}

const filterChange = (photos) => {
  filter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
      filters[evt.target.id](photos);
    }
  });
};

export { setActiveFilter, filterChange };
