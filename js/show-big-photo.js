import { isEcsEvent } from './utils/utils.js';

const COMMENTS_LOAD_STEP = 5;

const body = document.querySelector('body');
const bigPhoto = document.querySelector('.big-picture');
const closeButton = bigPhoto.querySelector('.big-picture__cancel');
const commentList = bigPhoto.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');
const commentCount = bigPhoto.querySelector('.social__comment-count');
const commentLoader = bigPhoto.querySelector('.comments-loader');

let commentLoaded = [];
let commentsCount = COMMENTS_LOAD_STEP;

const clearCommentList = () => {
  commentList.innerHTML = '';
}

const getComments = (comment) => {
  const commentMessage = commentTemplate.cloneNode(true);

  commentMessage.querySelector('.social__picture').src = comment.avatar;
  commentMessage.querySelector('.social__text').textContent = comment.message;

  return commentMessage;
}

const renderComments = (comments) => {
  const onCommentsLoaderClick = () => {
    renderComments(comments);
  };

  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentLoaded = comments.slice(0, commentsCount);

  clearCommentList();
  commentCount.textContent = `${commentLoaded.length} из ${comments.length} комментариев`;

  let commentListFragment = document.createDocumentFragment();

  commentLoaded.forEach(comment => {
    commentListFragment.appendChild(getComments(comment));
  });

  commentList.appendChild(commentListFragment);

  if (comments.length > COMMENTS_LOAD_STEP && commentLoaded.length < comments.length) {
    commentLoader.classList.remove('hidden');
    commentLoader.addEventListener('click', onCommentsLoaderClick, { once: true })
  } else {
    commentLoader.classList.add('hidden');
  }

  commentsCount += COMMENTS_LOAD_STEP;
};

const showBigPhoto = (photoCard) => {
  commentsCount = COMMENTS_LOAD_STEP;
  commentLoaded = [];
  body.classList.add('modal-open');

  bigPhoto.querySelector('.big-picture__img > img').src = photoCard.url;
  bigPhoto.querySelector('.likes-count').textContent = photoCard.likes;
  bigPhoto.querySelector('.social__caption').textContent = photoCard.description;

  renderComments(photoCard.comments.slice());
  bigPhoto.classList.remove('hidden');
  onCloseBigPhoto();
};

const onCloseEsc = (evt) => {
  if (isEcsEvent(evt)) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

const closeBigPhoto = () => {
  bigPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount = COMMENTS_LOAD_STEP;
  commentLoaded = [];

  document.removeEventListener('keydown', onCloseEsc);
  clearCommentList();
};

const onCloseBigPhoto = () => {
  closeButton.addEventListener('click', () => {
    closeBigPhoto();
  });
};

export { showBigPhoto, onCloseEsc };
