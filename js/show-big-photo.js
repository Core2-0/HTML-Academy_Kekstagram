import { isEcsEvent } from './utils/utils.js';
import './generate-data.js';

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const commentList = bigPhoto.querySelector('.social__comments');
const commentListFragment = document.createDocumentFragment();
const commentTemplate = commentList.querySelector('.social__comment');

const getComments = (comments) => {
  commentList.innerHTML = '';
  
  comments.forEach(comment => {
    const commentMessage = commentTemplate.cloneNode(true);

    commentMessage.querySelector('.social__picture').src = comment.avatar;
    commentMessage.querySelector('.social__text').textContent = comment.message;

    commentListFragment.appendChild(commentMessage);
  });

  commentList.appendChild(commentListFragment);
}

const showBigPhoto = (photoCard) => {
  body.classList.add('modal-open');

  bigPhoto.querySelector('.big-picture__img > img').src = photoCard.url;
  bigPhoto.querySelector('.likes-count').textContent = photoCard.likes;
  bigPhoto.querySelector('.comments-count').textContent = photoCard.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photoCard.description;
  getComments(photoCard.comments);
  bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
  bigPhoto.querySelector('.comments-loader').classList.add('hidden');

  bigPhoto.classList.remove('hidden');
  closeBigPhoto();
};

const closeBigPhoto = () => {
  document.addEventListener('keydown', (evt) => {
    if (isEcsEvent(evt)) {
      evt.preventDefault();
      bigPhoto.classList.add('hidden');
      body.classList.remove('modal-open');
    }
  });

  closeButton.addEventListener('click', () => {
    bigPhoto.classList.add('hidden');
    body.classList.remove('modal-open');
  });
};

export { showBigPhoto };
